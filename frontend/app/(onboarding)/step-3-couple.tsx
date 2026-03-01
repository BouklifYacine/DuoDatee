"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Switch } from "react-native";
import { StepContainer } from "@/components/onboarding";
import { useOnboarding } from "@/features/onboarding";
import { 
  coupleOnboardingSchema,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
  createCoupleSchema,
  joinCoupleSchema,
} from "@/features/onboarding/schemas";

const LABELS = ["Profil", "Préférences", " Couple"];
const STEP = 2;

const DURATION_LABELS: Record<string, string> = {
  moins_de_6m: "Moins de 6 mois",
  six_mois_un_an: "6 mois - 1 an",
  un_trois_ans: "1 - 3 ans",
  trois_cinq_ans: "3 - 5 ans",
  cinq_dix_ans: "5 - 10 ans",
  dix_ans_plus: "10+ ans",
};

const STATUS_LABELS: Record<string, string> = {
  en_couple: "En couple",
  fiances: "Fiancés",
  pacses: "Pacsés",
  maries: "Mariés",
};

const SITUATION_LABELS: Record<string, string> = {
  ensemble: "Ensemble",
  separes_proche: "Séparés (proche)",
  separes_loin: "Séparés (loin)",
};

export default function Step3Couple() {
  const router = useRouter();
  const { createCouple, joinCouple, completeOnboarding, isUpdating } = useOnboarding();
  const [coupleMode, setCoupleMode] = useState<"create" | "join">("create");

  const form = useForm({
    defaultValues: {
      hasCouple: false,
      relationshipDuration: undefined as string | undefined,
      relationshipStatus: undefined as string | undefined,
      livingSituation: undefined as string | undefined,
      inviteCode: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = coupleOnboardingSchema.safeParse(value);
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

  const handleFinish = async () => {
    const values = form.state.values;
    
    try {
      // Si l'utilisateur est en couple, créer ou rejoindre le couple
      if (values.hasCouple) {
        if (coupleMode === "create") {
          const createResult = createCoupleSchema.safeParse({
            relationshipDuration: values.relationshipDuration,
            relationshipStatus: values.relationshipStatus,
            livingSituation: values.livingSituation,
          });
          
          if (!createResult.success) {
            console.error("Validation error:", createResult.error);
            return;
          }
          await createCouple(createResult.data);
        } else {
          const joinResult = joinCoupleSchema.safeParse({
            inviteCode: values.inviteCode,
          });
          
          if (!joinResult.success) {
            console.error("Validation error:", joinResult.error);
            return;
          }
          await joinCouple(joinResult.data);
        }
      }
      
      // Terminer l'onboarding
      await completeOnboarding();
      
      // Rediriger vers les tabs
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const formValues = form.state.values;
  
  // Validation depends on couple mode
  const isValid = () => {
    if (!formValues.hasCouple) return true;
    
    if (coupleMode === "create") {
      return (
        formValues.relationshipDuration !== undefined &&
        formValues.relationshipStatus !== undefined &&
        formValues.livingSituation !== undefined
      );
    } else {
      return formValues.inviteCode && formValues.inviteCode.length === 6;
    }
  };

  return (
    <StepContainer
      currentStep={STEP}
      totalSteps={3}
      labels={LABELS}
      onBack={handleBack}
      onNext={handleFinish}
      isNextDisabled={!isValid()}
      isLoading={isUpdating}
      nextLabel="Terminer"
    >
      <View className="flex-1">
        <Text className="text-2xl font-bold mb-2">Votre situation</Text>
        <Text className="text-gray-600 mb-6">
          Configurez votre profil de couple pour des suggestions adaptées
        </Text>

        {/* Couple Switch */}
        <View className="flex-row items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-lg font-medium">Je suis en couple</Text>
          <Switch
            value={formValues.hasCouple}
            onValueChange={(value) => {
              form.setFieldValue("hasCouple", value);
              if (!value) {
                form.setFieldValue("relationshipDuration", undefined);
                form.setFieldValue("relationshipStatus", undefined);
                form.setFieldValue("livingSituation", undefined);
                form.setFieldValue("inviteCode", "");
              }
            }}
          />
        </View>

        {/* If not in couple - show explanation */}
        {!formValues.hasCouple && (
          <View className="bg-blue-50 p-4 rounded-lg">
            <Text className="text-blue-800">
              Vous pouvez utiliser l'application en solo. Vous pourrez toujours ajouter un partenaire plus tard depuis les paramètres.
            </Text>
          </View>
        )}

        {/* If in couple - show options */}
        {formValues.hasCouple && (
          <View>
            {/* Create/Join Tabs */}
            <View className="flex-row mb-6">
              <Pressable
                className={`flex-1 py-2 px-4 rounded-l-lg border ${
                  coupleMode === "create"
                    ? "border-primary bg-primary/10"
                    : "border-gray-300"
                }`}
                onPress={() => setCoupleMode("create")}
              >
                <Text
                  className={`text-center font-medium ${
                    coupleMode === "create" ? "text-primary" : "text-gray-700"
                  }`}
                >
                  Créer
                </Text>
              </Pressable>
              <Pressable
                className={`flex-1 py-2 px-4 rounded-r-lg border ${
                  coupleMode === "join"
                    ? "border-primary bg-primary/10"
                    : "border-gray-300"
                }`}
                onPress={() => setCoupleMode("join")}
              >
                <Text
                  className={`text-center font-medium ${
                    coupleMode === "join" ? "text-primary" : "text-gray-700"
                  }`}
                >
                  Rejoindre
                </Text>
              </Pressable>
            </View>

            {/* Create Couple Form */}
            {coupleMode === "create" && (
              <View>
                {/* Relationship Duration */}
                <View className="mb-4">
                  <Text className="text-sm font-medium mb-2">Durée de la relation</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {RELATIONSHIP_DURATIONS.map((duration) => (
                      <Pressable
                        key={duration}
                        className={`py-2 px-3 rounded-lg border ${
                          formValues.relationshipDuration === duration
                            ? "border-primary bg-primary/10"
                            : "border-gray-300"
                        }`}
                        onPress={() => form.setFieldValue("relationshipDuration", duration)}
                      >
                        <Text
                          className={
                            formValues.relationshipDuration === duration
                              ? "text-primary font-medium"
                              : "text-gray-700"
                          }
                        >
                          {DURATION_LABELS[duration]}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Relationship Status */}
                <View className="mb-4">
                  <Text className="text-sm font-medium mb-2">Statut</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {RELATIONSHIP_STATUSES.map((status) => (
                      <Pressable
                        key={status}
                        className={`py-2 px-3 rounded-lg border ${
                          formValues.relationshipStatus === status
                            ? "border-primary bg-primary/10"
                            : "border-gray-300"
                        }`}
                        onPress={() => form.setFieldValue("relationshipStatus", status)}
                      >
                        <Text
                          className={
                            formValues.relationshipStatus === status
                              ? "text-primary font-medium"
                              : "text-gray-700"
                          }
                        >
                          {STATUS_LABELS[status]}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Living Situation */}
                <View className="mb-4">
                  <Text className="text-sm font-medium mb-2">Situation de vie</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {LIVING_SITUATIONS.map((situation) => (
                      <Pressable
                        key={situation}
                        className={`py-2 px-3 rounded-lg border ${
                          formValues.livingSituation === situation
                            ? "border-primary bg-primary/10"
                            : "border-gray-300"
                        }`}
                        onPress={() => form.setFieldValue("livingSituation", situation)}
                      >
                        <Text
                          className={
                            formValues.livingSituation === situation
                              ? "text-primary font-medium"
                              : "text-gray-700"
                          }
                        >
                          {SITUATION_LABELS[situation]}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Join Couple Form */}
            {coupleMode === "join" && (
              <View className="mb-4">
                <Text className="text-sm font-medium mb-2">Code d'invitation</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-lg text-center uppercase"
                  placeholder="XXXXXX"
                  value={formValues.inviteCode}
                  onChangeText={(text) => 
                    form.setFieldValue("inviteCode", text.toUpperCase().slice(0, 6))
                  }
                  maxLength={6}
                  autoCapitalize="characters"
                />
                <Text className="text-xs text-gray-500 mt-2">
                  Demandez le code à votre partenaire
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </StepContainer>
  );
}
