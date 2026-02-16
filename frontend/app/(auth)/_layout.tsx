import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen name="welcome" options={{ title: "Accueil" }} />
      <Stack.Screen name="sign-in" options={{ title: "Connexion" }} />
      <Stack.Screen name="sign-up" options={{ title: "Inscription" }} />
    </Stack>
  );
}
