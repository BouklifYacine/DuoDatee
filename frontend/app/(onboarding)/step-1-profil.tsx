import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { z } from "zod";
import { NavigationButtons, StepContainer } from "@/components/onboarding";
import {
  GenderSelector,
  useOnboarding,
  ValidatedTextField,
} from "@/features/onboarding";
import { profilSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Preferences", "Couple"];

const nameSchema = z
  .string({ error: "Requis" })
  .trim()
  .min(3, { error: "Minimum 3 caracteres" })
  .max(20, { error: "Maximum 20 caracteres" });

const ageSchema = z.string({ error: "Requis" }).refine(
  (value) => {
    const age = parseInt(value, 10);
    return !Number.isNaN(age) && age >= 16 && age <= 99;
  },
  { error: "Entre 16 et 99 ans" }
);

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
      const parsed = profilSchema.safeParse({
        ...value,
        age: parseInt(value.age, 10),
      });

      if (!parsed.success) {
        Alert.alert(
          "Erreur de validation",
          "Veuillez verifier vos informations."
        );
        return;
      }

      try {
        await updateProfil(parsed.data);
        router.push("/step-2-preferences");
      } catch {
        Alert.alert(
          "Erreur",
          "Impossible de sauvegarder votre profil. Verifiez votre connexion et reessayez."
        );
      }
    },
  });

  return (
    <StepContainer
      currentStep={0}
      totalSteps={3}
      labels={LABELS}
      showBackButton={false}
      onNext={() => form.handleSubmit()}
      isNextDisabled={false}
      isLoading={isUpdating}
      showNavigationButtons={false}
    >
      <View className="flex-1 px-1">
        <View className="mb-7 mt-1">
          <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            ETAPE 1 SUR 3
          </Text>
          <Text className="mb-2 text-[28px] font-extrabold leading-9 text-white">
            {"Parlez-nous de "}
            <Text className="text-accent">vous</Text>
          </Text>
          <Text className="text-sm leading-[22px] text-text-secondary">
            Ces informations nous aideront a personnaliser votre experience
          </Text>
        </View>

        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              nameSchema.safeParse(value).error?.issues[0]?.message,
            onBlur: ({ value }) =>
              nameSchema.safeParse(value).error?.issues[0]?.message,
          }}
        >
          {(field) => (
            <ValidatedTextField
              field={field}
              label="Nom"
              placeholder="Votre prenom"
              icon="👤"
              autoCapitalize="words"
            />
          )}
        </form.Field>

        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) =>
              ageSchema.safeParse(value).error?.issues[0]?.message,
            onBlur: ({ value }) =>
              ageSchema.safeParse(value).error?.issues[0]?.message,
          }}
        >
          {(field) => (
            <ValidatedTextField
              field={field}
              label="Age"
              placeholder="Votre age"
              icon="🎂"
              keyboardType="numeric"
            />
          )}
        </form.Field>

        <form.Field name="gender">
          {(field) => (
            <GenderSelector
              value={field.state.value}
              onChange={(gender) => {
                field.handleChange(gender);
                field.handleBlur();
              }}
              submissionAttempts={form.state.submissionAttempts}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            values: state.values,
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ values }) => {
            const { name, age, gender } = values;
            const canSubmitLocal =
              !nameSchema.safeParse(name).error &&
              !ageSchema.safeParse(age).error &&
              !!gender;

            return (
              <NavigationButtons
                onNext={() => {
                  if (!canSubmitLocal) {
                    Alert.alert(
                      "Formulaire incomplet",
                      "Veuillez remplir correctement tous les champs."
                    );
                    return;
                  }
                  form.handleSubmit();
                }}
                isNextDisabled={isUpdating}
                isLoading={isUpdating}
                showBackButton={false}
              />
            );
          }}
        </form.Subscribe>
      </View>
    </StepContainer>
  );
}
