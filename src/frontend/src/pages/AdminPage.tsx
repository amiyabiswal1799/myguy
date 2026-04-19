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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Ban,
  Eye,
  EyeOff,
  Flag,
  Key,
  Save,
  Settings2,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AuthGuard } from "../components/AuthGuard";
import { SubscriptionBadge } from "../components/SubscriptionBadge";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  adminBanUser,
  adminFlagUser,
  adminGetUsers,
  setOpenAiApiKey,
  setStripeConfiguration,
} from "../lib/backend";
import { SubscriptionTier } from "../lib/types";
import type { UserProfile } from "../lib/types";

// ─── Stats Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4">
      <div
        className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ?? "bg-primary/10"}`}
      >
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold leading-none">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}

// ─── User Row ─────────────────────────────────────────────────────────────────

function UserRow({
  user,
  index,
  onFlag,
  onBan,
  flagPending,
  banPending,
}: {
  user: UserProfile;
  index: number;
  onFlag: (id: UserProfile["id"]) => void;
  onBan: (user: UserProfile) => void;
  flagPending: boolean;
  banPending: boolean;
}) {
  const createdAt = new Date(
    Number(user.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3 hover:bg-muted/20 transition-colors"
      data-ocid={`admin.user.${index}`}
    >
      {/* Avatar */}
      <div className="h-9 w-9 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden">
        {user.avatar ? (
          <img
            src={user.avatar.getDirectURL()}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {/* Name + ID */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium truncate max-w-[120px]">
            {user.name}
          </span>
          {user.isAdmin && (
            <Badge
              variant="outline"
              className="text-[9px] px-1 py-0 border-primary/40 text-primary"
            >
              ADMIN
            </Badge>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground font-mono truncate">
          {user.id.toText()}
        </p>
      </div>

      {/* Tier */}
      <div className="hidden sm:block flex-shrink-0">
        <SubscriptionBadge tier={user.tier} size="sm" />
      </div>

      {/* Status badges */}
      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
        {user.isFlagged ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/25">
            <Flag className="h-2.5 w-2.5" /> Flagged
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-muted-foreground border border-border">
            Clean
          </span>
        )}
        {user.isBanned && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-destructive/15 text-destructive border border-destructive/25">
            <Ban className="h-2.5 w-2.5" /> Banned
          </span>
        )}
      </div>

      {/* Created at */}
      <p className="hidden lg:block text-[11px] text-muted-foreground flex-shrink-0 w-24 text-right">
        {createdAt}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 transition-smooth ${user.isFlagged ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10" : "text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10"}`}
          onClick={() => onFlag(user.id)}
          disabled={flagPending}
          aria-label={user.isFlagged ? "Unflag user" : "Flag user"}
          data-ocid={`admin.flag_button.${index}`}
        >
          <Flag className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 transition-smooth ${user.isBanned ? "text-destructive hover:text-destructive/80 hover:bg-destructive/10" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"}`}
          onClick={() => onBan(user)}
          disabled={banPending}
          aria-label={user.isBanned ? "Unban user" : "Ban user"}
          data-ocid={`admin.ban_button.${index}`}
        >
          <Ban className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Config Section ────────────────────────────────────────────────────────────

function ConfigSection({
  actor,
}: { actor: ReturnType<typeof useBackend>["actor"] }) {
  const [openAiKey, setOpenAiKey] = useState("");
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [stripeSecret, setStripeSecret] = useState("");
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const openAiMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await setOpenAiApiKey(actor, openAiKey.trim());
    },
    onSuccess: () => {
      toast.success("OpenAI API key saved");
      setOpenAiKey("");
    },
    onError: () => toast.error("Failed to save OpenAI API key"),
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
          "NO",
        ],
      });
    },
    onSuccess: () => {
      toast.success("Stripe configuration saved");
      setStripeSecret("");
    },
    onError: () => toast.error("Failed to save Stripe configuration"),
  });

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid="admin.config.section"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <Settings2 className="h-4 w-4 text-primary" />
        <h2 className="font-display font-semibold text-sm">
          API Configuration
        </h2>
      </div>

      <div className="divide-y divide-border">
        {/* OpenAI */}
        <div className="px-5 py-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Key className="h-3.5 w-3.5 text-muted-foreground" />
            <Label className="text-sm font-medium">OpenAI API Key</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Used for AI companion responses. Key is encrypted at rest.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showOpenAi ? "text" : "password"}
                placeholder="sk-proj-..."
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                className="pr-10 font-mono text-sm bg-input border-border"
                data-ocid="admin.openai_key.input"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowOpenAi((v) => !v)}
                aria-label={showOpenAi ? "Hide key" : "Show key"}
                data-ocid="admin.openai_key.toggle"
              >
                {showOpenAi ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              onClick={() => openAiMutation.mutate()}
              disabled={!openAiKey.trim() || openAiMutation.isPending}
              size="sm"
              className="gap-1.5"
              data-ocid="admin.openai_key.save_button"
            >
              <Save className="h-3.5 w-3.5" />
              Save
            </Button>
          </div>
        </div>

        {/* Stripe */}
        <div className="px-5 py-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Key className="h-3.5 w-3.5 text-muted-foreground" />
            <Label className="text-sm font-medium">Stripe Configuration</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Required for Pro subscription payments. Use live keys in production.
          </p>

          {/* Note: The Stripe publishable key (pk_live_...) is configured in the frontend
              environment — only the secret key is stored in the backend canister. */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Secret Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showStripeSecret ? "text" : "password"}
                  placeholder="sk_live_..."
                  value={stripeSecret}
                  onChange={(e) => setStripeSecret(e.target.value)}
                  className="pr-10 font-mono text-sm bg-input border-border"
                  data-ocid="admin.stripe_secret.input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowStripeSecret((v) => !v)}
                  aria-label={showStripeSecret ? "Hide key" : "Show key"}
                  data-ocid="admin.stripe_secret.toggle"
                >
                  {showStripeSecret ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button
                onClick={() => stripeMutation.mutate()}
                disabled={!stripeSecret.trim() || stripeMutation.isPending}
                size="sm"
                className="gap-1.5"
                data-ocid="admin.stripe.save_button"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Content ──────────────────────────────────────────────────────────────

function AdminContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [banTarget, setBanTarget] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profile && !profile.isAdmin) {
      navigate({ to: "/feed" });
    }
  }, [profile, navigate]);

  const { data: users = [], isLoading } = useQuery<UserProfile[]>({
    queryKey: ["admin_users"],
    queryFn: async () => {
      if (!actor) return [];
      return adminGetUsers(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!profile?.isAdmin,
  });

  const flagMutation = useMutation({
    mutationFn: async (userId: UserProfile["id"]) => {
      if (!actor) throw new Error("Not connected");
      return adminFlagUser(actor, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      toast.success("User flag toggled");
    },
    onError: () => toast.error("Could not flag user"),
  });

  const banMutation = useMutation({
    mutationFn: async (userId: UserProfile["id"]) => {
      if (!actor) throw new Error("Not connected");
      return adminBanUser(actor, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      toast.success("User ban toggled");
      setBanTarget(null);
    },
    onError: () => {
      toast.error("Could not ban user");
      setBanTarget(null);
    },
  });

  const filtered = useMemo(
    () =>
      users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [users, search],
  );

  const totalPro = users.filter((u) => u.tier === SubscriptionTier.pro).length;
  const totalBanned = users.filter((u) => u.isBanned).length;

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-6 space-y-6"
      data-ocid="admin.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl leading-none">
            Admin Panel
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage users and platform configuration
          </p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        data-ocid="admin.stats.section"
      >
        <StatCard label="Total Users" value={users.length} icon={Users} />
        <StatCard
          label="Pro Users"
          value={totalPro}
          icon={Shield}
          accent="bg-primary/10"
        />
        <StatCard
          label="Banned Users"
          value={totalBanned}
          icon={Ban}
          accent="bg-destructive/10"
        />
      </div>

      {/* User Management */}
      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="admin.users.section"
      >
        {/* Table header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-3">
          <h2 className="font-display font-semibold text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Users
          </h2>
          <div className="relative w-56">
            <Input
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-sm pl-3 pr-3 bg-input border-border"
              data-ocid="admin.search.input"
            />
          </div>
        </div>

        {/* Column labels */}
        <div className="hidden md:grid grid-cols-[2.25rem_1fr_5rem_7rem_7rem_1fr_6.5rem] gap-3 px-4 py-2 border-b border-border bg-muted/30">
          {["", "User", "Tier", "Flag", "Ban", "Joined", "Actions"].map(
            (col) => (
              <span
                key={col}
                className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium"
              >
                {col}
              </span>
            ),
          )}
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div data-ocid="admin.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3"
              >
                <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-7 w-16 hidden sm:block" />
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-7" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="admin.empty_state"
          >
            {search ? (
              <>
                <p className="text-sm">No users match "{search}"</p>
                <button
                  type="button"
                  className="text-xs text-primary mt-1 hover:underline"
                  onClick={() => setSearch("")}
                  data-ocid="admin.clear_search.button"
                >
                  Clear search
                </button>
              </>
            ) : (
              <p className="text-sm">No users found.</p>
            )}
          </div>
        )}

        {/* User rows */}
        {!isLoading &&
          filtered.map((user, i) => (
            <UserRow
              key={user.id.toText()}
              user={user}
              index={i + 1}
              onFlag={(id) => flagMutation.mutate(id)}
              onBan={(u) => setBanTarget(u)}
              flagPending={flagMutation.isPending}
              banPending={banMutation.isPending}
            />
          ))}
      </div>

      <Separator className="opacity-50" />

      {/* Config section */}
      <ConfigSection actor={actor} />

      {/* Ban confirm dialog */}
      <AlertDialog
        open={!!banTarget}
        onOpenChange={(open) => !open && setBanTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.ban.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {banTarget?.isBanned ? "Unban user?" : "Ban user?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {banTarget?.isBanned
                ? `This will restore access for ${banTarget?.name}. They'll be able to log in again.`
                : `This will block ${banTarget?.name} from using the platform. You can reverse this at any time.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.ban.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                banTarget?.isBanned
                  ? ""
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }
              onClick={() => banTarget && banMutation.mutate(banTarget.id)}
              disabled={banMutation.isPending}
              data-ocid="admin.ban.confirm_button"
            >
              {banMutation.isPending
                ? "Processing…"
                : banTarget?.isBanned
                  ? "Unban"
                  : "Ban User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export function AdminPage() {
  return (
    <AuthGuard>
      <AdminContent />
    </AuthGuard>
  );
}
