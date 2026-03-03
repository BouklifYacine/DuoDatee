import { View, Text, Pressable } from "react-native";
import { PREFERRED_BUDGETS, type PreferredBudget } from "../schemas";
import { OB } from "@/constants/theme";

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
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                Budget
            </Text>
            {PREFERRED_BUDGETS.map((budget) => {
                const isSelected = selected === budget;
                const { label, icon } = BUDGET_META[budget];
                return (
                    <Pressable
                        key={budget}
                        onPress={() => onSelect(budget)}
                        style={({ pressed }) => ({
                            flexDirection: "row",
                            alignItems: "center",
                            height: 58,
                            borderRadius: 14,
                            borderWidth: 1.5,
                            borderColor: isSelected ? OB.BORDER_SELECTED : OB.BORDER_DEFAULT,
                            backgroundColor: isSelected ? OB.BG_CARD_SELECTED : OB.BG_CARD,
                            paddingHorizontal: 16,
                            marginBottom: 10,
                            opacity: pressed ? 0.8 : 1,
                        })}
                    >
                        <Text style={{ fontSize: 22, marginRight: 12 }}>{icon}</Text>
                        <Text style={{ flex: 1, color: OB.TEXT_PRIMARY, fontSize: 15, fontWeight: "600" }}>
                            {label}
                        </Text>
                        <View style={{
                            width: 22, height: 22, borderRadius: 11,
                            borderWidth: 2,
                            borderColor: isSelected ? OB.ACCENT : OB.BORDER_DEFAULT,
                            backgroundColor: isSelected ? OB.ACCENT : "transparent",
                            alignItems: "center", justifyContent: "center",
                        }}>
                            {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" }} />}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
