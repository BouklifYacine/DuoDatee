import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";

export type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  /** Step label shown as "STEP X OF Y — subtitle" */
  stepLabel?: string;
  onSkip?: () => void;
  className?: string;
};

export function ProgressBar({
  currentStep,
  totalSteps,
  onSkip,
}: ProgressBarProps) {
  const safeStep = Math.max(0, Math.min(currentStep, totalSteps - 1));

  return (
    <View className="px-6 pt-4 pb-2">
      {/* Top row: segments + Skip */}
      <View className="flex-row items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            className={`flex-1 h-1 rounded-full ${i <= safeStep ? "bg-accent" : "bg-border"}`}
          />
        ))}

        {onSkip && (
          <TouchableOpacity onPress={onSkip} hitSlop={12} className="ml-2">
            <Text className="text-text-secondary text-sm font-semibold">
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
