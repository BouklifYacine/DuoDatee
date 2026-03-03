import { View, Text, Pressable } from "react-native";
import { PREFERRED_TYPES, type PreferredType } from "../schemas";
import { OB } from "@/constants/theme";

const TYPE_META: Record<PreferredType, { label: string; icon: string }> = {
    bouffe: { label: "Bouffe", icon: "🍽️" },
    boire: { label: "Boire", icon: "🍷" },
    activite: { label: "Activité", icon: "🎯" },
};

type Props = {
    selected: string[];
    onToggle: (type: PreferredType) => void;
};

export function ActivityTypeSelector({ selected, onToggle }: Props) {
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Types d'activité
                </Text>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 12 }}>{selected.length}/3</Text>
            </View>
            {PREFERRED_TYPES.map((type) => {
                const isSelected = selected.includes(type);
                const { label, icon } = TYPE_META[type];
                return (
                    <Pressable
                        key={type}
                        onPress={() => onToggle(type)}
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
                        {/* Checkbox circle (multi-select) */}
                        <View style={{
                            width: 22, height: 22, borderRadius: 11,
                            borderWidth: 2,
                            borderColor: isSelected ? OB.ACCENT : OB.BORDER_DEFAULT,
                            backgroundColor: isSelected ? OB.ACCENT : "transparent",
                            alignItems: "center", justifyContent: "center",
                        }}>
                            {isSelected && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>✓</Text>}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
