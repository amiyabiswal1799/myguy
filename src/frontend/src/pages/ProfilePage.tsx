import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, FileText, Users } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { AuthGuard } from "../components/AuthGuard";
import { SubscriptionBadge } from "../components/SubscriptionBadge";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  getAIUsageCount,
  getPosts,
  getSubscriptionStatus,
  updateAvatar,
} from "../lib/backend";
import type { Post } from "../lib/types";
import { SubscriptionTier } from "../lib/types";

const FREE_TIER_LIMIT = 10;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

// ─── Avatar upload ────────────────────────────────────────────────────────────

function AvatarUpload({
  name,
  avatarUrl,
  onUploaded,
}: {
  name: string;
  avatarUrl: string | null;
  onUploaded: () => void;
}) {
  const { actor } = useBackend();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !actor) return;
    setUploading(true);
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setProgress(pct),
      );
      await updateAvatar(actor, blob);
      toast.success("Avatar updated!");
      onUploaded();
    } catch {
      toast.error("Failed to upload avatar");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="relative group" data-ocid="profile.avatar_upload">
      <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary border-2 border-border ring-2 ring-primary/20 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        aria-label="Change avatar"
        data-ocid="profile.avatar_upload_button"
        className="absolute inset-0 rounded-full bg-background/70 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center cursor-pointer"
      >
        {uploading ? (
          <span className="text-xs font-semibold">{progress}%</span>
        ) : (
          <Camera className="h-5 w-5" />
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        aria-label="Upload avatar image"
      />
    </div>
  );
}

// ─── Edit form ────────────────────────────────────────────────────────────────

function EditProfileForm({
  currentName,
  currentBio,
  onSave,
  onCancel,
  saving,
}: {
  currentName: string;
  currentBio: string;
  onSave: (name: string, bio: string) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-5 space-y-4"
      data-ocid="profile.edit_form"
    >
      <h3 className="font-display font-semibold text-sm">Edit Profile</h3>
      <div className="space-y-1.5">
        <Label htmlFor="pname" className="text-xs text-muted-foreground">
          Name
        </Label>
        <Input
          id="pname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={60}
          data-ocid="profile.name_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pbio" className="text-xs text-muted-foreground">
          Bio
        </Label>
        <Textarea
          id="pbio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell people about yourself"
          maxLength={200}
          rows={3}
          className="resize-none"
          data-ocid="profile.bio_input"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="profile.cancel_button"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => onSave(name.trim(), bio.trim())}
          disabled={saving || !name.trim()}
          data-ocid="profile.save_button"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-2"
      data-ocid={`profile.post.${index}`}
    >
      <p className="text-sm leading-relaxed break-words">{post.content}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{timeAgo(post.createdAt)}</span>
        <span>·</span>
        <span>{Number(post.likesCount)} likes</span>
        <span>·</span>
        <span>{Number(post.commentsCount)} comments</span>
      </div>
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function ProfileContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const { profile, isLoading, updateProfileAsync, isUpdating, refetch } =
    useProfile();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: tier } = useQuery<SubscriptionTier>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return SubscriptionTier.free;
      return getSubscriptionStatus(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
  });

  const { data: usageCount } = useQuery<bigint>({
    queryKey: ["ai_usage"],
    queryFn: async () => {
      if (!actor) return 0n;
      return getAIUsageCount(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["my_posts", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return [];
      return getPosts(actor, principal);
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!principal,
    staleTime: 30_000,
  });

  const handleSave = async (name: string, bio: string) => {
    try {
      await updateProfileAsync({ name, bio });
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Could not save profile");
    }
  };

  const handleAvatarUploaded = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const isPro = (tier ?? profile?.tier) === SubscriptionTier.pro;
  const usageNum = Number(usageCount ?? 0n);
  const usagePct = Math.min((usageNum / FREE_TIER_LIMIT) * 100, 100);

  if (isLoading) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-8 space-y-6"
        data-ocid="profile.loading_state"
      >
        <div className="flex items-start gap-5">
          <Skeleton className="h-24 w-24 rounded-full flex-shrink-0" />
          <div className="space-y-3 flex-1 pt-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) return null;

  const avatarUrl = profile.avatar ? profile.avatar.getDirectURL() : null;

  return (
    <div
      className="max-w-xl mx-auto px-4 py-8 space-y-5"
      data-ocid="profile.page"
    >
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-start gap-5">
          <AvatarUpload
            name={profile.name}
            avatarUrl={avatarUrl}
            onUploaded={handleAvatarUploaded}
          />
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-xl truncate">
                {profile.name}
              </h1>
              <SubscriptionBadge tier={tier ?? profile.tier} />
            </div>
            <p className="text-sm text-muted-foreground break-words leading-relaxed">
              {profile.bio || "No bio yet"}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-sm">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold">
                  {Number(profile.followersCount)}
                </span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="font-semibold">
                  {Number(profile.followingCount)}
                </span>
                <span className="text-muted-foreground">following</span>
              </div>
            </div>
          </div>
          {!editing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(true)}
              data-ocid="profile.edit_button"
              className="flex-shrink-0"
            >
              Edit
            </Button>
          )}
        </div>
      </motion.div>

      {/* Edit form */}
      {editing && (
        <EditProfileForm
          currentName={profile.name}
          currentBio={profile.bio}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          saving={isUpdating}
        />
      )}

      {/* AI usage */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">AI Messages Today</p>
          {isPro ? (
            <span className="text-xs text-primary font-medium">Unlimited</span>
          ) : (
            <span className="text-xs text-muted-foreground">
              {usageNum} / {FREE_TIER_LIMIT}
            </span>
          )}
        </div>
        {!isPro && (
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${usagePct}%` }}
            />
          </div>
        )}
        {!isPro && usageNum >= FREE_TIER_LIMIT && (
          <p className="text-xs text-muted-foreground">
            Daily limit reached.{" "}
            <a href="/pricing" className="text-primary underline">
              Upgrade to Pro
            </a>{" "}
            for unlimited messages.
          </p>
        )}
      </div>

      {/* Posts */}
      <div className="space-y-3" data-ocid="profile.posts_section">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Posts
          </h2>
        </div>

        {postsLoading && (
          <div className="space-y-3" data-ocid="profile.posts_loading_state">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        )}

        {!postsLoading && (!posts || posts.length === 0) && (
          <div
            className="bg-card border border-border rounded-xl p-10 text-center"
            data-ocid="profile.empty_state"
          >
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium text-sm mb-1">No posts yet</p>
            <p className="text-xs text-muted-foreground">
              Share something on the feed to see it here.
            </p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="space-y-3" data-ocid="profile.posts_list">
            {posts.map((post, i) => (
              <PostCard key={post.id.toString()} post={post} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
