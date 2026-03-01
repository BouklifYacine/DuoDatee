import { z } from "zod";

/**
 * Schema Zod pour la validation du profil utilisateur
 * Utilisé dans les formulaires d'onboarding (étape profil)
 */
export const profilSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Le nom doit contenir au moins 3 caractères" })
    .max(20, { error: "Le nom doit contenir au plus 20 caractères" }),
  age: z
    .number({ error: "L'âge doit être un nombre" })
    .min(16, { error: "Vous devez avoir au moins 16 ans" })
    .max(99, { error: "L'âge doit être inférieur à 100" })
    .int({ error: "L'âge doit être un nombre entier" }),
  gender: z.enum(["homme", "femme"]).optional(),
});

export type ProfilInput = z.input<typeof profilSchema>;
export type ProfilPayload = z.output<typeof profilSchema>;

/**
 * Validation d'un champ individuel (utilisée en onChange)
 */
export function validateProfilField<K extends keyof ProfilInput>(
  field: K,
  value: ProfilInput[K]
): string | undefined {
  const fieldSchema = profilSchema.shape[field as keyof typeof profilSchema.shape];
  const result = fieldSchema.safeParse(value);
  if (result.success) return undefined;

  const firstIssue = result.error.issues?.[0];
  return firstIssue?.message ?? "Erreur de validation";
}

/**
 * Validation globale du formulaire de profil
 */
export function validateProfilForm(value: ProfilInput) {
  const parsed = profilSchema.safeParse(value);
  if (parsed.success) return undefined;

  const { fieldErrors } = parsed.error.flatten();
  return {
    fields: {
      name: fieldErrors.name?.[0],
      age: fieldErrors.age?.[0],
      gender: fieldErrors.gender?.[0],
    },
  };
}
