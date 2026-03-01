import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/lib/auth-client";

export default function CheckOnboardingStatusScreen() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [statusChecked, setStatusChecked] = useState(false);

  useEffect(() => {
    // Attendre que la session soit chargée
    if (sessionPending || statusChecked) {
      return;
    }

    if (!session) {
      // Pas de session, rediriger vers sign-in
      router.replace("/(auth)/sign-in");
      return;
    }

    // La session est disponible, on peut maintenant récupérer le statut onboarding
    // Pour l'instant, rediriger directement vers l'onboarding ou les tabs
    // en se basant sur la session
    fetchOnboardingStatus();
  }, [session, sessionPending, statusChecked, router]);

  const fetchOnboardingStatus = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'}/api/trpc/user.getOnboardingStatus`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        // Extraire le résultat du format tRPC
        const result = data.result?.data?.json;
        
        if (result && !result.hasCompletedOnboarding) {
          router.replace("/(onboarding)/step-1-profil");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        // En cas d'erreur, rediriger vers l'onboarding par défaut
        router.replace("/(onboarding)/step-1-profil");
      }
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
      // En cas d'erreur, rediriger vers l'onboarding par défaut
      router.replace("/(onboarding)/step-1-profil");
    }
    setStatusChecked(true);
  };

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
