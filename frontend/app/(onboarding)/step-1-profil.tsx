import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "expo-router";
import { View, Text, Alert } from "react-native";
import { StepContainer, NavigationButtons } from "@/components/onboarding";
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
      console.log("[Onboarding Debug] onSubmit triggered with values:", value);
      const parsed = profilSchema.safeParse({ ...value, age: parseInt(value.age, 10) });
      if (!parsed.success) {
        console.warn("[Onboarding Debug] Validation error:", parsed.error);
        Alert.alert("Erreur de validation", "Veuillez vérifier vos informations.");
        return;
      }
      try {
        console.log("[Onboarding Debug] Calling updateProfil mutation...");
        await updateProfil(parsed.data);
        console.log("[Onboarding Debug] Mutation success, redirecting...");
        router.push("/step-2-preferences");
      } catch (err) {
        console.error("[Onboarding Debug] updateProfil failed:", err);
        Alert.alert(
          "Erreur",
          "Impossible de sauvegarder votre profil. Vérifiez votre connexion et réessayez."
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
          <Text className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
            ÉTAPE 1 SUR 3
          </Text>
          <Text className="text-white text-[28px] font-extrabold leading-9 mb-2">
            {"Parlez-nous de "}
            <Text className="text-accent">vous</Text>
          </Text>
          <Text className="text-text-secondary text-sm leading-[22px]">
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

        <form.Subscribe
          selector={(state) => ({ values: state.values, canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}
        >
          {({ values }) => {
            const { name, age, gender } = values;
            const canSubmitLocal = !nameSchema.safeParse(name).error && !ageSchema.safeParse(age).error && !!gender;

            return (
              <NavigationButtons
                onNext={() => {
                  if (!canSubmitLocal) {
                    Alert.alert("Formulaire incomplet", "Veuillez remplir correctement tous les champs.");
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
