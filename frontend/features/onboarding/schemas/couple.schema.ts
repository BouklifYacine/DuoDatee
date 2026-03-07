import { z } from "zod";

export const RELATIONSHIP_DURATIONS = [
  "moins_de_6m",
  "six_mois_un_an",
  "un_trois_ans",
  "trois_cinq_ans",
  "cinq_dix_ans",
  "dix_ans_plus",
] as const;
export type RelationshipDuration = (typeof RELATIONSHIP_DURATIONS)[number];

export const RELATIONSHIP_STATUSES = [
  "en_couple",
  "fiances",
  "pacses",
  "maries",
] as const;
export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[number];

export const LIVING_SITUATIONS = [
  "ensemble",
  "separes_proche",
  "separes_loin",
] as const;
export type LivingSituation = (typeof LIVING_SITUATIONS)[number];

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

export type CreateCoupleInput = z.input<typeof createCoupleSchema>;
export type CreateCouplePayload = z.output<typeof createCoupleSchema>;

export const joinCoupleSchema = z.object({
  inviteCode: z
    .string({ error: "Le code est requis" })
    .toUpperCase()
    .length(6, { error: "Le code d'invitation doit contenir 6 caractères" })
    .regex(/^[A-Z0-9]+$/, { message: "Le code ne doit contenir que des lettres et chiffres" }),
});

export type JoinCoupleInput = z.input<typeof joinCoupleSchema>;
export type JoinCouplePayload = z.output<typeof joinCoupleSchema>;
