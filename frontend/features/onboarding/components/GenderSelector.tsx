import { View, Text, Pressable } from "react-native";

type Gender = "homme" | "femme";

type Props = {
    value: Gender | undefined;
    onChange: (g: Gender) => void;
    submissionAttempts?: number;
};

const OPTIONS: { value: Gender; label: string; icon: string }[] = [
    { value: "homme", label: "Homme", icon: "👨" },
    { value: "femme", label: "Femme", icon: "👩" },
];

const PRIMARY = "#8B3A52";

/** Sélecteur de genre Homme / Femme */
export function GenderSelector({ value, onChange, submissionAttempts = 0 }: Props) {
    const hasError = !value && submissionAttempts > 0;

    return (
        <View className="mb-6">
            <View className="flex-row items-center mb-2">
                <Text className="text-base font-medium text-gray-700">Genre</Text>
                {!!value && <Text className="ml-2 text-sm text-green-500">✓</Text>}
            </View>
            <View className="flex-row gap-4">
                {OPTIONS.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                        <Pressable
                            key={opt.value}
                            className="flex-1 min-h-[56px] flex-row items-center justify-center rounded-xl border-2"
                            style={{
                                borderColor: isSelected ? PRIMARY : "#e5e7eb",
                                backgroundColor: isSelected ? "rgba(139, 58, 82, 0.15)" : "#f9fafb",
                            }}
                            onPress={() => onChange(opt.value)}
                        >
                            <Text className="text-2xl mr-2">{opt.icon}</Text>
                            <Text
                                className="text-base font-medium"
                                style={{ color: isSelected ? PRIMARY : "#4b5563" }}
                            >
                                {opt.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            {hasError && (
                <Text className="text-sm text-red-500 mt-2 ml-1">
                    Veuillez sélectionner votre genre
                </Text>
            )}
        </View>
    );
}
