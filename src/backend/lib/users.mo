import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/users";

module {
  // followers map: target -> Set of follower principals
  // following map: caller -> Set of principals they follow
  // We use a single follows map: followerId -> Set<targetId>

  public func register(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Principal,
    input : Types.RegisterInput,
  ) : Types.UserProfile {
    switch (users.get(caller)) {
      case (?existing) { existing };
      case null {
        let profile : Types.UserProfile = {
          id = caller;
          name = input.name;
          bio = input.bio;
          avatar = null;
          followersCount = 0;
          followingCount = 0;
          tier = #free;
          isAdmin = false;
          isFlagged = false;
          isBanned = false;
          createdAt = Time.now();
        };
        users.add(caller, profile);
        profile;
      };
    };
  };

  public func getUser(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    id : Common.UserId,
  ) : ?Types.UserProfile {
    users.get(id);
  };

  public func updateProfile(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Principal,
    input : Types.UpdateProfileInput,
  ) : Types.UserProfile {
    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("User not found: register first") };
    };
    let updated = { profile with name = input.name; bio = input.bio };
    users.add(caller, updated);
    updated;
  };

  public func followUser(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
    caller : Principal,
    target : Common.UserId,
  ) : () {
    if (Principal.equal(caller, target)) {
      Runtime.trap("Cannot follow yourself");
    };
    // Ensure both users exist
    let _ = switch (users.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("Caller not registered") };
    };
    let targetProfile = switch (users.get(target)) {
      case (?p) { p };
      case null { Runtime.trap("Target user not found") };
    };

    // Get or create caller's following set
    let callerFollowing = switch (follows.get(caller)) {
      case (?s) { s };
      case null {
        let s = Set.empty<Common.UserId>();
        follows.add(caller, s);
        s;
      };
    };

    // Already following? no-op
    if (callerFollowing.contains(target)) {
      return;
    };

    callerFollowing.add(target);

    // Update followingCount for caller
    let callerProfile = switch (users.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("Caller not registered") };
    };
    users.add(caller, { callerProfile with followingCount = callerProfile.followingCount + 1 });

    // Update followersCount for target
    users.add(target, { targetProfile with followersCount = targetProfile.followersCount + 1 });
  };

  public func unfollowUser(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
    caller : Principal,
    target : Common.UserId,
  ) : () {
    let callerProfile = switch (users.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("Caller not registered") };
    };
    let targetProfile = switch (users.get(target)) {
      case (?p) { p };
      case null { Runtime.trap("Target user not found") };
    };

    let callerFollowing = switch (follows.get(caller)) {
      case (?s) { s };
      case null { return }; // not following, no-op
    };

    if (not callerFollowing.contains(target)) {
      return; // not following, no-op
    };

    callerFollowing.remove(target);

    // Update counts
    let newFollowingCount = if (callerProfile.followingCount > 0) { Nat.sub(callerProfile.followingCount, 1) } else { 0 };
    users.add(caller, { callerProfile with followingCount = newFollowingCount });

    let newFollowersCount = if (targetProfile.followersCount > 0) { Nat.sub(targetProfile.followersCount, 1) } else { 0 };
    users.add(target, { targetProfile with followersCount = newFollowersCount });
  };

  // Returns the principals that follow userId (reverse lookup)
  public func getFollowers(
    follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
    userId : Common.UserId,
  ) : [Common.UserId] {
    // Scan all follow entries to find who follows userId
    var result : [Common.UserId] = [];
    for ((followerId, followingSet) in follows.entries()) {
      if (followingSet.contains(userId)) {
        result := result.concat([followerId]);
      };
    };
    result;
  };

  // Returns the principals that userId follows
  public func getFollowing(
    follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
    userId : Common.UserId,
  ) : [Common.UserId] {
    switch (follows.get(userId)) {
      case (?s) { s.toArray() };
      case null { [] };
    };
  };

  public func upgradeToPro(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Principal,
  ) : () {
    let profile = switch (users.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("User not found: register first") };
    };
    users.add(caller, { profile with tier = #pro });
  };

  public func getSubscriptionStatus(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Principal,
  ) : Types.SubscriptionTier {
    switch (users.get(caller)) {
      case (?p) { p.tier };
      case null { #free };
    };
  };

  public func adminGetUsers(
    users : Map.Map<Common.UserId, Types.UserProfile>,
  ) : [Types.UserProfile] {
    users.values().toArray();
  };

  public func adminFlagUser(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    targetId : Common.UserId,
  ) : () {
    let profile = switch (users.get(targetId)) {
      case (?p) { p };
      case null { Runtime.trap("User not found") };
    };
    users.add(targetId, { profile with isFlagged = true });
  };

  public func adminBanUser(
    users : Map.Map<Common.UserId, Types.UserProfile>,
    targetId : Common.UserId,
  ) : () {
    let profile = switch (users.get(targetId)) {
      case (?p) { p };
      case null { Runtime.trap("User not found") };
    };
    users.add(targetId, { profile with isBanned = true });
  };
};
