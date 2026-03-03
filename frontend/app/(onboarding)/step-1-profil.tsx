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
      <View style={{ flex: 1, paddingHorizontal: 4 }}>
        <View style={{ marginBottom: 28, marginTop: 4 }}>
          <Text style={{ color: "#E8185F", fontSize: 12, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>
            ÉTAPE 1 SUR 3
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 28, fontWeight: "800", lineHeight: 36, marginBottom: 8 }}>
            {"Parlez-nous de "}
            <Text style={{ color: "#E8185F" }}>vous</Text>
          </Text>
          <Text style={{ color: "#9FA3B0", fontSize: 14, lineHeight: 22 }}>
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
