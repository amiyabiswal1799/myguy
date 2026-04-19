import { j as jsxRuntimeExports, e as cn, u as useAuth, a as useNavigate, r as reactExports, P as PageLoader } from "./index-Dt8hDOdi.js";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Authenticating..." });
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  AuthGuard as A,
  Skeleton as S
};
