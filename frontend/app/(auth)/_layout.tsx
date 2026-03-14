import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="intro"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F7F0E8" },
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="check-status" />
    </Stack>
  );
}
