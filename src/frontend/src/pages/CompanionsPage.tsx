import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Bot,
  Calendar,
  Crown,
  MessageCircle,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { AuthGuard } from "../components/AuthGuard";
import { PersonalityCardBadge } from "../components/PersonalityBadge";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  createCompanion,
  deleteCompanion,
  getCompanions,
} from "../lib/backend";
import type { AICompanion, CreateCompanionInput } from "../lib/types";
import {
  PERSONALITY_CONFIGS,
  PersonalityType,
  SubscriptionTier,
} from "../lib/types";

const FREE_TIER_COMPANION_LIMIT = 1;

// ─── Personality Selector Card ─────────────────────────────────────────────────

function PersonalitySelectorCard({
  type,
  selected,
  onClick,
}: {
  type: PersonalityType;
  selected: boolean;
  onClick: () => void;
}) {
  const config = PERSONALITY_CONFIGS[type];
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`create_companion.personality_${type}`}
      className="relative flex flex-col items-center gap-2 rounded-xl p-4 border transition-smooth text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        borderColor: selected ? config.color : undefined,
        backgroundColor: selected ? `${config.color}18` : undefined,
      }}
      aria-pressed={selected}
    >
      {selected && (
        <span
          className="absolute top-2 right-2 h-2 w-2 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      )}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.label[0]}
      </span>
      <span
        className="font-display font-semibold text-sm"
        style={{ color: config.color }}
      >
        {config.label}
      </span>
      <span className="text-xs text-muted-foreground leading-snug">
        {config.description}
      </span>
    </button>
  );
}

// ─── Create Companion Modal ─────────────────────────────────────────────────────

