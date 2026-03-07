# Plan de Tests - Architecture Optimale pour Composants Onboarding

## 1. Analyse des Patterns Existants dans le Projet

### Backend (référence)
Le backend utilise deux approches :
- [`backend/src/__tests__/schemas/`](backend/src/__tests__/schemas/) - Tests centralisés pour les schémas
- [`backend/src/features/onboarding/__tests__/`](backend/src/features/onboarding/__tests__/) - Tests co-localisés par feature

### Frontend (actuel)
- [`frontend/__tests__/schemas/`](frontend/__tests__/schemas/) - Tests centralisés pour les schémas
- [`frontend/__tests__/lib/`](frontend/__tests__/lib/) - Tests pour les utilitaires

---

## 2. Recommandation d'Expert : Architecture Feature-Based Co-localisée

Cette approche est utilisée par les grandes entreprises tech (Google, Meta, Spotify, Airbnb) car elle offre :

| Avantage | Description |
|----------|-------------|
| **Cohérence** | Les tests suivent la structure du code |
| **Maintenance** | Développeur retrouve facilement les tests associés |
| **Scalabilité** | Chaque feature est autonome |
| **Review** | Les tests sont revus avec le code |

### Structure Recommandée

```
frontend/
├── features/
│   └── onboarding/
│       ├── components/
│       │   ├── ValidatedTextField.tsx
│       │   ├── ValidatedTextField.test.tsx    ← TEST CO-LOCALISÉ
│       │   ├── GenderSelector.tsx
│       │   ├── GenderSelector.test.tsx        ← TEST CO-LOCALISÉ
│       │   └── ...
│       ├── hooks/
│       │   └── useOnboarding.ts
│       │   └── useOnboarding.test.ts          ← TEST CO-LOCALISÉ
│       └── index.ts
├── components/
│   └── onboarding/
│       ├── NavigationButtons.tsx
│       ├── NavigationButtons.test.tsx         ← TEST CO-LOCALISÉ
│       ├── ProgressBar.tsx
│       ├── ProgressBar.test.tsx               ← TEST CO-LOCALISÉ
│       ├── StepContainer.tsx
│       └── StepContainer.test.tsx             ← TEST CO-LOCALISÉ
```

---

## 3. Alternative Acceptable (Tests Centralisés par Feature)

Si tu préfères garder une séparation plus nette entre code et tests :

```
frontend/
├── features/
│   └── onboarding/
│       └── __tests__/
│           ├── components/
│           │   ├── ValidatedTextField.test.tsx
│           │   ├── GenderSelector.test.tsx
│           │   └── ...
│           └── hooks/
│               └── useOnboarding.test.ts
├── components/
│   └── onboarding/
│       └── __tests__/
│           ├── NavigationButtons.test.tsx
│           ├── ProgressBar.test.tsx
│           └── StepContainer.test.tsx
```

---

## 4. Structure des Fichiers de Tests (Approche Recommandée)

### Pour `features/onboarding/components/`

| Composant | Fichier de Test |
|-----------|-----------------|
| [`ValidatedTextField.tsx`](frontend/features/onboarding/components/ValidatedTextField.tsx) | `ValidatedTextField.test.tsx` |
| [`GenderSelector.tsx`](frontend/features/onboarding/components/GenderSelector.tsx) | `GenderSelector.test.tsx` |
| [`ActivityTypeSelector.tsx`](frontend/features/onboarding/components/ActivityTypeSelector.tsx) | `ActivityTypeSelector.test.tsx` |
| [`BudgetSelector.tsx`](frontend/features/onboarding/components/BudgetSelector.tsx) | `BudgetSelector.test.tsx` |
| [`DistanceStepper.tsx`](frontend/features/onboarding/components/DistanceStepper.tsx) | `DistanceStepper.test.tsx` |
| [`CoupleModeToggle.tsx`](frontend/features/onboarding/components/CoupleModeToggle.tsx) | `CoupleModeToggle.test.tsx` |
| [`OptionGrid.tsx`](frontend/features/onboarding/components/OptionGrid.tsx) | `OptionGrid.test.tsx` |
| [`InviteCodeInput.tsx`](frontend/features/onboarding/components/InviteCodeInput.tsx) | `InviteCodeInput.test.tsx` |

### Pour `components/onboarding/`

| Composant | Fichier de Test |
|-----------|-----------------|
| [`NavigationButtons.tsx`](frontend/components/onboarding/NavigationButtons.tsx) | `NavigationButtons.test.tsx` |
| [`ProgressBar.tsx`](frontend/components/onboarding/ProgressBar.tsx) | `ProgressBar.test.tsx` |
| [`StepContainer.tsx`](frontend/components/onboarding/StepContainer.tsx) | `StepContainer.test.tsx` |

---

## 5. Templates de Tests par Type de Composant

### 5.1 Composant de Sélection (GenderSelector, BudgetSelector, etc.)

