const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dt8hDOdi.js","assets/index-RlD9NYMs.css"])))=>i.map(i=>d[i]);
import { f as createLucideIcon, r as reactExports, j as jsxRuntimeExports, J as shimExports, e as cn, b as useBackend, i as useQueryClient, h as useProfile, u as useAuth, c as useQuery, v as useMutation, K as createPost, m as ue, M as MessageCircle, _ as __vitePreload, w as followUser, L as likePost, N as commentPost, O as getComments, Q as adminGetUsers, T as getFeedPosts } from "./index-Dt8hDOdi.js";
import { u as useCallbackRef, a as useLayoutEffect2 } from "./index-bC7JCErz.js";
import { P as Primitive } from "./index-JjWPR4Ah.js";
import { B as Button } from "./button-pf9Upesm.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { T as Textarea } from "./textarea-D9sDvIRh.js";
import { U as Users } from "./users-Dw9OmgPX.js";
import { U as UserPlus } from "./user-plus-ChgUMU9z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage$1.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Image = AvatarImage$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function timeAgo(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function avatarInitials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function getAvatarUrl(profile) {
  if (!(profile == null ? void 0 : profile.avatar)) return void 0;
  try {
    return profile.avatar.getDirectURL();
  } catch {
    return void 0;
  }
}
function CommentSection({
  postId,
  index
}) {
  const { actor } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return getComments(actor, postId);
    },
    enabled: !!actor && isAuthenticated
  });
  const handleSubmit = async () => {
    if (!actor || !text.trim()) return;
    setSubmitting(true);
    try {
      await commentPost(actor, postId, { content: text.trim() });
      setText("");
      queryClient.invalidateQueries({
        queryKey: ["comments", postId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      ue.success("Comment added");
    } catch {
      ue.error("Could not add comment");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-t border-border pt-4 mt-1 space-y-3",
      "data-ocid": `feed.comment_section.${index}`,
      children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-6 rounded-full flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-lg" })
        ] }, i)) }),
        !isLoading && comments && comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: comments.map((c, ci) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 items-start",
            "data-ocid": `feed.comment.${index}.item.${ci + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground", children: c.authorPrincipal.toText().slice(0, 2).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-secondary/50 rounded-lg px-3 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed break-words", children: c.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: timeAgo(c.createdAt) })
              ] })
            ]
          },
          c.id.toString()
        )) }),
        !isLoading && (!comments || comments.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No comments yet — be the first!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: text,
              onChange: (e) => setText(e.target.value),
              placeholder: "Add a comment…",
              rows: 1,
              className: "flex-1 resize-none min-h-[36px] text-sm bg-input border-border",
              "data-ocid": `feed.comment_input.${index}`,
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "secondary",
              onClick: handleSubmit,
              disabled: !text.trim() || submitting,
              "data-ocid": `feed.comment_submit.${index}`,
              className: "flex-shrink-0 h-9",
              children: submitting ? "…" : "Send"
            }
          )
        ] })
      ]
    }
  );
}
function PostCard({
  post,
  index,
  authorProfile
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [liked, setLiked] = reactExports.useState(false);
  const [showComments, setShowComments] = reactExports.useState(false);
  const handleLike = async () => {
    if (!actor || liked) return;
    try {
      await likePost(actor, post.id);
      setLiked(true);
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    } catch {
      ue.error("Could not like post");
    }
  };
  const authorId = post.authorPrincipal.toText();
  const displayName = (authorProfile == null ? void 0 : authorProfile.name) ?? "Unknown user";
  const avatarUrl = getAvatarUrl(authorProfile);
  const likeCount = Number(post.likesCount) + (liked ? 1 : 0);
  const commentCount = Number(post.commentsCount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-3 transition-smooth hover:border-border/80",
      "data-ocid": `feed.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `/profile/${authorId}`,
              onClick: (e) => {
                e.preventDefault();
                window.location.href = `/profile/${authorId}`;
              },
              className: "flex-shrink-0",
              "data-ocid": `feed.author_avatar.${index}`,
              "aria-label": `View ${displayName}'s profile`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-1 ring-border", children: [
                avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl, alt: displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-xs font-bold text-muted-foreground", children: avatarInitials(displayName) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `/profile/${authorId}`,
                onClick: (e) => {
                  e.preventDefault();
                  window.location.href = `/profile/${authorId}`;
                },
                className: "text-sm font-semibold hover:text-primary transition-colors truncate block",
                "data-ocid": `feed.author_link.${index}`,
                children: displayName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: timeAgo(post.createdAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed break-words whitespace-pre-wrap", children: post.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 pt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleLike,
              "data-ocid": `feed.like_button.${index}`,
              "aria-label": liked ? "Liked" : "Like post",
              className: `flex items-center gap-1.5 text-sm transition-colors group ${liked ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: `h-4 w-4 transition-transform group-hover:scale-110 ${liked ? "fill-current" : ""}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: likeCount })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowComments((v) => !v),
              "data-ocid": `feed.comment_button.${index}`,
              "aria-label": showComments ? "Hide comments" : "Show comments",
              className: `flex items-center gap-1.5 text-sm transition-colors ${showComments ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: commentCount })
              ]
            }
          )
        ] }),
        showComments && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentSection, { postId: post.id, index })
      ]
    }
  );
}
function PostSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 pt-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10" })
    ] })
  ] });
}
const MAX_CHARS = 280;
function CreatePost() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const { profile } = useProfile();
  const [content, setContent] = reactExports.useState("");
  const [posting, setPosting] = reactExports.useState(false);
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
      ue.success("Post shared!");
    } catch {
      ue.error("Could not create post");
    } finally {
      setPosting(false);
    }
  };
  const avatarUrl = getAvatarUrl(profile);
  const displayName = (profile == null ? void 0 : profile.name) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-3",
      "data-ocid": "feed.create_post.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 flex-shrink-0 ring-1 ring-border", children: [
            avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl, alt: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-xs font-bold text-muted-foreground", children: displayName ? avatarInitials(displayName) : "?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: content,
              onChange: (e) => setContent(e.target.value.slice(0, MAX_CHARS + 10)),
              placeholder: "What's on your mind?",
              rows: 2,
              className: "flex-1 resize-none bg-input border-border text-sm min-h-[72px]",
              "data-ocid": "feed.post_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs tabular-nums ${isOver ? "text-destructive font-semibold" : isNearLimit ? "text-amber-400" : "text-muted-foreground"}`,
              children: charsLeft < 0 ? `${Math.abs(charsLeft)} over limit` : `${charsLeft} remaining`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handlePost,
              disabled: !content.trim() || posting || isOver,
              "data-ocid": "feed.post_submit_button",
              size: "sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-3.5 w-3.5 mr-1.5" }),
                posting ? "Posting…" : "Post"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DiscoverUsers() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const queryClient = useQueryClient();
  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["discover-users"],
    queryFn: async () => {
      if (!actor) return [];
      return adminGetUsers(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    staleTime: 6e4
  });
  const followMutation = useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      await followUser(actor, Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discover-users"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      ue.success("Followed!");
    },
    onError: () => ue.error("Could not follow user")
  });
  const [followedIds, setFollowedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const handleFollow = reactExports.useCallback(
    (userId) => {
      if (followedIds.has(userId)) return;
      setFollowedIds((prev) => new Set(prev).add(userId));
      followMutation.mutate(userId);
    },
    [followedIds, followMutation]
  );
  const myId = principal == null ? void 0 : principal.toText();
  const suggestions = (allUsers ?? []).filter((u) => u.id.toText() !== myId && !u.isBanned).filter((u) => !followedIds.has(u.id.toText())).slice(0, 6);
  if (!isLoading && suggestions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-4",
      "data-ocid": "feed.discover_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Discover People" })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" })
        ] }, i)) }),
        !isLoading && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: suggestions.map((user, i) => {
          const avatarUrl = getAvatarUrl(user);
          const initials = avatarInitials(user.name);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3",
              "data-ocid": `feed.discover_user.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `/profile/${user.id.toText()}`,
                    onClick: (e) => {
                      e.preventDefault();
                      window.location.href = `/profile/${user.id.toText()}`;
                    },
                    className: "flex-shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-1 ring-border", children: [
                      avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl, alt: user.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-xs font-bold text-muted-foreground", children: initials })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `/profile/${user.id.toText()}`,
                      onClick: (e) => {
                        e.preventDefault();
                        window.location.href = `/profile/${user.id.toText()}`;
                      },
                      className: "text-sm font-medium hover:text-primary transition-colors truncate block",
                      "data-ocid": `feed.discover_user_link.${i + 1}`,
                      children: user.name
                    }
                  ),
                  user.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.bio })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "secondary",
                    className: "flex-shrink-0 h-8 text-xs",
                    onClick: () => handleFollow(user.id.toText()),
                    disabled: followedIds.has(user.id.toText()),
                    "data-ocid": `feed.follow_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3 w-3 mr-1" }),
                      "Follow"
                    ]
                  }
                )
              ]
            },
            user.id.toText()
          );
        }) })
      ]
    }
  );
}
const authorProfileCache = /* @__PURE__ */ new Map();
function FeedPostList() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  const {
    data: posts,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      if (!actor) return [];
      return getFeedPosts(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    refetchInterval: 3e4
  });
  const authorIds = Array.from(
    new Set((posts ?? []).map((p) => p.authorPrincipal.toText()))
  );
  const authorQueries = useQuery({
    queryKey: ["feed-authors", authorIds.join(",")],
    queryFn: async () => {
      if (!actor || authorIds.length === 0) return {};
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Dt8hDOdi.js").then((n) => n.a5);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      const entries = await Promise.all(
        authorIds.map(async (id) => {
          if (authorProfileCache.has(id))
            return [id, authorProfileCache.get(id) ?? null];
          const profile = await actor.getUser(Principal.fromText(id));
          authorProfileCache.set(id, profile);
          return [id, profile];
        })
      );
      return Object.fromEntries(entries);
    },
    enabled: !!actor && authorIds.length > 0,
    staleTime: 6e4
  });
  const profileMap = authorQueries.data ?? {};
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "feed.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {}, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-destructive/40 rounded-xl p-10 text-center space-y-3",
        "data-ocid": "feed.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-destructive", children: "Could not load feed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", onClick: () => refetch(), children: "Try again" })
        ]
      }
    );
  }
  if (!posts || posts.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-12 text-center space-y-4",
        "data-ocid": "feed.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-secondary flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-7 w-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Your feed is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Follow some people to see their posts here." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "secondary",
              onClick: () => {
                const el = document.getElementById("discover-section");
                el == null ? void 0 : el.scrollIntoView({ behavior: "smooth" });
              },
              "data-ocid": "feed.discover_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Discover people"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "feed.list", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    PostCard,
    {
      post,
      index: i + 1,
      authorProfile: profileMap[post.authorPrincipal.toText()] ?? null
    },
    post.id.toString()
  )) });
}
function FeedContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 py-6 space-y-5", "data-ocid": "feed.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl", children: "Social Feed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePost, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedPostList, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "discover-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverUsers, {}) })
  ] });
}
function FeedPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedContent, {}) });
}
export {
  FeedPage
};
