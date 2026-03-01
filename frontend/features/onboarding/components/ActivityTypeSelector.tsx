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

/** Sélection multi (max 3) des types d'activité */
export function ActivityTypeSelector({ selected, onToggle }: Props) {
    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-medium text-gray-700">Types d'activité</Text>
                <Text className="text-sm text-gray-400">{selected.length}/3</Text>
            </View>
            <Text className="text-sm text-gray-500 mb-3">Sélectionnez jusqu'à 3 options</Text>
            <View className="flex-row flex-wrap gap-3">
                {PREFERRED_TYPES.map((type) => {
                    const isSelected = selected.includes(type);
                    const { label, icon } = TYPE_META[type];
                    return (
                        <Pressable
                            key={type}
                            className={`min-h-12 px-4 py-2 rounded-full border-2 flex-row items-center ${isSelected
                                    ? "border-primary bg-primary/15"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                            onPress={() => onToggle(type)}
                        >
                            <Text className="text-xl mr-2">{icon}</Text>
                            <Text className={`font-medium ${isSelected ? "text-primary" : "text-gray-700"}`}>
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
