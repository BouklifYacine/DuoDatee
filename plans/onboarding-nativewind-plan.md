# Plan de conversion des fichiers onboarding vers NativeWind

## Vue d'ensemble

Ce document détaille le plan pour convertir les fichiers d'onboarding du frontend (situés dans `frontend/app/(onboarding)/` et `frontend/features/onboarding/components/`) des styles inline React Native vers NativeWind.

### Contexte
- **NativeWind** est déjà installé et configuré (voir `skills-lock.json`)
- Les composants UI de base (`Text`, `Input`, `Button` dans `components/ui/`) utilisent déjà NativeWind
- Les fichiers d'onboarding utilisent encore des styles inline `style={{}}`

### Structure des fichiers à convertir

#### 1. Composants shared (`components/onboarding/`)
| Fichier | Description |
|---------|-------------|
| [`StepContainer.tsx`](frontend/components/onboarding/StepContainer.tsx) | Conteneur principal avec KeyboardAvoidingView |
| [`ProgressBar.tsx`](frontend/components/onboarding/ProgressBar.tsx) | Indicateur de progression |
| [`NavigationButtons.tsx`](frontend/components/onboarding/NavigationButtons.tsx) | Boutons de navigation |

#### 2. Pages onboarding (`app/(onboarding)/`)
| Fichier | Description |
|---------|-------------|
| [`step-1-profil.tsx`](frontend/app/(onboarding)/step-1-profil.tsx) | Formulaire profil utilisateur |
| [`step-2-preferences.tsx`](frontend/app/(onboarding)/step-2-preferences.tsx) | Préférences (activité, budget, distance) |
| [`step-3-couple.tsx`](frontend/app/(onboarding)/step-3-couple.tsx) | Configuration couple |

#### 3. Composants feature (`features/onboarding/components/`)
| Fichier | Description |
|---------|-------------|
| [`ValidatedTextField.tsx`](frontend/features/onboarding/components/ValidatedTextField.tsx) | Champ texte avec validation |
| [`GenderSelector.tsx`](frontend/features/onboarding/components/GenderSelector.tsx) | Sélecteur genre |
| [`ActivityTypeSelector.tsx`](frontend/features/onboarding/components/ActivityTypeSelector.tsx) | Types d'activités |
| [`BudgetSelector.tsx`](frontend/features/onboarding/components/BudgetSelector.tsx) | Sélecteur budget |
| [`DistanceStepper.tsx`](frontend/features/onboarding/components/DistanceStepper.tsx) | Sélecteur distance |
| [`CoupleModeToggle.tsx`](frontend/features/onboarding/components/CoupleModeToggle.tsx) | Toggle couple |
| [`OptionGrid.tsx`](frontend/features/onboarding/components/OptionGrid.tsx) | Grille d'options générique |
| [`InviteCodeInput.tsx`](frontend/features/onboarding/components/InviteCodeInput.tsx) | Code d'invitation |

---

## Étapes détaillées

### Step 0: Étendre le thème global.css
**Objectif:** Ajouter les couleurs OB (Onboarding) au thème NativeWind

Les couleurs sont définies dans [`constants/theme.ts`](frontend/constants/theme.ts):
```typescript
export const OB = {
  BG_DARK: '#0A0A0E',
  BG_CARD: '#1A1A20',
  BG_CARD_SELECTED: '#2A1B22',
  ACCENT: '#E8185F',
  ACCENT_GLOW: 'rgba(232, 24, 95, 0.35)',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#9FA3B0',
  BORDER_DEFAULT: '#2E2E38',
  BORDER_SELECTED: '#E8185F',
} as const;
```

**Action:** Ajouter ces couleurs dans [`global.css`](frontend/global.css) via la directive `@theme`.

---

### Step 1: StepContainer.tsx
**Fichier:** [`components/onboarding/StepContainer.tsx`](frontend/components/onboarding/StepContainer.tsx)

Éléments à convertir:
- `KeyboardAvoidingView` → `className="flex-1 bg-dark"`
- `View` conteneur → `className="flex-1 bg-dark"`
- `View` top bar (ligne 53) → `className="flex-row items-center pt-13"`
- `TouchableOpacity` back button (lignes 55-72) → styles NativeWind
- `View` placeholder (ligne 75) → `className="w-14"`
- `View` progress bar container (ligne 78) → `className="flex-1"`
- `ScrollView` (lignes 89-97) → `className="flex-1"`, contentContainerClassName
- `View` children container (ligne 96) → `className="flex-1"`

