import { z } from "zod";

export const updatePreferencesSchema = z.object({
  preferredTypes: z.array(z.enum(["bouffe", "boire", "activite"])).min(1).max(3),
  preferredBudget: z.enum(["economique", "moyen", "premium"]),
  preferredDistance: z.number().min(1).max(100).int(),
}).strict();

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
