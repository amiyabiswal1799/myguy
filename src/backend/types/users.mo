import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type SubscriptionTier = {
    #free;
    #pro;
  };

  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    bio : Text;
    avatar : ?Storage.ExternalBlob;
    followersCount : Nat;
    followingCount : Nat;
    tier : SubscriptionTier;
    isAdmin : Bool;
    isFlagged : Bool;
    isBanned : Bool;
    createdAt : Common.Timestamp;
  };

  // Shared-safe input for profile creation/update (no ExternalBlob for mutations)
  public type RegisterInput = {
    name : Text;
    bio : Text;
  };

  public type UpdateProfileInput = {
    name : Text;
    bio : Text;
  };
};
