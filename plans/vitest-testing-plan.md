# Plan de Tests Vitest - DuoDate Backend

## Objectif
Atteindre ~90% de coverage sur les éléments importants du projet.

---

## Structure des Tests

```
backend/
├── vitest.config.ts          # Configuration Vitest
├── src/
│   ├── features/
│   │   └── onboarding/
│   │       ├── __tests__/
│   │       │   ├── user.schema.test.ts
│   │       │   ├── preferences.schema.test.ts
│   │       │   ├── couple.schema.test.ts
│   │       │   ├── user.services.test.ts
│   │       │   ├── preferences.services.test.ts
│   │       │   ├── couple.services.test.ts
│   │       │   └── status.services.test.ts
│   ├── trpc/
│   │   └── schemas/
│   │       └── __tests__/
│   │           ├── user.schema.test.ts
│   │           ├── preferences.schema.test.ts
│   │           └── couple.schema.test.ts
│   └── middleware/
│       └── __tests__/
│           └── auth.middleware.test.ts
```

---

## Étape 1: Configuration Vitest

### 1.1 Créer `vitest.config.ts`
- Configurer test environment: node
- Configurer coverage: v8 (ou threshold à 90%)
- Setup file pour mocks Prisma

### 1.2 Créer `src/setup/test-setup.ts`
- Mock de Prisma Client
- Mock de Better Auth
- Helpers de test réutilisables

---

## Étape 2: Tests des Schemas Zod (Priorité HAUTE)

### 2.1 Schemas Onboarding
- **[`backend/src/features/onboarding/onboardinguser/user.schema.ts`](backend/src/features/onboarding/onboardinguser/user.schema.ts:1)** - Tests pour `updateProfilSchema`
  - Validation name: min 3, max 20, trim
  - Validation age: min 16, max 99, entier positif
  - Validation gender: enum optionnel
  - Cas invalides et messages d'erreur

- **[`backend/src/features/onboarding/onboardingpreferences/preferences.schema.ts`](backend/src/features/onboarding/onboardingpreferences/preferences.schema.ts:1)** - Tests pour `updatePreferencesSchema`
  - Validation preferredTypes: array min 1, max 3, valeurs valides
  - Validation preferredBudget: enum
  - Validation preferredDistance: min 1, max 20

- **[`backend/src/features/onboarding/onboardingcouple/couple.schema.ts`](backend/src/features/onboarding/onboardingcouple/couple.schema.ts:1)** - Tests pour `updateCoupleSchema`
  - Validation relationshipDuration: enum
  - Validation relationshipStatus: enum
  - Validation livingSituation: enum

### 2.2 Schemas tRPC
- **[`backend/src/trpc/schemas/user.schema.ts`](backend/src/trpc/schemas/user.schema.ts:1)** - Tests pour `updateProfilSchema` et `completeOnboardingSchema`
- **[`backend/src/trpc/schemas/preferences.schema.ts`](backend/src/trpc/schemas/preferences.schema.ts:1)** - Tests pour `updatePreferencesSchema`
- **[`backend/src/trpc/schemas/couple.schema.ts`](backend/src/trpc/schemas/couple.schema.ts:1)** - Tests pour `createCoupleSchema` et `joinCoupleSchema`

---

## Étape 3: Tests des Services (Priorité HAUTE)

### 3.1 UserService ([`user.services.ts`](backend/src/features/onboarding/onboardinguser/user.services.ts:1))
- Test: `updateProfil` avec données valides
- Test: `updateProfil` avec données partielles
- Test: gestion erreur utilisateur inexistant (mock Prisma)

### 3.2 PreferencesService ([`preferences.services.ts`](backend/src/features/onboarding/onboardingpreferences/preferences.services.ts:1))
- Test: `update` avec préférences valides
- Test: mise à jour partielle

### 3.3 CoupleService ([`couple.services.ts`](backend/src/features/onboarding/onboardingcouple/couple.services.ts:1))
- Test: `updateOnboarding` - nouveau couple
- Test: `updateOnboarding` - couple existant
- Test: transaction et marquage hasCompletedOnboarding

### 3.4 StatusService ([`status.services.ts`](backend/src/features/onboarding/onboardingstatus/status.services.ts:1))
- Test: `getOnboardingStatus` - utilisateur existant
- Test: `getOnboardingStatus` - utilisateur inexistant

---

## Étape 4: Tests du Middleware (Priorité MOYENNE)

### 4.1 AuthMiddleware ([`AuthMiddleware.ts`](backend/src/middleware/AuthMiddleware.ts:1))
- Test: `authMiddleware` - session valide injecte user
- Test: `authMiddleware` - pas de session, user = null
- Test: `requireAuth` - utilisateur connecté, autorise
- Test: `requireAuth` - pas connecté, retourne 401

### 4.2 Context tRPC ([`context.ts`](backend/src/trpc/context.ts:1))
- Test: `createContext` avec headers valides
- Test: `createContext` sans session

---

## Couverture Cible

| Module | Fichiers | Priorité | Coverage Cible |
|--------|----------|----------|----------------|
| Schemas Zod | 6 fichiers | HAUTE | 95% |
| Services | 4 fichiers | HAUTE | 90% |
| Middleware | 2 fichiers | MOYENNE | 85% |
| Context | 1 fichier | MOYENNE | 85% |

---

## Commandes npm

```bash
# Lancer les tests
npm test

# Lancer avec coverage
npm run test:coverage

# watcher mode
npm run test:watch
```

---

## Dépendances à ajouter

```json
{
  "devDependencies": {
    "@vitest/coverage-v8": "^1.0.0",
    "vitest": "^4.0.18"
  }
}
```
