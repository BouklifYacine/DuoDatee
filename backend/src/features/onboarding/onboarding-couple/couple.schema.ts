import * as z from "zod";

// ============================================
// Constants partagées (doivent correspondre au frontend)
// ============================================

export const RELATIONSHIP_DURATIONS = [
  "moins_de_6m",
  "six_mois_un_an",
  "un_trois_ans",
  "trois_cinq_ans",
  "cinq_dix_ans",
  "dix_ans_plus",
] as const;

export const RELATIONSHIP_STATUSES = [
  "en_couple",
  "fiances",
  "pacses",
  "maries",
] as const;

export const LIVING_SITUATIONS = [
  "ensemble",
  "separes_proche",
  "separes_loin",
] as const;

// ============================================
// Schema: Création d'un couple
// ============================================

export const createCoupleSchema = z.object({
  relationshipDuration: z.enum(RELATIONSHIP_DURATIONS, {
    error: "Sélectionnez une durée de relation",
  }),
  relationshipStatus: z.enum(RELATIONSHIP_STATUSES, {
    error: "Sélectionnez un statut de relation",
  }),
  livingSituation: z.enum(LIVING_SITUATIONS, {
    error: "Sélectionnez une situation de vie",
  }),
});

export type CreateCoupleInput = z.infer<typeof createCoupleSchema>;

// ============================================
// Schema: Rejoindre un couple
// ============================================

export const joinCoupleSchema = z.object({
  inviteCode: z
    .string({ error: "Le code est requis" })
    .length(6, { error: "Le code doit contenir 6 caractères" }),
});

export type JoinCoupleInput = z.infer<typeof joinCoupleSchema>;

// ============================================
// Schema: Mise à jour du couple (onboarding)
// ============================================

export const updateCoupleSchema = z.object({
  relationshipDuration: z.enum(RELATIONSHIP_DURATIONS),
  relationshipStatus: z.enum(RELATIONSHIP_STATUSES),
  livingSituation: z.enum(LIVING_SITUATIONS),
}).strict();

export type UpdateCoupleInput = z.infer<typeof updateCoupleSchema>;
