import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Bot, MessageCircle } from "lucide-react";
import { AuthGuard } from "../components/AuthGuard";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { getCompanions } from "../lib/backend";
import type { AICompanion } from "../lib/types";
import { PERSONALITY_CONFIGS } from "../lib/types";

function ChatContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: companions, isLoading } = useQuery<AICompanion[]>({
    queryKey: ["companions"],
    queryFn: async () => {
      if (!actor) return [];
      return getCompanions(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" data-ocid="chat.page">
      <h1 className="font-display font-bold text-xl mb-6">Chat</h1>

      {isLoading && (
        <div className="space-y-3" data-ocid="chat.loading_state">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
            >
              <Skeleton className="h-11 w-11 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!companions || companions.length === 0) && (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="chat.empty_state"
        >
          <Bot className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="font-medium mb-1">No companions yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Create a companion to start chatting.
          </p>
          <Button
            onClick={() => navigate({ to: "/companions" })}
            data-ocid="chat.create_companion_button"
          >
            Create your Guy
          </Button>
        </div>
      )}

      {companions && companions.length > 0 && (
        <div className="space-y-3" data-ocid="chat.list">
          {companions.map((companion, i) => {
            const config = PERSONALITY_CONFIGS[companion.personalityType];
            return (
              <button
                key={companion.id.toString()}
                type="button"
                onClick={() =>
                  navigate({
                    to: "/companions/$companionId/chat",
                    params: { companionId: companion.id.toString() },
                  })
                }
                data-ocid={`chat.item.${i + 1}`}
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-smooth text-left"
              >
                <div
                  className="h-11 w-11 rounded-xl flex-shrink-0 flex items-center justify-center text-base font-bold"
                  style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                  }}
                >
                  {companion.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {companion.name}
                  </p>
                  <p className="text-xs" style={{ color: config.color }}>
                    {config.label}
                  </p>
                </div>
                <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ChatPage() {
  return (
    <AuthGuard>
      <ChatContent />
    </AuthGuard>
  );
}
