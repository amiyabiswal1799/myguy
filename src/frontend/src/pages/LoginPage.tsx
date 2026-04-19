import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Bot, MessageCircle, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { PageLoader } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  { icon: Bot, label: "AI Companions" },
  { icon: MessageCircle, label: "Memory Chat" },
  { icon: Users, label: "Social Feed" },
  { icon: Sparkles, label: "4 Personalities" },
];

export function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/feed" });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <PageLoader label="Authenticating..." />;

  return (
    <div
      className="min-h-screen bg-background flex flex-col overflow-hidden"
      data-ocid="login.page"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 270 / 0.4) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.18 320 / 0.3) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 10 / 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-card-elevated relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.8 0.2 270 / 0.4) 0%, transparent 60%)",
                }}
              />
              <Sparkles className="h-7 w-7 text-primary-foreground relative z-10" />
            </div>
            <span className="font-display font-bold text-4xl tracking-tight">
              MyGuy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5"
          >
            Your AI companion{" "}
            <span className="text-primary">that remembers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-muted-foreground text-lg mb-10 leading-relaxed"
          >
            Chat with AI personalities that adapt to you, remember your
            conversations, and grow with you over time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="space-y-3"
          >
            <Button
              size="lg"
              onClick={login}
              data-ocid="login.primary_button"
              className="w-full h-12 text-base font-semibold tracking-wide"
            >
              Sign in with Internet Identity
            </Button>
            <p className="text-sm text-muted-foreground">
              Free to start · No credit card required
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="relative pb-12 px-6"
      >
        <div className="flex flex-wrap justify-center gap-3 max-w-sm mx-auto">
          {FEATURES.map((f, i) => (
            <motion.span
              key={f.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-sm text-muted-foreground"
            >
              <f.icon className="h-3.5 w-3.5" />
              {f.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative py-4 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
