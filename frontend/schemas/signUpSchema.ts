import { z } from "zod";

// Schéma avec trim/toLowerCase intégrés (Zod 4: .trim(), .toLowerCase())
// SignUpInput = z.input (valeurs brutes du formulaire)
// SignUpPayload = z.output (valeurs normalisées pour l'API)
export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Le nom doit contenir au moins 3 caractères" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Email invalide" })),
  password: z
    .string()
    .min(6, { error: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export type SignUpInput = z.input<typeof signUpSchema>;
export type SignUpPayload = z.output<typeof signUpSchema>;

/** Validation globale du formulaire (utilisée au submit) */
export function validateSignUpForm(value: SignUpInput) {
  const parsed = signUpSchema.safeParse(value);
  if (parsed.success) return undefined;

  const { fieldErrors } = parsed.error.flatten();
  return {
    fields: {
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    },
  };
}

/** Validation d'un champ individuel (utilisée en onChange) */
export function validateField<K extends keyof SignUpInput>(
  field: K,
  value: SignUpInput[K]
): string | undefined {
  const fieldSchema = signUpSchema.shape[field as keyof typeof signUpSchema.shape];
  const result = fieldSchema.safeParse(value);
  if (result.success) return undefined;

  const firstIssue = result.error.issues?.[0];
  return firstIssue?.message ?? "Erreur de validation";
}
