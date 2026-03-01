import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";

export default function CheckOnboardingStatusScreen() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [statusChecked, setStatusChecked] = useState(false);

  // Use tRPC to fetch onboarding status safely
  const {
    data: status,
    isLoading: statusLoading,
    isError
  } = trpc.user.getOnboardingStatus.useQuery(undefined, {
    enabled: !!session && !statusChecked,
    retry: 1,
  });

  useEffect(() => {
    if (sessionPending || statusChecked) {
      return;
    }

    if (!session) {
      // No session, redirect to sign-in
      router.replace("/(auth)/sign-in");
      return;
    }

    // Wait until tRPC query finishes
    if (statusLoading) {
      return;
    }

    // Determine navigation destination
    if (isError || (status && !status.hasCompletedOnboarding)) {
      router.replace("/(onboarding)/step-1-profil");
    } else if (status && status.hasCompletedOnboarding) {
      router.replace("/(tabs)");
    }

    // Mark as checked to prevent loops
    if (!statusLoading) {
      setStatusChecked(true);
    }
  }, [session, sessionPending, statusChecked, router, status, statusLoading, isError]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