function CreateCompanionModal({
  open,
  onClose,
  companionCount,
  tier,
}: {
  open: boolean;
  onClose: () => void;
  companionCount: number;
  tier: SubscriptionTier | undefined;
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState<PersonalityType>(
    PersonalityType.friendly,
  );
  const [traits, setTraits] = useState("");

  const isFreeTier = !tier || tier === SubscriptionTier.free;
  const atLimit = isFreeTier && companionCount >= FREE_TIER_COMPANION_LIMIT;

  const mutation = useMutation({
    mutationFn: async (input: CreateCompanionInput) => {
      if (!actor) throw new Error("Not connected");
      return createCompanion(actor, input);
    },
    onSuccess: (companion) => {
      queryClient.invalidateQueries({ queryKey: ["companions"] });
      toast.success(`${companion.name} is ready to chat!`);
      onClose();
      setName("");
      setTraits("");
      navigate({
        to: "/companions/$companionId/chat",
        params: { companionId: companion.id.toString() },
      });
    },
    onError: () => toast.error("Failed to create companion. Please try again."),
  });

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Give your companion a name");
      return;
    }
    mutation.mutate({
      name: name.trim(),
      personalityType: personality,
      customTraits: traits.trim(),
    });
  };

  const handleClose = () => {
    if (mutation.isPending) return;
    onClose();
    setName("");
    setTraits("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="bg-popover border-border max-w-lg"
        data-ocid="create_companion.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create Your Companion
          </DialogTitle>
          <DialogDescription>
            Customize your AI companion's personality and traits.
          </DialogDescription>
        </DialogHeader>

        {atLimit ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <Crown className="h-12 w-12 text-[oklch(var(--personality-mentor))]" />
            <div>
              <p className="font-display font-semibold text-lg">
                Upgrade to Pro
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Free accounts can only have 1 companion. Upgrade to create
                unlimited companions.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                data-ocid="create_companion.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  handleClose();
                  navigate({ to: "/pricing" });
                }}
                data-ocid="create_companion.upgrade_button"
              >
                Upgrade to Pro
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="companion-name">Name</Label>
              <Input
                id="companion-name"
                placeholder="e.g. Alex, Luna, Jordan..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                data-ocid="create_companion.name_input"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Personality</Label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.values(PersonalityType) as PersonalityType[]).map(
                  (type) => (
                    <PersonalitySelectorCard
                      key={type}
                      type={type}
                      selected={personality === type}
                      onClick={() => setPersonality(type)}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="companion-traits">
                Custom Traits{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="companion-traits"
                placeholder="e.g. loves hiking, speaks Spanish, has a dry sense of humor..."
                value={traits}
                onChange={(e) => setTraits(e.target.value)}
                rows={3}
                maxLength={300}
                data-ocid="create_companion.traits_textarea"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={mutation.isPending}
                data-ocid="create_companion.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreate}
                disabled={mutation.isPending || !name.trim()}
                data-ocid="create_companion.submit_button"
              >
                {mutation.isPending ? "Creating…" : "Create Companion"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Companion Card ─────────────────────────────────────────────────────────────

function CompanionCard({
  companion,
  index,
  onDelete,
}: {
  companion: AICompanion;
  index: number;
  onDelete: (id: bigint) => void;
}) {
  const navigate = useNavigate();
  const config = PERSONALITY_CONFIGS[companion.personalityType];

  const date = new Date(
    Number(companion.createdAt / 1_000_000n),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      data-ocid={`companions.item.${index + 1}`}
    >
      <Card className="group relative flex flex-col gap-4 p-5 bg-card border-border hover:border-muted-foreground/30 transition-smooth shadow-card hover:shadow-card-elevated">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold flex-shrink-0"
              style={{
                backgroundColor: `${config.color}20`,
                color: config.color,
              }}
              aria-hidden="true"
            >
              {companion.name[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-base truncate">
                {companion.name}
              </p>
              <PersonalityCardBadge
                type={companion.personalityType}
                className="mt-1"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(companion.id);
            }}
            data-ocid={`companions.delete_button.${index + 1}`}
            className="opacity-0 group-hover:opacity-100 h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus-visible:opacity-100 flex-shrink-0"
            aria-label={`Delete ${companion.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {companion.customTraits && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {companion.customTraits}
          </p>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-border/60">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
          <Button
            size="sm"
            onClick={() =>
              navigate({
                to: "/companions/$companionId/chat",
                params: { companionId: companion.id.toString() },
              })
            }
            data-ocid={`companions.chat_button.${index + 1}`}
            className="h-7 px-3 text-xs gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Companions Content ─────────────────────────────────────────────────────────

function CompanionsContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);

  const { data: companions = [], isLoading } = useQuery<AICompanion[]>({
    queryKey: ["companions"],
    queryFn: async () => {
      if (!actor) return [];
      return getCompanions(actor);
    },
    enabled: !!actor && !actorLoading,
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return deleteCompanion(actor, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companions"] });
      toast.success("Companion removed");
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete companion"),
  });

  const tier = profile?.tier;
  const isFreeTier = !tier || tier === SubscriptionTier.free;

  return (
    <div className="flex flex-col gap-0 h-full" data-ocid="companions.page">
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div>
            <h1 className="font-display font-bold text-xl flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              My Companions
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isLoading
                ? "…"
                : `${companions.length} companion${companions.length !== 1 ? "s" : ""}`}
              {isFreeTier && ` · Free tier (${FREE_TIER_COMPANION_LIMIT} max)`}
            </p>
          </div>
          <Button
            onClick={() => setShowCreate(true)}
            data-ocid="companions.new_companion_button"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Companion
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Loading */}
          {(isLoading || actorLoading) && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="companions.loading_state"
            >
              {(["a", "b", "c"] as const).map((k) => (
                <Card key={k} className="p-5 flex flex-col gap-4 bg-card">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <div className="flex justify-between pt-1 border-t border-border/60">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-7 w-16 rounded-md" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !actorLoading && companions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 gap-6 text-center"
              data-ocid="companions.empty_state"
            >
              <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Bot className="h-10 w-10" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">
                  No companions yet
                </h2>
                <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                  Create your first AI companion and start a conversation.
                  Choose a personality that fits your vibe.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setShowCreate(true)}
                data-ocid="companions.empty_create_button"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Your First Companion
              </Button>
            </motion.div>
          )}

          {/* Grid */}
          {!isLoading && companions.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="companions.list"
            >
              <AnimatePresence mode="popLayout">
                {companions.map((companion, index) => (
                  <CompanionCard
                    key={companion.id.toString()}
                    companion={companion}
                    index={index}
                    onDelete={(id) => setDeleteTarget(id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Upgrade banner */}
          {isFreeTier &&
            companions.length >= FREE_TIER_COMPANION_LIMIT &&
            !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 rounded-xl border border-[oklch(var(--personality-mentor)/0.4)] bg-[oklch(var(--personality-mentor)/0.06)] p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-[oklch(var(--personality-mentor))] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Free tier — 1 companion limit
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Pro for unlimited companions and AI messages.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate({ to: "/pricing" })}
                  data-ocid="companions.upgrade_banner_button"
                  className="flex-shrink-0 border-[oklch(var(--personality-mentor)/0.5)] text-[oklch(var(--personality-mentor))]"
                >
                  Upgrade
                </Button>
              </motion.div>
            )}
        </div>
      </div>

      {/* Create modal */}
      <CreateCompanionModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        companionCount={companions.length}
        tier={tier}
      />

      {/* Delete confirm */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="bg-popover border-border"
          data-ocid="companions.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete companion?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your companion and all conversation
              history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="companions.delete_cancel_button"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="companions.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deleteTarget !== null && deleteMutation.mutate(deleteTarget)
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function CompanionsPage() {
  return (
    <AuthGuard>
      <CompanionsContent />
    </AuthGuard>
  );
}
