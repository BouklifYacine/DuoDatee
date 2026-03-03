import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { OB } from "@/constants/theme";

export type NavigationButtonsProps = {
  onBack?: () => void;
  onNext: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  className?: string;
  showBackButton?: boolean;
};

export function NavigationButtons({
  onNext,
  isNextDisabled = false,
  isLoading = false,
  nextLabel = "Continue",
}: NavigationButtonsProps) {
  const disabled = isNextDisabled || isLoading;

  return (
    <View style={{ paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 }}>
      <TouchableOpacity
        onPress={!disabled ? onNext : undefined}
        activeOpacity={disabled ? 1 : 0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          borderRadius: 999,
          backgroundColor: disabled ? "#3A1A2A" : OB.ACCENT,
          opacity: disabled ? 0.6 : 1,
          // Pink glow
          shadowColor: OB.ACCENT,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: disabled ? 0 : 0.45,
          shadowRadius: 18,
          elevation: disabled ? 0 : 12,
          gap: 12,
          paddingHorizontal: 20,
        }}
      >
        {/* Left heart icon orb */}
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.18)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>❤️</Text>
        </View>

        {/* Label */}
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: 17,
              fontWeight: "700",
              letterSpacing: 0.3,
            }}
          >
            {nextLabel}
          </Text>
        )}

        {/* Right chevrons */}
        <Text
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 15,
            fontWeight: "700",
            letterSpacing: -1,
          }}
        >
          {`>>>`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
