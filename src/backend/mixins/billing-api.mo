import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import UserTypes "../types/users";
import Types "../types/billing";
import BillingLib "../lib/billing";

mixin (
  accessControlState : AccessControl.AccessControlState,
  stripeConfig : { var value : ?Types.StripeConfiguration },
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  transform : OutCall.Transform,
) {
  /// Returns true when Stripe credentials have been stored by an admin.
  public query func isStripeConfigured() : async Bool {
    stripeConfig.value != null;
  };

  /// Admin-only: store Stripe secret key and allowed countries.
  public shared ({ caller }) func setStripeConfiguration(config : Types.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admins only");
    };
    stripeConfig.value := ?config;
  };

  /// Create a Stripe checkout session for the Pro tier upgrade.
  /// Returns the raw Stripe JSON (frontend must parse the `url` field and redirect).
  public shared ({ caller }) func createCheckoutSession(successUrl : Text, cancelUrl : Text) : async Text {
    let cfg = BillingLib.requireConfig(stripeConfig.value);
    await BillingLib.createProCheckout(cfg, caller, successUrl, cancelUrl, transform);
  };

  /// Check whether a Stripe checkout session completed successfully.
  /// Frontend polls this after returning from Stripe's hosted page.
  public func getStripeSessionStatus(sessionId : Text) : async Types.StripeSessionStatus {
    let cfg = BillingLib.requireConfig(stripeConfig.value);
    let status = await BillingLib.getSessionStatus(cfg, sessionId, transform);
    // On completion, immediately upgrade the paying user in the users map
    switch (status) {
      case (#completed({ userPrincipal = ?principalText })) {
        BillingLib.applyProUpgrade(users, principalText);
      };
      case (_) {};
    };
    status;
  };
};
