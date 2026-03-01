import { createTRPCReact } from "@trpc/react-query";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Type importé directement du backend (chemin relatif)
import type { AppRouter } from "../../backend/src/trpc/router";

function getBaseURL(): string {
  const envURL = process.env.EXPO_PUBLIC_API_URL;
  if (envURL) return envURL;

  if (Platform.OS === "web") return "http://localhost:3000";

  const hostUri =
    (Constants.expoConfig as { hostUri?: string } | null)?.hostUri ??
    (Constants as unknown as {
      manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } };
    }).manifest2?.extra?.expoGo?.debuggerHost;

  const host = hostUri?.split(":")[0];
  if (host) return `http://${host}:3000`;

  if (Platform.OS === "android") return "http://10.0.2.2:3000";

  return "http://localhost:3000";
}

export const trpc = createTRPCReact<AppRouter>();

export const trpcUrl = `${getBaseURL()}/api/trpc`;
