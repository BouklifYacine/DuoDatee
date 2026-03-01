"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { StepContainer } from "@/components/onboarding";
import { useOnboarding } from "@/features/onboarding";
import { 
  preferencesSchema, 
  PREFERRED_TYPES, 
  PREFERRED_BUDGETS 
} from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", " Couple"];
const STEP = 1;

const TYPE_LABELS: Record<string, string> = {
  bouffe: "🍽️ Bouffe",
  boire: "🍷 Boire",
  activite: "🎯 Activité",
};

const BUDGET_LABELS: Record<string, string> = {
  economique: "Économique",
  moyen: "Moyen",
  premium: "Premium",
};

export default function Step2Preferences() {
  const router = useRouter();
  const { updatePreferences, isUpdating } = useOnboarding();

  const form = useForm({
    defaultValues: {
      preferredTypes: [] as string[],
      preferredBudget: undefined as string | undefined,
      preferredDistance: 10,
    },
    validators: {
      onChange: ({ value }) => {
        const result = preferencesSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues;
        }
        return undefined;
      },
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    const values = form.state.values;
    const result = preferencesSchema.safeParse(values);
    if (!result.success) return;
    
    try {
      await updatePreferences(result.data);
      router.push("/step-3-couple");
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const formValues = form.state.values;
  const isValid = 
    formValues.preferredTypes.length > 0 && 
    formValues.preferredBudget !== undefined && 
    formValues.preferredDistance >= 1 && 
    formValues.preferredDistance <= 100;

  const toggleType = (type: string) => {
    const current = formValues.preferredTypes;
    if (current.includes(type)) {
      form.setFieldValue("preferredTypes", current.filter(t => t !== type));
    } else if (current.length < 3) {
      form.setFieldValue("preferredTypes", [...current, type]);
    }
  };

  return (
    <StepContainer
      currentStep={STEP}
      totalSteps={3}
      labels={LABELS}
      onBack={handleBack}
      onNext={handleNext}
      isNextDisabled={!isValid}
      isLoading={isUpdating}
    >
      <View className="flex-1">
        <Text className="text-2xl font-bold mb-2">Vos préférences</Text>
        <Text className="text-gray-600 mb-6">
          Dites-nous ce que vous aimez pour des suggestions personnalisées
        </Text>

        {/* Types Selection */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Types d'activité</Text>
          <Text className="text-xs text-gray-500 mb-2">Sélectionnez jusqu'à 3 options</Text>
          <View className="flex-row flex-wrap gap-2">
            {PREFERRED_TYPES.map((type) => (
              <Pressable
                key={type}
                className={`py-2 px-4 rounded-full border ${
                  formValues.preferredTypes.includes(type)
                    ? "border-primary bg-primary/10"
                    : "border-gray-300"
                }`}
                onPress={() => toggleType(type)}
              >
                <Text
                  className={
                    formValues.preferredTypes.includes(type)
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }
                >
                  {TYPE_LABELS[type]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Budget Selection */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Budget</Text>
          <View className="flex-row gap-3">
            {PREFERRED_BUDGETS.map((budget) => (
              <Pressable
                key={budget}
                className={`flex-1 py-3 px-2 rounded-lg border ${
                  formValues.preferredBudget === budget
                    ? "border-primary bg-primary/10"
                    : "border-gray-300"
                }`}
                onPress={() => form.setFieldValue("preferredBudget", budget)}
              >
                <Text
                  className={`text-center font-medium ${
                    formValues.preferredBudget === budget
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                >
                  {BUDGET_LABELS[budget]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Distance Selection */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">
            Distance maximale: {formValues.preferredDistance} km
          </Text>
          <View className="flex-row items-center gap-3">
            <Text className="text-gray-600">1 km</Text>
            <View className="flex-1">
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-lg text-center"
                value={String(formValues.preferredDistance)}
                onChangeText={(text) => {
                  const distance = parseInt(text, 10);
                  if (!isNaN(distance)) {
                    form.setFieldValue("preferredDistance", Math.min(100, Math.max(1, distance)));
                  }
                }}
                keyboardType="numeric"
              />
            </View>
            <Text className="text-gray-600">100 km</Text>
          </View>
        </View>
      </View>
    </StepContainer>
  );
}
