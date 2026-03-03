import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";

import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { Text } from "~/components/ui/text";
import { OB } from "@/constants/theme";

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
  nextLabel = "Continue",
  showBackButton = true,
  showProgressBar = true,
  showNavigationButtons = true,
  onSkip,
}: StepContainerProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: OB.BG_DARK }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={{ flex: 1, backgroundColor: OB.BG_DARK }}>

        {/* Top bar: back button + progress bar */}
        {showProgressBar && (
          <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 52 }}>
            {showBackButton && onBack ? (
              <TouchableOpacity
                onPress={onBack}
                disabled={isBackDisabled || isLoading}
                hitSlop={12}
                style={{
                  marginLeft: 20,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: OB.BG_CARD,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: OB.BORDER_DEFAULT,
                }}
              >
                <Text style={{ color: OB.TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>‹</Text>
              </TouchableOpacity>
            ) : (
              // Placeholder to keep alignment when no back button
              <View style={{ width: 56 }} />
            )}

            <View style={{ flex: 1 }}>
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
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={{ flex: 1 }}>{children}</View>
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
          showBackButton={showBackButton}
        />
      )}
    </KeyboardAvoidingView>
  );
}
