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
  preferredTypes: z.array(z.enum(PREFERRED_TYPES)).min(1).max(3),
  preferredBudget: z.enum(PREFERRED_BUDGETS),
  preferredDistance: z.number().min(1).max(20).int(),
}).strict();

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
