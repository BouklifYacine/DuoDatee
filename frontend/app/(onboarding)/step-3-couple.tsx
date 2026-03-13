import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { StepContainer } from "@/components/onboarding";
import {
  CoupleModeToggle,
  InviteCodeInput,
  LIVING_SITUATIONS,
  OptionGrid,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  type LivingSituation,
  type RelationshipDuration,
  type RelationshipStatus,
  useOnboarding,
} from "@/features/onboarding";
import {
  createCoupleSchema,
  joinCoupleSchema,
} from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Preferences", "Couple"];

const DURATION_META: Record<
  RelationshipDuration,
  { label: string; icon: string }
> = {
  moins_de_6m: { label: "Moins de 6 mois", icon: "💕" },
  six_mois_un_an: { label: "6 mois - 1 an", icon: "💗" },
  un_trois_ans: { label: "1 - 3 ans", icon: "❤️" },
  trois_cinq_ans: { label: "3 - 5 ans", icon: "💖" },
  cinq_dix_ans: { label: "5 - 10 ans", icon: "💘" },
  dix_ans_plus: { label: "10 ans et plus", icon: "💞" },
};

const STATUS_META: Record<
  RelationshipStatus,
  { label: string; icon: string }
> = {
  en_couple: { label: "En couple", icon: "💑" },
  fiances: { label: "Fiances", icon: "💍" },
  pacses: { label: "Pacses", icon: "📜" },
  maries: { label: "Maries", icon: "💒" },
};

const SITUATION_META: Record<
  LivingSituation,
  { label: string; icon: string }
> = {
  ensemble: { label: "Ensemble", icon: "🏠" },
  separes_proche: { label: "Separes (proche)", icon: "🚗" },
  separes_loin: { label: "Separes (loin)", icon: "✈️" },
};

export default function Step3Couple() {
  const router = useRouter();
  const { createCouple, joinCouple, completeOnboarding, isUpdating } =
    useOnboarding();
  const [coupleMode, setCoupleMode] = useState<"create" | "join">("create");

  const form = useForm({
    defaultValues: {
      hasCouple: false as boolean,
      relationshipDuration: undefined as string | undefined,
      relationshipStatus: undefined as string | undefined,
      livingSituation: undefined as string | undefined,
      inviteCode: "" as string,
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.hasCouple) {
          if (coupleMode === "create") {
            const result = createCoupleSchema.safeParse(value);

            if (!result.success) {
              Alert.alert(
                "Erreur de validation",
                "Veuillez verifier les informations du couple."
              );
              return;
            }

            await createCouple(result.data);
          } else {
            const result = joinCoupleSchema.safeParse({
              inviteCode: value.inviteCode,
            });

            if (!result.success) {
              Alert.alert(
                "Erreur de validation",
                "Code d'invitation invalide."
              );
              return;
            }

            await joinCouple(result.data);
          }
        }

        await completeOnboarding();
        router.replace("/(tabs)");
      } catch {
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez reessayer.");
      }
    },
  });

  const resetCoupleFields = () => {
    form.setFieldValue("relationshipDuration", undefined);
    form.setFieldValue("relationshipStatus", undefined);
    form.setFieldValue("livingSituation", undefined);
    form.setFieldValue("inviteCode", "");
  };

  return (
    <form.Subscribe selector={(state) => state.values}>
      {(values) => {
        const {
          hasCouple,
          relationshipDuration,
          relationshipStatus,
          livingSituation,
          inviteCode,
        } = values;

        const canSubmit = !hasCouple
          ? true
          : coupleMode === "create"
            ? !!relationshipDuration &&
              !!relationshipStatus &&
              !!livingSituation
            : inviteCode.length === 6;

        return (
          <StepContainer
            currentStep={2}
            totalSteps={3}
            labels={LABELS}
            onBack={() => router.back()}
            onNext={() => {
              if (!canSubmit) {
                Alert.alert(
                  "Informations incompletes",
                  "Veuillez remplir toutes les informations necessaires."
                );
                return;
              }
              form.handleSubmit();
            }}
            isNextDisabled={isUpdating}
            isLoading={isUpdating}
            nextLabel="Terminer"
          >
            <View className="flex-1 px-1">
              <View className="mb-7 mt-1">
                <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                  ETAPE 3 SUR 3
                </Text>
                <Text className="mb-2 text-[28px] font-extrabold leading-9 text-white">
                  {"Votre "}
                  <Text className="text-accent">situation</Text>
                </Text>
                <Text className="text-sm leading-[22px] text-text-secondary">
                  Configurez votre profil pour des suggestions adaptees
                </Text>
              </View>

              <CoupleModeToggle
                hasCouple={hasCouple}
                coupleMode={coupleMode}
                onToggleCouple={(value) => {
                  form.setFieldValue("hasCouple", value);
                  if (!value) {
                    resetCoupleFields();
                  }
                }}
                onChangeMode={setCoupleMode}
              />

              {!hasCouple && (
                <View className="rounded-2xl border-2 border-border bg-card p-4">
                  <Text className="text-sm leading-[22px] text-text-secondary">
                    💡 Vous pouvez utiliser l&apos;application en solo. Vous pourrez
                    ajouter un partenaire plus tard depuis les parametres.
                  </Text>
                </View>
              )}

              {hasCouple && coupleMode === "create" && (
                <View>
                  <OptionGrid
                    label="Duree de la relation"
                    options={RELATIONSHIP_DURATIONS}
                    getLabel={(option) => DURATION_META[option].label}
                    getIcon={(option) => DURATION_META[option].icon}
                    selected={
                      relationshipDuration as RelationshipDuration | undefined
                    }
                    onSelect={(value) =>
                      form.setFieldValue("relationshipDuration", value)
                    }
                  />
                  <OptionGrid
                    label="Statut"
                    options={RELATIONSHIP_STATUSES}
                    getLabel={(option) => STATUS_META[option].label}
                    getIcon={(option) => STATUS_META[option].icon}
                    selected={
                      relationshipStatus as RelationshipStatus | undefined
                    }
                    onSelect={(value) =>
                      form.setFieldValue("relationshipStatus", value)
                    }
                  />
                  <OptionGrid
                    label="Situation de vie"
                    options={LIVING_SITUATIONS}
                    getLabel={(option) => SITUATION_META[option].label}
                    getIcon={(option) => SITUATION_META[option].icon}
                    selected={livingSituation as LivingSituation | undefined}
                    onSelect={(value) =>
                      form.setFieldValue("livingSituation", value)
                    }
                  />
                </View>
              )}

              {hasCouple && coupleMode === "join" && (
                <InviteCodeInput
                  value={inviteCode}
                  onChange={(code) => form.setFieldValue("inviteCode", code)}
                />
              )}
            </View>
          </StepContainer>
        );
      }}
    </form.Subscribe>
  );
}
