import { z } from "zod";

export const PREFERRED_TYPES = ["bouffe", "boire", "activite"] as const;
export const PREFERRED_BUDGETS = ["economique", "moyen", "premium"] as const;

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
    .max(100, { error: "Maximum 100 km" })
    .int({ error: "Nombre entier requis" }),
});

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
