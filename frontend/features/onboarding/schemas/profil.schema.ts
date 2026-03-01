import { z } from "zod";

export const profilSchema = z.object({
  name: z
    .string({ error: "Le nom est requis" })
    .trim()
    .min(3, { error: "Minimum 3 caractères" })
    .max(20, { error: "Maximum 20 caractères" }),
  age: z
    .number({ error: "L'âge doit être un nombre" })
    .min(16, { error: "Vous devez avoir au moins 16 ans" })
    .max(99, { error: "Maximum 99 ans" })
    .int({ error: "L'âge doit être un nombre entier" }),
  gender: z.enum(["homme", "femme"], { error: "Veuillez sélectionner un genre" }).optional(),
});

export type ProfilInput = z.input<typeof profilSchema>;
export type ProfilPayload = z.output<typeof profilSchema>;
