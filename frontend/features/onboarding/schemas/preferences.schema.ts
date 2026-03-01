import { z } from "zod";

export const PREFERRED_TYPES = ["bouffe", "boire", "activite"] as const;
export type PreferredType = (typeof PREFERRED_TYPES)[number];

export const PREFERRED_BUDGETS = ["economique", "moyen", "premium"] as const;
export type PreferredBudget = (typeof PREFERRED_BUDGETS)[number];

export const preferencesSchema = z.object({
  preferredTypes: z
    .array(z.enum(PREFERRED_TYPES), { error: "Requis" })
    .min(1, { error: "Sélectionnez au moins un type d'activité" })
    .max(3, { error: "Vous pouvez sélectionner au plus 3 types" }),
  preferredBudget: z.enum(PREFERRED_BUDGETS, { error: "Sélectionnez un budget" }),
  preferredDistance: z
    .number({ error: "La distance doit être un nombre" })
    .min(1, { error: "La distance minimale est de 1 km" })
    .max(100, { error: "La distance maximale est de 100 km" })
    .int({ error: "La distance doit être un nombre entier" }),
});

export type PreferencesInput = z.input<typeof preferencesSchema>;
export type PreferencesPayload = z.output<typeof preferencesSchema>;
