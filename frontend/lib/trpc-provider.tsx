"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState, useRef } from "react";
import { trpc, trpcUrl } from "./trpc";
import { useSession } from "./auth-client";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const tokenRef = useRef<string | null>(null);

  // Use Better Auth hook to keep track of session state
  const { data } = useSession();

  // Always keep the ref updated with the latest token
  tokenRef.current = data?.session?.token ?? null;

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: trpcUrl,
          headers() {
            return tokenRef.current
              ? { Authorization: `Bearer ${tokenRef.current}` }
              : {};
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
