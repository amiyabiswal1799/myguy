import Map "mo:core/Map";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import UserLib "../lib/users";
import Common "../types/common";
import Types "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, Types.UserProfile>,
  follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
) {
  // ── Registration ──────────────────────────────────────────────────────────

  public shared ({ caller }) func registerUser(input : Types.RegisterInput) : async Types.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.register(users, caller, input);
  };

  // ── Profile ───────────────────────────────────────────────────────────────

  public query func getUser(userId : Common.UserId) : async ?Types.UserProfile {
    UserLib.getUser(users, userId);
  };

  public shared ({ caller }) func updateProfile(input : Types.UpdateProfileInput) : async Types.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let profile = switch (users.get(caller)) {
      case (?p) {
        if (p.isBanned) { Runtime.trap("Account is banned") };
        p;
      };
      case null { Runtime.trap("User not found: register first") };
    };
    ignore profile;
    UserLib.updateProfile(users, caller, input);
  };

  public shared ({ caller }) func updateAvatar(avatar : Storage.ExternalBlob) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let profile = switch (users.get(caller)) {
      case (?p) {
        if (p.isBanned) { Runtime.trap("Account is banned") };
        p;
      };
      case null { Runtime.trap("User not found: register first") };
    };
    users.add(caller, { profile with avatar = ?avatar });
  };

  // ── Follow / Unfollow ─────────────────────────────────────────────────────

  public shared ({ caller }) func followUser(target : Common.UserId) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let profile = switch (users.get(caller)) {
      case (?p) {
        if (p.isBanned) { Runtime.trap("Account is banned") };
        p;
      };
      case null { Runtime.trap("User not found: register first") };
    };
    ignore profile;
    UserLib.followUser(users, follows, caller, target);
  };

  public shared ({ caller }) func unfollowUser(target : Common.UserId) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let profile = switch (users.get(caller)) {
      case (?p) {
        if (p.isBanned) { Runtime.trap("Account is banned") };
        p;
      };
      case null { Runtime.trap("User not found: register first") };
    };
    ignore profile;
    UserLib.unfollowUser(users, follows, caller, target);
  };

  public query func getFollowers(userId : Common.UserId) : async [Common.UserId] {
    UserLib.getFollowers(follows, userId);
  };

  public query func getFollowing(userId : Common.UserId) : async [Common.UserId] {
    UserLib.getFollowing(follows, userId);
  };

  // ── Subscription ──────────────────────────────────────────────────────────

  public shared ({ caller }) func upgradeToPro() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let profile = switch (users.get(caller)) {
      case (?p) {
        if (p.isBanned) { Runtime.trap("Account is banned") };
        p;
      };
      case null { Runtime.trap("User not found: register first") };
    };
    ignore profile;
    UserLib.upgradeToPro(users, caller);
  };

  public query ({ caller }) func getSubscriptionStatus() : async Types.SubscriptionTier {
    UserLib.getSubscriptionStatus(users, caller);
  };

  // ── Admin ─────────────────────────────────────────────────────────────────

  public query ({ caller }) func adminGetUsers() : async [Types.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    UserLib.adminGetUsers(users);
  };

  public shared ({ caller }) func adminFlagUser(targetId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    UserLib.adminFlagUser(users, targetId);
  };

  public shared ({ caller }) func adminBanUser(targetId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    UserLib.adminBanUser(users, targetId);
  };
};
