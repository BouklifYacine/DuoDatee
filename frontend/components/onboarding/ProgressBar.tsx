import { View } from "react-native";

import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

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
    <View className={cn("w-full px-4 py-4", className)}>
      <View className="flex-row justify-between mb-2">
        {labels.map((label, index) => (
          <Text
            key={label}
            className={cn(
              "text-xs transition-colors duration-200",
              index <= safeCurrentStep
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
            numberOfLines={1}
          >
            {label}
          </Text>
        ))}
      </View>
      <View className="h-2 bg-muted rounded-full overflow-hidden">
        <View
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}