---

### Step 2: ProgressBar.tsx
**Fichier:** [`components/onboarding/ProgressBar.tsx`](frontend/components/onboarding/ProgressBar.tsx)

Éléments à convertir:
- Container `View` → `className="px-6 pt-4 pb-2"`
- Row `View` (ligne 24) → `className="flex-row items-center gap-1.5"`
- Segment `View` (lignes 26-34) → `className="flex-1 h-1 rounded-full"` avec condition ternaire pour couleur
- Skip `TouchableOpacity` → `className="ml-2"`

---

### Step 3: NavigationButtons.tsx
**Fichier:** [`components/onboarding/NavigationButtons.tsx`](frontend/components/onboarding/NavigationButtons.tsx)

Éléments à convertir:
- Container `View` → `className="px-6 pb-8 pt-2"`
- `TouchableOpacity` principal → convertir les styles shadow/glow
- Cœur icon container → `className="w-9 h-9 rounded-full bg-white/18 items-center justify-center"`
- Label `Text` → utiliser `className` pour couleur/taille/poids
- Chevron `Text` → `className="text-white/70 text-base font-bold tracking-widest"`

---

### Step 4: step-1-profil.tsx
**Fichier:** [`app/(onboarding)/step-1-profil.tsx`](frontend/app/(onboarding)/step-1-profil.tsx)

Lignes à convertir (59-70):
```tsx
// AVANT
<View style={{ flex: 1, paddingHorizontal: 4 }}>
  <View style={{ marginBottom: 28, marginTop: 4 }}>
    <Text style={{ color: "#E8185F", fontSize: 12, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>
// APRÈS
<View className="flex-1 px-4">
  <View className="mb-7 mt-1">
    <Text className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
```

---

### Step 5: ValidatedTextField.tsx
**Fichier:** [`features/onboarding/components/ValidatedTextField.tsx`](frontend/features/onboarding/components/ValidatedTextField.tsx)

Éléments à convertir:
- Container `View` → `className="mb-5"`
- Label `Text` → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2"`
- Input container `View` → `className="flex-row items-center border rounded-2xl px-4 h-14"`
- Icon `Text` → `className="text-xl mr-3"`
- `TextInput` → utiliser `Input` component avec `className`
- Success checkmark → `className="text-green-500 text-base"`
- Error `Text` → `className="text-pink-400 text-xs mt-1 ml-1"`

---

