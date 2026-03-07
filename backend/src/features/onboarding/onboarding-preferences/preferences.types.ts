import type { z } from "zod";
import type { updatePreferencesSchema } from "./preferences.schema";

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
