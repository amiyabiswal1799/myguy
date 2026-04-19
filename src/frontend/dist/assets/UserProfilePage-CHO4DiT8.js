const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dt8hDOdi.js","assets/index-RlD9NYMs.css"])))=>i.map(i=>d[i]);
import { f as createLucideIcon, s as useParams, j as jsxRuntimeExports, b as useBackend, u as useAuth, i as useQueryClient, t as useUserProfile, c as useQuery, v as useMutation, l as SubscriptionBadge, m as ue, _ as __vitePreload, w as followUser, x as unfollowUser, y as getFollowers, q as getPosts } from "./index-Dt8hDOdi.js";
import { B as Button } from "./button-pf9Upesm.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { U as Users } from "./users-Dw9OmgPX.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
import { U as UserPlus } from "./user-plus-ChgUMU9z.js";
import { F as FileText } from "./file-text-BVyCqqHl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode);
function timeAgo(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function PostCard({ post, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      "data-ocid": `user_profile.post.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed break-words", children: post.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(post.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Number(post.likesCount),
            " likes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Number(post.commentsCount),
            " comments"
          ] })
        ] })
      ]
    }
  );
}
function UserProfileContent({ userId }) {
  var _a;
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useUserProfile(userId);
  const followersQuery = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      return getFollowers(actor, Principal.fromText(userId));
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!userId,
    staleTime: 3e4
  });
  const postsQuery = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      return getPosts(actor, Principal.fromText(userId));
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!userId,
    staleTime: 3e4
  });
  const isFollowing = principal != null && (((_a = followersQuery.data) == null ? void 0 : _a.some((f) => f.toText() === principal.toText())) ?? false);
  const followMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !userId) throw new Error("Not connected");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      return followUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      ue.success(`Following ${(profile == null ? void 0 : profile.name) ?? "user"}`);
    },
    onError: () => ue.error("Could not follow user")
  });
  const unfollowMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !userId) throw new Error("Not connected");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      return unfollowUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      ue.success(`Unfollowed ${(profile == null ? void 0 : profile.name) ?? "user"}`);
    },
    onError: () => ue.error("Could not unfollow user")
  });
  const isOwnProfile = (principal == null ? void 0 : principal.toText()) === userId;
  const isMutating = followMutation.isPending || unfollowMutation.isPending;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-8 space-y-6",
        "data-ocid": "user_profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-24 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" })
        ]
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-16 text-center",
        "data-ocid": "user_profile.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg mb-2", children: "User not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This profile doesn't exist or was removed." })
        ]
      }
    );
  }
  const avatarUrl = profile.avatar ? profile.avatar.getDirectURL() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto px-4 py-8 space-y-5",
      "data-ocid": "user_profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card border border-border rounded-xl p-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-full overflow-hidden bg-secondary border-2 border-border ring-2 ring-primary/20 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: avatarUrl,
                  alt: profile.name,
                  className: "h-full w-full object-cover"
                }
              ) : profile.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl truncate", children: profile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, { tier: profile.tier })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground break-words leading-relaxed", children: profile.bio || "No bio" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: Number(profile.followersCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "followers" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: Number(profile.followingCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "following" })
                  ] })
                ] })
              ] }),
              !isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: isFollowing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => unfollowMutation.mutate(),
                  disabled: isMutating,
                  "data-ocid": "user_profile.unfollow_button",
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "h-3.5 w-3.5" }),
                    "Following"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => followMutation.mutate(),
                  disabled: isMutating,
                  "data-ocid": "user_profile.follow_button",
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
                    "Follow"
                  ]
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "user_profile.posts_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: "Posts" })
          ] }),
          postsQuery.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-3",
              "data-ocid": "user_profile.posts_loading_state",
              children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i))
            }
          ),
          !postsQuery.isLoading && (!postsQuery.data || postsQuery.data.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-10 text-center",
              "data-ocid": "user_profile.posts_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm mb-1", children: "No posts yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  profile.name,
                  " hasn't posted anything yet."
                ] })
              ]
            }
          ),
          postsQuery.data && postsQuery.data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.15 },
              className: "space-y-3",
              "data-ocid": "user_profile.posts_list",
              children: postsQuery.data.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i + 1 }, post.id.toString()))
            }
          )
        ] })
      ]
    }
  );
}
function UserProfilePage() {
  const params = useParams({ from: "/authenticated/profile/$userId" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfileContent, { userId: params.userId }) });
}
export {
  UserProfilePage
};
