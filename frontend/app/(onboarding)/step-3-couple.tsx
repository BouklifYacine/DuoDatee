import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
type CoupleMode = "create" | "join";

const DURATION_META: Record<
  RelationshipDuration,
  { label: string; icon: string }
> = {
  moins_de_6m: { label: "Moins de 6 mois", icon: "\u{1F495}" },
  six_mois_un_an: { label: "6 mois - 1 an", icon: "\u{1F497}" },
  un_trois_ans: { label: "1 - 3 ans", icon: "\u2764\uFE0F" },
  trois_cinq_ans: { label: "3 - 5 ans", icon: "\u{1F496}" },
  cinq_dix_ans: { label: "5 - 10 ans", icon: "\u{1F498}" },
  dix_ans_plus: { label: "10 ans et plus", icon: "\u{1F49E}" },
};

const STATUS_META: Record<
  RelationshipStatus,
  { label: string; icon: string }
> = {
  en_couple: { label: "En couple", icon: "\u{1F491}" },
  fiances: { label: "Fiances", icon: "\u{1F48D}" },
  pacses: { label: "Pacses", icon: "\u{1F4DC}" },
  maries: { label: "Maries", icon: "\u{1F492}" },
};

const SITUATION_META: Record<
  LivingSituation,
  { label: string; icon: string }
> = {
  ensemble: { label: "Ensemble", icon: "\u{1F3E0}" },
  separes_proche: { label: "Separes (proche)", icon: "\u{1F697}" },
  separes_loin: { label: "Separes (loin)", icon: "\u2708\uFE0F" },
};

export default function Step3Couple() {
  const router = useRouter();
  const { createCouple, joinCouple, completeOnboarding, isUpdating } =
    useOnboarding();
  const [coupleMode, setCoupleMode] = useState<CoupleMode>("create");

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
        console.info("[onboarding] submitting step 3", {
          hasCouple: value.hasCouple,
          coupleMode,
        });

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
      } catch (error) {
        console.error("[onboarding] step 3 submit failed", error);
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez reessayer.");
      }
    },
  });

  const resetCreateFields = () => {
    form.setFieldValue("relationshipDuration", undefined);
    form.setFieldValue("relationshipStatus", undefined);
    form.setFieldValue("livingSituation", undefined);
  };

  const resetJoinFields = () => {
    form.setFieldValue("inviteCode", "");
  };

  const resetCoupleFields = () => {
    resetCreateFields();
    resetJoinFields();
  };

  const handleToggleCouple = (value: boolean) => {
    form.setFieldValue("hasCouple", value);

    if (!value) {
      resetCoupleFields();
      setCoupleMode("create");
      return;
    }

    resetJoinFields();
    setCoupleMode("create");
  };

  const handleChangeMode = (mode: CoupleMode) => {
    console.info("[onboarding] switching couple mode", { mode });
    setCoupleMode(mode);

    if (mode === "join") {
      resetCreateFields();
      return;
    }

    resetJoinFields();
  };

  useEffect(() => {
    if (!form.state.values.hasCouple || coupleMode !== "join") {
      return;
    }

    console.info("[onboarding] join mode rendered");
  }, [coupleMode, form.state.values.hasCouple]);

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
        const showCreateSection = hasCouple && coupleMode === "create";
        const showJoinSection = hasCouple && coupleMode === "join";

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
                onToggleCouple={handleToggleCouple}
                onChangeMode={handleChangeMode}
              />

              {!hasCouple && (
                <View className="rounded-2xl border-2 border-border bg-card p-4">
                  <Text className="text-sm leading-[22px] text-text-secondary">
                    {"\u{1F4A1}"} Vous pouvez utiliser l&apos;application en solo. Vous
                    pourrez ajouter un partenaire plus tard depuis les
                    parametres.
                  </Text>
                </View>
              )}

              {showCreateSection && (
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

              {showJoinSection && (
                <View>
                  <InviteCodeInput
                    value={inviteCode}
                    onChange={(code) => form.setFieldValue("inviteCode", code)}
                  />
                  <View className="rounded-2xl border border-border bg-card px-4 py-3">
                    <Text className="text-xs leading-5 text-text-secondary">
                      Saisissez le code de votre partenaire pour rejoindre son
                      espace sans recréer un couple.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </StepContainer>
        );
      }}
    </form.Subscribe>
  );
}
