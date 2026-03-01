# Plan d'Intégration tRPC - DuoDate

## Vue d'Ensemble

Ce document décrit comment intégrer tRPC dans le projet DuoDate pour remplacer progressivement les routes REST actuelles par des appels TypeScript typés.

---

## 1. Installation Backend

### 1.1 Dépendances à installer

```bash
cd backend
bun add @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod
```

| Package | Rôle |
|---------|------|
| `@trpc/server` | Serveur tRPC (définition des routers) |
| `@trpc/client` | Client pour appeler les procédures |
| `@trpc/react-query` | Hooks React pour tRPC + React Query |
| `@tanstack/react-query` | Gestion d'état (déjà présent frontend, ajouté côté backend pour le type) |
| `zod` | Validation (déjà présent) |

### 1.2 Structure des fichiers à créer

```
backend/src/trpc/
├── index.ts          # Initialisation tRPC + contexte
├── context.ts       # Contexte (session, user)
├── router.ts         # Router principal (appRouter)
└── routes/
    ├── user.ts       # Procédures user (profil)
    ├── preferences.ts # Procédures preferences
    └── couple.ts     # Procédures couple
```

---

## 2. Installation Frontend

### 2.1 Dépendances à installer

```bash
cd frontend
bun add @trpc/client @trpc/react-query @tanstack/react-query
```

### 2.2 Fichiers à créer

```
frontend/lib/
├── trpc.ts           # Client tRPC
└── trpc-provider.tsx # Provider React Query + tRPC

backend/src/           # Copie du router (généré ou partagé)
└── router.ts         # Type AppRouter importé
```

---

## 3. Exemple Backend - Router tRPC

### Fichier: `backend/src/trpc/context.ts`

```typescript
import { auth } from "../../lib/auth";
import type { AuthVariables } from "../middleware/AuthMiddleware";

export type Context = {
  user: AuthVariables["user"];
  session: AuthVariables["session"];
};

export const createContext = async (headers: Headers): Promise<Context> => {
  const session = await auth.api.getSession({ headers });
  
  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
  };
};
```

### Fichier: `backend/src/trpc/index.ts`

```typescript
import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware: require auth
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { user: ctx.user } });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

### Fichier: `backend/src/trpc/routes/user.ts`

```typescript
import { z } from "zod";
import { router, protectedProcedure } from "../index";
import { prisma } from "../../../lib/prisma";

export const userRouter = router({
  // GET /api/user/me
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        avatarPlaceholder: true,
      },
    });
  }),

  // PATCH /api/user/profil
  updateProfil: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.number().min(18).max(80).optional(),
        gender: z.enum(["homme", "femme"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          name: input.name,
          age: input.age,
          gender: input.gender,
        },
        select: {
          id: true,
          name: true,
          age: true,
          gender: true,
        },
      });
    }),
});
```

### Fichier: `backend/src/trpc/router.ts`

```typescript
import { router } from "./index";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  // preferences: preferencesRouter,
  // couple: coupleRouter,
});

export type AppRouter = typeof appRouter;
```

---

## 4. Intégration dans Hono

### Fichier: `backend/src/index.ts` (modifié)

```typescript
import { cors } from "hono/cors";
import { honoTRPC } from "@trpc/server/adapters/hono";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";

// ... existing imports et config CORS ...

// Route tRPC
app.route(
  "/api/trpc",
  honoTRPC({
    router: appRouter,
    createContext,
  })
);

export default app;
```

---

## 5. Exemple Frontend

### Fichier: `frontend/lib/trpc.ts`

```typescript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../backend/src/trpc/router";

// Type importé depuis le backend
export const trpc = createTRPCReact<AppRouter>();
```

### Fichier: `frontend/lib/trpc-provider.tsx`

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./trpc";
import { getAuthToken } from "./auth-client"; // Fonction existante

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          async headers() {
            const token = await getAuthToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
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
```

### Fichier: `frontend/app/_layout.tsx` (modifié)

```typescript
import { TRPCProvider } from "@/lib/trpc-provider";

export default function RootLayout() {
  return (
    <TRPCProvider>
      {/* rest of the app */}
    </TRPCProvider>
  );
}
```

### Exemple d'utilisation dans un écran

```typescript
// frontend/app/(tabs)/index.tsx
import { trpc } from "@/lib/trpc";

export default function HomeScreen() {
  // Appel typé automatique - pas de fetch manuel!
  const { data: user, isLoading } = trpc.user.getMe.useQuery();
  
  const updateMutation = trpc.user.updateProfil.useMutation({
    onSuccess: () => {
      // Invalidation automatique du cache
    },
  });

  if (isLoading) return <Text>Chargement...</Text>;

  return (
    <View>
      <Text>Bonjour {user?.name}</Text>
      <Button
        title="Mettre à jour"
        onPress={() => updateMutation.mutate({ name: "Nouveau nom" })}
      />
    </View>
  );
}
```

---

## 6. Résumé des Fichiers à Créer/Modifier

### Backend (6 fichiers)

| Fichier | Action |
|---------|--------|
| `backend/src/trpc/context.ts` | **Créer** - Contexte avec session |
| `backend/src/trpc/index.ts` | **Créer** - Initialisation tRPC |
| `backend/src/trpc/routes/user.ts` | **Créer** - Router user example |
| `backend/src/trpc/router.ts` | **Créer** - Router principal |
| `backend/src/index.ts` | **Modifier** - Ajouter route tRPC |
| `backend/package.json` | **Modifier** - Ajouter dépendances |

### Frontend (4 fichiers)

| Fichier | Action |
|---------|--------|
| `frontend/lib/trpc.ts` | **Créer** - Client tRPC |
| `frontend/lib/trpc-provider.tsx` | **Créer** - Provider |
| `frontend/app/_layout.tsx` | **Modifier** - Envelopper avec TRPCProvider |
| `frontend/package.json` | **Modifier** - Ajouter dépendances |

---

## 7. Notes Importantes

### Partage du type AppRouter

Pour que le frontend ait les types, deux options:

1. **Monorepo** (recommandé): Partager le dossier `trpc` entre backend et frontend
2. **Copy-paste**: Copier le fichier `router.ts` dans le frontend après chaque changement

### Migration progressive

Vous pouvez garder les routes REST actuelles **en parallèle** de tRPC:
- Routes `/api/onboarding/*` (REST) continuent de fonctionner
- Nouvelles features via tRPC
- Migration graduelle des routes existantes

### Authentification

tRPC utilise déjà Better Auth. Le token JWT est passé dans les headers via le middleware `httpBatchLink`.

---

## 8. Prochaines Étapes

1. [ ] Installer les dépendances backend
2. [ ] Créer les fichiers tRPC backend
3. [ ] Intégrer dans Hono
4. [ ] Installer les dépendances frontend
5. [ ] Créer le client et provider
6. [ ] Tester avec un endpoint example
