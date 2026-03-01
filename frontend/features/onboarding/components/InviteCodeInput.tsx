import { View, Text, TextInput } from "react-native";

type Props = {
    value: string;
    onChange: (code: string) => void;
};

/** Input stylisé pour le code d'invitation couple (6 chars, uppercase) */
export function InviteCodeInput({ value, onChange }: Props) {
    const isComplete = value.length === 6;
    const hasInput = value.length > 0;

    return (
        <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-3">
                Code d'invitation
            </Text>
            <View
                className={`flex-row items-center border-2 rounded-xl px-4 py-4 ${!hasInput
                        ? "border-gray-200 bg-gray-50"
                        : isComplete
                            ? "border-green-300 bg-green-50"
                            : "border-red-300 bg-red-50"
                    }`}
            >
                <Text className="text-xl mr-3">🔐</Text>
                <TextInput
                    className="flex-1 text-2xl text-center uppercase tracking-[8px] font-bold text-gray-800"
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
