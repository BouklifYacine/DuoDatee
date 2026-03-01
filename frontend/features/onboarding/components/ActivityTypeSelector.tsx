import { View, Text, Pressable } from "react-native";
import { PREFERRED_TYPES, type PreferredType } from "../schemas";

const TYPE_META: Record<PreferredType, { label: string; icon: string }> = {
    bouffe: { label: "Bouffe", icon: "🍽️" },
    boire: { label: "Boire", icon: "🍷" },
    activite: { label: "Activité", icon: "🎯" },
};

const PRIMARY = "#8B3A52";

type Props = {
    selected: string[];
    onToggle: (type: PreferredType) => void;
};

/** Sélection multi (max 3) des types d'activité — style identique au GenderSelector */
export function ActivityTypeSelector({ selected, onToggle }: Props) {
    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-medium text-gray-700">Types d'activité</Text>
                <Text className="text-sm text-gray-400">{selected.length}/3</Text>
            </View>
            <Text className="text-sm text-gray-500 mb-3">Sélectionnez jusqu'à 3 options</Text>
            <View className="flex-row gap-4">
                {PREFERRED_TYPES.map((type) => {
                    const isSelected = selected.includes(type);
                    const { label, icon } = TYPE_META[type];
                    return (
                        <Pressable
                            key={type}
                            className="flex-1 min-h-[56px] flex-row items-center justify-center rounded-xl border-2"
                            style={{
                                borderColor: isSelected ? PRIMARY : "#e5e7eb",
                                backgroundColor: isSelected ? "rgba(139, 58, 82, 0.15)" : "#f9fafb",
                            }}
                            onPress={() => onToggle(type)}
                        >
                            <Text className="text-xl mr-2">{icon}</Text>
                            <Text
                                className="text-base font-medium"
                                style={{ color: isSelected ? PRIMARY : "#374151" }}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            {selected.length > 0 && (
                <Text className="text-sm mt-2 ml-1 text-green-600">
                    ✓ {selected.length} sélectionné{selected.length > 1 ? "s" : ""}
                </Text>
            )}
        </View>
    );
}
