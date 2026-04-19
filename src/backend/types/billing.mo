import Stripe "mo:caffeineai-stripe/stripe";

module {
  // Re-export Stripe types for convenience across the codebase
  public type StripeConfiguration = Stripe.StripeConfiguration;
  public type ShoppingItem = Stripe.ShoppingItem;
  public type StripeSessionStatus = Stripe.StripeSessionStatus;

  // Pro tier upgrade checkout item — single product definition
  public let ProItem : ShoppingItem = {
    currency = "usd";
    productName = "MyGuy Pro";
    productDescription = "Unlimited AI messages and up to 3 companions";
    priceInCents = 999; // $9.99/month
    quantity = 1;
  };
};
