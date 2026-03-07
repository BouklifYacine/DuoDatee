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

export function BudgetSelector({ selected, onSelect }: Props) {
    return (
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2.5">
                Budget
            </Text>
            {PREFERRED_BUDGETS.map((budget) => {
                const isSelected = selected === budget;
                const { label, icon } = BUDGET_META[budget];
                return (
                    <Pressable
                        key={budget}
                        onPress={() => onSelect(budget)}
                        className={`flex-row items-center h-14 rounded-2xl border-2 px-4 mb-2.5 ${isSelected ? "border-accent bg-card-selected" : "border-border bg-card"}`}
                    >
                        <Text className="text-xl mr-3">{icon}</Text>
                        <Text className="flex-1 text-white text-base font-semibold">
                            {label}
                        </Text>
                        <View className={`w-[22px] h-[22px] rounded-full border-2 ${isSelected ? "border-accent bg-accent" : "border-border bg-transparent"} items-center justify-center`}>
                            {isSelected && <View className="w-2 h-2 rounded-sm bg-white" />}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
