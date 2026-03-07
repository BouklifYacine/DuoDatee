import type { z } from "zod";
import type { updateProfilSchema } from "./user.schema";

export type UpdateProfilInput = z.infer<typeof updateProfilSchema>;
