import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import Types "../types/companions";
import UserTypes "../types/users";

module {
  // --- Personality system prompts ---
  func personalitySystemPrompt(p : Types.PersonalityType) : Text {
    switch (p) {
      case (#friendly) "You are a warm and empathetic friend. Be supportive, cheerful, and caring.";
      case (#romantic) "You are a caring and affectionate partner. Be loving, tender, and emotionally present.";
      case (#mentor) "You are a wise and encouraging coach. Offer thoughtful guidance, motivate growth, and ask thought-provoking questions.";
      case (#businessCoach) "You are a direct and results-focused advisor. Be concise, practical, and push for measurable outcomes.";
    };
  };

  // --- Daily usage key: principalText + ":" + dateText ---
  func usageKey(caller : Principal, nowNs : Int) : Text {
    let daysSinceEpoch = (nowNs / 1_000_000_000 / 86400).toText();
    caller.toText() # ":" # daysSinceEpoch;
  };

  // --- Companion CRUD ---

  public func createCompanion(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    nextId : { var value : Nat },
    caller : Principal,
    input : Types.CreateCompanionInput,
  ) : Types.AICompanion {
    // Determine tier limits
    let maxAllowed : Nat = switch (users.get(caller)) {
      case (null) { 1 };
      case (?u) { switch (u.tier) { case (#pro) 3; case (#free) 1 } };
    };

    // Count existing companions for caller
    var owned : Nat = 0;
    for ((_, c) in companions.entries()) {
      if (Principal.equal(c.ownerPrincipal, caller)) { owned += 1 };
    };

    if (owned >= maxAllowed) {
      Runtime.trap("Companion limit reached for your tier");
    };

    let id = nextId.value;
    nextId.value += 1;

    let companion : Types.AICompanion = {
      id;
      ownerPrincipal = caller;
      name = input.name;
      personalityType = input.personalityType;
      customTraits = input.customTraits;
      createdAt = Time.now();
    };
    companions.add(id, companion);
    companion;
  };

  public func getCompanions(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    caller : Principal,
  ) : [Types.AICompanion] {
    companions.values().filter(func(c) { Principal.equal(c.ownerPrincipal, caller) }).toArray();
  };

  public func getCompanion(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    caller : Principal,
    companionId : Common.CompanionId,
  ) : ?Types.AICompanion {
    switch (companions.get(companionId)) {
      case (null) null;
      case (?c) {
        if (Principal.equal(c.ownerPrincipal, caller)) { ?c } else { null };
      };
    };
  };

  public func deleteCompanion(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    messages : Map.Map<Common.CompanionId, List.List<Types.Message>>,
    caller : Principal,
    companionId : Common.CompanionId,
  ) : () {
    switch (companions.get(companionId)) {
      case (null) Runtime.trap("Companion not found");
      case (?c) {
        if (not Principal.equal(c.ownerPrincipal, caller)) {
          Runtime.trap("Unauthorized: not the owner");
        };
        companions.remove(companionId);
        messages.remove(companionId);
      };
    };
  };

  // --- Messaging ---

  func buildOpenAiBody(
    systemPrompt : Text,
    contextMessages : [Types.Message],
    userContent : Text,
  ) : Text {
    var msgs = "[{\"role\":\"system\",\"content\":\"" # escapeJson(systemPrompt) # "\"}";
    for (m in contextMessages.values()) {
      let roleStr = switch (m.role) { case (#user) "user"; case (#assistant) "assistant" };
      msgs #= ",{\"role\":\"" # roleStr # "\",\"content\":\"" # escapeJson(m.content) # "\"}";
    };
    msgs #= ",{\"role\":\"user\",\"content\":\"" # escapeJson(userContent) # "\"}]";
    "{\"model\":\"gpt-4o-mini\",\"messages\":" # msgs # ",\"max_tokens\":512}";
  };

  func escapeJson(t : Text) : Text {
    t.replace(#text "\\", "\\\\").replace(#text "\"", "\\\"").replace(#char '\n', "\\n").replace(#char '\r', "\\r").replace(#char '\t', "\\t");
  };

  // Extract "content" field value from a minimal OpenAI JSON response.
  // Returns raw JSON on failure so the frontend can still display something.
  func extractContent(json : Text) : Text {
    let needle = "\"content\":\"";
    switch (findSubstring(json, needle)) {
      case (null) json;
      case (?start) {
        let afterKey = start + needle.size();
        // Scan forward until unescaped closing quote
        var i = afterKey;
        var result = "";
        var escaped = false;
        let chars = json.toArray();
        while (i < chars.size()) {
          let ch = chars[i];
          let chText = Text.fromChar(ch);
          if (escaped) {
            result #= chText;
            escaped := false;
          } else if (chText == "\\") {
            result #= "\\";
            escaped := true;
          } else if (chText == "\"") {
            return result;
          } else {
            result #= chText;
          };
          i += 1;
        };
        result;
      };
    };
  };

  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let h = haystack.size();
    let n = needle.size();
    if (n > h) return null;
    let hChars = haystack.toArray();
    let nChars = needle.toArray();
    var i = 0;
    while (i + n <= h) {
      var match = true;
      var j = 0;
      while (j < n) {
        if (hChars[i + j] != nChars[j]) { match := false };
        j += 1;
      };
      if (match) return ?i;
      i += 1;
    };
    null;
  };

  public func sendMessage(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    messages : Map.Map<Common.CompanionId, List.List<Types.Message>>,
    aiUsage : Map.Map<Text, Nat>,
    nextId : { var value : Nat },
    openAiApiKey : { var value : Text },
    caller : Principal,
    companionId : Common.CompanionId,
    content : Text,
    transform : OutCall.Transform,
  ) : async Types.Message {
    // Auth check
    if (caller.isAnonymous()) Runtime.trap("Unauthorized: must be logged in");

    // Ownership check
    let companion = switch (companions.get(companionId)) {
      case (null) Runtime.trap("Companion not found");
      case (?c) {
        if (not Principal.equal(c.ownerPrincipal, caller)) {
          Runtime.trap("Unauthorized: not the owner");
        };
        c;
      };
    };

    // Daily limit check
    let key = usageKey(caller, Time.now());
    let todayCount = switch (aiUsage.get(key)) { case (null) 0; case (?n) n };
    let isPro = switch (users.get(caller)) {
      case (null) false;
      case (?u) u.tier == #pro;
    };
    let dailyLimit : Nat = if (isPro) 999_999 else 10;
    if (todayCount >= dailyLimit) {
      Runtime.trap("Daily message limit reached. Upgrade to Pro for unlimited messages.");
    };

    // Fetch last 20 messages as context
    let allMsgs = switch (messages.get(companionId)) {
      case (null) List.empty<Types.Message>();
      case (?lst) lst;
    };
    let totalMsgs = allMsgs.size();
    let contextStart : Int = totalMsgs.toInt() - 20;
    let contextFromIdx : Nat = if (contextStart < 0) 0 else contextStart.toNat();
    let contextMsgs = allMsgs.sliceToArray(contextFromIdx, totalMsgs);

    // Build user message
    let userMsgId = nextId.value;
    nextId.value += 1;
    let userMsg : Types.Message = {
      id = userMsgId;
      companionId;
      role = #user;
      content;
      timestamp = Time.now();
    };

    // Call OpenAI
    let systemPrompt = personalitySystemPrompt(companion.personalityType)
      # (if (companion.customTraits.size() > 0) " " # companion.customTraits else "");
    let body = buildOpenAiBody(systemPrompt, contextMsgs, content);
    let url = "https://api.openai.com/v1/chat/completions";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # openAiApiKey.value },
      { name = "Content-Type"; value = "application/json" },
    ];
    let responseJson = await OutCall.httpPostRequest(url, headers, body, transform);
    let aiContent = extractContent(responseJson);

    // Build AI message
    let aiMsgId = nextId.value;
    nextId.value += 1;
    let aiMsg : Types.Message = {
      id = aiMsgId;
      companionId;
      role = #assistant;
      content = aiContent;
      timestamp = Time.now();
    };

    // Store both messages, prune to last 50
    let msgList = switch (messages.get(companionId)) {
      case (null) List.empty<Types.Message>();
      case (?lst) lst;
    };
    msgList.add(userMsg);
    msgList.add(aiMsg);
    // Prune: if over 50, keep only the newest 50
    let size = msgList.size();
    if (size > 50) {
      let keep = msgList.sliceToArray(Nat.sub(size, 50), size);
      msgList.clear();
      for (m in keep.values()) { msgList.add(m) };
    };
    messages.add(companionId, msgList);

    // Increment usage counter
    aiUsage.add(key, todayCount + 1);

    aiMsg;
  };

  public func getMessages(
    companions : Map.Map<Common.CompanionId, Types.AICompanion>,
    messages : Map.Map<Common.CompanionId, List.List<Types.Message>>,
    caller : Principal,
    companionId : Common.CompanionId,
  ) : [Types.Message] {
    switch (companions.get(companionId)) {
      case (null) Runtime.trap("Companion not found");
      case (?c) {
        if (not Principal.equal(c.ownerPrincipal, caller)) {
          Runtime.trap("Unauthorized: not the owner");
        };
        switch (messages.get(companionId)) {
          case (null) [];
          case (?lst) lst.toArray();
        };
      };
    };
  };

  public func getAIUsageCount(
    aiUsage : Map.Map<Text, Nat>,
    caller : Principal,
  ) : Nat {
    let key = usageKey(caller, Time.now());
    switch (aiUsage.get(key)) { case (null) 0; case (?n) n };
  };
};
