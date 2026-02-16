import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

function getBaseURL(): string {
  const envURL = process.env.EXPO_PUBLIC_API_URL;
  if (envURL) return envURL;

  if (Platform.OS === "web") return "http://localhost:3000";

  const hostUri =
    (Constants.expoConfig as { hostUri?: string } | null)?.hostUri ??
    (Constants as unknown as { manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } } })
      .manifest2?.extra?.expoGo?.debuggerHost;

  const host = hostUri?.split(":")[0];
  if (host) return `http://${host}:3000`;

  if (Platform.OS === "android") return "http://10.0.2.2:3000";

  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [
    expoClient({
      scheme: "frontend",
      storagePrefix: "frontend",
      storage: SecureStore,
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
