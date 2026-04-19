import { f as createLucideIcon, j as jsxRuntimeExports, b as useBackend, u as useAuth, h as useProfile, i as useQueryClient, r as reactExports, c as useQuery, k as SubscriptionTier, l as SubscriptionBadge, m as ue, E as ExternalBlob, n as updateAvatar, o as getSubscriptionStatus, p as getAIUsageCount, q as getPosts } from "./index-Dt8hDOdi.js";
import { B as Button } from "./button-pf9Upesm.js";
import { L as Label, I as Input } from "./label-D7bd6oay.js";
import { A as AuthGuard, S as Skeleton } from "./AuthGuard-B7IR-Oad.js";
import { T as Textarea } from "./textarea-D9sDvIRh.js";
import { m as motion } from "./proxy-BpMOHf0j.js";
import { U as Users } from "./users-Dw9OmgPX.js";
import { F as FileText } from "./file-text-BVyCqqHl.js";
import "./index-JjWPR4Ah.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
const FREE_TIER_LIMIT = 10;
function timeAgo(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function AvatarUpload({
  name,
  avatarUrl,
  onUploaded
}) {
  const { actor } = useBackend();
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const handleFile = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !actor) return;
    setUploading(true);
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setProgress(pct)
      );
      await updateAvatar(actor, blob);
      ue.success("Avatar updated!");
      onUploaded();
    } catch {
      ue.error("Failed to upload avatar");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", "data-ocid": "profile.avatar_upload", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-full overflow-hidden bg-secondary border-2 border-border ring-2 ring-primary/20 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avatarUrl,
        alt: name,
        className: "h-full w-full object-cover"
      }
    ) : name.charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        disabled: uploading,
        "aria-label": "Change avatar",
        "data-ocid": "profile.avatar_upload_button",
        className: "absolute inset-0 rounded-full bg-background/70 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center cursor-pointer",
        children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
          progress,
          "%"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFile,
        "aria-label": "Upload avatar image"
      }
    )
  ] });
}
function EditProfileForm({
  currentName,
  currentBio,
  onSave,
  onCancel,
  saving
}) {
  const [name, setName] = reactExports.useState(currentName);
  const [bio, setBio] = reactExports.useState(currentBio);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -6 },
      animate: { opacity: 1, y: 0 },
      className: "bg-card border border-border rounded-xl p-5 space-y-4",
      "data-ocid": "profile.edit_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm", children: "Edit Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pname", className: "text-xs text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pname",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your name",
              maxLength: 60,
              "data-ocid": "profile.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pbio", className: "text-xs text-muted-foreground", children: "Bio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pbio",
              value: bio,
              onChange: (e) => setBio(e.target.value),
              placeholder: "Tell people about yourself",
              maxLength: 200,
              rows: 3,
              className: "resize-none",
              "data-ocid": "profile.bio_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onCancel,
              "data-ocid": "profile.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => onSave(name.trim(), bio.trim()),
              disabled: saving || !name.trim(),
              "data-ocid": "profile.save_button",
              children: saving ? "Saving…" : "Save changes"
            }
          )
        ] })
      ]
    }
  );
}
function PostCard({ post, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      "data-ocid": `profile.post.${index}`,
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
function ProfileContent() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const { profile, isLoading, updateProfileAsync, isUpdating, refetch } = useProfile();
  const queryClient = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const { data: tier } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return SubscriptionTier.free;
      return getSubscriptionStatus(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated
  });
  const { data: usageCount } = useQuery({
    queryKey: ["ai_usage"],
    queryFn: async () => {
      if (!actor) return 0n;
      return getAIUsageCount(actor);
    },
    enabled: !!actor && !actorLoading && isAuthenticated
  });
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["my_posts", principal == null ? void 0 : principal.toText()],
    queryFn: async () => {
      if (!actor || !principal) return [];
      return getPosts(actor, principal);
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!principal,
    staleTime: 3e4
  });
  const handleSave = async (name, bio) => {
    try {
      await updateProfileAsync({ name, bio });
      setEditing(false);
      ue.success("Profile updated!");
    } catch {
      ue.error("Could not save profile");
    }
  };
  const handleAvatarUploaded = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };
  const isPro = (tier ?? (profile == null ? void 0 : profile.tier)) === SubscriptionTier.pro;
  const usageNum = Number(usageCount ?? 0n);
  const usagePct = Math.min(usageNum / FREE_TIER_LIMIT * 100, 100);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-8 space-y-6",
        "data-ocid": "profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-24 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" })
        ]
      }
    );
  }
  if (!profile) return null;
  const avatarUrl = profile.avatar ? profile.avatar.getDirectURL() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto px-4 py-8 space-y-5",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card border border-border rounded-xl p-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarUpload,
                {
                  name: profile.name,
                  avatarUrl,
                  onUploaded: handleAvatarUploaded
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl truncate", children: profile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionBadge, { tier: tier ?? profile.tier })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground break-words leading-relaxed", children: profile.bio || "No bio yet" }),
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
              !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setEditing(true),
                  "data-ocid": "profile.edit_button",
                  className: "flex-shrink-0",
                  children: "Edit"
                }
              )
            ] })
          }
        ),
        editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditProfileForm,
          {
            currentName: profile.name,
            currentBio: profile.bio,
            onSave: handleSave,
            onCancel: () => setEditing(false),
            saving: isUpdating
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "AI Messages Today" }),
            isPro ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-medium", children: "Unlimited" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              usageNum,
              " / ",
              FREE_TIER_LIMIT
            ] })
          ] }),
          !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-500",
              style: { width: `${usagePct}%` }
            }
          ) }),
          !isPro && usageNum >= FREE_TIER_LIMIT && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Daily limit reached.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", className: "text-primary underline", children: "Upgrade to Pro" }),
            " ",
            "for unlimited messages."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "profile.posts_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: "Posts" })
          ] }),
          postsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.posts_loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }),
          !postsLoading && (!posts || posts.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-10 text-center",
              "data-ocid": "profile.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm mb-1", children: "No posts yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share something on the feed to see it here." })
              ]
            }
          ),
          posts && posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.posts_list", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i + 1 }, post.id.toString())) })
        ] })
      ]
    }
  );
}
function ProfilePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileContent, {}) });
}
export {
  ProfilePage
};
