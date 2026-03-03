import { View, Text, TextInput } from "react-native";
import { OB } from "@/constants/theme";

type Props = {
    value: string;
    onChange: (code: string) => void;
};

export function InviteCodeInput({ value, onChange }: Props) {
    const isComplete = value.length === 6;
    const hasInput = value.length > 0;

    const borderColor = !hasInput
        ? OB.BORDER_DEFAULT
        : isComplete
            ? "#4CAF82"
            : OB.ACCENT;

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                Code d'invitation
            </Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 14,
                paddingHorizontal: 16,
                height: 72,
                borderWidth: 1.5,
                borderColor,
                backgroundColor: OB.BG_CARD,
            }}>
                <Text style={{ fontSize: 22, marginRight: 12 }}>🔐</Text>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 26,
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 8,
                        fontWeight: "800",
                        color: OB.TEXT_PRIMARY,
                    }}
                    placeholder="XXXXXX"
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={value}
                    onChangeText={(t) => onChange(t.toUpperCase().slice(0, 6))}
                    maxLength={6}
                    autoCapitalize="characters"
                />
            </View>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 12, marginTop: 6, marginLeft: 4 }}>
                {isComplete
                    ? "✓ Code prêt"
                    : `${value.length}/6 — demandez le code à votre partenaire`}
            </Text>
        </View>
    );
}
