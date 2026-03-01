import { z } from "zod";

/**
 * Types d'activité préférés
 */
export const PREFERRED_TYPES = ["bouffe", "boire", "activite"] as const;
export type PreferredType = (typeof PREFERRED_TYPES)[number];

/**
 * Budgets préférés
 */
export const PREFERRED_BUDGETS = ["economique", "moyen", "premium"] as const;
export type PreferredBudget = (typeof PREFERRED_BUDGETS)[number];

/**
 * Schema Zod pour la validation des préférences utilisateur
 * Utilisé dans les formulaires d'onboarding (étape préférences)
 */
export const preferencesSchema = z.object({
  preferredTypes: z
    .array(z.enum(PREFERRED_TYPES))
    .min(1, { error: "Sélectionnez au moins un type d'activité" })
    .max(3, { error: "Vous pouvez sélectionner au plus 3 types" }),
  preferredBudget: z.enum(PREFERRED_BUDGETS, {
    error: "Sélectionnez un budget",
  }),
  preferredDistance: z
    .number({ error: "La distance doit être un nombre" })
    .min(1, { error: "La distance minimale est de 1 km" })
    .max(100, { error: "La distance maximale est de 100 km" })
    .int({ error: "La distance doit être un nombre entier" }),
});

export type PreferencesInput = z.input<typeof preferencesSchema>;
export type PreferencesPayload = z.output<typeof preferencesSchema>;

/**
 * Validation d'un champ individuel (utilisée en onChange)
 */
export function validatePreferencesField<K extends keyof PreferencesInput>(
  field: K,
  value: PreferencesInput[K]
): string | undefined {
  const fieldSchema = preferencesSchema.shape[
    field as keyof typeof preferencesSchema.shape
  ];
  const result = fieldSchema.safeParse(value);
  if (result.success) return undefined;

  const firstIssue = result.error.issues?.[0];
  return firstIssue?.message ?? "Erreur de validation";
}

/**
 * Validation globale du formulaire de préférences
 */
export function validatePreferencesForm(value: PreferencesInput) {
  const parsed = preferencesSchema.safeParse(value);
  if (parsed.success) return undefined;

  const { fieldErrors } = parsed.error.flatten();
  return {
    fields: {
      preferredTypes: fieldErrors.preferredTypes?.[0],
      preferredBudget: fieldErrors.preferredBudget?.[0],
      preferredDistance: fieldErrors.preferredDistance?.[0],
    },
  };
}
