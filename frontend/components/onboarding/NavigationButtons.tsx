import { ActivityIndicator, View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

// Couleur primary
const PRIMARY_COLOR = "#8B3A52";

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
  showIcons?: boolean;
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
  showIcons = true,
}: NavigationButtonsProps) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-6 py-5 gap-4 bg-background border-t border-border/50",
        className
      )}
    >
      {/* Back Button - Outline/Ghost style with larger touch area */}
      {showBackButton && (
        <View className="flex-1">
          <Button
            variant="outline"
            onPress={onBack}
            disabled={isBackDisabled || isLoading}
            className="h-14 border-2 rounded-xl"
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                transform: pressed ? [{ scale: 0.98 }] : [],
              },
            ]}
          >
            {showIcons && (
              <View className="mr-2">
                <Text className="text-lg">←</Text>
              </View>
            )}
            <Text
              variant="default"
              className={cn(
                "text-base font-semibold",
                isBackDisabled && "opacity-50"
              )}
            >
              {backLabel}
            </Text>
          </Button>
        </View>
      )}

      {/* Next Button - Solid primary with larger touch area */}
      <View className={cn("flex-1", !showBackButton && "w-full")}>
        <Button
          variant="default"
          onPress={onNext}
          disabled={isNextDisabled || isLoading}
          className="h-14 rounded-xl shadow-lg"
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.85 : 1,
              transform: pressed ? [{ scale: 0.98 }] : [],
              backgroundColor: PRIMARY_COLOR,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              color="#ffffff"
              size="small"
              className="mr-2"
            />
          ) : (
            <>
              <Text
                variant="default"
                className="text-base font-semibold text-white"
              >
                {nextLabel}
              </Text>
              {showIcons && (
                <View className="ml-2">
                  <Text className="text-lg text-white">→</Text>
                </View>
              )}
            </>
          )}
        </Button>
      </View>
    </View>
  );
}
