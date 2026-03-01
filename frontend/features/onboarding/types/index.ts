/**
 * Types pour l'onboarding frontend
 */

/**
 * Type pour le statut d'onboarding
 */
export type OnboardingStatus = {
  hasName: boolean;
  hasAge: boolean;
  hasGender: boolean;
  hasPreferences: boolean;
  hasCouple: boolean;
  hasCompletedOnboarding: boolean;
};

/**
 * Type pour les données utilisateur
 */
export type UserData = {
  id: string;
  name: string | null;
  email: string;
  age: number | null;
  gender: "homme" | "femme" | null;
  avatarPlaceholder: string | null;
  preferredTypes: string[] | null;
  preferredBudget: string | null;
  preferredDistance: number | null;
  hasCompletedOnboarding: boolean;
  createdAt: Date;
  couple: CoupleData | null;
};

/**
 * Type pour les données du couple
 */
export type CoupleData = {
  id: string;
  inviteCode: string;
  status: string;
  relationshipDuration: string | null;
  relationshipStatus: string | null;
  livingSituation: string | null;
  createdAt: Date;
  members: Array<{
    userId: string;
    role: string;
    joinedAt: Date;
    user: {
      id: string;
      name: string | null;
      avatarPlaceholder: string | null;
    };
  }>;
};

/**
 * Steps de l'onboarding
 */
export type OnboardingStep =
  | "profil"
  | "preferences"
  | "couple"
  | "complete";

/**
 * Configuration d'une étape d'onboarding
 */
export type OnboardingStepConfig = {
  id: OnboardingStep;
  title: string;
  description: string;
  isRequired: boolean;
};
