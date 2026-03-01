import { View, Text, Pressable } from "react-native";
import { PREFERRED_BUDGETS, type PreferredBudget } from "../schemas";

const BUDGET_META: Record<PreferredBudget, { label: string; icon: string }> = {
    economique: { label: "Économique", icon: "💰" },
    moyen: { label: "Moyen", icon: "💵" },
    premium: { label: "Premium", icon: "✨" },
};

const PRIMARY = "#8B3A52";

type Props = {
    selected: string | undefined;
    onSelect: (budget: PreferredBudget) => void;
};

/** Sélecteur de budget — style identique au GenderSelector */
export function BudgetSelector({ selected, onSelect }: Props) {
    return (
        <View className="mb-6">
            <View className="flex-row items-center mb-3">
                <Text className="text-base font-medium text-gray-700">Budget</Text>
                {!!selected && <Text className="ml-2 text-sm text-green-500">✓</Text>}
            </View>
            <View className="flex-row gap-4">
                {PREFERRED_BUDGETS.map((budget) => {
                    const isSelected = selected === budget;
                    const { label, icon } = BUDGET_META[budget];
                    return (
                        <Pressable
                            key={budget}
                            className="flex-1 min-h-[72px] py-3 px-2 rounded-xl border-2 items-center justify-center"
                            style={{
                                borderColor: isSelected ? PRIMARY : "#e5e7eb",
                                backgroundColor: isSelected ? "rgba(139, 58, 82, 0.15)" : "#f9fafb",
                            }}
                            onPress={() => onSelect(budget)}
                        >
                            <Text className="text-2xl mb-1">{icon}</Text>
                            <Text
                                className="text-center text-sm font-medium"
                                style={{ color: isSelected ? PRIMARY : "#374151" }}
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
