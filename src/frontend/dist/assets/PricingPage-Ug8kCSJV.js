import { f as createLucideIcon, j as jsxRuntimeExports, b as useBackend, u as useAuth, h as useProfile, i as useQueryClient, c as useQuery, k as SubscriptionTier, v as useMutation, l as SubscriptionBadge, S as Sparkles, Z as Zap, r as reactExports, m as ue, z as createCheckoutSession, A as getStripeSessionStatus, C as upgradeToPro, D as isStripeConfigured, o as getSubscriptionStatus } from "./index-Dt8hDOdi.js";
import { B as Badge } from "./badge-CSiTtbeu.js";
import { B as Button } from "./button-pf9Upesm.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
const FREE_FEATURES = [
  "10 AI messages per day",
  "1 AI companion",
  "Social feed access",
  "Basic personality types"
];
const PRO_FEATURES = [
  "Unlimited AI messages",
  "3 AI companions",
  "All 4 personality types",
  "Long-term memory & context",
  "Priority AI responses",
  "Advanced customization"
];
function useStripeReturn(onSuccess) {
  const { actor } = useBackend();
  const hasPolled = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (hasPolled.current) return;
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const sessionId = params.get("session_id");
    if (success !== "true" || !sessionId || !actor) return;
    hasPolled.current = true;
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
          ue.success("You're now on Pro! Enjoy unlimited AI messages.", {
            duration: 6e3
          });
          return;
        }
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 2e3);
        } else {
          ue.error(
            "Could not verify payment. Please contact support if charged."
          );
        }
      } catch {
        attempts++;
        if (attempts < maxAttempts) setTimeout(poll, 3e3);
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
    staleTime: 6e4
  });
  const { data: currentTier, isLoading: tierLoading } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      if (!actor) return SubscriptionTier.free;
      return getSubscriptionStatus(actor);
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 3e4
  });
  const isPro = currentTier === SubscriptionTier.pro || (profile == null ? void 0 : profile.tier) === SubscriptionTier.pro;
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
            productDescription: "Unlimited AI companion messages and advanced features",
            priceInCents: 999n,
            currency: "usd",
            quantity: 1n
          }
        ],
        successUrl,
        cancelUrl
      );
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => ue.error("Could not start checkout. Please try again.")
  });
  const isPageLoading = profileLoading || tierLoading || stripeLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-[calc(100vh-4rem)] bg-background",
      "data-ocid": "pricing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl mb-2", children: "Choose your plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base md:text-lg", children: "Start free, upgrade when you need more." }),
              isPageLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 mx-auto mt-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-center gap-2 mt-4",
                  "data-ocid": "pricing.current_plan",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current plan:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SubscriptionBadge,
                      {
                        tier: isPro ? SubscriptionTier.pro : SubscriptionTier.free,
                        size: "md"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "bg-card border border-border rounded-2xl p-7 flex flex-col",
                "data-ocid": "pricing.free_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, { tier: SubscriptionTier.free, size: "md" }),
                      !isPro && isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs font-body",
                          "data-ocid": "pricing.current_plan_badge",
                          children: "Current plan"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl", children: "$0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1.5", children: "/month" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Perfect for getting started" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 flex-1 mb-6", children: FREE_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                      ]
                    },
                    f
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      disabled: true,
                      className: "w-full opacity-60",
                      "data-ocid": "pricing.free_button",
                      children: !isPro ? "Current plan" : "Free plan"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.1 },
                className: "bg-card border border-primary/50 rounded-2xl p-7 flex flex-col relative overflow-hidden shadow-card-elevated",
                "data-ocid": "pricing.pro_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/[0.03] pointer-events-none rounded-2xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, { tier: SubscriptionTier.pro, size: "md" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        isPro && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            className: "text-xs font-body bg-primary/20 text-primary border border-primary/40",
                            "data-ocid": "pricing.pro_active_badge",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1" }),
                              "You're on Pro"
                            ]
                          }
                        ),
                        !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: "text-xs font-body bg-primary/20 text-primary border border-primary/40",
                            "data-ocid": "pricing.most_popular_badge",
                            children: "Most Popular"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl", children: "$9.99" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1.5", children: "/month" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Everything you need to connect" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "relative space-y-3 flex-1 mb-6", children: PRO_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
                  ] }, f)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: stripeEnabled === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full text-center text-sm text-muted-foreground py-2.5 border border-border rounded-lg bg-muted/40",
                      "data-ocid": "pricing.coming_soon",
                      children: "Coming soon"
                    }
                  ) : isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      disabled: true,
                      className: "w-full border-primary/30 text-primary opacity-70",
                      "data-ocid": "pricing.upgrade_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                        "You're on Pro"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => checkoutMutation.mutate(),
                      disabled: checkoutMutation.isPending || !isAuthenticated || stripeLoading,
                      className: "w-full transition-smooth",
                      "data-ocid": "pricing.upgrade_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 mr-2" }),
                        checkoutMutation.isPending ? "Redirecting to checkout..." : "Upgrade to Pro"
                      ]
                    }
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.4, delay: 0.3 },
              className: "text-center text-xs text-muted-foreground mt-8",
              "data-ocid": "pricing.trust_line",
              children: "Cancel anytime. Payments securely processed by Stripe."
            }
          )
        ] })
      ]
    }
  );
}
function PricingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingContent, {}) });
}
export {
  PricingPage
};
