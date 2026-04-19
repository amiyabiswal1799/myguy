import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { AuthGuard } from "../components/AuthGuard";
import { SubscriptionBadge } from "../components/SubscriptionBadge";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  createCheckoutSession,
  getStripeSessionStatus,
  getSubscriptionStatus,
  isStripeConfigured,
  upgradeToPro,
} from "../lib/backend";
import { SubscriptionTier } from "../lib/types";

const FREE_FEATURES = [
  "10 AI messages per day",
  "1 AI companion",
  "Social feed access",
  "Basic personality types",
];

const PRO_FEATURES = [
  "Unlimited AI messages",
  "3 AI companions",
  "All 4 personality types",
  "Long-term memory & context",
  "Priority AI responses",
  "Advanced customization",
];

function useStripeReturn(onSuccess: () => void) {
  const { actor } = useBackend();
  const hasPolled = useRef(false);

  useEffect(() => {
    if (hasPolled.current) return;

    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const sessionId = params.get("session_id");

    if (success !== "true" || !sessionId || !actor) return;

    hasPolled.current = true;

    // Clean up URL without reload
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);

    let attempts = 0;
    const maxAttempts = 10;

    const poll = async () => {
      try {
        const status = await getStripeSessionStatus(actor, sessionId);
        if (status.__kind__ === "completed") {
          await upgradeToPro(actor);
          onSuccess();
          toast.success("You're now on Pro! Enjoy unlimited AI messages.", {
            duration: 6000,
          });
          return;
        }
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 2000);
        } else {
          toast.error(
            "Could not verify payment. Please contact support if charged.",
          );
        }
      } catch {
        attempts++;
        if (attempts < maxAttempts) setTimeout(poll, 3000);
      }
    };

    poll();
  }, [actor, onSuccess]);
}

function PricingContent() {
  const { actor } = useBackend();
  const { isAuthenticated } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const queryClient = useQueryClient();

  const { data: stripeEnabled, isLoading: stripeLoading } = useQuery({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return isStripeConfigured(actor);
    },
    enabled: !!actor,
    staleTime: 60_000,
  });

  const { data: currentTier, isLoading: tierLoading } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      if (!actor) return SubscriptionTier.free;
      return getSubscriptionStatus(actor);
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 30_000,
  });

  const isPro =
    currentTier === SubscriptionTier.pro ||
    profile?.tier === SubscriptionTier.pro;

  const onStripeSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  useStripeReturn(onStripeSuccess);

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const successUrl = `${window.location.origin}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      return createCheckoutSession(
        actor,
        [
          {
            productName: "MyGuy Pro",
            productDescription:
              "Unlimited AI companion messages and advanced features",
            priceInCents: 999n,
            currency: "usd",
            quantity: 1n,
          },
        ],
        successUrl,
        cancelUrl,
      );
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => toast.error("Could not start checkout. Please try again."),
  });

  const isPageLoading = profileLoading || tierLoading || stripeLoading;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-background"
      data-ocid="pricing.page"
    >
      {/* Page Header */}
      <div className="bg-card border-b border-border px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
              Choose your plan
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Start free, upgrade when you need more.
            </p>

            {/* Current plan indicator */}
            {isPageLoading ? (
              <Skeleton className="h-6 w-40 mx-auto mt-4" />
            ) : (
              <div
                className="flex items-center justify-center gap-2 mt-4"
                data-ocid="pricing.current_plan"
              >
                <span className="text-sm text-muted-foreground">
                  Current plan:
                </span>
                <SubscriptionBadge
                  tier={isPro ? SubscriptionTier.pro : SubscriptionTier.free}
                  size="md"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-7 flex flex-col"
            data-ocid="pricing.free_card"
          >
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <SubscriptionBadge tier={SubscriptionTier.free} size="md" />
                {!isPro && isAuthenticated && (
                  <Badge
                    variant="secondary"
                    className="text-xs font-body"
                    data-ocid="pricing.current_plan_badge"
                  >
                    Current plan
                  </Badge>
                )}
              </div>
              <div className="flex items-end gap-1 mt-2">
                <span className="font-display font-bold text-4xl">$0</span>
                <span className="text-muted-foreground text-sm mb-1.5">
                  /month
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Perfect for getting started
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-6">
              {FREE_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              disabled
              className="w-full opacity-60"
              data-ocid="pricing.free_button"
            >
              {!isPro ? "Current plan" : "Free plan"}
            </Button>
          </motion.div>

          {/* Pro Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-primary/50 rounded-2xl p-7 flex flex-col relative overflow-hidden shadow-card-elevated"
            data-ocid="pricing.pro_card"
          >
            {/* Top glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-primary/[0.03] pointer-events-none rounded-2xl" />

            <div className="relative mb-5">
              <div className="flex items-center justify-between mb-3">
                <SubscriptionBadge tier={SubscriptionTier.pro} size="md" />
                <div className="flex items-center gap-2">
                  {isPro && (
                    <Badge
                      className="text-xs font-body bg-primary/20 text-primary border border-primary/40"
                      data-ocid="pricing.pro_active_badge"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      You're on Pro
                    </Badge>
                  )}
                  {!isPro && (
                    <Badge
                      className="text-xs font-body bg-primary/20 text-primary border border-primary/40"
                      data-ocid="pricing.most_popular_badge"
                    >
                      Most Popular
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-end gap-1 mt-2">
                <span className="font-display font-bold text-4xl">$9.99</span>
                <span className="text-muted-foreground text-sm mb-1.5">
                  /month
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Everything you need to connect
              </p>
            </div>

            <ul className="relative space-y-3 flex-1 mb-6">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              {stripeEnabled === false ? (
                <div
                  className="w-full text-center text-sm text-muted-foreground py-2.5 border border-border rounded-lg bg-muted/40"
                  data-ocid="pricing.coming_soon"
                >
                  Coming soon
                </div>
              ) : isPro ? (
                <Button
                  variant="outline"
                  disabled
                  className="w-full border-primary/30 text-primary opacity-70"
                  data-ocid="pricing.upgrade_button"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  You're on Pro
                </Button>
              ) : (
                <Button
                  onClick={() => checkoutMutation.mutate()}
                  disabled={
                    checkoutMutation.isPending ||
                    !isAuthenticated ||
                    stripeLoading
                  }
                  className="w-full transition-smooth"
                  data-ocid="pricing.upgrade_button"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {checkoutMutation.isPending
                    ? "Redirecting to checkout..."
                    : "Upgrade to Pro"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ / trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8"
          data-ocid="pricing.trust_line"
        >
          Cancel anytime. Payments securely processed by Stripe.
        </motion.p>
      </div>
    </div>
  );
}

export function PricingPage() {
  return (
    <AuthGuard>
      <PricingContent />
    </AuthGuard>
  );
}
