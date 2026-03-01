import { ActivityIndicator, View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const PRIMARY = "#8B3A52";

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
  nextLabel = "Suivant",
  backLabel = "Retour",
  className,
  showBackButton = true,
}: NavigationButtonsProps) {
  const nextDisabled = isNextDisabled || isLoading;

  return (
    <View
      className={cn(
        "flex-row items-center px-2 py-4 gap-4",
        className
      )}
    >
      {/* Back Button */}
      {showBackButton && (
        <View className="flex-1">
          <Button
            variant="ghost"
            onPress={onBack}
            disabled={isBackDisabled || isLoading}
            className="h-[60px] rounded-full border border-gray-200 bg-white"
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : isBackDisabled ? 0.4 : 1,
                transform: pressed ? [{ scale: 0.95 }] : [],
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              },
            ]}
          >
            <Text className="text-[16px] font-semibold text-gray-500">
              {backLabel}
            </Text>
          </Button>
        </View>
      )}

      {/* Next Button — Modern Floating Pill */}
      <View className={cn("flex-1", !showBackButton && "w-full")}>
        <Button
          variant="default"
          onPress={onNext}
          disabled={nextDisabled}
          className={cn(
            "h-[60px] rounded-full flex-row items-center justify-center overflow-hidden",
            nextDisabled && "opacity-50"
          )}
          style={({ pressed }) => [
            {
              backgroundColor: PRIMARY,
              transform: pressed && !nextDisabled ? [{ scale: 0.95 }] : [],
              shadowColor: PRIMARY,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: nextDisabled ? 0 : 0.5,
              shadowRadius: 16,
              elevation: nextDisabled ? 0 : 12,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <View className="flex-row items-center justify-center gap-3 w-full">
              <Text className="text-[18px] font-bold text-white tracking-wide">
                {nextLabel}
              </Text>
              <View className="bg-white/20 rounded-full w-8 h-8 items-center justify-center">
                <Text className="text-white text-base font-bold">→</Text>
              </View>
            </View>
          )}
        </Button>
      </View>
    </View>
  );
}
