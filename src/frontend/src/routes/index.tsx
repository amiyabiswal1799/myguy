import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "../components/Layout";
import { PageLoader } from "../components/LoadingSpinner";

// ─── Lazy page imports ────────────────────────────────────────────────────────

const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const FeedPage = lazy(() =>
  import("../pages/FeedPage").then((m) => ({ default: m.FeedPage })),
);
const CompanionsPage = lazy(() =>
  import("../pages/CompanionsPage").then((m) => ({
    default: m.CompanionsPage,
  })),
);
const ChatPage = lazy(() =>
  import("../pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);
const CompanionChatPage = lazy(() =>
  import("../pages/CompanionChatPage").then((m) => ({
    default: m.CompanionChatPage,
  })),
);
const ProfilePage = lazy(() =>
  import("../pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const UserProfilePage = lazy(() =>
  import("../pages/UserProfilePage").then((m) => ({
    default: m.UserProfilePage,
  })),
);
const PricingPage = lazy(() =>
  import("../pages/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const AdminPage = lazy(() =>
  import("../pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

// ─── Root Route ───────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ─── Login route ──────────────────────────────────────────────────────────────

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => withSuspense(LoginPage),
});

// ─── Authenticated layout wrapper ────────────────────────────────────────────

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  component: function AuthenticatedLayout() {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  },
});

// ─── Child routes ─────────────────────────────────────────────────────────────

const indexRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/feed" });
  },
});

const feedRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/feed",
  component: () => withSuspense(FeedPage),
});

const companionsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/companions",
  component: () => withSuspense(CompanionsPage),
});

const chatRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/chat",
  component: () => withSuspense(ChatPage),
});

const companionChatRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/companions/$companionId/chat",
  component: () => withSuspense(CompanionChatPage),
});

const profileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/profile",
  component: () => withSuspense(ProfilePage),
});

const userProfileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/profile/$userId",
  component: () => withSuspense(UserProfilePage),
});

const pricingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/pricing",
  component: () => withSuspense(PricingPage),
});

const adminRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/admin",
  component: () => withSuspense(AdminPage),
});

// ─── Router ───────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  loginRoute,
  authenticatedRoute.addChildren([
    indexRoute,
    feedRoute,
    companionsRoute,
    chatRoute,
    companionChatRoute,
    profileRoute,
    userProfileRoute,
    pricingRoute,
    adminRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: PageLoader,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
