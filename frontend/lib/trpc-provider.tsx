"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { trpc, trpcUrl } from "./trpc";

/**
 * Parse the cookie JSON stored by Better Auth's expo client in SecureStore
 * and return a valid `cookie` header string.
 *
 * The expo client stores cookies as a JSON object where each key is a cookie
 * name and each value is `{ value: string; expires: string | null }`.
 */
function getStoredCookie(): string {
  if (Platform.OS === "web") return ""; // web uses native cookies

  try {
    const raw = SecureStore.getItem("frontend_cookie");
    if (!raw) return "";

    const parsed: Record<string, { value: string; expires: string | null }> =
      JSON.parse(raw);

    return Object.entries(parsed)
      .filter(([, v]) => !v.expires || new Date(v.expires) > new Date())
      .map(([key, v]) => `${key}=${v.value}`)
      .join("; ");
  } catch {
    return "";
  }
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: trpcUrl,
          headers() {
            const cookie = getStoredCookie();
            return cookie ? { cookie } : {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
