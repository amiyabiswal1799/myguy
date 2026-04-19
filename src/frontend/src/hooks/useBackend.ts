import { useActor as useActorBase } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { Backend } from "../backend";

/**
 * Typed useActor hook pre-bound to our Backend class.
 * Use this everywhere instead of importing useActor directly.
 */
export function useBackend(): { actor: Backend | null; isFetching: boolean } {
  return useActorBase(createActor);
}
