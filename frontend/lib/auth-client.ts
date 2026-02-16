import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getBaseURL = () => {
  const envBaseURL = process.env.EXPO_PUBLIC_API_URL;
  const hostUri =
    (Constants.expoConfig as { hostUri?: string } | null)?.hostUri ??
    (Constants as unknown as { manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } } })
      .manifest2?.extra?.expoGo?.debuggerHost;

  if (envBaseURL) {
    return { baseURL: envBaseURL, source: "env", hostUri };
  }

  if (Platform.OS === "web") {
    return { baseURL: "http://localhost:3000", source: "web-default", hostUri };
  }

  // Expo Go usually exposes the dev server host here (e.g. "192.168.1.12:8081").
  const host = hostUri?.split(":")[0];
  if (host) {
    return { baseURL: `http://${host}:3000`, source: "expo-host-uri", hostUri };
  }

  // Android emulator special localhost mapping.
  if (Platform.OS === "android") {
    return { baseURL: "http://10.0.2.2:3000", source: "android-emulator", hostUri };
  }

  return { baseURL: "http://localhost:3000", source: "fallback-localhost", hostUri };
};

const authRuntimeConfig = getBaseURL();
console.log("[auth-client] runtime", {
  platform: Platform.OS,
  source: authRuntimeConfig.source,
  hostUri: authRuntimeConfig.hostUri,
  baseURL: authRuntimeConfig.baseURL,
  envBaseURL: process.env.EXPO_PUBLIC_API_URL ?? null,
});

export const authClient = createAuthClient({
    baseURL: authRuntimeConfig.baseURL,
    plugins: [
        expoClient({
            scheme: "frontend",
            storagePrefix: "frontend",
            storage: SecureStore,
        })
    ]
});



export const { signIn, signUp, signOut, useSession } = authClient