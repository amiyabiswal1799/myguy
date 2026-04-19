import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Bot, Crown, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { AuthGuard } from "../components/AuthGuard";
import { PersonalityBadge } from "../components/PersonalityBadge";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  getAIUsageCount,
  getCompanion,
  getMessages,
  sendMessage,
} from "../lib/backend";
import type { AICompanion, Message } from "../lib/types";
import type { PersonalityType } from "../lib/types";
import {
  PERSONALITY_CONFIGS,
  SubscriptionTier,
  Variant_user_assistant,
} from "../lib/types";

const FREE_TIER_DAILY_LIMIT = 10;
const POLL_INTERVAL_MS = 2000;

// ─── Typing Indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="flex items-end gap-2 max-w-[75%]"
      data-ocid="chat.typing_indicator"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border flex-shrink-0">
        <Bot className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1 bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
      </div>
    </motion.div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  companionColor,
  index,
}: {
  message: Message;
  companionColor: string;
  index: number;
}) {
  const isUser = message.role === Variant_user_assistant.user;

  const time = new Date(
    Number(message.timestamp / 1_000_000n),
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.025, 0.25), duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full`}
      data-ocid={`chat.message.${index + 1}`}
    >
      {/* Avatar (AI only) */}
      {!isUser && (
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 text-xs font-bold"
          style={{
            backgroundColor: `${companionColor}20`,
            color: companionColor,
          }}
          aria-hidden="true"
        >
          AI
        </div>
      )}

      <div
        className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"} max-w-[75%] min-w-0`}
      >
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-card border border-border text-card-foreground rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground px-1">{time}</span>
      </div>
    </motion.div>
  );
}

// ─── Usage Counter ─────────────────────────────────────────────────────────────

function UsageCounter({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);
  const isNearLimit = remaining <= 3;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-muted/40 border-b border-border text-xs">
      <span className="text-muted-foreground flex-shrink-0">
        Daily AI messages
      </span>
      <div className="flex-1 max-w-28 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-smooth"
          style={{
            width: `${pct}%`,
            backgroundColor: isNearLimit
              ? "oklch(var(--destructive))"
              : "oklch(var(--primary))",
          }}
        />
      </div>
      <span
        className={
          isNearLimit
            ? "text-destructive font-medium flex-shrink-0"
            : "text-muted-foreground flex-shrink-0"
        }
      >
        {used}/{limit}
      </span>
      {remaining === 0 && (
        <span className="text-destructive font-medium flex-shrink-0">
          Limit reached
        </span>
      )}
    </div>
  );
}

// ─── Upgrade CTA ───────────────────────────────────────────────────────────────

function UpgradeCTA() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center gap-3 p-5 bg-card/60 border-t border-border backdrop-blur-sm text-center"
      data-ocid="chat.upgrade_cta"
    >
      <Crown className="h-7 w-7 text-[oklch(var(--personality-mentor))]" />
      <div>
        <p className="font-display font-semibold text-sm">
          Daily limit reached
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          You've used all 10 free AI messages today. Upgrade to Pro for
          unlimited chats.
        </p>
      </div>
      <Button
        className="w-full max-w-xs gap-2"
        onClick={() => navigate({ to: "/pricing" })}
        data-ocid="chat.upgrade_button"
      >
        <Crown className="h-4 w-4" />
        Upgrade to Pro
      </Button>
    </div>
  );
}

// ─── Chat Content ───────────────────────────────────────────────────────────────

