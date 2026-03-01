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
                {OPTIONS.map((opt) => (
                    <Pressable
                        key={opt.value}
                        className={`flex-1 min-h-[56px] flex-row items-center justify-center rounded-xl border-2 ${value === opt.value
                                ? "border-primary bg-primary/15"
                                : "border-gray-200 bg-gray-50"
                            }`}
                        onPress={() => onChange(opt.value)}
                    >
                        <Text className="text-2xl mr-2">{opt.icon}</Text>
                        <Text
                            className={`text-base font-medium ${value === opt.value ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            {opt.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
            {hasError && (
                <Text className="text-sm text-red-500 mt-2 ml-1">
                    Veuillez sélectionner votre genre
                </Text>
            )}
        </View>
    );
}
