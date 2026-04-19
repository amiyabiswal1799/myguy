import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageLoader } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <PageLoader label="Authenticating..." />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
