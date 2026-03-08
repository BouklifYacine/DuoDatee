import * as z from "zod";

// ============================================
// Constants partagées
// ============================================

export const PREFERRED_TYPES = ["bouffe", "boire", "activite"] as const;
export const PREFERRED_BUDGETS = ["economique", "moyen", "premium"] as const;

// ============================================
// Schema: Mise à jour des préférences
// ============================================

export const updatePreferencesSchema = z.object({
  preferredTypes: z
    .array(z.enum(PREFERRED_TYPES), { error: "Requis" })
    .min(1, { error: "Sélectionnez au moins une activité" })
    .max(3, { error: "Maximum 3 activités" }),
  preferredBudget: z.enum(PREFERRED_BUDGETS, {
    error: "Sélectionnez un budget",
  }),
  preferredDistance: z
    .number({ error: "Requis" })
    .min(1, { error: "Minimum 1 km" })
    .max(20, { error: "Maximum 20 km" })
    .int({ error: "Nombre entier requis" }),
}).strict();

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
