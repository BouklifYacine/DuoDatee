/**
 * Factory de clés pour TanStack Query.
 * Centralise les query/mutation keys pour cohérence et invalidation ciblée.
 */

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  signUp: () => [...authKeys.all, "sign-up"] as const,
  signIn: () => [...authKeys.all, "sign-in"] as const,
} as const;
