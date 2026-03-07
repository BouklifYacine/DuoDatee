import { View, Text, TextInput } from "react-native";

type Props = {
    value: string;
    onChange: (code: string) => void;
};

export function InviteCodeInput({ value, onChange }: Props) {
    const isComplete = value.length === 6;
    const hasInput = value.length > 0;

    const borderColor = !hasInput
        ? "border-border"
        : isComplete
            ? "border-green-500"
            : "border-accent";

    return (
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2.5">
                Code d'invitation
            </Text>
            <View className={`flex-row items-center rounded-2xl px-4 h-[72px] border-2 ${borderColor} bg-card`}>
                <Text className="text-xl mr-3">🔐</Text>
                <TextInput
                    className="flex-1 text-center text-2xl tracking-[8px] font-extrabold uppercase text-white"
                    placeholder="XXXXXX"
                    placeholderTextColor="#9FA3B0"
                    value={value}
                    onChangeText={(t) => onChange(t.toUpperCase().slice(0, 6))}
                    maxLength={6}
                    autoCapitalize="characters"
                />
            </View>
            <Text className="text-text-secondary text-xs mt-1.5 ml-1">
                {isComplete
                    ? "✓ Code prêt"
                    : `${value.length}/6 — demandez le code à votre partenaire`}
            </Text>
        </View>
    );
}
