import { View, Text, Pressable } from "react-native";

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export function DistanceStepper({ value, onChange }: Props) {
    const clamp = (n: number) => Math.min(100, Math.max(1, n));

    return (
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2.5">
                Distance maximale
            </Text>
            <View className="bg-card rounded-2xl border-2 border-border py-5 px-6 flex-row items-center justify-between">
                <Pressable
                    onPress={() => onChange(clamp(value - 5))}
                    className="w-11 h-11 rounded-full border-2 border-border bg-dark items-center justify-center"
                >
                    <Text className="text-white text-xl font-bold leading-6">−</Text>
                </Pressable>

                <View className="items-center">
                    <Text className="text-accent text-[36px] font-extrabold">
                        {value}
                    </Text>
                    <Text className="text-text-secondary text-xs mt-0.5">
                        km
                    </Text>
                </View>

                <Pressable
                    onPress={() => onChange(clamp(value + 5))}
                    className="w-11 h-11 rounded-full bg-accent items-center justify-center shadow-accent/50 shadow-lg"
                >
                    <Text className="text-white text-xl font-bold leading-6">+</Text>
                </Pressable>
            </View>
        </View>
    );
}
