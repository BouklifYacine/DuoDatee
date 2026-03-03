import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { OB } from "@/constants/theme";

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
    <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 }}>
      {/* Top row: segments + Skip */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 999,
              backgroundColor: i <= safeStep ? OB.ACCENT : OB.BORDER_DEFAULT,
            }}
          />
        ))}

        {onSkip && (
          <TouchableOpacity onPress={onSkip} hitSlop={12} style={{ marginLeft: 8 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 14, fontWeight: "600" }}>
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
