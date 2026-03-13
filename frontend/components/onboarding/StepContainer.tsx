import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";

import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { Text } from "~/components/ui/text";

export type StepContainerProps = {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  labels: string[];
  onBack?: () => void;
  onNext: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showBackButton?: boolean;
  showProgressBar?: boolean;
  showNavigationButtons?: boolean;
  onSkip?: () => void;
  className?: string;
  contentClassName?: string;
};

export function StepContainer({
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
  isLoading = false,
  nextLabel = "Continuer",
  backLabel = "Retour",
  showBackButton = true,
  showProgressBar = true,
  showNavigationButtons = true,
  onSkip,
}: StepContainerProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-dark"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View className="flex-1 bg-dark">

        {/* Top bar: back button + progress bar */}
        {showProgressBar && (
          <View className="flex-row items-center pt-13">
            {showBackButton && onBack ? (
              <TouchableOpacity
                onPress={onBack}
                disabled={isBackDisabled || isLoading}
                hitSlop={12}
                className="ml-5 w-9 h-9 rounded-full bg-card items-center justify-center border border-border"
              >
                <Text className="text-text-primary text-base font-bold">‹</Text>
              </TouchableOpacity>
            ) : (
              // Placeholder to keep alignment when no back button
              <View className="w-14" />
            )}

            <View className="flex-1">
              <ProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
                onSkip={onSkip}
              />
            </View>
          </View>
        )}

        {/* Scrollable content */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow-1 px-6 pt-6 pb-2"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View className="flex-1">{children}</View>
        </ScrollView>
      </View>

      {/* Bottom CTA */}
      {showNavigationButtons && (
        <NavigationButtons
          onBack={onBack}
          onNext={onNext}
          isBackDisabled={isBackDisabled}
          isNextDisabled={isNextDisabled}
          isLoading={isLoading}
          nextLabel={nextLabel}
          backLabel={backLabel}
          showBackButton={showBackButton}
        />
      )}
    </KeyboardAvoidingView>
  );
}
