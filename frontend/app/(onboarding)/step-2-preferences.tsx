import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { StepContainer } from "@/components/onboarding";
import {
  ActivityTypeSelector,
  BudgetSelector,
  DistanceStepper,
  type PreferredBudget,
  type PreferredType,
  useOnboarding,
} from "@/features/onboarding";
import { preferencesSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Preferences", "Couple"];

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
        Alert.alert(
          "Erreur de validation",
          "Veuillez verifier vos preferences."
        );
        return;
      }

      try {
        await updatePreferences(result.data as {
          preferredTypes: PreferredType[];
          preferredBudget: PreferredBudget;
          preferredDistance: number;
        });
        router.push("/step-3-couple");
      } catch {
        Alert.alert(
          "Erreur",
          "Impossible de sauvegarder vos preferences. Verifiez votre connexion et reessayez."
        );
      }
    },
  });

  return (
    <form.Subscribe selector={(state) => state.values}>
      {(values) => {
        const { preferredTypes, preferredBudget, preferredDistance } = values;
        const canSubmit =
          preferredTypes.length > 0 &&
          !!preferredBudget &&
          preferredDistance >= 1 &&
          preferredDistance <= 20;

        const toggleType = (type: PreferredType) => {
          if (preferredTypes.includes(type)) {
            form.setFieldValue(
              "preferredTypes",
              preferredTypes.filter((item) => item !== type)
            );
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
                  "Preferences incompletes",
                  "Veuillez selectionner au moins une activite et un budget."
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
                <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                  ETAPE 2 SUR 3
                </Text>
                <Text className="mb-2 text-[28px] font-extrabold leading-9 text-white">
                  {"Vos "}
                  <Text className="text-accent">preferences</Text>
                </Text>
                <Text className="text-sm leading-[22px] text-text-secondary">
                  Dites-nous ce que vous aimez pour des suggestions personnalisees
                </Text>
              </View>

              <View className="mb-10">
                <ActivityTypeSelector
                  selected={preferredTypes}
                  onToggle={toggleType}
                />
              </View>

              <View className="mb-10">
                <BudgetSelector
                  selected={preferredBudget}
                  onSelect={(budget) =>
                    form.setFieldValue("preferredBudget", budget)
                  }
                />
              </View>

              <DistanceStepper
                value={preferredDistance}
                onChange={(distance) =>
                  form.setFieldValue("preferredDistance", distance)
                }
              />
            </View>
          </StepContainer>
        );
      }}
    </form.Subscribe>
  );
}
