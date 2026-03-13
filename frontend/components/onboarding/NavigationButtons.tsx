import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
        accessibilityRole="button"
        className={`min-h-[72px] rounded-full border px-5 py-3 ${disabled ? "border-[#5B2940] bg-[#3A1A2A]" : "border-[#FF6A99] bg-accent"} ${disabled ? "opacity-60" : "opacity-100"} ${!disabled ? "shadow-accent/50 shadow-lg" : ""}`}
      >
        <View className="flex-1 flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="mb-1 text-[11px] font-semibold uppercase tracking-[1.4px] text-white/70">
              Etape suivante
            </Text>

            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-base font-bold text-white">
                {nextLabel}
              </Text>
            )}
          </View>

          <View className="h-11 w-11 items-center justify-center rounded-full bg-white/16">
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