function CompanionChatContent() {
  const { companionId } = useParams({
    from: "/authenticated/companions/$companionId/chat",
  });
  const navigate = useNavigate();
  const { actor, isFetching: actorLoading } = useBackend();
  const { profile } = useProfile();
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const companionIdBigInt = BigInt(companionId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── Fetch companion ──
  const { data: companion, isLoading: companionLoading } =
    useQuery<AICompanion | null>({
      queryKey: ["companion", companionId],
      queryFn: async () => {
        if (!actor) return null;
        return getCompanion(actor, companionIdBigInt);
      },
      enabled: !!actor && !actorLoading,
      staleTime: 60_000,
    });

  // ── Poll messages every 2s ──
  const { data: messages = [], isLoading: messagesLoading } = useQuery<
    Message[]
  >({
    queryKey: ["messages", companionId],
    queryFn: async () => {
      if (!actor) return [];
      return getMessages(actor, companionIdBigInt);
    },
    enabled: !!actor && !actorLoading,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 0,
  });

  // ── Poll usage count ──
  const { data: usageCount = 0n } = useQuery<bigint>({
    queryKey: ["aiUsage"],
    queryFn: async () => {
      if (!actor) return 0n;
      return getAIUsageCount(actor);
    },
    enabled: !!actor && !actorLoading,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 0,
  });

  const usedMessages = Number(usageCount);
  const tier = profile?.tier;
  const isFreeTier = !tier || tier === SubscriptionTier.free;
  const limitReached = isFreeTier && usedMessages >= FREE_TIER_DAILY_LIMIT;

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // ── Send mutation ──
  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
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
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleSend = useCallback(() => {
    const content = inputValue.trim();
    if (!content || isSending || limitReached) return;
    setInputValue("");
    sendMutation.mutate(content);
    setTimeout(scrollToBottom, 100);
  }, [inputValue, isSending, limitReached, sendMutation, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const config = companion
    ? PERSONALITY_CONFIGS[companion.personalityType]
    : null;

  // ── Loading skeleton ──
  if (companionLoading || actorLoading) {
    return (
      <div className="flex flex-col h-full" data-ocid="chat.loading_state">
        <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3">
          {(["a", "b", "c", "d"] as const).map((k, i) => (
            <div
              key={k}
              className={`flex ${i % 2 === 1 ? "justify-end" : "items-end gap-2"}`}
            >
              {i % 2 === 0 && (
                <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              )}
              <Skeleton
                className={`h-12 rounded-2xl ${i % 2 === 1 ? "w-48" : "w-64"}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Companion not found ──
  if (!companion) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4 text-center px-4"
        data-ocid="chat.error_state"
      >
        <Bot className="h-12 w-12 text-muted-foreground" />
        <p className="font-display font-semibold text-lg">
          Companion not found
        </p>
        <p className="text-sm text-muted-foreground">
          This companion may have been deleted.
        </p>
        <Button
          onClick={() => navigate({ to: "/companions" })}
          data-ocid="chat.back_button"
        >
          Back to Companions
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" data-ocid="chat.page">
      {/* ── Chat header ── */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-card border-b border-border shadow-subtle">
        <button
          type="button"
          onClick={() => navigate({ to: "/companions" })}
          data-ocid="chat.back_button"
          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-smooth text-muted-foreground hover:text-foreground flex-shrink-0"
          aria-label="Back to companions"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 font-bold text-sm"
          style={{
            backgroundColor: `${config?.color}25`,
            color: config?.color,
          }}
          aria-hidden="true"
        >
          {companion.name[0]?.toUpperCase()}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-display font-semibold text-base truncate">
            {companion.name}
          </span>
          <PersonalityBadge
            type={companion.personalityType as PersonalityType}
            size="sm"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="hidden sm:inline">Active now</span>
        </div>
      </div>

      {/* ── Usage counter (free tier) ── */}
      {isFreeTier && (
        <div className="flex-shrink-0">
          <UsageCounter used={usedMessages} limit={FREE_TIER_DAILY_LIMIT} />
        </div>
      )}

      {/* ── Messages thread ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-background"
        data-ocid="chat.messages_list"
      >
        {/* Empty state */}
        {!messagesLoading && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center flex-1 gap-4 py-16 text-center"
            data-ocid="chat.empty_state"
          >
            <div
              className="h-16 w-16 flex items-center justify-center rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: `${config?.color}20`,
                color: config?.color,
              }}
            >
              {companion.name[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-display font-bold text-lg">{companion.name}</p>
              <div className="flex justify-center mt-1">
                <PersonalityBadge
                  type={companion.personalityType as PersonalityType}
                  size="sm"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Start your conversation — say hello, share what's on your mind, or
              just ask anything.
            </p>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {messagesLoading && (
          <div className="flex flex-col gap-3" data-ocid="chat.loading_state">
            {(["a", "b", "c", "d"] as const).map((k, i) => (
              <div
                key={k}
                className={`flex ${i % 2 === 1 ? "justify-end" : "items-end gap-2"}`}
              >
                {i % 2 === 0 && (
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                )}
                <Skeleton
                  className={`h-12 rounded-2xl ${i % 2 === 1 ? "w-48" : "w-64"}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        {!messagesLoading &&
          messages.map((msg, i) => (
            <MessageBubble
              key={msg.id.toString()}
              message={msg}
              companionColor={config?.color ?? "oklch(var(--primary))"}
              index={i}
            />
          ))}

        {/* Typing indicator */}
        <AnimatePresence>{isSending && <TypingIndicator />}</AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area or upgrade CTA ── */}
      {limitReached ? (
        <div className="flex-shrink-0">
          <UpgradeCTA />
        </div>
      ) : (
        <div className="flex-shrink-0 flex items-end gap-2 px-4 py-3 bg-card border-t border-border">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${companion.name}…`}
            rows={1}
            maxLength={2000}
            disabled={isSending}
            data-ocid="chat.message_input"
            className="flex-1 min-h-[44px] max-h-36 resize-none bg-input border-input focus-visible:ring-ring rounded-xl text-sm leading-relaxed py-3 px-4"
          />
          <Button
            type="button"
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            data-ocid="chat.send_button"
            className="h-11 w-11 rounded-xl flex-shrink-0"
            aria-label="Send message"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export function CompanionChatPage() {
  return (
    <AuthGuard>
      <CompanionChatContent />
    </AuthGuard>
  );
}
