import { z } from "zod";

// Schéma avec trim/toLowerCase intégrés (Zod 4)
// SignInInput = z.input (valeurs brutes du formulaire)
// SignInPayload = z.output (valeurs normalisées pour l'API)
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Email invalide" })),
  password: z
    .string()
    .min(6, { error: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export type SignInInput = z.input<typeof signInSchema>;
export type SignInPayload = z.output<typeof signInSchema>;

/** Validation d'un champ individuel (utilisée en onChange) */
export function validateField<K extends keyof SignInInput>(
  field: K,
  value: SignInInput[K]
): string | undefined {
  const fieldSchema = signInSchema.shape[field as keyof typeof signInSchema.shape];
  const result = fieldSchema.safeParse(value);
  if (result.success) return undefined;

  const firstIssue = result.error.issues?.[0];
  return firstIssue?.message ?? "Erreur de validation";
}
