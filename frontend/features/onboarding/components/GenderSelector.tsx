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

export function GenderSelector({ value, onChange, submissionAttempts = 0 }: Props) {
    const hasError = !value && submissionAttempts > 0;

    return (
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2.5">
                Genre
            </Text>
            {OPTIONS.map((opt) => {
                const isSelected = value === opt.value;
                return (
                    <Pressable
                        key={opt.value}
                        onPress={() => onChange(opt.value)}
                        className={`flex-row items-center h-14 rounded-2xl border-2 px-4 mb-2.5 ${isSelected ? "border-accent bg-card-selected" : "border-border bg-card"}`}
                    >
                        <Text className="text-xl mr-3">{opt.icon}</Text>
                        <Text className="flex-1 text-white text-base font-semibold">
                            {opt.label}
                        </Text>
                        {/* Radio circle */}
                        <View className={`w-[22px] h-[22px] rounded-full border-2 ${isSelected ? "border-accent bg-accent" : "border-border bg-transparent"} items-center justify-center`}>
                            {isSelected && <View className="w-2 h-2 rounded-sm bg-white" />}
                        </View>
                    </Pressable>
                );
            })}
            {hasError && (
                <Text className="text-pink-400 text-xs mt-1">
                    Veuillez sélectionner votre genre
                </Text>
            )}
        </View>
    );
}
