import { View, Text, Pressable } from "react-native";

const PRIMARY = "#8B3A52";

type Props<T extends string> = {
    label: string;
    options: readonly T[];
    getLabel: (o: T) => string;
    getIcon: (o: T) => string;
    selected: T | undefined;
    onSelect: (o: T) => void;
};

/** Grille générique d'options sélectionnables (une seule sélection) */
export function OptionGrid<T extends string>({
    label,
    options,
    getLabel,
    getIcon,
    selected,
    onSelect,
}: Props<T>) {
    return (
        <View className="mb-5">
            <View className="flex-row items-center mb-3">
                <Text className="text-base font-medium text-gray-700">{label}</Text>
                {!!selected && <Text className="ml-2 text-sm text-green-500">✓</Text>}
            </View>
            <View className="flex-row flex-wrap gap-3">
                {options.map((opt) => {
                    const isSelected = selected === opt;
                    return (
                        <Pressable
                            key={opt}
                            className="min-h-12 px-3 py-2 rounded-xl border-2 flex-row items-center"
                            style={{
                                borderColor: isSelected ? PRIMARY : "#e5e7eb",
                                backgroundColor: isSelected ? "rgba(139, 58, 82, 0.15)" : "#f9fafb",
                            }}
                            onPress={() => onSelect(opt)}
                        >
                            <Text className="text-lg mr-2">{getIcon(opt)}</Text>
                            <Text
                                className="font-medium"
                                style={{ color: isSelected ? PRIMARY : "#374151" }}
                            >
                                {getLabel(opt)}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
