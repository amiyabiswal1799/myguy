import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import Types "../types/companions";
import UserTypes "../types/users";
import CompanionLib "../lib/companions";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  companions : Map.Map<Common.CompanionId, Types.AICompanion>,
  messages : Map.Map<Common.CompanionId, List.List<Types.Message>>,
  aiUsage : Map.Map<Text, Nat>,
  nextCompanionId : { var value : Nat },
  nextMessageId : { var value : Nat },
  openAiApiKey : { var value : Text },
  transform : OutCall.Transform,
) {
  public shared ({ caller }) func createCompanion(input : Types.CreateCompanionInput) : async Types.AICompanion {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.createCompanion(companions, users, nextCompanionId, caller, input);
  };

  public query ({ caller }) func getCompanions() : async [Types.AICompanion] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.getCompanions(companions, caller);
  };

  public query ({ caller }) func getCompanion(companionId : Common.CompanionId) : async ?Types.AICompanion {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.getCompanion(companions, caller, companionId);
  };

  public shared ({ caller }) func deleteCompanion(companionId : Common.CompanionId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.deleteCompanion(companions, messages, caller, companionId);
  };

  public shared ({ caller }) func sendMessage(companionId : Common.CompanionId, content : Text) : async Types.Message {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    await CompanionLib.sendMessage(companions, users, messages, aiUsage, nextMessageId, openAiApiKey, caller, companionId, content, transform);
  };

  public query ({ caller }) func getMessages(companionId : Common.CompanionId) : async [Types.Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.getMessages(companions, messages, caller, companionId);
  };

  public query ({ caller }) func getAIUsageCount() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    CompanionLib.getAIUsageCount(aiUsage, caller);
  };

  public shared ({ caller }) func setOpenAiApiKey(apiKey : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admins only");
    };
    openAiApiKey.value := apiKey;
  };
};
