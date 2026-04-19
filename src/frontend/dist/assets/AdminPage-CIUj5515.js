import { f as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, b as useBackend, u as useAuth, h as useProfile, a as useNavigate, i as useQueryClient, c as useQuery, v as useMutation, k as SubscriptionTier, Y as Shield, l as SubscriptionBadge, m as ue, $ as adminBanUser, a0 as adminFlagUser, a1 as setOpenAiApiKey, a2 as setStripeConfiguration, Q as adminGetUsers } from "./index-Dt8hDOdi.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DXDGoKdl.js";
import { B as Badge } from "./badge-CSiTtbeu.js";
import { B as Button } from "./button-pf9Upesm.js";
import { I as Input, L as Label } from "./label-D7bd6oay.js";
import { P as Primitive } from "./index-JjWPR4Ah.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { U as Users } from "./users-Dw9OmgPX.js";
import "./index-bC7JCErz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ?? "bg-primary/10"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold leading-none", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
    ] })
  ] });
}
function UserRow({
  user,
  index,
  onFlag,
  onBan,
  flagPending,
  banPending
}) {
  const createdAt = new Date(
    Number(user.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 py-3 border-b border-border last:border-0 flex items-center gap-3 hover:bg-muted/20 transition-colors",
      "data-ocid": `admin.user.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden", children: user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: user.avatar.getDirectURL(),
            alt: user.name,
            className: "h-full w-full object-cover"
          }
        ) : initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate max-w-[120px]", children: user.name }),
            user.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[9px] px-1 py-0 border-primary/40 text-primary",
                children: "ADMIN"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono truncate", children: user.id.toText() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, { tier: user.tier, size: "sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-1.5 flex-shrink-0", children: [
          user.isFlagged ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/25", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-2.5 w-2.5" }),
            " Flagged"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-muted-foreground border border-border", children: "Clean" }),
          user.isBanned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-destructive/15 text-destructive border border-destructive/25", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-2.5 w-2.5" }),
            " Banned"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden lg:block text-[11px] text-muted-foreground flex-shrink-0 w-24 text-right", children: createdAt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: `h-8 w-8 p-0 transition-smooth ${user.isFlagged ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10" : "text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10"}`,
              onClick: () => onFlag(user.id),
              disabled: flagPending,
              "aria-label": user.isFlagged ? "Unflag user" : "Flag user",
              "data-ocid": `admin.flag_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: `h-8 w-8 p-0 transition-smooth ${user.isBanned ? "text-destructive hover:text-destructive/80 hover:bg-destructive/10" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"}`,
              onClick: () => onBan(user),
              disabled: banPending,
              "aria-label": user.isBanned ? "Unban user" : "Ban user",
              "data-ocid": `admin.ban_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function ConfigSection({
  actor
}) {
  const [openAiKey, setOpenAiKey] = reactExports.useState("");
  const [showOpenAi, setShowOpenAi] = reactExports.useState(false);
  const [stripeSecret, setStripeSecret] = reactExports.useState("");
  const [showStripeSecret, setShowStripeSecret] = reactExports.useState(false);
  const openAiMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await setOpenAiApiKey(actor, openAiKey.trim());
    },
    onSuccess: () => {
      ue.success("OpenAI API key saved");
      setOpenAiKey("");
    },
    onError: () => ue.error("Failed to save OpenAI API key")
  });
  const stripeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await setStripeConfiguration(actor, {
        secretKey: stripeSecret.trim(),
        allowedCountries: [
          "US",
          "GB",
          "CA",
          "AU",
          "DE",
          "FR",
          "NL",
          "SE",
          "NO"
        ]
      });
    },
    onSuccess: () => {
      ue.success("Stripe configuration saved");
      setStripeSecret("");
    },
    onError: () => ue.error("Failed to save Stripe configuration")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": "admin.config.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm", children: "API Configuration" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-3.5 w-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "OpenAI API Key" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used for AI companion responses. Key is encrypted at rest." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: showOpenAi ? "text" : "password",
                    placeholder: "sk-proj-...",
                    value: openAiKey,
                    onChange: (e) => setOpenAiKey(e.target.value),
                    className: "pr-10 font-mono text-sm bg-input border-border",
                    "data-ocid": "admin.openai_key.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    onClick: () => setShowOpenAi((v) => !v),
                    "aria-label": showOpenAi ? "Hide key" : "Show key",
                    "data-ocid": "admin.openai_key.toggle",
                    children: showOpenAi ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => openAiMutation.mutate(),
                  disabled: !openAiKey.trim() || openAiMutation.isPending,
                  size: "sm",
                  className: "gap-1.5",
                  "data-ocid": "admin.openai_key.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                    "Save"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-3.5 w-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Stripe Configuration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Required for Pro subscription payments. Use live keys in production." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Secret Key" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: showStripeSecret ? "text" : "password",
                      placeholder: "sk_live_...",
                      value: stripeSecret,
                      onChange: (e) => setStripeSecret(e.target.value),
                      className: "pr-10 font-mono text-sm bg-input border-border",
                      "data-ocid": "admin.stripe_secret.input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      onClick: () => setShowStripeSecret((v) => !v),
                      "aria-label": showStripeSecret ? "Hide key" : "Show key",
                      "data-ocid": "admin.stripe_secret.toggle",
                      children: showStripeSecret ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => stripeMutation.mutate(),
                    disabled: !stripeSecret.trim() || stripeMutation.isPending,
                    size: "sm",
                    className: "gap-1.5",
                    "data-ocid": "admin.stripe.save_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                      "Save"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function AdminContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [banTarget, setBanTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (profile && !profile.isAdmin) {
      navigate({ to: "/feed" });
    }
  }, [profile, navigate]);
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin_users"],
    queryFn: async () => {
      if (!actor) return [];
      return adminGetUsers(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!(profile == null ? void 0 : profile.isAdmin)
  });
  const flagMutation = useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      return adminFlagUser(actor, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success("User flag toggled");
    },
    onError: () => ue.error("Could not flag user")
  });
  const banMutation = useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      return adminBanUser(actor, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success("User ban toggled");
      setBanTarget(null);
    },
    onError: () => {
      ue.error("Could not ban user");
      setBanTarget(null);
    }
  });
  const filtered = reactExports.useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );
  const totalPro = users.filter((u) => u.tier === SubscriptionTier.pro).length;
  const totalBanned = users.filter((u) => u.isBanned).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl leading-none", children: "Admin Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage users and platform configuration" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
            "data-ocid": "admin.stats.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Users", value: users.length, icon: Users }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Pro Users",
                  value: totalPro,
                  icon: Shield,
                  accent: "bg-primary/10"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Banned Users",
                  value: totalBanned,
                  icon: Ban,
                  accent: "bg-destructive/10"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            "data-ocid": "admin.users.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-sm flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
                  "Users"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search by name…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "h-8 text-sm pl-3 pr-3 bg-input border-border",
                    "data-ocid": "admin.search.input"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:grid grid-cols-[2.25rem_1fr_5rem_7rem_7rem_1fr_6.5rem] gap-3 px-4 py-2 border-b border-border bg-muted/30", children: ["", "User", "Tier", "Flag", "Ban", "Joined", "Actions"].map(
                (col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium",
                    children: col
                  },
                  col
                )
              ) }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-4 py-3 border-b border-border last:border-0 flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 hidden sm:block" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-7" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-7" })
                  ]
                },
                i
              )) }),
              !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-12 text-muted-foreground",
                  "data-ocid": "admin.empty_state",
                  children: search ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                      'No users match "',
                      search,
                      '"'
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-primary mt-1 hover:underline",
                        onClick: () => setSearch(""),
                        "data-ocid": "admin.clear_search.button",
                        children: "Clear search"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No users found." })
                }
              ),
              !isLoading && filtered.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserRow,
                {
                  user,
                  index: i + 1,
                  onFlag: (id) => flagMutation.mutate(id),
                  onBan: (u) => setBanTarget(u),
                  flagPending: flagMutation.isPending,
                  banPending: banMutation.isPending
                },
                user.id.toText()
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigSection, { actor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!banTarget,
            onOpenChange: (open) => !open && setBanTarget(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.ban.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: (banTarget == null ? void 0 : banTarget.isBanned) ? "Unban user?" : "Ban user?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: (banTarget == null ? void 0 : banTarget.isBanned) ? `This will restore access for ${banTarget == null ? void 0 : banTarget.name}. They'll be able to log in again.` : `This will block ${banTarget == null ? void 0 : banTarget.name} from using the platform. You can reverse this at any time.` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.ban.cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: (banTarget == null ? void 0 : banTarget.isBanned) ? "" : "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                    onClick: () => banTarget && banMutation.mutate(banTarget.id),
                    disabled: banMutation.isPending,
                    "data-ocid": "admin.ban.confirm_button",
                    children: banMutation.isPending ? "Processing…" : (banTarget == null ? void 0 : banTarget.isBanned) ? "Unban" : "Ban User"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function AdminPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminContent, {}) });
}
export {
  AdminPage
};
