import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { cn } from "~/lib/utils";

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
  className?: string;
  contentClassName?: string;
};

export function StepContainer({
  children,
  currentStep,
  totalSteps,
  labels,
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
  isLoading = false,
  nextLabel = "Suivant",
  backLabel = "Retour",
  showBackButton = true,
  showProgressBar = true,
  showNavigationButtons = true,
  className,
  contentClassName,
}: StepContainerProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={cn("flex-1 bg-background", className)}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Main content area with subtle background */}
      <View className="flex-1 bg-background">
        {/* Progress Bar */}
        {showProgressBar && (
          <View className="bg-background border-b border-border/30">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              labels={labels}
            />
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1"
          contentContainerClassName={cn(
            "flex-grow px-6 pt-6 pb-8",
            contentClassName
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Content wrapper with card-like styling */}
          <View className="flex-1">
            {children}
          </View>
        </ScrollView>
      </View>

      {/* Navigation Buttons */}
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
