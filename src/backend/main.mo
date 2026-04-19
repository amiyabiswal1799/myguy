import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "types/common";
import UserTypes "types/users";
import BillingTypes "types/billing";
import CompanionTypes "types/companions";
import SocialTypes "types/social";
import UsersMixin "mixins/users-api";
import CompanionsMixin "mixins/companions-api";
import SocialMixin "mixins/social-api";

actor {
  // -- Authorization --
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // -- Object Storage --
  include MixinObjectStorage();

  // -- HTTP Transform (required for outcalls and Stripe) --
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // -- Users state --
  let users = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let follows = Map.empty<Common.UserId, Set.Set<Common.UserId>>();

  include UsersMixin(accessControlState, users, follows);

  // -- Billing (Stripe) -- declared directly in actor per platform requirement --
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admins only");
    };
    stripeConfiguration := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let cfg = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(cfg, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let cfg = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    let status = await Stripe.getSessionStatus(cfg, sessionId, transform);
    // On completion, upgrade user to Pro
    switch (status) {
      case (#completed({ userPrincipal = ?principalText })) {
        let userId = Principal.fromText(principalText);
        switch (users.get(userId)) {
          case (?profile) { users.add(userId, { profile with tier = #pro }) };
          case null {};
        };
      };
      case (_) {};
    };
    status;
  };

  // -- Companions state --
  let companions = Map.empty<Common.CompanionId, CompanionTypes.AICompanion>();
  let companionMessages = Map.empty<Common.CompanionId, List.List<CompanionTypes.Message>>();
  // aiUsage key = "principalText:daysSinceEpoch" for implicit daily reset
  let aiUsage = Map.empty<Text, Nat>();
  // Mutable counter wrappers
  let nextCompanionId = object { public var value : Nat = 0 };
  let nextMessageId = object { public var value : Nat = 0 };
  let openAiApiKey = object { public var value : Text = "" };

  include CompanionsMixin(accessControlState, users, companions, companionMessages, aiUsage, nextCompanionId, nextMessageId, openAiApiKey, transform);

  // -- Social state --
  let posts = Map.empty<Common.PostId, SocialTypes.Post>();
  let postComments = Map.empty<Common.PostId, List.List<SocialTypes.Comment>>();
  let postLikes = Map.empty<Common.PostId, Set.Set<Common.UserId>>();
  let nextPostId = object { public var value : Nat = 0 };
  let nextCommentId = object { public var value : Nat = 0 };

  include SocialMixin(accessControlState, posts, postComments, postLikes, follows, users, nextPostId, nextCommentId);
};
