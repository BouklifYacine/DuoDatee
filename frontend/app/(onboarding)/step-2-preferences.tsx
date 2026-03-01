import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
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
      if (!result.success) return;
      await updatePreferences(result.data as { preferredTypes: PreferredType[]; preferredBudget: PreferredBudget; preferredDistance: number });
      router.push("/step-3-couple");
    },
  });

  const { preferredTypes, preferredBudget, preferredDistance } = form.state.values;
  const canSubmit = preferredTypes.length > 0 && !!preferredBudget && preferredDistance >= 1 && preferredDistance <= 100;

  const toggleType = (type: PreferredType) => {
    const current = form.state.values.preferredTypes;
    if (current.includes(type)) {
      form.setFieldValue("preferredTypes", current.filter((t) => t !== type));
    } else if (current.length < 3) {
      form.setFieldValue("preferredTypes", [...current, type]);
    }
  };

  return (
    <StepContainer
      currentStep={1}
      totalSteps={3}
      labels={LABELS}
      onBack={() => router.back()}
      onNext={() => form.handleSubmit()}
      isNextDisabled={!canSubmit}
      isLoading={isUpdating}
    >
      <View className="flex-1 bg-white px-1">
        <View className="mb-8 mt-2">
          <Text className="text-3xl font-bold text-gray-900 mb-3">Vos préférences</Text>
          <Text className="text-base text-gray-500 leading-relaxed">
            Dites-nous ce que vous aimez pour des suggestions personnalisées
          </Text>
        </View>

        <ActivityTypeSelector selected={preferredTypes} onToggle={toggleType} />

        <BudgetSelector
          selected={preferredBudget}
          onSelect={(b) => form.setFieldValue("preferredBudget", b)}
        />

        <DistanceStepper
          value={preferredDistance}
          onChange={(v) => form.setFieldValue("preferredDistance", v)}
        />
      </View>
    </StepContainer>
  );
}
