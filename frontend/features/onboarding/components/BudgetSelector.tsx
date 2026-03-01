import { View, Text, Pressable } from "react-native";
import { PREFERRED_BUDGETS, type PreferredBudget } from "../schemas";

const BUDGET_META: Record<PreferredBudget, { label: string; icon: string }> = {
    economique: { label: "Économique", icon: "💰" },
    moyen: { label: "Moyen", icon: "💵" },
    premium: { label: "Premium", icon: "✨" },
};

type Props = {
    selected: string | undefined;
    onSelect: (budget: PreferredBudget) => void;
};

/** Sélecteur de budget : Économique / Moyen / Premium */
export function BudgetSelector({ selected, onSelect }: Props) {
    return (
        <View className="mb-6">
            <View className="flex-row items-center mb-3">
                <Text className="text-base font-medium text-gray-700">Budget</Text>
                {!!selected && <Text className="ml-2 text-sm text-green-500">✓</Text>}
            </View>
            <View className="flex-row gap-3">
                {PREFERRED_BUDGETS.map((budget) => {
                    const isSelected = selected === budget;
                    const { label, icon } = BUDGET_META[budget];
                    return (
                        <Pressable
                            key={budget}
                            className={`flex-1 min-h-14 py-3 px-2 rounded-xl border-2 items-center justify-center ${isSelected
                                    ? "border-primary bg-primary/15"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                            onPress={() => onSelect(budget)}
                        >
                            <Text className="text-2xl mb-1">{icon}</Text>
                            <Text
                                className={`text-center text-sm font-medium ${isSelected ? "text-primary" : "text-gray-700"
                                    }`}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
