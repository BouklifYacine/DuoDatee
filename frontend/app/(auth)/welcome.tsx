import { useRouter } from "expo-router";
import { View } from "react-native";

import {
  AUTH_INTRO_THEME,
  AuthWelcomePanel,
} from "@/components/auth/auth-welcome-panel";

export default function AuthWelcomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: AUTH_INTRO_THEME.background,
      }}
    >
      <AuthWelcomePanel
        onSignIn={() => router.push("/sign-in")}
        onSignUp={() => router.push("/sign-up")}
      />
    </View>
  );
}
