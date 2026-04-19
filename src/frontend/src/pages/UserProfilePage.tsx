import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { FileText, UserMinus, UserPlus, Users } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { AuthGuard } from "../components/AuthGuard";
import { SubscriptionBadge } from "../components/SubscriptionBadge";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useUserProfile } from "../hooks/useProfile";
import {
  followUser,
  getFollowers,
  getPosts,
  unfollowUser,
} from "../lib/backend";
import type { Post, UserId } from "../lib/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-2"
      data-ocid={`user_profile.post.${index}`}
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

function UserProfileContent({ userId }: { userId: string }) {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useUserProfile(userId);

  const followersQuery = useQuery<UserId[]>({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import("@icp-sdk/core/principal");
      return getFollowers(actor, Principal.fromText(userId));
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!userId,
    staleTime: 30_000,
  });

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import("@icp-sdk/core/principal");
      return getPosts(actor, Principal.fromText(userId));
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!userId,
    staleTime: 30_000,
  });

  const isFollowing =
    principal != null &&
    (followersQuery.data?.some((f) => f.toText() === principal.toText()) ??
      false);

  const followMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !userId) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      return followUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success(`Following ${profile?.name ?? "user"}`);
    },
    onError: () => toast.error("Could not follow user"),
  });

  const unfollowMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !userId) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      return unfollowUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success(`Unfollowed ${profile?.name ?? "user"}`);
    },
    onError: () => toast.error("Could not unfollow user"),
  });

  const isOwnProfile = principal?.toText() === userId;
  const isMutating = followMutation.isPending || unfollowMutation.isPending;

  if (isLoading) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-8 space-y-6"
        data-ocid="user_profile.loading_state"
      >
        <div className="flex items-start gap-5">
          <Skeleton className="h-24 w-24 rounded-full flex-shrink-0" />
          <div className="space-y-3 flex-1 pt-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-16 text-center"
        data-ocid="user_profile.error_state"
      >
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-display font-semibold text-lg mb-2">
          User not found
        </p>
        <p className="text-sm text-muted-foreground">
          This profile doesn't exist or was removed.
        </p>
      </div>
    );
  }

  const avatarUrl = profile.avatar ? profile.avatar.getDirectURL() : null;

  return (
    <div
      className="max-w-xl mx-auto px-4 py-8 space-y-5"
      data-ocid="user_profile.page"
    >
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary border-2 border-border ring-2 ring-primary/20 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              profile.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-xl truncate">
                {profile.name}
              </h1>
              <SubscriptionBadge tier={profile.tier} />
            </div>
            <p className="text-sm text-muted-foreground break-words leading-relaxed">
              {profile.bio || "No bio"}
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

          {/* Follow / Unfollow */}
          {!isOwnProfile && (
            <div className="flex-shrink-0">
              {isFollowing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => unfollowMutation.mutate()}
                  disabled={isMutating}
                  data-ocid="user_profile.unfollow_button"
                  className="gap-1.5"
                >
                  <UserMinus className="h-3.5 w-3.5" />
                  Following
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => followMutation.mutate()}
                  disabled={isMutating}
                  data-ocid="user_profile.follow_button"
                  className="gap-1.5"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Follow
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Posts */}
      <div className="space-y-3" data-ocid="user_profile.posts_section">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Posts
          </h2>
        </div>

        {postsQuery.isLoading && (
          <div
            className="space-y-3"
            data-ocid="user_profile.posts_loading_state"
          >
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        )}

        {!postsQuery.isLoading &&
          (!postsQuery.data || postsQuery.data.length === 0) && (
            <div
              className="bg-card border border-border rounded-xl p-10 text-center"
              data-ocid="user_profile.posts_empty_state"
            >
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-sm mb-1">No posts yet</p>
              <p className="text-xs text-muted-foreground">
                {profile.name} hasn't posted anything yet.
              </p>
            </div>
          )}

        {postsQuery.data && postsQuery.data.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
            data-ocid="user_profile.posts_list"
          >
            {postsQuery.data.map((post, i) => (
              <PostCard key={post.id.toString()} post={post} index={i + 1} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function UserProfilePage() {
  const params = useParams({ from: "/authenticated/profile/$userId" });
  return (
    <AuthGuard>
      <UserProfileContent userId={params.userId} />
    </AuthGuard>
  );
}
