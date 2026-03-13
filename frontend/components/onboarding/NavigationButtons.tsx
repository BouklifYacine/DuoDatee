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
  backLabel?: string;
  className?: string;
  showBackButton?: boolean;
};

export function NavigationButtons({
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
  isLoading = false,
  nextLabel = "Continuer",
  backLabel = "Retour",
  showBackButton = true,
}: NavigationButtonsProps) {
  const canShowBack = showBackButton && !!onBack;
  const backDisabled = isBackDisabled || isLoading;
  const disabled = isNextDisabled || isLoading;

  return (
    <View className="px-6 pb-8 pt-3">
      <View className="flex-row items-center gap-3">
        {canShowBack ? (
          <TouchableOpacity
            onPress={!backDisabled ? onBack : undefined}
            activeOpacity={backDisabled ? 1 : 0.85}
            accessibilityRole="button"
            className={`h-15 flex-1 flex-row items-center justify-center rounded-[24px] border bg-[#15151B] px-4 ${backDisabled ? "border-[#332B31] opacity-55" : "border-[#2E2E38] opacity-100"}`}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={18}
              color="#FFFFFF"
            />
            <Text className="ml-2 text-[15px] font-semibold text-white">
              {backLabel}
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={!disabled ? onNext : undefined}
          activeOpacity={disabled ? 1 : 0.85}
          accessibilityRole="button"
          className={`h-15 rounded-[24px] border px-5 ${canShowBack ? "flex-[1.14]" : "flex-1"} ${disabled ? "border-[#5B2940] bg-[#3A1A2A] opacity-60" : "border-[#FF6A99] bg-accent opacity-100 shadow-accent/40 shadow-lg"}`}
        >
          <View className="flex-1 flex-row items-center">
            <View className="h-10 w-7" />

            <View className="flex-1 items-center justify-center pr-2">
              <Text className="text-center text-[15px] font-bold tracking-[0.2px] text-white">
                {nextLabel}
              </Text>
            </View>

            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/16">
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color="#FFFFFF"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
