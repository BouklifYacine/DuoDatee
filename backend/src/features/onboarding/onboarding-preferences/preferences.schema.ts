import * as z from "zod";

export const updatePreferencesSchema = z.object({
  preferredTypes: z.array(z.enum(["bouffe", "boire", "activite"])).min(1).max(3),
  preferredBudget: z.enum(["economique", "moyen", "premium"]),
  preferredDistance: z.number().min(1).max(20).int(),
}).strict();
