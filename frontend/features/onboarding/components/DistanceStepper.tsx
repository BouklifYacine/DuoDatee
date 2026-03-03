import { View, Text, Pressable } from "react-native";
import { OB } from "@/constants/theme";

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export function DistanceStepper({ value, onChange }: Props) {
    const clamp = (n: number) => Math.min(100, Math.max(1, n));

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                Distance maximale
            </Text>
            <View style={{
                backgroundColor: OB.BG_CARD,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: OB.BORDER_DEFAULT,
                paddingVertical: 20,
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <Pressable
                    onPress={() => onChange(clamp(value - 5))}
                    style={({ pressed }) => ({
                        width: 44, height: 44, borderRadius: 22,
                        borderWidth: 1.5, borderColor: OB.BORDER_DEFAULT,
                        backgroundColor: OB.BG_DARK,
                        alignItems: "center", justifyContent: "center",
                        opacity: pressed ? 0.7 : 1,
                    })}
                >
                    <Text style={{ color: OB.TEXT_PRIMARY, fontSize: 22, fontWeight: "700", lineHeight: 26 }}>−</Text>
                </Pressable>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: OB.ACCENT, fontSize: 36, fontWeight: "800" }}>
                        {value}
                    </Text>
                    <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, marginTop: 2 }}>
                        km
                    </Text>
                </View>

                <Pressable
                    onPress={() => onChange(clamp(value + 5))}
                    style={({ pressed }) => ({
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: OB.ACCENT,
                        alignItems: "center", justifyContent: "center",
                        opacity: pressed ? 0.7 : 1,
                        shadowColor: OB.ACCENT,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 6,
                    })}
                >
                    <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", lineHeight: 26 }}>+</Text>
                </Pressable>
            </View>
        </View>
    );
}
