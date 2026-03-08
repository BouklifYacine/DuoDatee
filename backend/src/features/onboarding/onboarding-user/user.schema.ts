import * as z from "zod";

// ============================================
// Constants partagées
// ============================================

export const GENDERS = ["homme", "femme"] as const;

// ============================================
// Schema: Mise à jour du profil
// ============================================

export const updateProfilSchema = z.object({
  name: z
    .string({ error: "Le nom est requis" })
    .trim()
    .min(3, { error: "Minimum 3 caractères" })
    .max(20, { error: "Maximum 20 caractères" }),
  age: z
    .number({ error: "L'âge doit être un nombre" })
    .min(16, { error: "Vous devez avoir au moins 16 ans" })
    .max(99, { error: "Maximum 99 ans" })
    .int({ error: "L'âge doit être un nombre entier" })
    .positive({ error: "L'âge doit être positif" }),
  gender: z.enum(GENDERS, { error: "Genre invalide" }).optional(),
}).strict();

export type UpdateProfilInput = z.infer<typeof updateProfilSchema>;

// ============================================
// Schema: Finalisation de l'onboarding
// ============================================

export const completeOnboardingSchema = z.object({});

export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
