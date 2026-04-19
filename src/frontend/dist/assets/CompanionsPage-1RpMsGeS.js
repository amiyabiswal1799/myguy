import { f as createLucideIcon, j as jsxRuntimeExports, e as cn, b as useBackend, h as useProfile, i as useQueryClient, a as useNavigate, r as reactExports, c as useQuery, v as useMutation, k as SubscriptionTier, B as Bot, d as PERSONALITY_CONFIGS, M as MessageCircle, U as PersonalityType, m as ue, W as createCompanion, S as Sparkles, X as deleteCompanion, g as getCompanions } from "./index-Dt8hDOdi.js";
import { R as Root, C as Content, a as Close, T as Title, D as Description, P as Portal, O as Overlay, A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DXDGoKdl.js";
import { B as Button } from "./button-pf9Upesm.js";
import { L as Label, I as Input } from "./label-D7bd6oay.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { T as Textarea } from "./textarea-D9sDvIRh.js";
import { A as AnimatePresence, C as Crown, a as PersonalityCardBadge } from "./PersonalityBadge-CSKKjmBb.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
import "./index-bC7JCErz.js";
import "./index-JjWPR4Ah.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const FREE_TIER_COMPANION_LIMIT = 1;
function PersonalitySelectorCard({
  type,
  selected,
  onClick
}) {
  const config = PERSONALITY_CONFIGS[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `create_companion.personality_${type}`,
      className: "relative flex flex-col items-center gap-2 rounded-xl p-4 border transition-smooth text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      style: {
        borderColor: selected ? config.color : void 0,
        backgroundColor: selected ? `${config.color}18` : void 0
      },
      "aria-pressed": selected,
      children: [
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-2 right-2 h-2 w-2 rounded-full",
            style: { backgroundColor: config.color }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
            style: { backgroundColor: `${config.color}20`, color: config.color },
            children: config.label[0]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-display font-semibold text-sm",
            style: { color: config.color },
            children: config.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-snug", children: config.description })
      ]
    }
  );
}
function CreateCompanionModal({
  open,
  onClose,
  companionCount,
  tier
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [personality, setPersonality] = reactExports.useState(
    PersonalityType.friendly
  );
  const [traits, setTraits] = reactExports.useState("");
  const isFreeTier = !tier || tier === SubscriptionTier.free;
  const atLimit = isFreeTier && companionCount >= FREE_TIER_COMPANION_LIMIT;
  const mutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return createCompanion(actor, input);
    },
    onSuccess: (companion) => {
      queryClient.invalidateQueries({ queryKey: ["companions"] });
      ue.success(`${companion.name} is ready to chat!`);
      onClose();
      setName("");
      setTraits("");
      navigate({
        to: "/companions/$companionId/chat",
        params: { companionId: companion.id.toString() }
      });
    },
    onError: () => ue.error("Failed to create companion. Please try again.")
  });
  const handleCreate = () => {
    if (!name.trim()) {
      ue.error("Give your companion a name");
      return;
    }
    mutation.mutate({
      name: name.trim(),
      personalityType: personality,
      customTraits: traits.trim()
    });
  };
  const handleClose = () => {
    if (mutation.isPending) return;
    onClose();
    setName("");
    setTraits("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-popover border-border max-w-lg",
      "data-ocid": "create_companion.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
            "Create Your Companion"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Customize your AI companion's personality and traits." })
        ] }),
        atLimit ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-12 w-12 text-[oklch(var(--personality-mentor))]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: "Upgrade to Pro" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Free accounts can only have 1 companion. Upgrade to create unlimited companions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: handleClose,
                "data-ocid": "create_companion.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: () => {
                  handleClose();
                  navigate({ to: "/pricing" });
                },
                "data-ocid": "create_companion.upgrade_button",
                children: "Upgrade to Pro"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "companion-name", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "companion-name",
                placeholder: "e.g. Alex, Luna, Jordan...",
                value: name,
                onChange: (e) => setName(e.target.value),
                maxLength: 40,
                "data-ocid": "create_companion.name_input",
                onKeyDown: (e) => e.key === "Enter" && handleCreate()
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Personality" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.values(PersonalityType).map(
              (type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                PersonalitySelectorCard,
                {
                  type,
                  selected: personality === type,
                  onClick: () => setPersonality(type)
                },
                type
              )
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "companion-traits", children: [
              "Custom Traits",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "companion-traits",
                placeholder: "e.g. loves hiking, speaks Spanish, has a dry sense of humor...",
                value: traits,
                onChange: (e) => setTraits(e.target.value),
                rows: 3,
                maxLength: 300,
                "data-ocid": "create_companion.traits_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: handleClose,
                disabled: mutation.isPending,
                "data-ocid": "create_companion.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleCreate,
                disabled: mutation.isPending || !name.trim(),
                "data-ocid": "create_companion.submit_button",
                children: mutation.isPending ? "Creating…" : "Create Companion"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function CompanionCard({
  companion,
  index,
  onDelete
}) {
  var _a;
  const navigate = useNavigate();
  const config = PERSONALITY_CONFIGS[companion.personalityType];
  const date = new Date(
    Number(companion.createdAt / 1000000n)
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { delay: index * 0.07, duration: 0.3 },
      "data-ocid": `companions.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group relative flex flex-col gap-4 p-5 bg-card border-border hover:border-muted-foreground/30 transition-smooth shadow-card hover:shadow-card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold flex-shrink-0",
                style: {
                  backgroundColor: `${config.color}20`,
                  color: config.color
                },
                "aria-hidden": "true",
                children: (_a = companion.name[0]) == null ? void 0 : _a.toUpperCase()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base truncate", children: companion.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PersonalityCardBadge,
                {
                  type: companion.personalityType,
                  className: "mt-1"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onDelete(companion.id);
              },
              "data-ocid": `companions.delete_button.${index + 1}`,
              className: "opacity-0 group-hover:opacity-100 h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus-visible:opacity-100 flex-shrink-0",
              "aria-label": `Delete ${companion.name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] }),
        companion.customTraits && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: companion.customTraits }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => navigate({
                to: "/companions/$companionId/chat",
                params: { companionId: companion.id.toString() }
              }),
              "data-ocid": `companions.chat_button.${index + 1}`,
              className: "h-7 px-3 text-xs gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
                "Chat"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function CompanionsContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: companions = [], isLoading } = useQuery({
    queryKey: ["companions"],
    queryFn: async () => {
      if (!actor) return [];
      return getCompanions(actor);
    },
    enabled: !!actor && !actorLoading,
    staleTime: 3e4
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return deleteCompanion(actor, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companions"] });
      ue.success("Companion removed");
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to delete companion")
  });
  const tier = profile == null ? void 0 : profile.tier;
  const isFreeTier = !tier || tier === SubscriptionTier.free;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 h-full", "data-ocid": "companions.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-5 w-5 text-primary" }),
          "My Companions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          isLoading ? "…" : `${companions.length} companion${companions.length !== 1 ? "s" : ""}`,
          isFreeTier && ` · Free tier (${FREE_TIER_COMPANION_LIMIT} max)`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowCreate(true),
          "data-ocid": "companions.new_companion_button",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "New Companion"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      (isLoading || actorLoading) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "companions.loading_state",
          children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex flex-col gap-4 bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1 border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-md" })
            ] })
          ] }, k))
        }
      ),
      !isLoading && !actorLoading && companions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "flex flex-col items-center justify-center py-24 gap-6 text-center",
          "data-ocid": "companions.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 flex items-center justify-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-10 w-10" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl", children: "No companions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed", children: "Create your first AI companion and start a conversation. Choose a personality that fits your vibe." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                onClick: () => setShowCreate(true),
                "data-ocid": "companions.empty_create_button",
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                  "Create Your First Companion"
                ]
              }
            )
          ]
        }
      ),
      !isLoading && companions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "companions.list",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: companions.map((companion, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CompanionCard,
            {
              companion,
              index,
              onDelete: (id) => setDeleteTarget(id)
            },
            companion.id.toString()
          )) })
        }
      ),
      isFreeTier && companions.length >= FREE_TIER_COMPANION_LIMIT && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "mt-6 rounded-xl border border-[oklch(var(--personality-mentor)/0.4)] bg-[oklch(var(--personality-mentor)/0.06)] p-4 flex items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-[oklch(var(--personality-mentor))] flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Free tier — 1 companion limit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upgrade to Pro for unlimited companions and AI messages." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => navigate({ to: "/pricing" }),
                "data-ocid": "companions.upgrade_banner_button",
                className: "flex-shrink-0 border-[oklch(var(--personality-mentor)/0.5)] text-[oklch(var(--personality-mentor))]",
                children: "Upgrade"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCompanionModal,
      {
        open: showCreate,
        onClose: () => setShowCreate(false),
        companionCount: companions.length,
        tier
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteTarget !== null,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialogContent,
          {
            className: "bg-popover border-border",
            "data-ocid": "companions.delete_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete companion?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete your companion and all conversation history. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    "data-ocid": "companions.delete_cancel_button",
                    onClick: () => setDeleteTarget(null),
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    "data-ocid": "companions.delete_confirm_button",
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: () => deleteTarget !== null && deleteMutation.mutate(deleteTarget),
                    disabled: deleteMutation.isPending,
                    children: deleteMutation.isPending ? "Deleting…" : "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function CompanionsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanionsContent, {}) });
}
export {
  CompanionsPage
};