```typescript
import { render, screen, fireEvent } from "@testing-library/react-native";
import { GenderSelector } from "../GenderSelector";

describe("GenderSelector", () => {
  // Props par défaut pour les tests
  const defaultProps = {
    value: undefined,
    onChange: jest.fn(),
  };

  describe("Rendu", () => {
    it("affiche les options disponibles", () => {
      render(<GenderSelector {...defaultProps} />);
      
      expect(screen.getByText("Homme")).toBeTruthy();
      expect(screen.getByText("Femme")).toBeTruthy();
    });

    it("affiche le label du champ", () => {
      render(<GenderSelector {...defaultProps} />);
      
      expect(screen.getByText("Genre")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onChange avec la valeur correcte au clic", () => {
      const onChange = jest.fn();
      render(<GenderSelector {...defaultProps} onChange={onChange} />);
      
      fireEvent.press(screen.getByText("Homme"));
      
      expect(onChange).toHaveBeenCalledWith("homme");
    });
  });

  describe("États", () => {
    it("affiche le style sélectionné quand une option est choisie", () => {
      render(<GenderSelector {...defaultProps} value="femme" />);
      
      // Vérifier le style de sélection (via testID ou structure)
      const femmeOption = screen.getByText("Femme");
      expect(femmeOption).toBeTruthy();
    });

    it("affiche une erreur quand submissionAttempts > 0 sans valeur", () => {
      render(<GenderSelector {...defaultProps} submissionAttempts={1} />);
      
      expect(screen.getByText("Veuillez sélectionner votre genre")).toBeTruthy();
    });
  });
});
```

### 5.2 Composant avec Input (ValidatedTextField, InviteCodeInput)

```typescript
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ValidatedTextField } from "../ValidatedTextField";

// Mock du field pour react-hook-form
const createMockField = (overrides = {}) => ({
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  state: {
    value: "",
    meta: {
      errors: [],
      isTouched: false,
    },
  },
  ...overrides,
});

describe("ValidatedTextField", () => {
  const defaultProps = {
    field: createMockField(),
    label: "Email",
    placeholder: "Entrez votre email",
    icon: "📧",
  };

  describe("Rendu", () => {
    it("affiche le label", () => {
      render(<ValidatedTextField {...defaultProps} />);
      expect(screen.getByText("Email")).toBeTruthy();
    });

    it("affiche le placeholder", () => {
      render(<ValidatedTextField {...defaultProps} />);
      expect(screen.getByPlaceholderText("Entrez votre email")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle handleChange lors de la saisie", () => {
      const field = createMockField();
      render(<ValidatedTextField {...defaultProps} field={field} />);
      
      const input = screen.getByPlaceholderText("Entrez votre email");
      fireEvent.changeText(input, "test");
      
      expect(field.handleChange).toHaveBeenCalled();
    });
  });

  describe("Validation", () => {
    it("affiche le message d'erreur quand touched et invalide", () => {
      const field = createMockField({
        state: {
          value: "invalid",
          meta: {
            errors: ["Email invalide"],
            isTouched: true,
          },
        },
      });
      
      render(<ValidatedTextField {...defaultProps} field={field} />);
      expect(screen.getByText("Email invalide")).toBeTruthy();
    });
  });
});
```

### 5.3 Composant de Navigation (NavigationButtons, ProgressBar)

```typescript
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationButtons } from "../NavigationButtons";

describe("NavigationButtons", () => {
  const defaultProps = {
    onNext: jest.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label par défaut", () => {
      render(<NavigationButtons {...defaultProps} />);
      expect(screen.getByText("Continue")).toBeTruthy();
    });

    it("affiche un label personnalisé", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Suivant" />);
      expect(screen.getByText("Suivant")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onNext au clic", () => {
      const onNext = jest.fn();
      render(<NavigationButtons {...defaultProps} onNext={onNext} />);
      
      fireEvent.press(screen.getByText("Continue"));
      
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });

  describe("États", () => {
    it("désactive le bouton quand disabled", () => {
      render(<NavigationButtons {...defaultProps} isNextDisabled={true} />);
      
      // Le bouton ne doit pas être interactif
      const button = screen.getByText("Continue");
      expect(button).toBeTruthy();
    });

    it("affiche le loader quand isLoading", () => {
      render(<NavigationButtons {...defaultProps} isLoading={true} />);
      
      // Vérifier la présence de l'indicateur de chargement
      expect(screen.queryByText("Continue")).toBeNull();
    });
  });
});
```

---

## 6. Ordre de Priorité d'Implémentation

### Phase 1 - Composants Core (Haute Priorité)
1. `GenderSelector` - Validation, sélection unique
2. `BudgetSelector` - Sélection unique avec états
3. `ActivityTypeSelector` - Sélection multiple

### Phase 2 - Composants UI (Priorité Moyenne)
4. `NavigationButtons` - Interactions, loading states
5. `ProgressBar` - Rendu conditionnel
6. `StepContainer` - Composition de composants

### Phase 3 - Composants Avancés (Priorité Basse)
7. `DistanceStepper` - Incrémentation/décrémentation
8. `CoupleModeToggle` - Switch et tabs
9. `InviteCodeInput` - Validation de format
10. `OptionGrid` - Générique, cas limites

---

## 7. Configuration Requise

### Dépendances à installer
```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-expo
```

### Configuration Vitest recommandée
```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import native from "vitest-native";
import { resolver } from "nativewind/resolver";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  plugins: [native({ resolver })],
});
```

---

## 8. Résumé de l'Architecture Recommandée

```
┌─────────────────────────────────────────────────────────────┐
│                    APPROCHE RECOMMANDÉE                     │
│         Tests co-localisés par feature (Entreprise)        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  features/onboarding/                                       │
│  ├── components/                                           │
│  │   ├── GenderSelector.tsx        ← Code source           │
│  │   └── GenderSelector.test.tsx   ← Test co-localisé      │
│  │                                                       │
│  components/onboarding/                                    │
│  ├── NavigationButtons.tsx         ← Code source           │
│  └── NavigationButtons.test.tsx   ← Test co-localisé      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Cette architecture est :
- **Scalable** - Facilement extensible à d'autres features
- **Maintenable** - Tests proches du code qu'ils vérifient
- **Professionnelle** - Standard utilisé en entreprise
- **Consistante** - S'intègre naturellement dans le workflow de développement