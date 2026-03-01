import { View } from "react-native";

import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

// Couleur primary
const PRIMARY_COLOR = "#8B3A52";

export type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  labels: string[];
  className?: string;
};

export function ProgressBar({
  currentStep,
  totalSteps,
  labels,
  className,
}: ProgressBarProps) {
  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.max(0, Math.min(currentStep, totalSteps));
  const progress = totalSteps > 0 ? (safeCurrentStep / totalSteps) * 100 : 0;

  return (
    <View className={cn("w-full px-6 py-5", className)}>
      {/* Step indicator text */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-primary">
          Étape {safeCurrentStep + 1} sur {totalSteps}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Progress bar with step indicators */}
      <View className="relative">
        {/* Background track */}
        <View className="h-2 bg-muted rounded-full overflow-hidden">
          <View
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: PRIMARY_COLOR,
            }}
          />
        </View>

        {/* Step dots indicator */}
        <View className="flex-row justify-between items-center absolute -top-1 left-0 right-0">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-300",
                index < safeCurrentStep
                  ? "bg-primary border-primary"
                  : index === safeCurrentStep
                  ? "bg-white border-primary scale-110"
                  : "bg-muted-foreground/30 border-muted-foreground/50"
              )}
              style={{
                borderColor: index <= safeCurrentStep ? PRIMARY_COLOR : undefined,
              }}
            >
              {/* Inner dot for current step */}
              {index === safeCurrentStep && (
                <View
                  className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Labels */}
      <View className="flex-row justify-between mt-6">
        {labels.map((label, index) => (
          <Text
            key={label}
            className={cn(
              "text-xs font-medium transition-all duration-200 px-1",
              index <= safeCurrentStep
                ? "text-primary"
                : "text-muted-foreground/60"
            )}
            numberOfLines={1}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}
