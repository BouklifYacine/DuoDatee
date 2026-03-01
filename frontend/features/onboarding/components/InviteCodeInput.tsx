import { View, Text, TextInput } from "react-native";

type Props = {
    value: string;
    onChange: (code: string) => void;
};

/** Input stylisé pour le code d'invitation couple (6 chars, uppercase) */
export function InviteCodeInput({ value, onChange }: Props) {
    const isComplete = value.length === 6;
    const hasInput = value.length > 0;

    const borderColor = !hasInput ? "#e5e7eb" : isComplete ? "#86efac" : "#fca5a5";
    const bgColor = !hasInput ? "#f9fafb" : isComplete ? "#f0fdf4" : "#fef2f2";

    return (
        <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-3">
                Code d'invitation
            </Text>
            <View
                className="flex-row items-center rounded-xl px-4 py-4 border-2"
                style={{ borderColor, backgroundColor: bgColor }}
            >
                <Text className="text-xl mr-3">🔐</Text>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 24,
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 8,
                        fontWeight: "bold",
                        color: "#1f2937",
                    }}
                    placeholder="XXXXXX"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={(t) => onChange(t.toUpperCase().slice(0, 6))}
                    maxLength={6}
                    autoCapitalize="characters"
                />
            </View>
            <Text className="text-sm text-gray-500 mt-2 ml-1">
                {isComplete
                    ? "✓ Code prêt"
                    : `${value.length}/6 — demandez le code à votre partenaire`}
            </Text>
        </View>
    );
}
