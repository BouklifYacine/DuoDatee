import * as z from "zod";

// ============================================
// Constants partagées
// ============================================

export const GENDERS = ["homme", "femme"] as const;

// ============================================
// Schema: Mise à jour du profil
// ============================================

export const updateProfilSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  age: z.number().min(16).max(99).int().positive(),
  gender: z.enum(GENDERS).optional(),
}).strict();

export type UpdateProfilInput = z.infer<typeof updateProfilSchema>;

// ============================================
// Schema: Finalisation de l'onboarding
// ============================================

export const completeOnboardingSchema = z.object({});

export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
