import { View, Text, Pressable } from "react-native";
import { PREFERRED_TYPES, type PreferredType } from "../schemas";

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
        <View className="mb-5">
            <View className="flex-row justify-between items-center mb-2.5">
                <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase">
                    Types d'activité
                </Text>
                <Text className="text-text-secondary text-xs">{selected.length}/3</Text>
            </View>
            {PREFERRED_TYPES.map((type) => {
                const isSelected = selected.includes(type);
                const { label, icon } = TYPE_META[type];
                return (
                    <Pressable
                        key={type}
                        onPress={() => onToggle(type)}
                        className={`flex-row items-center h-14 rounded-2xl border-2 px-4 mb-2.5 ${isSelected ? "border-accent bg-card-selected" : "border-border bg-card"}`}
                    >
                        <Text className="text-xl mr-3">{icon}</Text>
                        <Text className="flex-1 text-white text-base font-semibold">
                            {label}
                        </Text>
                        {/* Checkbox circle (multi-select) */}
                        <View className={`w-[22px] h-[22px] rounded-full border-2 ${isSelected ? "border-accent bg-accent" : "border-border bg-transparent"} items-center justify-center`}>
                            {isSelected && <Text className="text-white text-xs font-bold">✓</Text>}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
