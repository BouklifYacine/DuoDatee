import { View, Text, Switch, Pressable } from "react-native";
import { OB } from "@/constants/theme";

type CoupleMode = "create" | "join";

type Props = {
    hasCouple: boolean;
    coupleMode: CoupleMode;
    onToggleCouple: (v: boolean) => void;
    onChangeMode: (mode: CoupleMode) => void;
};

export function CoupleModeToggle({
    hasCouple,
    coupleMode,
    onToggleCouple,
    onChangeMode,
}: Props) {
    return (
        <View style={{ marginBottom: 20 }}>
            {/* Switch row */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 64,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: hasCouple ? OB.BORDER_SELECTED : OB.BORDER_DEFAULT,
                backgroundColor: hasCouple ? OB.BG_CARD_SELECTED : OB.BG_CARD,
                paddingHorizontal: 16,
                marginBottom: 12,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 22, marginRight: 12 }}>{hasCouple ? "💑" : "👤"}</Text>
                    <Text style={{ color: OB.TEXT_PRIMARY, fontSize: 15, fontWeight: "600" }}>
                        Je suis en couple
                    </Text>
                </View>
                <Switch
                    value={hasCouple}
                    onValueChange={onToggleCouple}
                    trackColor={{ false: OB.BORDER_DEFAULT, true: OB.ACCENT_GLOW }}
                    thumbColor={hasCouple ? OB.ACCENT : OB.TEXT_SECONDARY}
                />
            </View>

            {/* Mode tabs */}
            {hasCouple && (
                <View style={{
                    flexDirection: "row",
                    backgroundColor: OB.BG_CARD,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: OB.BORDER_DEFAULT,
                    padding: 4,
                    marginBottom: 12,
                }}>
                    {(["create", "join"] as const).map((mode) => {
                        const isActive = coupleMode === mode;
                        return (
                            <Pressable
                                key={mode}
                                onPress={() => onChangeMode(mode)}
                                style={({ pressed }) => ({
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    borderRadius: 9,
                                    backgroundColor: isActive ? OB.ACCENT : "transparent",
                                    alignItems: "center",
                                    opacity: pressed ? 0.8 : 1,
                                })}
                            >
                                <Text style={{
                                    color: isActive ? "#fff" : OB.TEXT_SECONDARY,
                                    fontWeight: "700",
                                    fontSize: 14,
                                }}>
                                    {mode === "create" ? "✨ Créer" : "🔗 Rejoindre"}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            )}
        </View>
    );
}
