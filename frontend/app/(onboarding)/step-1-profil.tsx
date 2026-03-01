import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { StepContainer } from "@/components/onboarding";
import { useOnboarding, ValidatedTextField, GenderSelector } from "@/features/onboarding";
import { profilSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", "Couple"];

// Zod v4: validate age as string input before parsing to number
const nameSchema = z.string({ error: "Requis" }).trim().min(3, { error: "Minimum 3 caractères" }).max(20, { error: "Maximum 20 caractères" });
const ageSchema = z.string({ error: "Requis" }).refine((v) => { const n = parseInt(v, 10); return !isNaN(n) && n >= 16 && n <= 99; }, { error: "Entre 16 et 99 ans" });

export default function Step1Profil() {
  const router = useRouter();
  const { updateProfil, isUpdating } = useOnboarding();

  const form = useForm({
    defaultValues: {
      name: "" as string,
      age: "" as string,
      gender: undefined as "homme" | "femme" | undefined,
    },
    onSubmit: async ({ value }) => {
      const result = profilSchema.safeParse({ ...value, age: parseInt(value.age, 10) });
      if (!result.success) return;
      await updateProfil(result.data);
      router.push("/step-2-preferences");
    },
  });

  const { name, age, gender } = form.state.values;
  const canSubmit = !nameSchema.safeParse(name).error && !ageSchema.safeParse(age).error && !!gender;

  return (
    <StepContainer
      currentStep={0}
      totalSteps={3}
      labels={LABELS}
      showBackButton={false}
      onNext={() => form.handleSubmit()}
      isNextDisabled={!canSubmit}
      isLoading={isUpdating}
    >
      <View className="flex-1 bg-white px-1">
        <View className="mb-8 mt-2">
          <Text className="text-3xl font-bold text-gray-900 mb-3">Parlez-nous de vous</Text>
          <Text className="text-base text-gray-500 leading-relaxed">
            Ces informations nous aideront à personnaliser votre expérience
          </Text>
        </View>

        <form.Field
          name="name"
          validators={{ onChange: ({ value }) => nameSchema.safeParse(value).error?.issues[0]?.message, onBlur: ({ value }) => nameSchema.safeParse(value).error?.issues[0]?.message }}
        >
          {(field) => <ValidatedTextField field={field} label="Nom" placeholder="Votre prénom" icon="👤" autoCapitalize="words" />}
        </form.Field>

        <form.Field
          name="age"
          validators={{ onChange: ({ value }) => ageSchema.safeParse(value).error?.issues[0]?.message, onBlur: ({ value }) => ageSchema.safeParse(value).error?.issues[0]?.message }}
        >
          {(field) => <ValidatedTextField field={field} label="Âge" placeholder="Votre âge" icon="🎂" keyboardType="numeric" />}
        </form.Field>

        <form.Field name="gender">
          {(field) => (
            <GenderSelector
              value={field.state.value}
              onChange={(g) => { field.handleChange(g); field.handleBlur(); }}
              submissionAttempts={form.state.submissionAttempts}
            />
          )}
        </form.Field>
      </View>
    </StepContainer>
  );
}
