// Schema de profil
export {
  profilSchema,
  type ProfilInput,
  type ProfilPayload,
  validateProfilField,
  validateProfilForm,
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
  validatePreferencesField,
  validatePreferencesForm,
} from "./preferences.schema";

// Schema de couple
export {
  coupleOnboardingSchema,
  createCoupleSchema,
  joinCoupleSchema,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
  type RelationshipDuration,
  type RelationshipStatus,
  type LivingSituation,
  type CoupleOnboardingInput,
  type CoupleOnboardingPayload,
  type CreateCoupleInput,
  type CreateCouplePayload,
  type JoinCoupleInput,
  type JoinCouplePayload,
  validateCoupleField,
  validateCoupleForm,
} from "./couple.schema";
