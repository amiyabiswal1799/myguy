import { f as createLucideIcon, j as jsxRuntimeExports, s as useParams, a as useNavigate, b as useBackend, h as useProfile, i as useQueryClient, r as reactExports, c as useQuery, k as SubscriptionTier, v as useMutation, d as PERSONALITY_CONFIGS, B as Bot, m as ue, F as sendMessage, V as Variant_user_assistant, G as getCompanion, H as getMessages, p as getAIUsageCount } from "./index-Dt8hDOdi.js";
import { B as Button } from "./button-pf9Upesm.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { T as Textarea } from "./textarea-D9sDvIRh.js";
import { P as PersonalityBadge, A as AnimatePresence, C as Crown } from "./PersonalityBadge-CSKKjmBb.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const FREE_TIER_DAILY_LIMIT = 10;
const POLL_INTERVAL_MS = 2e3;
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.25 },
      className: "flex items-end gap-2 max-w-[75%]",
      "data-ocid": "chat.typing_indicator",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" })
        ] })
      ]
    }
  );
}
function MessageBubble({
  message,
  companionColor,
  index
}) {
  const isUser = message.role === Variant_user_assistant.user;
  const time = new Date(
    Number(message.timestamp / 1000000n)
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { delay: Math.min(index * 0.025, 0.25), duration: 0.25 },
      className: `flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full`,
      "data-ocid": `chat.message.${index + 1}`,
      children: [
        !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 text-xs font-bold",
            style: {
              backgroundColor: `${companionColor}20`,
              color: companionColor
            },
            "aria-hidden": "true",
            children: "AI"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex flex-col gap-1 ${isUser ? "items-end" : "items-start"} max-w-[75%] min-w-0`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${isUser ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-card-foreground rounded-bl-sm"}`,
                  children: message.content
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground px-1", children: time })
            ]
          }
        )
      ]
    }
  );
}
function UsageCounter({ used, limit }) {
  const pct = Math.min(used / limit * 100, 100);
  const remaining = Math.max(limit - used, 0);
  const isNearLimit = remaining <= 3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2 bg-muted/40 border-b border-border text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: "Daily AI messages" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-28 h-1.5 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-smooth",
        style: {
          width: `${pct}%`,
          backgroundColor: isNearLimit ? "oklch(var(--destructive))" : "oklch(var(--primary))"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: isNearLimit ? "text-destructive font-medium flex-shrink-0" : "text-muted-foreground flex-shrink-0",
        children: [
          used,
          "/",
          limit
        ]
      }
    ),
    remaining === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium flex-shrink-0", children: "Limit reached" })
  ] });
}
function UpgradeCTA() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-3 p-5 bg-card/60 border-t border-border backdrop-blur-sm text-center",
      "data-ocid": "chat.upgrade_cta",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-7 w-7 text-[oklch(var(--personality-mentor))]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm", children: "Daily limit reached" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "You've used all 10 free AI messages today. Upgrade to Pro for unlimited chats." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full max-w-xs gap-2",
            onClick: () => navigate({ to: "/pricing" }),
            "data-ocid": "chat.upgrade_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
              "Upgrade to Pro"
            ]
          }
        )
      ]
    }
  );
}
function CompanionChatContent() {
  var _a, _b;
  const { companionId } = useParams({
    from: "/authenticated/companions/$companionId/chat"
  });
  const navigate = useNavigate();
  const { actor, isFetching: actorLoading } = useBackend();
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = reactExports.useState("");
  const [isSending, setIsSending] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const companionIdBigInt = BigInt(companionId);
  const scrollToBottom = reactExports.useCallback(() => {
    var _a2;
    (_a2 = messagesEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, []);
  const { data: companion, isLoading: companionLoading } = useQuery({
    queryKey: ["companion", companionId],
    queryFn: async () => {
      if (!actor) return null;
      return getCompanion(actor, companionIdBigInt);
    },
    enabled: !!actor && !actorLoading,
    staleTime: 6e4
  });
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", companionId],
    queryFn: async () => {
      if (!actor) return [];
      return getMessages(actor, companionIdBigInt);
    },
    enabled: !!actor && !actorLoading,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 0
  });
  const { data: usageCount = 0n } = useQuery({
    queryKey: ["aiUsage"],
    queryFn: async () => {
      if (!actor) return 0n;
      return getAIUsageCount(actor);
    },
    enabled: !!actor && !actorLoading,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 0
  });
  const usedMessages = Number(usageCount);
  const tier = profile == null ? void 0 : profile.tier;
  const isFreeTier = !tier || tier === SubscriptionTier.free;
  const limitReached = isFreeTier && usedMessages >= FREE_TIER_DAILY_LIMIT;
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  const sendMutation = useMutation({
    mutationFn: async (content) => {
      if (!actor) throw new Error("Not connected");
      return sendMessage(actor, companionIdBigInt, content);
    },
    onMutate: () => setIsSending(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", companionId] });
      queryClient.invalidateQueries({ queryKey: ["aiUsage"] });
      setIsSending(false);
    },
    onError: () => {
      setIsSending(false);
      ue.error("Failed to send message. Please try again.");
    }
  });
  const handleSend = reactExports.useCallback(() => {
    const content = inputValue.trim();
    if (!content || isSending || limitReached) return;
    setInputValue("");
    sendMutation.mutate(content);
    setTimeout(scrollToBottom, 100);
  }, [inputValue, isSending, limitReached, sendMutation, scrollToBottom]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const config = companion ? PERSONALITY_CONFIGS[companion.personalityType] : null;
  if (companionLoading || actorLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "chat.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-card border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 rounded-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4 flex flex-col gap-3", children: ["a", "b", "c", "d"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex ${i % 2 === 1 ? "justify-end" : "items-end gap-2"}`,
          children: [
            i % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: `h-12 rounded-2xl ${i % 2 === 1 ? "w-48" : "w-64"}`
              }
            )
          ]
        },
        k
      )) })
    ] });
  }
  if (!companion) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-4 text-center px-4",
        "data-ocid": "chat.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-12 w-12 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: "Companion not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This companion may have been deleted." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/companions" }),
              "data-ocid": "chat.back_button",
              children: "Back to Companions"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full overflow-hidden", "data-ocid": "chat.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-card border-b border-border shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/companions" }),
          "data-ocid": "chat.back_button",
          className: "h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-smooth text-muted-foreground hover:text-foreground flex-shrink-0",
          "aria-label": "Back to companions",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 font-bold text-sm",
          style: {
            backgroundColor: `${config == null ? void 0 : config.color}25`,
            color: config == null ? void 0 : config.color
          },
          "aria-hidden": "true",
          children: (_a = companion.name[0]) == null ? void 0 : _a.toUpperCase()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base truncate", children: companion.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PersonalityBadge,
          {
            type: companion.personalityType,
            size: "sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-green-500 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Active now" })
      ] })
    ] }),
    isFreeTier && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsageCounter, { used: usedMessages, limit: FREE_TIER_DAILY_LIMIT }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-background",
        "data-ocid": "chat.messages_list",
        children: [
          !messagesLoading && messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col items-center justify-center flex-1 gap-4 py-16 text-center",
              "data-ocid": "chat.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-16 w-16 flex items-center justify-center rounded-2xl text-2xl font-bold",
                    style: {
                      backgroundColor: `${config == null ? void 0 : config.color}20`,
                      color: config == null ? void 0 : config.color
                    },
                    children: (_b = companion.name[0]) == null ? void 0 : _b.toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg", children: companion.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PersonalityBadge,
                    {
                      type: companion.personalityType,
                      size: "sm"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs leading-relaxed", children: "Start your conversation — say hello, share what's on your mind, or just ask anything." })
              ]
            }
          ),
          messagesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "chat.loading_state", children: ["a", "b", "c", "d"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex ${i % 2 === 1 ? "justify-end" : "items-end gap-2"}`,
              children: [
                i % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: `h-12 rounded-2xl ${i % 2 === 1 ? "w-48" : "w-64"}`
                  }
                )
              ]
            },
            k
          )) }),
          !messagesLoading && messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MessageBubble,
            {
              message: msg,
              companionColor: (config == null ? void 0 : config.color) ?? "oklch(var(--primary))",
              index: i
            },
            msg.id.toString()
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSending && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
        ]
      }
    ),
    limitReached ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UpgradeCTA, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-end gap-2 px-4 py-3 bg-card border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: `Message ${companion.name}…`,
          rows: 1,
          maxLength: 2e3,
          disabled: isSending,
          "data-ocid": "chat.message_input",
          className: "flex-1 min-h-[44px] max-h-36 resize-none bg-input border-input focus-visible:ring-ring rounded-xl text-sm leading-relaxed py-3 px-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "icon",
          onClick: handleSend,
          disabled: !inputValue.trim() || isSending,
          "data-ocid": "chat.send_button",
          className: "h-11 w-11 rounded-xl flex-shrink-0",
          "aria-label": "Send message",
          children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function CompanionChatPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanionChatContent, {}) });
}
export {
  CompanionChatPage
};
