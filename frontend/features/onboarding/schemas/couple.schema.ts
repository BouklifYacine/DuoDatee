import { z } from "zod";

/**
 * Durée de relation
 */
export const RELATIONSHIP_DURATIONS = [
  "moins_de_6m",
  "six_mois_un_an",
  "un_trois_ans",
  "trois_cinq_ans",
  "cinq_dix_ans",
  "dix_ans_plus",
] as const;
export type RelationshipDuration = (typeof RELATIONSHIP_DURATIONS)[number];

/**
 * Statut de relation
 */
export const RELATIONSHIP_STATUSES = [
  "en_couple",
  "fiances",
  "pacses",
  "maries",
] as const;
export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[number];

/**
 * Situation de vie
 */
export const LIVING_SITUATIONS = ["ensemble", "separes_proche", "separes_loin"] as const;
export type LivingSituation = (typeof LIVING_SITUATIONS)[number];

/**
 * Schema pour la création d'un couple
 */
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

/**
 * Schema pour rejoindre un couple
 */
export const joinCoupleSchema = z.object({
  inviteCode: z
    .string()
    .length(6, { error: "Le code d'invitation doit contenir 6 caractères" })
    .toUpperCase(),
});

export type JoinCoupleInput = z.input<typeof joinCoupleSchema>;
export type JoinCouplePayload = z.output<typeof joinCoupleSchema>;

/**
 * Schema pour les infos couple dans l'onboarding
 * - hasCouple: boolean - l'utilisateur veut-il être en couple?
 * - Si hasCouple = true: les champs relationshipDuration, relationshipStatus, livingSituation sont requis
 * - Si hasCouple = false: ces champs sont optionnels
 * - inviteCode: optionnel pour rejoindre un couple existant
 */
export const coupleOnboardingSchema = z
  .object({
    hasCouple: z.boolean(),
    relationshipDuration: z.enum(RELATIONSHIP_DURATIONS).optional(),
    relationshipStatus: z.enum(RELATIONSHIP_STATUSES).optional(),
    livingSituation: z.enum(LIVING_SITUATIONS).optional(),
    inviteCode: z.string().length(6).optional(),
  })
  .refine(
    (data) => {
      // Si hasCouple est false, pas de validation supplémentaire
      if (!data.hasCouple) return true;

      // Si hasCouple est true et inviteCode est présent, on veut rejoindre
      // donc les autres champs ne sont pas requis
      if (data.inviteCode && data.inviteCode.length === 6) return true;

      // Si hasCouple est true et pas d'inviteCode, les champs sont requis
      return (
        data.relationshipDuration !== undefined &&
        data.relationshipStatus !== undefined &&
        data.livingSituation !== undefined
      );
    },
    {
      message:
        "Veuillez compléter les informations de votre couple ou entrer un code d'invitation",
      path: ["hasCouple"],
    }
  );

export type CoupleOnboardingInput = z.input<typeof coupleOnboardingSchema>;
export type CoupleOnboardingPayload = z.output<typeof coupleOnboardingSchema>;

/**
 * Validation d'un champ individuel (utilisée en onChange)
 */
export function validateCoupleField<K extends keyof CoupleOnboardingInput>(
  field: K,
  value: CoupleOnboardingInput[K]
): string | undefined {
  const fieldSchema =
    coupleOnboardingSchema.shape[field as keyof typeof coupleOnboardingSchema.shape];
  const result = fieldSchema.safeParse(value);
  if (result.success) return undefined;

  const firstIssue = result.error.issues?.[0];
  return firstIssue?.message ?? "Erreur de validation";
}

/**
 * Validation globale du formulaire couple
 */
export function validateCoupleForm(value: CoupleOnboardingInput) {
  const parsed = coupleOnboardingSchema.safeParse(value);
  if (parsed.success) return undefined;

  const { fieldErrors } = parsed.error.flatten();
  return {
    fields: {
      hasCouple: fieldErrors.hasCouple?.[0],
      relationshipDuration: fieldErrors.relationshipDuration?.[0],
      relationshipStatus: fieldErrors.relationshipStatus?.[0],
      livingSituation: fieldErrors.livingSituation?.[0],
      inviteCode: fieldErrors.inviteCode?.[0],
    },
  };
}
