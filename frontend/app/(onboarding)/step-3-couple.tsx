import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { StepContainer } from "@/components/onboarding";
import {
  useOnboarding,
  CoupleModeToggle,
  OptionGrid,
  InviteCodeInput,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
  type RelationshipDuration,
  type RelationshipStatus,
  type LivingSituation,
} from "@/features/onboarding";
import { createCoupleSchema, joinCoupleSchema } from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", "Couple"];

const DURATION_META: Record<RelationshipDuration, { label: string; icon: string }> = {
  moins_de_6m: { label: "Moins de 6 mois", icon: "💕" },
  six_mois_un_an: { label: "6 mois – 1 an", icon: "💗" },
  un_trois_ans: { label: "1 – 3 ans", icon: "❤️" },
  trois_cinq_ans: { label: "3 – 5 ans", icon: "💖" },
  cinq_dix_ans: { label: "5 – 10 ans", icon: "💘" },
  dix_ans_plus: { label: "10 ans et plus", icon: "💞" },
};

const STATUS_META: Record<RelationshipStatus, { label: string; icon: string }> = {
  en_couple: { label: "En couple", icon: "💑" },
  fiances: { label: "Fiancés", icon: "💍" },
  pacses: { label: "Pacsés", icon: "📜" },
  maries: { label: "Mariés", icon: "💒" },
};

const SITUATION_META: Record<LivingSituation, { label: string; icon: string }> = {
  ensemble: { label: "Ensemble", icon: "🏠" },
  separes_proche: { label: "Séparés (proche)", icon: "🚗" },
  separes_loin: { label: "Séparés (loin)", icon: "✈️" },
};

export default function Step3Couple() {
  const router = useRouter();
  const { createCouple, joinCouple, completeOnboarding, isUpdating } = useOnboarding();
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
            const r = createCoupleSchema.safeParse(value);
            if (!r.success) {
              Alert.alert("Erreur de validation", "Veuillez vérifier les informations du couple.");
              return;
            }
            await createCouple(r.data);
          } else {
            const r = joinCoupleSchema.safeParse({ inviteCode: value.inviteCode });
            if (!r.success) {
              Alert.alert("Erreur de validation", "Code d'invitation invalide.");
              return;
            }
            await joinCouple(r.data);
          }
        }
        await completeOnboarding();
        router.replace("/(tabs)");
      } catch (err) {
        console.error("[Onboarding] Step 3 error:", err);
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
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
    <form.Subscribe selector={(s) => s.values}>
      {(values) => {
        const { hasCouple, relationshipDuration, relationshipStatus, livingSituation, inviteCode } = values;

        const canSubmit = !hasCouple
          ? true
          : coupleMode === "create"
            ? !!relationshipDuration && !!relationshipStatus && !!livingSituation
            : inviteCode.length === 6;

        return (
          <StepContainer
            currentStep={2}
            totalSteps={3}
            labels={LABELS}
            onBack={() => router.back()}
            onNext={() => {
              if (!canSubmit) {
                Alert.alert("Informations incomplètes", "Veuillez remplir toutes les informations nécessaires.");
                return;
              }
              form.handleSubmit();
            }}
            isNextDisabled={isUpdating}
            isLoading={isUpdating}
            nextLabel="Terminer 🎉"
          >
            <View className="flex-1 px-1">
              <View className="mb-7 mt-1">
                <Text className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                  ÉTAPE 3 SUR 3
                </Text>
                <Text className="text-white text-[28px] font-extrabold leading-9 mb-2">
                  {"Votre "}
                  <Text className="text-accent">situation</Text>
                </Text>
                <Text className="text-text-secondary text-sm leading-[22px]">
                  Configurez votre profil pour des suggestions adaptées
                </Text>
              </View>

              <CoupleModeToggle
                hasCouple={hasCouple}
                coupleMode={coupleMode}
                onToggleCouple={(v) => {
                  form.setFieldValue("hasCouple", v);
                  if (!v) resetCoupleFields();
                }}
                onChangeMode={setCoupleMode}
              />

              {!hasCouple && (
                <View className="bg-card p-4 rounded-2xl border-2 border-border">
                  <Text className="text-text-secondary text-sm leading-[22px]">
                    💡 Vous pouvez utiliser l'application en solo. Vous pourrez ajouter un partenaire plus tard depuis les paramètres.
                  </Text>
                </View>
              )}

              {hasCouple && coupleMode === "create" && (
                <View>
                  <OptionGrid
                    label="Durée de la relation"
                    options={RELATIONSHIP_DURATIONS}
                    getLabel={(o) => DURATION_META[o].label}
                    getIcon={(o) => DURATION_META[o].icon}
                    selected={relationshipDuration as RelationshipDuration | undefined}
                    onSelect={(v) => form.setFieldValue("relationshipDuration", v)}
                  />
                  <OptionGrid
                    label="Statut"
                    options={RELATIONSHIP_STATUSES}
                    getLabel={(o) => STATUS_META[o].label}
                    getIcon={(o) => STATUS_META[o].icon}
                    selected={relationshipStatus as RelationshipStatus | undefined}
                    onSelect={(v) => form.setFieldValue("relationshipStatus", v)}
                  />
                  <OptionGrid
                    label="Situation de vie"
                    options={LIVING_SITUATIONS}
                    getLabel={(o) => SITUATION_META[o].label}
                    getIcon={(o) => SITUATION_META[o].icon}
                    selected={livingSituation as LivingSituation | undefined}
                    onSelect={(v) => form.setFieldValue("livingSituation", v)}
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
