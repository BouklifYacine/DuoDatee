import { trpc } from "@/lib/trpc";
import type {
  ProfilInput,
  PreferencesInput,
  CreateCoupleInput,
  JoinCoupleInput,
} from "../schemas";
import type {
  OnboardingStatus,
  UserData,
  CoupleData,
} from "../types";

/**
 * Hook central pour gérer l'onboarding
 * Gère les queries et mutations tRPC pour:
 * - Les données utilisateur
 * - Le statut d'onboarding
 * - Les informations du couple
 * - Les mises à jour de profil, préférences
 * - La création et rejoindre un couple
 * - La finalisation de l'onboarding
 */
export function useOnboarding() {
  // Utils tRPC pour l'invalidation des queries
  const utils = trpc.useUtils();

  // ========== QUERIES ==========

  /** Données utilisateur connecté */
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = trpc.user.getMe.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /** Statut de l'onboarding */
  const {
    data: status,
    isLoading: isLoadingStatus,
    error: statusError,
  } = trpc.user.getOnboardingStatus.useQuery(undefined, {
    staleTime: 1000 * 60, // 1 minute
  });

  /** Données du couple */
  const {
    data: couple,
    isLoading: isLoadingCouple,
    error: coupleError,
  } = trpc.couple.getMyCouple.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ========== MUTATIONS ==========

  /** Mise à jour du profil */
  const updateProfilMutation = trpc.user.updateProfil.useMutation({
    onSuccess: () => {
      // Invalider les queries pertinentes
      utils.user.getMe.invalidate();
      utils.user.getOnboardingStatus.invalidate();
    },
  });

  /** Mise à jour des préférences */
  const updatePreferencesMutation = trpc.user.updatePreferences.useMutation({
    onSuccess: () => {
      // Invalider les queries pertinentes
      utils.user.getMe.invalidate();
      utils.user.getOnboardingStatus.invalidate();
    },
  });

  /** Création d'un couple */
  const createCoupleMutation = trpc.couple.create.useMutation({
    onSuccess: () => {
      // Invalider les queries pertinentes
      utils.user.getMe.invalidate();
      utils.user.getOnboardingStatus.invalidate();
      utils.couple.getMyCouple.invalidate();
    },
  });

  /** Rejoindre un couple */
  const joinCoupleMutation = trpc.couple.join.useMutation({
    onSuccess: () => {
      // Invalider les queries pertinentes
      utils.user.getMe.invalidate();
      utils.user.getOnboardingStatus.invalidate();
      utils.couple.getMyCouple.invalidate();
    },
  });

  /** Finalisation de l'onboarding */
  const completeOnboardingMutation = trpc.user.completeOnboarding.useMutation({
    onSuccess: () => {
      // Invalider les queries pertinentes
      utils.user.getMe.invalidate();
      utils.user.getOnboardingStatus.invalidate();
    },
  });

  // ========== COMPUTED VALUES ==========

  /** État de chargement global */
  const isLoading = isLoadingUser || isLoadingStatus || isLoadingCouple;

  /** État d'erreur global */
  const error = userError || statusError || coupleError;

  /** Mutation en cours (pour indicateurs de chargement) */
  const isUpdating =
    updateProfilMutation.isPending ||
    updatePreferencesMutation.isPending ||
    createCoupleMutation.isPending ||
    joinCoupleMutation.isPending ||
    completeOnboardingMutation.isPending;

  // ========== WRAPPER FUNCTIONS ==========

  /**
   * Mise à jour du profil utilisateur
   */
  async function updateProfil(data: ProfilInput) {
    return updateProfilMutation.mutateAsync(data);
  }

  /**
   * Mise à jour des préférences utilisateur
   */
  async function updatePreferences(data: PreferencesInput) {
    return updatePreferencesMutation.mutateAsync(data);
  }

  /**
   * Création d'un nouveau couple
   */
  async function createCouple(data: CreateCoupleInput) {
    return createCoupleMutation.mutateAsync(data);
  }

  /**
   * Rejoindre un couple existant par code d'invitation
   */
  async function joinCouple(data: JoinCoupleInput) {
    return joinCoupleMutation.mutateAsync(data);
  }

  /**
   * Finalisation de l'onboarding
   */
  async function completeOnboarding() {
    return completeOnboardingMutation.mutateAsync({});
  }

  // ========== RETURN ==========

  return {
    // Données
    user: user as UserData | undefined,
    status: status as OnboardingStatus | undefined,
    couple: couple as CoupleData | undefined,

    // États de chargement
    isLoading,
    isUpdating,

    // Erreurs
    error,

    // Fonctions de mutation
    updateProfil,
    updatePreferences,
    createCouple,
    joinCouple,
    completeOnboarding,

    // États de mutation individuels (pour des usages avancés)
    mutations: {
      updateProfil: updateProfilMutation,
      updatePreferences: updatePreferencesMutation,
      createCouple: createCoupleMutation,
      joinCouple: joinCoupleMutation,
      completeOnboarding: completeOnboardingMutation,
    },
  };
}
