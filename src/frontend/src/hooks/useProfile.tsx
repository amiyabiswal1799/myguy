import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, registerUser, updateProfile } from "../lib/backend";
import type {
  RegisterInput,
  UpdateProfileInput,
  UserProfile,
} from "../lib/types";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

export function useProfile() {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated, principal } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery<UserProfile | null>({
    queryKey: ["profile", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      const profile = await getUser(actor, principal);
      if (!profile) {
        return registerUser(actor, { name: "New User", bio: "" });
      }
      return profile;
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!principal,
    staleTime: 30_000,
  });

  const updateMutation = useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      if (!actor) throw new Error("Not connected");
      return updateProfile(actor, input);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", principal?.toText()], data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (input: RegisterInput) => {
      if (!actor) throw new Error("Not connected");
      return registerUser(actor, input);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", principal?.toText()], data);
    },
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateProfile: updateMutation.mutate,
    updateProfileAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    registerUser: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
  };
}

export function useUserProfile(userId: string | undefined) {
  const { actor, isFetching: actorLoading } = useBackend();
  const { isAuthenticated } = useAuth();

  return useQuery<UserProfile | null>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal } = await import("@icp-sdk/core/principal");
      return getUser(actor, Principal.fromText(userId));
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!userId,
    staleTime: 60_000,
  });
}
