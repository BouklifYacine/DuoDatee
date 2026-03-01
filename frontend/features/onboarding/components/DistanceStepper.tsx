import { View, Text, TextInput, Pressable } from "react-native";

type Props = {
    value: number;
    onChange: (value: number) => void;
};

/** Stepper +/- pour la distance (1–100 km) */
export function DistanceStepper({ value, onChange }: Props) {
    const clamp = (n: number) => Math.min(100, Math.max(1, n));

    return (
        <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-3">Distance maximale</Text>
            <View className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <View className="flex-row items-center justify-center gap-6">
                    <Pressable
                        className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center"
                        onPress={() => onChange(clamp(value - 5))}
                    >
                        <Text className="text-xl font-bold text-gray-600">−</Text>
                    </Pressable>

                    <View className="items-center">
                        <TextInput
                            style={{
                                fontSize: 30,
                                fontWeight: "bold",
                                color: "#8B3A52",
                                textAlign: "center",
                                width: 96,
                            }}
                            value={String(value)}
                            onChangeText={(t) => {
                                const n = parseInt(t, 10);
                                if (!isNaN(n)) onChange(clamp(n));
                            }}
                            keyboardType="numeric"
                        />
                        <Text className="text-sm text-gray-400 mt-1">kilomètres</Text>
                    </View>

                    <Pressable
                        className="w-12 h-12 rounded-full bg-primary items-center justify-center"
                        onPress={() => onChange(clamp(value + 5))}
                    >
                        <Text className="text-xl font-bold text-white">+</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
