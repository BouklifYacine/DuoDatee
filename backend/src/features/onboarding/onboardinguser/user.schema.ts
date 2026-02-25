import * as z from "zod";

export const updateProfilSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  age: z.number().min(16).max(99).int().positive(),
  gender: z.enum(["male", "female"])
}).strict();

export type UpdateProfilSchema = z.infer<typeof updateProfilSchema>;
