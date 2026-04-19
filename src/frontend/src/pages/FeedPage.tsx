import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, PenSquare, UserPlus, Users } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AuthGuard } from "../components/AuthGuard";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useProfile } from "../hooks/useProfile";
import {
  adminGetUsers,
  commentPost,
  createPost,
  followUser,
  getComments,
  getFeedPosts,
  likePost,
} from "../lib/backend";
import type { Comment, Post, UserProfile } from "../lib/types";

// ─── Utilities ────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function avatarInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getAvatarUrl(profile: UserProfile | null): string | undefined {
  if (!profile?.avatar) return undefined;
  try {
    return profile.avatar.getDirectURL();
  } catch {
    return undefined;
  }
}

// ─── Comment Section ──────────────────────────────────────────────────────────

function CommentSection({
  postId,
  index,
}: {
  postId: bigint;
  index: number;
}) {
  const { actor } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", postId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return getComments(actor, postId);
    },
    enabled: !!actor && isAuthenticated,
  });

  const handleSubmit = async () => {
    if (!actor || !text.trim()) return;
    setSubmitting(true);
    try {
      await commentPost(actor, postId, { content: text.trim() });
      setText("");
      queryClient.invalidateQueries({
        queryKey: ["comments", postId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Comment added");
    } catch {
      toast.error("Could not add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="border-t border-border pt-4 mt-1 space-y-3"
      data-ocid={`feed.comment_section.${index}`}
    >
      {isLoading && (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-2 items-start">
              <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
              <Skeleton className="h-8 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && comments && comments.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {comments.map((c, ci) => (
            <div
              key={c.id.toString()}
              className="flex gap-2 items-start"
              data-ocid={`feed.comment.${index}.item.${ci + 1}`}
            >
              <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                {c.authorPrincipal.toText().slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-1.5">
                <p className="text-xs text-foreground leading-relaxed break-words">
                  {c.content}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {timeAgo(c.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!comments || comments.length === 0) && (
        <p className="text-xs text-muted-foreground">
          No comments yet — be the first!
        </p>
      )}

      <div className="flex gap-2 items-end">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment…"
          rows={1}
          className="flex-1 resize-none min-h-[36px] text-sm bg-input border-border"
          data-ocid={`feed.comment_input.${index}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button
          size="sm"
          variant="secondary"
          onClick={handleSubmit}
          disabled={!text.trim() || submitting}
          data-ocid={`feed.comment_submit.${index}`}
          className="flex-shrink-0 h-9"
        >
          {submitting ? "…" : "Send"}
        </Button>
      </div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post,
  index,
  authorProfile,
}: {
  post: Post;
  index: number;
  authorProfile: UserProfile | null;
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (!actor || liked) return;
    try {
      await likePost(actor, post.id);
      setLiked(true);
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    } catch {
      toast.error("Could not like post");
    }
  };

  const authorId = post.authorPrincipal.toText();
  const displayName = authorProfile?.name ?? "Unknown user";
  const avatarUrl = getAvatarUrl(authorProfile);
  const likeCount = Number(post.likesCount) + (liked ? 1 : 0);
  const commentCount = Number(post.commentsCount);

  return (
    <article
      className="bg-card border border-border rounded-xl p-5 space-y-3 transition-smooth hover:border-border/80"
      data-ocid={`feed.item.${index}`}
    >
      {/* Author row */}
      <div className="flex items-center gap-3 min-w-0">
        <a
          href={`/profile/${authorId}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/profile/${authorId}`;
          }}
          className="flex-shrink-0"
          data-ocid={`feed.author_avatar.${index}`}
          aria-label={`View ${displayName}'s profile`}
        >
          <Avatar className="h-9 w-9 ring-1 ring-border">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
            <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
              {avatarInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </a>
        <div className="min-w-0 flex-1">
          <a
            href={`/profile/${authorId}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/profile/${authorId}`;
            }}
            className="text-sm font-semibold hover:text-primary transition-colors truncate block"
            data-ocid={`feed.author_link.${index}`}
          >
            {displayName}
          </a>
          <p className="text-xs text-muted-foreground">
            {timeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground leading-relaxed break-words whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-5 pt-0.5">
        <button
          type="button"
          onClick={handleLike}
          data-ocid={`feed.like_button.${index}`}
          aria-label={liked ? "Liked" : "Like post"}
          className={`flex items-center gap-1.5 text-sm transition-colors group ${
            liked
              ? "text-rose-400"
              : "text-muted-foreground hover:text-rose-400"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-transform group-hover:scale-110 ${
              liked ? "fill-current" : ""
            }`}
          />
          <span>{likeCount}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          data-ocid={`feed.comment_button.${index}`}
          aria-label={showComments ? "Hide comments" : "Show comments"}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            showComments
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{commentCount}</span>
        </button>
      </div>

      {/* Comment section */}
      {showComments && <CommentSection postId={post.id} index={index} />}
    </article>
  );
}

// ─── Post Skeleton ────────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-5 pt-0.5">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}

// ─── Create Post ──────────────────────────────────────────────────────────────

const MAX_CHARS = 280;

function CreatePost() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const charsLeft = MAX_CHARS - content.length;
  const isOver = charsLeft < 0;
  const isNearLimit = charsLeft <= 20 && charsLeft >= 0;

  const handlePost = async () => {
    if (!actor || !content.trim() || isOver) return;
    setPosting(true);
    try {
      await createPost(actor, { content: content.trim() });
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post shared!");
    } catch {
      toast.error("Could not create post");
    } finally {
      setPosting(false);
    }
  };

  const avatarUrl = getAvatarUrl(profile);
  const displayName = profile?.name ?? "";

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-3"
      data-ocid="feed.create_post.card"
    >
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 flex-shrink-0 ring-1 ring-border">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
            {displayName ? avatarInitials(displayName) : "?"}
          </AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS + 10))}
          placeholder="What's on your mind?"
          rows={2}
          className="flex-1 resize-none bg-input border-border text-sm min-h-[72px]"
          data-ocid="feed.post_textarea"
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs tabular-nums ${
            isOver
              ? "text-destructive font-semibold"
              : isNearLimit
                ? "text-amber-400"
                : "text-muted-foreground"
          }`}
        >
          {charsLeft < 0
            ? `${Math.abs(charsLeft)} over limit`
            : `${charsLeft} remaining`}
        </span>
        <Button
          onClick={handlePost}
          disabled={!content.trim() || posting || isOver}
          data-ocid="feed.post_submit_button"
          size="sm"
        >
          <PenSquare className="h-3.5 w-3.5 mr-1.5" />
          {posting ? "Posting…" : "Post"}
        </Button>
      </div>
    </div>
  );
}

// ─── Discover Users ───────────────────────────────────────────────────────────

function DiscoverUsers() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const queryClient = useQueryClient();

  const { data: allUsers, isLoading } = useQuery<UserProfile[]>({
    queryKey: ["discover-users"],
    queryFn: async () => {
      if (!actor) return [];
      return adminGetUsers(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    staleTime: 60_000,
  });

  const followMutation = useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      await followUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discover-users"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Followed!");
    },
    onError: () => toast.error("Could not follow user"),
  });

  const [followedIds, setFollowedIds] = useState<Set<string>>(new Set());

  const handleFollow = useCallback(
    (userId: string) => {
      if (followedIds.has(userId)) return;
      setFollowedIds((prev) => new Set(prev).add(userId));
      followMutation.mutate(userId);
    },
    [followedIds, followMutation],
  );

  const myId = principal?.toText();
  const suggestions = (allUsers ?? [])
    .filter((u) => u.id.toText() !== myId && !u.isBanned)
    .filter((u) => !followedIds.has(u.id.toText()))
    .slice(0, 6);

  if (!isLoading && suggestions.length === 0) return null;

  return (
    <section
      className="bg-card border border-border rounded-xl p-5 space-y-4"
      data-ocid="feed.discover_section"
    >
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Discover People</h2>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && suggestions.length > 0 && (
        <div className="space-y-2.5">
          {suggestions.map((user, i) => {
            const avatarUrl = getAvatarUrl(user);
            const initials = avatarInitials(user.name);
            return (
              <div
                key={user.id.toText()}
                className="flex items-center gap-3"
                data-ocid={`feed.discover_user.${i + 1}`}
              >
                <a
                  href={`/profile/${user.id.toText()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/profile/${user.id.toText()}`;
                  }}
                  className="flex-shrink-0"
                >
                  <Avatar className="h-9 w-9 ring-1 ring-border">
                    {avatarUrl && (
                      <AvatarImage src={avatarUrl} alt={user.name} />
                    )}
                    <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </a>
                <div className="flex-1 min-w-0">
                  <a
                    href={`/profile/${user.id.toText()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/profile/${user.id.toText()}`;
                    }}
                    className="text-sm font-medium hover:text-primary transition-colors truncate block"
                    data-ocid={`feed.discover_user_link.${i + 1}`}
                  >
                    {user.name}
                  </a>
                  {user.bio && (
                    <p className="text-xs text-muted-foreground truncate">
                      {user.bio}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-shrink-0 h-8 text-xs"
                  onClick={() => handleFollow(user.id.toText())}
                  disabled={followedIds.has(user.id.toText())}
                  data-ocid={`feed.follow_button.${i + 1}`}
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Follow
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ─── Feed Content ─────────────────────────────────────────────────────────────

// Minimal cache for author profiles within the feed render
const authorProfileCache = new Map<string, UserProfile | null>();

function FeedPostList() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      if (!actor) return [];
      return getFeedPosts(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    refetchInterval: 30_000,
  });

  // Fetch all unique author profiles in a single pass
  const authorIds = Array.from(
    new Set((posts ?? []).map((p) => p.authorPrincipal.toText())),
  );

  const authorQueries = useQuery<Record<string, UserProfile | null>>({
    queryKey: ["feed-authors", authorIds.join(",")],
    queryFn: async () => {
      if (!actor || authorIds.length === 0) return {};
      const { Principal } = await import("@icp-sdk/core/principal");
      const entries = await Promise.all(
        authorIds.map(async (id) => {
          if (authorProfileCache.has(id))
            return [id, authorProfileCache.get(id) ?? null] as const;
          const profile = await actor.getUser(Principal.fromText(id));
          authorProfileCache.set(id, profile);
          return [id, profile] as const;
        }),
      );
      return Object.fromEntries(entries);
    },
    enabled: !!actor && authorIds.length > 0,
    staleTime: 60_000,
  });

  const profileMap = authorQueries.data ?? {};

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="feed.loading_state">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="bg-card border border-destructive/40 rounded-xl p-10 text-center space-y-3"
        data-ocid="feed.error_state"
      >
        <p className="font-medium text-destructive">Could not load feed</p>
        <Button size="sm" variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div
        className="bg-card border border-border rounded-xl p-12 text-center space-y-4"
        data-ocid="feed.empty_state"
      >
        <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mx-auto">
          <Users className="h-7 w-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold mb-1">Your feed is empty</p>
          <p className="text-sm text-muted-foreground">
            Follow some people to see their posts here.
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            const el = document.getElementById("discover-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          data-ocid="feed.discover_link"
        >
          <UserPlus className="h-3.5 w-3.5 mr-1.5" />
          Discover people
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="feed.list">
      {posts.map((post, i) => (
        <PostCard
          key={post.id.toString()}
          post={post}
          index={i + 1}
          authorProfile={profileMap[post.authorPrincipal.toText()] ?? null}
        />
      ))}
    </div>
  );
}

function FeedContent() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5" data-ocid="feed.page">
      <h1 className="font-display font-bold text-xl">Social Feed</h1>

      <CreatePost />

      <FeedPostList />

      <div id="discover-section">
        <DiscoverUsers />
      </div>
    </div>
  );
}

export function FeedPage() {
  return (
    <AuthGuard>
      <FeedContent />
    </AuthGuard>
  );
}
