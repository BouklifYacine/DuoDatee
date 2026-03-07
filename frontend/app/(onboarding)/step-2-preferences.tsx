import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { View, Text, Alert } from "react-native";
import { StepContainer } from "@/components/onboarding";
import {
  useOnboarding,
  ActivityTypeSelector,
  BudgetSelector,
  DistanceStepper,
  type PreferredType,
  type PreferredBudget,
} from "@/features/onboarding";
import { preferencesSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", "Couple"];

export default function Step2Preferences() {
  const router = useRouter();
  const { updatePreferences, isUpdating } = useOnboarding();

  const form = useForm({
    defaultValues: {
      preferredTypes: [] as string[],
      preferredBudget: undefined as string | undefined,
      preferredDistance: 10 as number,
    },
    onSubmit: async ({ value }) => {
      const result = preferencesSchema.safeParse(value);
      if (!result.success) {
        Alert.alert("Erreur de validation", "Veuillez vérifier vos préférences.");
        return;
      }
      try {
        await updatePreferences(result.data as { preferredTypes: PreferredType[]; preferredBudget: PreferredBudget; preferredDistance: number });
        router.push("/step-3-couple");
      } catch (err) {
        console.error("[Onboarding] updatePreferences failed:", err);
        Alert.alert(
          "Erreur",
          "Impossible de sauvegarder vos préférences. Vérifiez votre connexion et réessayez."
        );
      }
    },
  });

  return (
    <form.Subscribe selector={(s) => s.values}>
      {(values) => {
        const { preferredTypes, preferredBudget, preferredDistance } = values;
        const canSubmit =
          preferredTypes.length > 0 &&
          !!preferredBudget &&
          preferredDistance >= 1 &&
          preferredDistance <= 100;

        const toggleType = (type: PreferredType) => {
          if (preferredTypes.includes(type)) {
            form.setFieldValue("preferredTypes", preferredTypes.filter((t) => t !== type));
          } else if (preferredTypes.length < 3) {
            form.setFieldValue("preferredTypes", [...preferredTypes, type]);
          }
        };

        return (
          <StepContainer
            currentStep={1}
            totalSteps={3}
            labels={LABELS}
            onBack={() => router.back()}
            onNext={() => {
              if (!canSubmit) {
                Alert.alert(
                  "Préférences incomplètes",
                  "Veuillez sélectionner au moins une activité et un budget."
                );
                return;
              }
              form.handleSubmit();
            }}
            isNextDisabled={isUpdating}
            isLoading={isUpdating}
          >
            <View className="flex-1 px-1">
              <View className="mb-7 mt-1">
                <Text className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                  ÉTAPE 2 SUR 3
                </Text>
                <Text className="text-white text-[28px] font-extrabold leading-9 mb-2">
                  {"Vos "}
                  <Text className="text-accent">préférences</Text>
                </Text>
                <Text className="text-text-secondary text-sm leading-[22px]">
                  Dites-nous ce que vous aimez pour des suggestions personnalisées
                </Text>
              </View>

              <View className="mb-10">
                <ActivityTypeSelector selected={preferredTypes} onToggle={toggleType} />
              </View>

              <View className="mb-10">
                <BudgetSelector
                  selected={preferredBudget}
                  onSelect={(b) => form.setFieldValue("preferredBudget", b)}
                />
              </View>

              <DistanceStepper
                value={preferredDistance}
                onChange={(v) => form.setFieldValue("preferredDistance", v)}
              />
            </View>
          </StepContainer>
        );
      }}
    </form.Subscribe>
  );
}
