import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";

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
    <View className="px-6 pb-8 pt-2">
      <TouchableOpacity
        onPress={!disabled ? onNext : undefined}
        activeOpacity={disabled ? 1 : 0.8}
        className={`flex-row items-center justify-center h-[60px] rounded-full ${disabled ? "bg-[#3A1A2A]" : "bg-accent"} ${disabled ? "opacity-60" : "opacity-100"} ${!disabled ? "shadow-accent/50 shadow-lg" : ""}`}
        style={{ gap: 12, paddingHorizontal: 20 }}
      >
        {/* Left heart icon orb */}
        <View
          className="w-9 h-9 rounded-full bg-white/18 items-center justify-center"
        >
          <Text className="text-lg">❤️</Text>
        </View>

        {/* Label */}
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text
            className="flex-1 text-center text-white text-base font-bold"
            style={{ letterSpacing: 0.3 }}
          >
            {nextLabel}
          </Text>
        )}

        {/* Right chevrons */}
        <Text
          className="text-white/70 text-base font-bold"
          style={{ letterSpacing: -1 }}
        >
          {`>>>`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
