import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { signUp } from "@/lib/auth-client";
import { translateAuthError } from "@/lib/auth-errors";
import { authKeys } from "@/lib/query-keys";
import type { SignUpPayload } from "@/schemas/signUpSchema";

export function useSignUpMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.signUp(),
    mutationFn: async (input: SignUpPayload) => {
      const result = await signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      if (result.error) {
        const msg = translateAuthError(result.error.message) || "Inscription impossible";
        throw new Error(msg);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.replace("/sign-in");
    },
  });
}
