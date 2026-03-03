import { View, Text, Pressable } from "react-native";
import { OB } from "@/constants/theme";

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
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                Genre
            </Text>
            {OPTIONS.map((opt) => {
                const isSelected = value === opt.value;
                return (
                    <Pressable
                        key={opt.value}
                        onPress={() => onChange(opt.value)}
                        style={({ pressed }) => ({
                            flexDirection: "row",
                            alignItems: "center",
                            height: 58,
                            borderRadius: 14,
                            borderWidth: 1.5,
                            borderColor: isSelected ? OB.BORDER_SELECTED : OB.BORDER_DEFAULT,
                            backgroundColor: isSelected ? OB.BG_CARD_SELECTED : OB.BG_CARD,
                            paddingHorizontal: 16,
                            marginBottom: 10,
                            opacity: pressed ? 0.8 : 1,
                        })}
                    >
                        <Text style={{ fontSize: 22, marginRight: 12 }}>{opt.icon}</Text>
                        <Text style={{ flex: 1, color: OB.TEXT_PRIMARY, fontSize: 15, fontWeight: "600" }}>
                            {opt.label}
                        </Text>
                        {/* Radio circle */}
                        <View style={{
                            width: 22, height: 22, borderRadius: 11,
                            borderWidth: 2,
                            borderColor: isSelected ? OB.ACCENT : OB.BORDER_DEFAULT,
                            backgroundColor: isSelected ? OB.ACCENT : "transparent",
                            alignItems: "center", justifyContent: "center",
                        }}>
                            {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" }} />}
                        </View>
                    </Pressable>
                );
            })}
            {hasError && (
                <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4 }}>
                    Veuillez sélectionner votre genre
                </Text>
            )}
        </View>
    );
}
