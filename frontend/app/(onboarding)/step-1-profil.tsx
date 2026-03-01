"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { StepContainer } from "@/components/onboarding";
import { useOnboarding } from "@/features/onboarding";
import { profilSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", "Couple"];
const STEP = 0;

export default function Step1Profil() {
  const router = useRouter();
  const { updateProfil, isUpdating } = useOnboarding();

  const form = useForm({
    defaultValues: {
      name: "",
      age: undefined as number | undefined,
      gender: undefined as "homme" | "femme" | undefined,
    },
    validators: {
      onChange: ({ value }) => {
        const result = profilSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues;
        }
        return undefined;
      },
    },
  });

  const handleNext = async () => {
    const values = form.state.values;
    const result = profilSchema.safeParse(values);
    if (!result.success) return;
    
    try {
      await updateProfil(result.data);
      router.push("/step-2-preferences");
    } catch (error) {
      console.error("Error updating profil:", error);
    }
  };

  const formValues = form.state.values;
  const isValid = formValues.name && 
    formValues.name.length >= 3 && 
    formValues.age !== undefined && 
    formValues.age >= 16;

  return (
    <StepContainer
      currentStep={STEP}
      totalSteps={3}
      labels={LABELS}
      showBackButton={false}
      onNext={handleNext}
      isNextDisabled={!isValid}
      isLoading={isUpdating}
    >
      <View className="flex-1">
        <Text className="text-2xl font-bold mb-2">Parlez-nous de vous</Text>
        <Text className="text-gray-600 mb-6">
          Ces informations nous aideront à personnaliser votre expérience
        </Text>

        {/* Name Field */}
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2">Nom</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-lg"
            placeholder="Votre nom"
            value={formValues.name}
            onChangeText={(text) => form.setFieldValue("name", text)}
            autoCapitalize="words"
          />
        </View>

        {/* Age Field */}
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2">Âge</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-lg"
            placeholder="Votre âge"
            value={formValues.age ? String(formValues.age) : ""}
            onChangeText={(text) => {
              const age = parseInt(text, 10);
              if (!isNaN(age)) {
                form.setFieldValue("age", age);
              } else if (text === "") {
                form.setFieldValue("age", undefined);
              }
            }}
            keyboardType="numeric"
          />
        </View>

        {/* Gender Selection */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-2">Genre</Text>
          <View className="flex-row gap-3">
            <Pressable
              className={`flex-1 py-3 px-4 rounded-lg border ${
                formValues.gender === "homme"
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }`}
              onPress={() => form.setFieldValue("gender", "homme")}
            >
              <Text
                className={`text-center font-medium ${
                  formValues.gender === "homme" ? "text-primary" : "text-gray-700"
                }`}
              >
                Homme
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 py-3 px-4 rounded-lg border ${
                formValues.gender === "femme"
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }`}
              onPress={() => form.setFieldValue("gender", "femme")}
            >
              <Text
                className={`text-center font-medium ${
                  formValues.gender === "femme" ? "text-primary" : "text-gray-700"
                }`}
              >
                Femme
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </StepContainer>
  );
}
