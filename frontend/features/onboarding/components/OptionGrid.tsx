import { View, Text, Pressable } from "react-native";

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
            <View className="flex-row flex-wrap gap-2">
                {options.map((opt) => {
                    const isSelected = selected === opt;
                    return (
                        <Pressable
                            key={opt}
                            className={`min-h-12 px-3 py-2 rounded-xl border-2 flex-row items-center ${isSelected
                                    ? "border-primary bg-primary/15"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                            onPress={() => onSelect(opt)}
                        >
                            <Text className="text-lg mr-2">{getIcon(opt)}</Text>
                            <Text className={`font-medium ${isSelected ? "text-primary" : "text-gray-700"}`}>
                                {getLabel(opt)}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
