import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useSession } from "@/lib/auth-client";

/**
 * Layout pour le groupe d'écrans d'onboarding
 * Désactive le header pour avoir une navigation sans barre native
 */
export default function OnboardingLayout() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  useEffect(() => {
    // Attendre que la session soit chargée
    if (sessionPending) {
      return;
    }

    if (!session) {
      // Pas de session, rediriger vers sign-in
      router.replace("/(auth)/sign-in");
      return;
    }

    // Vérifier le statut de l'onboarding
    checkOnboardingStatus();
  }, [session, sessionPending, router]);

  const checkOnboardingStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"}/api/trpc/user.getOnboardingStatus`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result = data.result?.data?.json;

        // Si l'onboarding est déjà terminé, rediriger vers la page d'accueil
        if (result?.hasCompletedOnboarding) {
          router.replace("/(tabs)");
        }
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // En cas d'erreur, rester sur l'onboarding
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
