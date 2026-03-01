import { ActivityIndicator, View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

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
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-4 gap-4",
        className
      )}
    >
      {/* Back Button */}
      {showBackButton && (
        <Button
          variant="outline"
          onPress={onBack}
          disabled={isBackDisabled || isLoading}
          className="flex-1"
        >
          <Text variant="default">{backLabel}</Text>
        </Button>
      )}

      {/* Next Button */}
      <Button
        variant="default"
        onPress={onNext}
        disabled={isNextDisabled || isLoading}
        className={cn("flex-1", !showBackButton && "w-full")}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#ffffff"
            size="small"
            className="mr-2"
          />
        ) : (
          <Text variant="default" className="text-primary-foreground">
            {nextLabel}
          </Text>
        )}
      </Button>
    </View>
  );
}
