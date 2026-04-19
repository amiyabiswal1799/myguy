import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "../types/common";
import UserTypes "../types/users";
import Types "../types/billing";

module {
  /// Validate that Stripe is configured, trapping otherwise.
  public func requireConfig(config : ?Types.StripeConfiguration) : Types.StripeConfiguration {
    switch (config) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?cfg) { cfg };
    };
  };

  /// Create a Stripe checkout session for the Pro tier.
  public func createProCheckout(
    config : Types.StripeConfiguration,
    caller : Common.UserId,
    successUrl : Text,
    cancelUrl : Text,
    transform : OutCall.Transform,
  ) : async Text {
    await Stripe.createCheckoutSession(config, caller, [Types.ProItem], successUrl, cancelUrl, transform);
  };

  /// Retrieve the status of a Stripe checkout session.
  public func getSessionStatus(
    config : Types.StripeConfiguration,
    sessionId : Text,
    transform : OutCall.Transform,
  ) : async Types.StripeSessionStatus {
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  /// Upgrade a user to Pro tier given the completed session's user principal text.
  /// Traps if the user is not found.
  public func applyProUpgrade(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    principalText : Text,
  ) : () {
    let userId = Principal.fromText(principalText);
    switch (users.get(userId)) {
      case (null) { Runtime.trap("User not found") };
      case (?profile) {
        users.add(userId, { profile with tier = #pro });
      };
    };
  };
};
