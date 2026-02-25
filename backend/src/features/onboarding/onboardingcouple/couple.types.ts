import type { z } from "zod";
import type { updateCoupleSchema } from "./couple.schema";

export type UpdateCoupleInput = z.infer<typeof updateCoupleSchema>;
