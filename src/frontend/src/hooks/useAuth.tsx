import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { useCallback } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: Principal | undefined;
  identity: Identity | undefined;
  login: () => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { loginStatus, login, clear, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success";
  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";

  const principal =
    isAuthenticated && identity ? identity.getPrincipal() : undefined;

  const handleLogin = useCallback(async () => {
    await login();
  }, [login]);

  const handleLogout = useCallback(() => {
    clear();
  }, [clear]);

  return {
    isAuthenticated,
    isLoading,
    principal,
    identity: identity ?? undefined,
    login: handleLogin,
    logout: handleLogout,
  };
}
