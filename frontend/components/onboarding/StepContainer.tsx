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
      {/* Progress Bar */}
      {showProgressBar && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          labels={labels}
        />
      )}

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerClassName={cn("flex-grow px-4 pb-4", contentClassName)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {children}
      </ScrollView>

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
