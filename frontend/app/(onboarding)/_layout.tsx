import { Stack } from "expo-router";

/**
 * Layout pour le groupe d'écrans d'onboarding
 * Désactive le header pour avoir une navigation sans barre native
 * La vérification de session et redirection se fait via le Screen component
 */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
