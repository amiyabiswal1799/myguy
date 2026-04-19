import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PageLoader, S as Sparkles, B as Bot, M as MessageCircle } from "./index-Dt8hDOdi.js";
import { B as Button } from "./button-pf9Upesm.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
import { U as Users } from "./users-Dw9OmgPX.js";
const FEATURES = [
  { icon: Bot, label: "AI Companions" },
  { icon: MessageCircle, label: "Memory Chat" },
  { icon: Users, label: "Social Feed" },
  { icon: Sparkles, label: "4 Personalities" }
];
function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/feed" });
    }
  }, [isAuthenticated, navigate]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Authenticating..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col overflow-hidden",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              className: "absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full",
              style: {
                background: "radial-gradient(circle, oklch(0.72 0.18 270 / 0.4) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] },
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3
              },
              className: "absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full",
              style: {
                background: "radial-gradient(circle, oklch(0.68 0.18 320 / 0.3) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] },
              transition: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 6
              },
              className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.18 10 / 0.2) 0%, transparent 70%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
            className: "max-w-md w-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 0.5, delay: 0.1 },
                  className: "flex items-center justify-center gap-3 mb-8",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-card-elevated relative overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.8 0.2 270 / 0.4) 0%, transparent 60%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-7 w-7 text-primary-foreground relative z-10" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl tracking-tight", children: "MyGuy" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h1,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.2 },
                  className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-5",
                  children: [
                    "Your AI companion",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "that remembers" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.4, delay: 0.35 },
                  className: "text-muted-foreground text-lg mb-10 leading-relaxed",
                  children: "Chat with AI personalities that adapt to you, remember your conversations, and grow with you over time."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4, delay: 0.45 },
                  className: "space-y-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        onClick: login,
                        "data-ocid": "login.primary_button",
                        className: "w-full h-12 text-base font-semibold tracking-wide",
                        children: "Sign in with Internet Identity"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Free to start · No credit card required" })
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.55, duration: 0.4 },
            className: "relative pb-12 px-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 max-w-sm mx-auto", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.span,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: 0.6 + i * 0.07, duration: 0.3 },
                className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-3.5 w-3.5" }),
                  f.label
                ]
              },
              f.label
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative py-4 border-t border-border text-center text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline hover:text-foreground transition-colors",
              children: "caffeine.ai"
            }
          )
        ] })
      ]
    }
  );
}
export {
  LoginPage
};
