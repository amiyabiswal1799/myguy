import { j as jsxRuntimeExports, b as useBackend, u as useAuth, a as useNavigate, c as useQuery, B as Bot, d as PERSONALITY_CONFIGS, M as MessageCircle, g as getCompanions } from "./index-Dt8hDOdi.js";
import { B as Button } from "./button-pf9Upesm.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
function ChatContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: companions, isLoading } = useQuery({
    queryKey: ["companions"],
    queryFn: async () => {
      if (!actor) return [];
      return getCompanions(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6", "data-ocid": "chat.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl mb-6", children: "Chat" }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "chat.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-xl flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
          ] })
        ]
      },
      i
    )) }),
    !isLoading && (!companions || companions.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "chat.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-10 w-10 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "No companions yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Create a companion to start chatting." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/companions" }),
              "data-ocid": "chat.create_companion_button",
              children: "Create your Guy"
            }
          )
        ]
      }
    ),
    companions && companions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "chat.list", children: companions.map((companion, i) => {
      const config = PERSONALITY_CONFIGS[companion.personalityType];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({
            to: "/companions/$companionId/chat",
            params: { companionId: companion.id.toString() }
          }),
          "data-ocid": `chat.item.${i + 1}`,
          className: "w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-smooth text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-11 w-11 rounded-xl flex-shrink-0 flex items-center justify-center text-base font-bold",
                style: {
                  backgroundColor: `${config.color}20`,
                  color: config.color
                },
                children: companion.name.charAt(0)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: companion.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: config.color }, children: config.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-muted-foreground flex-shrink-0" })
          ]
        },
        companion.id.toString()
      );
    }) })
  ] });
}
function ChatPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChatContent, {}) });
}
export {
  ChatPage
};
