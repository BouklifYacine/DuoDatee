import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { signIn } from "@/lib/auth-client";
import { translateAuthError } from "@/lib/auth-errors";
import { authKeys } from "@/lib/query-keys";
import type { SignInPayload } from "@/schemas/signInSchema";

export function useSignInMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.signIn(),
    mutationFn: async (input: SignInPayload) => {
      const result = await signIn.email({
        email: input.email,
        password: input.password,
      });

      if (result.error) {
        const msg = translateAuthError(result.error) || "Connexion impossible";
        throw new Error(msg);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.replace("/(tabs)");
    },
  });
}

export function useGoogleSignInMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...authKeys.signIn(), "google"] as const,
    mutationFn: async () => {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/(tabs)",
      });

      if (result.error) {
        const msg = translateAuthError(result.error) || "Connexion Google impossible";
        throw new Error(msg);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.replace("/(tabs)");
    },
  });
}
