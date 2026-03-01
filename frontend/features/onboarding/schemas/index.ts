// Schema de profil
export {
  profilSchema,
  type ProfilInput,
  type ProfilPayload,
} from "./profil.schema";

// Schema de préférences
export {
  preferencesSchema,
  PREFERRED_TYPES,
  PREFERRED_BUDGETS,
  type PreferredType,
  type PreferredBudget,
  type PreferencesInput,
  type PreferencesPayload,
} from "./preferences.schema";

// Schema de couple
export {
  createCoupleSchema,
  joinCoupleSchema,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
  type RelationshipDuration,
  type RelationshipStatus,
  type LivingSituation,
  type CreateCoupleInput,
  type CreateCouplePayload,
  type JoinCoupleInput,
  type JoinCouplePayload,
} from "./couple.schema";