### Step 6: GenderSelector.tsx
**Fichier:** [`features/onboarding/components/GenderSelector.tsx`](frontend/features/onboarding/components/GenderSelector.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Option Pressable → `className="flex-row items-center h-14 rounded-2xl border px-4 mb-2.5"`
- Icon → `className="text-xl mr-3"`
- Option text → `className="flex-1 text-white text-base font-semibold"`
- Radio circle → convertir en View avec classes

---

### Step 7: step-2-preferences.tsx
**Fichier:** [`app/(onboarding)/step-2-preferences.tsx`](frontend/app/(onboarding)/step-2-preferences.tsx)

Lignes à convertir (83-94) - même pattern que step-1

---

### Step 8: ActivityTypeSelector.tsx
**Fichier:** [`features/onboarding/components/ActivityTypeSelector.tsx`](frontend/features/onboarding/components/ActivityTypeSelector.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Header row → `className="flex-row justify-between items-center mb-2.5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase"`
- Counter → `className="text-muted text-xs"`
- Option Pressable → même pattern que GenderSelector

---

### Step 9: BudgetSelector.tsx
**Fichier:** [`features/onboarding/components/BudgetSelector.tsx`](frontend/features/onboarding/components/BudgetSelector.tsx)

**Pattern identique à ActivityTypeSelector** - même structure, mêmes conversions de classes

---

### Step 10: DistanceStepper.tsx
**Fichier:** [`features/onboarding/components/DistanceStepper.tsx`](frontend/features/onboarding/components/DistanceStepper.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Main container → `className="bg-card rounded-2xl border border-border py-5 px-6 flex-row items-center justify-between"`
- Minus button → `className="w-11 h-11 rounded-full border border-border bg-dark items-center justify-center"`
- Value display → `className="items-center"`
- Value number → `className="text-accent text-[36px] font-extrabold"`
- Unit → `className="text-muted text-xs mt-0.5"`
- Plus button → `className="w-11 h-11 rounded-full bg-accent items-center justify-center"` + shadow classes

---

### Step 11: step-3-couple.tsx
**Fichier:** [`app/(onboarding)/step-3-couple.tsx`](frontend/app/(onboarding)/step-3-couple.tsx)

Lignes à convertir (120-150):
- Header section (comme step-1 et step-2)
- "Solo" info box (lignes 145-149) → `className="bg-card p-4 rounded-2xl border border-border"`

---

### Step 12: CoupleModeToggle.tsx
**Fichier:** [`features/onboarding/components/CoupleModeToggle.tsx`](frontend/features/onboarding/components/CoupleModeToggle.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Switch row → `className="flex-row items-center justify-between h-16 rounded-2xl border px-4 mb-3"`
- Couple icon → `className="text-xl mr-3"`
- Couple text → `className="text-white text-base font-semibold"`
- Mode tabs container → `className="flex-row bg-card rounded-xl border border-border p-1 mb-3"`
- Tab Pressable → `className="flex-1 py-2.5 px-3 rounded-lg items-center"`

---

### Step 13: OptionGrid.tsx
**Fichier:** [`features/onboarding/components/OptionGrid.tsx`](frontend/features/onboarding/components/OptionGrid.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Option Pressable → même pattern que GenderSelector/ActivityTypeSelector

---

### Step 14: InviteCodeInput.tsx
**Fichier:** [`features/onboarding/components/InviteCodeInput.tsx`](frontend/features/onboarding/components/InviteCodeInput.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Input container → `className="flex-row items-center rounded-2xl px-4 h-18 border"`
- Icon → `className="text-xl mr-3"`
- TextInput → `className="flex-1 text-center text-2xl tracking-[8px] font-extrabold uppercase"`
- Helper text → `className="text-muted text-xs mt-1.5 ml-1"`

---

### Step 15: Tests

**Action:** Tester manuellement chaque écran d'onboarding:
1. Step 1 - Profil: saisir nom, âge, genre
2. Step 2 - Préférences: sélectionner activité, budget, distance
3. Step 3 - Couple: tester mode solo, création couple, rejoindre couple

---

## Pattern de conversion standard

### React Native style → NativeWind className

| Style React Native | Classe NativeWind |
|-------------------|-------------------|
| `flex: 1` | `flex-1` |
| `flexDirection: "row"` | `flex-row` |
| `flexDirection: "column"` | `flex-col` |
| `alignItems: "center"` | `items-center` |
| `justifyContent: "center"` | `justify-center` |
| `justifyContent: "space-between"` | `justify-between` |
| `paddingHorizontal: 20` | `px-5` |
| `paddingVertical: 16` | `py-4` |
| `marginBottom: 20` | `mb-5` |
| `marginTop: 4` | `mt-1` |
| `borderRadius: 14` | `rounded-2xl` |
| `borderRadius: 999` | `rounded-full` |
| `borderWidth: 1.5` | `border` (défaut 1px) ou `border-2` |
| `height: 58` | `h-14` |
| `fontSize: 12` | `text-xs` |
| `fontSize: 14` | `text-sm` |
| `fontSize: 15` | `text-base` |
| `fontSize: 28` | `text-[28px]` |
| `fontWeight: "700"` | `font-bold` |
| `fontWeight: "800"` | `font-extrabold` |
| `letterSpacing: 1.2` | `tracking-wider` |
| `textTransform: "uppercase"` | `uppercase` |
| `backgroundColor: "#0A0A0E"` | `bg-dark` |
| `color: "#E8185F"` | `text-accent` |
| `color: "#FFFFFF"` | `text-white` |
| `color: "#9FA3B0"` | `text-muted` |
| `shadowColor` + `shadowOpacity` + `shadowRadius` | `shadow-accent/50 shadow-lg` |

### Utiliser les composants UI existants

Quand disponibles, utiliser les composants UI plutôt que les éléments natifs:
- `Text` de `components/ui/text` au lieu de `Text` de react-native
- `Input` de `components/ui/input` au lieu de `TextInput` de react-native
- `Pressable` au lieu de `TouchableOpacity` quand le feedback visuel n'est pas nécessaire

---

## Résumé des fichiers

```
frontend/
├── app/(onboarding)/
│   ├── step-1-profil.tsx          [Step 4]
│   ├── step-2-preferences.tsx     [Step 7]
│   └── step-3-couple.tsx          [Step 11]
├── components/onboarding/
│   ├── StepContainer.tsx          [Step 1]
│   ├── ProgressBar.tsx            [Step 2]
│   └── NavigationButtons.tsx      [Step 3]
└── features/onboarding/components/
    ├── ValidatedTextField.tsx     [Step 5]
    ├── GenderSelector.tsx         [Step 6]
    ├── ActivityTypeSelector.tsx   [Step 8]
    ├── BudgetSelector.tsx         [Step 9]
    ├── DistanceStepper.tsx        [Step 10]
    ├── CoupleModeToggle.tsx       [Step 12]
    ├── OptionGrid.tsx             [Step 13]
    └── InviteCodeInput.tsx       [Step 14]
```

---

## Notes importantes

1. **Couleurs personnalisées**: Les couleurs OB ne sont pas dans le thème par défaut. Il faut les ajouter dans `global.css` (Step 0).

2. **Valeurs arbitraires**: Pour des valeurs comme `height: 58` ou `letterSpacing: 1.2`, utiliser les valeurs arbitraires Tailwind: `h-[58px]` ou `tracking-[1.2]`.

3. **Conditional classes**: Les bordures et couleurs conditionnelles peuvent utiliser des ternaires dans les classes:
   ```tsx
   className={`rounded-2xl ${isSelected ? 'border-accent bg-card-selected' : 'border-border bg-card'}`}
   ```

4. **Shadow/glow**: NativeWind supporte les ombres via les utilitaires de couleur et `shadow-` prefix.

5. **Order很重要**: Convertir dans l'ordre (Step 1 → Step 15) car les composants sont dépendants les uns des autres.

## Vue d'ensemble

Ce document détaille le plan pour convertir les fichiers d'onboarding du frontend (situés dans `frontend/app/(onboarding)/` et `frontend/features/onboarding/components/`) des styles inline React Native vers NativeWind.

### Contexte
- **NativeWind** est déjà installé et configuré (voir `skills-lock.json`)
- Les composants UI de base (`Text`, `Input`, `Button` dans `components/ui/`) utilisent déjà NativeWind
- Les fichiers d'onboarding utilisent encore des styles inline `style={{}}`

### Structure des fichiers à convertir

#### 1. Composants shared (`components/onboarding/`)
| Fichier | Description |
|---------|-------------|
| [`StepContainer.tsx`](frontend/components/onboarding/StepContainer.tsx) | Conteneur principal avec KeyboardAvoidingView |
| [`ProgressBar.tsx`](frontend/components/onboarding/ProgressBar.tsx) | Indicateur de progression |
| [`NavigationButtons.tsx`](frontend/components/onboarding/NavigationButtons.tsx) | Boutons de navigation |

#### 2. Pages onboarding (`app/(onboarding)/`)
| Fichier | Description |
|---------|-------------|
| [`step-1-profil.tsx`](frontend/app/(onboarding)/step-1-profil.tsx) | Formulaire profil utilisateur |
| [`step-2-preferences.tsx`](frontend/app/(onboarding)/step-2-preferences.tsx) | Préférences (activité, budget, distance) |
| [`step-3-couple.tsx`](frontend/app/(onboarding)/step-3-couple.tsx) | Configuration couple |

#### 3. Composants feature (`features/onboarding/components/`)
| Fichier | Description |
|---------|-------------|
| [`ValidatedTextField.tsx`](frontend/features/onboarding/components/ValidatedTextField.tsx) | Champ texte avec validation |
| [`GenderSelector.tsx`](frontend/features/onboarding/components/GenderSelector.tsx) | Sélecteur genre |
| [`ActivityTypeSelector.tsx`](frontend/features/onboarding/components/ActivityTypeSelector.tsx) | Types d'activités |
| [`BudgetSelector.tsx`](frontend/features/onboarding/components/BudgetSelector.tsx) | Sélecteur budget |
| [`DistanceStepper.tsx`](frontend/features/onboarding/components/DistanceStepper.tsx) | Sélecteur distance |
| [`CoupleModeToggle.tsx`](frontend/features/onboarding/components/CoupleModeToggle.tsx) | Toggle couple |
| [`OptionGrid.tsx`](frontend/features/onboarding/components/OptionGrid.tsx) | Grille d'options générique |
| [`InviteCodeInput.tsx`](frontend/features/onboarding/components/InviteCodeInput.tsx) | Code d'invitation |

---

## Étapes détaillées

### Step 0: Étendre le thème global.css
**Objectif:** Ajouter les couleurs OB (Onboarding) au thème NativeWind

Les couleurs sont définies dans [`constants/theme.ts`](frontend/constants/theme.ts):
```typescript
export const OB = {
  BG_DARK: '#0A0A0E',
  BG_CARD: '#1A1A20',
  BG_CARD_SELECTED: '#2A1B22',
  ACCENT: '#E8185F',
  ACCENT_GLOW: 'rgba(232, 24, 95, 0.35)',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#9FA3B0',
  BORDER_DEFAULT: '#2E2E38',
  BORDER_SELECTED: '#E8185F',
} as const;
```

**Action:** Ajouter ces couleurs dans [`global.css`](frontend/global.css) via la directive `@theme`.

---

### Step 1: StepContainer.tsx
**Fichier:** [`components/onboarding/StepContainer.tsx`](frontend/components/onboarding/StepContainer.tsx)

Éléments à convertir:
- `KeyboardAvoidingView` → `className="flex-1 bg-dark"`
- `View` conteneur → `className="flex-1 bg-dark"`
- `View` top bar (ligne 53) → `className="flex-row items-center pt-13"`
- `TouchableOpacity` back button (lignes 55-72) → styles NativeWind
- `View` placeholder (ligne 75) → `className="w-14"`
- `View` progress bar container (ligne 78) → `className="flex-1"`
- `ScrollView` (lignes 89-97) → `className="flex-1"`, contentContainerClassName
- `View` children container (ligne 96) → `className="flex-1"`

---

### Step 2: ProgressBar.tsx
**Fichier:** [`components/onboarding/ProgressBar.tsx`](frontend/components/onboarding/ProgressBar.tsx)

Éléments à convertir:
- Container `View` → `className="px-6 pt-4 pb-2"`
- Row `View` (ligne 24) → `className="flex-row items-center gap-1.5"`
- Segment `View` (lignes 26-34) → `className="flex-1 h-1 rounded-full"` avec condition ternaire pour couleur
- Skip `TouchableOpacity` → `className="ml-2"`

---

### Step 3: NavigationButtons.tsx
**Fichier:** [`components/onboarding/NavigationButtons.tsx`](frontend/components/onboarding/NavigationButtons.tsx)

Éléments à convertir:
- Container `View` → `className="px-6 pb-8 pt-2"`
- `TouchableOpacity` principal → convertir les styles shadow/glow
- Cœur icon container → `className="w-9 h-9 rounded-full bg-white/18 items-center justify-center"`
- Label `Text` → utiliser `className` pour couleur/taille/poids
- Chevron `Text` → `className="text-white/70 text-base font-bold tracking-widest"`

---

### Step 4: step-1-profil.tsx
**Fichier:** [`app/(onboarding)/step-1-profil.tsx`](frontend/app/(onboarding)/step-1-profil.tsx)

Lignes à convertir (59-70):
```tsx
// AVANT
<View style={{ flex: 1, paddingHorizontal: 4 }}>
  <View style={{ marginBottom: 28, marginTop: 4 }}>
    <Text style={{ color: "#E8185F", fontSize: 12, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>
// APRÈS
<View className="flex-1 px-4">
  <View className="mb-7 mt-1">
    <Text className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
```

---

### Step 5: ValidatedTextField.tsx
**Fichier:** [`features/onboarding/components/ValidatedTextField.tsx`](frontend/features/onboarding/components/ValidatedTextField.tsx)

Éléments à convertir:
- Container `View` → `className="mb-5"`
- Label `Text` → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2"`
- Input container `View` → `className="flex-row items-center border rounded-2xl px-4 h-14"`
- Icon `Text` → `className="text-xl mr-3"`
- `TextInput` → utiliser `Input` component avec `className`
- Success checkmark → `className="text-green-500 text-base"`
- Error `Text` → `className="text-pink-400 text-xs mt-1 ml-1"`

---

### Step 6: GenderSelector.tsx
**Fichier:** [`features/onboarding/components/GenderSelector.tsx`](frontend/features/onboarding/components/GenderSelector.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Option Pressable → `className="flex-row items-center h-14 rounded-2xl border px-4 mb-2.5"`
- Icon → `className="text-xl mr-3"`
- Option text → `className="flex-1 text-white text-base font-semibold"`
- Radio circle → convertir en View avec classes

---

### Step 7: step-2-preferences.tsx
**Fichier:** [`app/(onboarding)/step-2-preferences.tsx`](frontend/app/(onboarding)/step-2-preferences.tsx)

Lignes à convertir (83-94) - même pattern que step-1

---

### Step 8: ActivityTypeSelector.tsx
**Fichier:** [`features/onboarding/components/ActivityTypeSelector.tsx`](frontend/features/onboarding/components/ActivityTypeSelector.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Header row → `className="flex-row justify-between items-center mb-2.5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase"`
- Counter → `className="text-muted text-xs"`
- Option Pressable → même pattern que GenderSelector

---

### Step 9: BudgetSelector.tsx
**Fichier:** [`features/onboarding/components/BudgetSelector.tsx`](frontend/features/onboarding/components/BudgetSelector.tsx)

**Pattern identique à ActivityTypeSelector** - même structure, mêmes conversions de classes

---

### Step 10: DistanceStepper.tsx
**Fichier:** [`features/onboarding/components/DistanceStepper.tsx`](frontend/features/onboarding/components/DistanceStepper.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Main container → `className="bg-card rounded-2xl border border-border py-5 px-6 flex-row items-center justify-between"`
- Minus button → `className="w-11 h-11 rounded-full border border-border bg-dark items-center justify-center"`
- Value display → `className="items-center"`
- Value number → `className="text-accent text-[36px] font-extrabold"`
- Unit → `className="text-muted text-xs mt-0.5"`
- Plus button → `className="w-11 h-11 rounded-full bg-accent items-center justify-center"` + shadow classes

---

### Step 11: step-3-couple.tsx
**Fichier:** [`app/(onboarding)/step-3-couple.tsx`](frontend/app/(onboarding)/step-3-couple.tsx)

Lignes à convertir (120-150):
- Header section (comme step-1 et step-2)
- "Solo" info box (lignes 145-149) → `className="bg-card p-4 rounded-2xl border border-border"`

---

### Step 12: CoupleModeToggle.tsx
**Fichier:** [`features/onboarding/components/CoupleModeToggle.tsx`](frontend/features/onboarding/components/CoupleModeToggle.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Switch row → `className="flex-row items-center justify-between h-16 rounded-2xl border px-4 mb-3"`
- Couple icon → `className="text-xl mr-3"`
- Couple text → `className="text-white text-base font-semibold"`
- Mode tabs container → `className="flex-row bg-card rounded-xl border border-border p-1 mb-3"`
- Tab Pressable → `className="flex-1 py-2.5 px-3 rounded-lg items-center"`

---

### Step 13: OptionGrid.tsx
**Fichier:** [`features/onboarding/components/OptionGrid.tsx`](frontend/features/onboarding/components/OptionGrid.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Option Pressable → même pattern que GenderSelector/ActivityTypeSelector

---

### Step 14: InviteCodeInput.tsx
**Fichier:** [`features/onboarding/components/InviteCodeInput.tsx`](frontend/features/onboarding/components/InviteCodeInput.tsx)

Éléments à convertir:
- Container → `className="mb-5"`
- Label → `className="text-muted text-[13px] font-semibold tracking-wider uppercase mb-2.5"`
- Input container → `className="flex-row items-center rounded-2xl px-4 h-18 border"`
- Icon → `className="text-xl mr-3"`
- TextInput → `className="flex-1 text-center text-2xl tracking-[8px] font-extrabold uppercase"`
- Helper text → `className="text-muted text-xs mt-1.5 ml-1"`

---

### Step 15: Tests

**Action:** Tester manuellement chaque écran d'onboarding:
1. Step 1 - Profil: saisir nom, âge, genre
2. Step 2 - Préférences: sélectionner activité, budget, distance
3. Step 3 - Couple: tester mode solo, création couple, rejoindre couple

---

## Pattern de conversion standard

### React Native style → NativeWind className

| Style React Native | Classe NativeWind |
|-------------------|-------------------|
| `flex: 1` | `flex-1` |
| `flexDirection: "row"` | `flex-row` |
| `flexDirection: "column"` | `flex-col` |
| `alignItems: "center"` | `items-center` |
| `justifyContent: "center"` | `justify-center` |
| `justifyContent: "space-between"` | `justify-between` |
| `paddingHorizontal: 20` | `px-5` |
| `paddingVertical: 16` | `py-4` |
| `marginBottom: 20` | `mb-5` |
| `marginTop: 4` | `mt-1` |
| `borderRadius: 14` | `rounded-2xl` |
| `borderRadius: 999` | `rounded-full` |
| `borderWidth: 1.5` | `border` (défaut 1px) ou `border-2` |
| `height: 58` | `h-14` |
| `fontSize: 12` | `text-xs` |
| `fontSize: 14` | `text-sm` |
| `fontSize: 15` | `text-base` |
| `fontSize: 28` | `text-[28px]` |
| `fontWeight: "700"` | `font-bold` |
| `fontWeight: "800"` | `font-extrabold` |
| `letterSpacing: 1.2` | `tracking-wider` |
| `textTransform: "uppercase"` | `uppercase` |
| `backgroundColor: "#0A0A0E"` | `bg-dark` |
| `color: "#E8185F"` | `text-accent` |
| `color: "#FFFFFF"` | `text-white` |
| `color: "#9FA3B0"` | `text-muted` |
| `shadowColor` + `shadowOpacity` + `shadowRadius` | `shadow-accent/50 shadow-lg` |

### Utiliser les composants UI existants

Quand disponibles, utiliser les composants UI plutôt que les éléments natifs:
- `Text` de `components/ui/text` au lieu de `Text` de react-native
- `Input` de `components/ui/input` au lieu de `TextInput` de react-native
- `Pressable` au lieu de `TouchableOpacity` quand le feedback visuel n'est pas nécessaire

---

## Résumé des fichiers

```
frontend/
├── app/(onboarding)/
│   ├── step-1-profil.tsx          [Step 4]
│   ├── step-2-preferences.tsx     [Step 7]
│   └── step-3-couple.tsx          [Step 11]
├── components/onboarding/
│   ├── StepContainer.tsx          [Step 1]
│   ├── ProgressBar.tsx            [Step 2]
│   └── NavigationButtons.tsx      [Step 3]
└── features/onboarding/components/
    ├── ValidatedTextField.tsx     [Step 5]
    ├── GenderSelector.tsx         [Step 6]
    ├── ActivityTypeSelector.tsx   [Step 8]
    ├── BudgetSelector.tsx         [Step 9]
    ├── DistanceStepper.tsx        [Step 10]
    ├── CoupleModeToggle.tsx       [Step 12]
    ├── OptionGrid.tsx             [Step 13]
    └── InviteCodeInput.tsx       [Step 14]
```

---

## Notes importantes

1. **Couleurs personnalisées**: Les couleurs OB ne sont pas dans le thème par défaut. Il faut les ajouter dans `global.css` (Step 0).

2. **Valeurs arbitraires**: Pour des valeurs comme `height: 58` ou `letterSpacing: 1.2`, utiliser les valeurs arbitraires Tailwind: `h-[58px]` ou `tracking-[1.2]`.

3. **Conditional classes**: Les bordures et couleurs conditionnelles peuvent utiliser des ternaires dans les classes:
   ```tsx
   className={`rounded-2xl ${isSelected ? 'border-accent bg-card-selected' : 'border-border bg-card'}`}
   ```

4. **Shadow/glow**: NativeWind supporte les ombres via les utilitaires de couleur et `shadow-` prefix.

5. **Order很重要**: Convertir dans l'ordre (Step 1 → Step 15) car les composants sont dépendants les uns des autres.

