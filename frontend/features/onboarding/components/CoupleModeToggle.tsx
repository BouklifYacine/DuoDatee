import { View, Text, Switch, Pressable } from "react-native";

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
        <View className="mb-5">
            {/* Switch row */}
            <View className={`flex-row items-center justify-between h-16 rounded-2xl border-2 px-4 mb-3 ${hasCouple ? "border-accent bg-card-selected" : "border-border bg-card"}`}>
                <View className="flex-row items-center">
                    <Text className="text-xl mr-3">{hasCouple ? "💑" : "👤"}</Text>
                    <Text className="text-white text-base font-semibold">
                        Je suis en couple
                    </Text>
                </View>
                <Switch
                    value={hasCouple}
                    onValueChange={onToggleCouple}
                    trackColor={{ false: "#2E2E38", true: "rgba(232, 24, 95, 0.35)" }}
                    thumbColor={hasCouple ? "#E8185F" : "#9FA3B0"}
                />
            </View>

            {/* Mode tabs */}
            {hasCouple && (
                <View className="flex-row bg-card rounded-xl border border-border p-1 mb-3">
                    {(["create", "join"] as const).map((mode) => {
                        const isActive = coupleMode === mode;
                        return (
                            <Pressable
                                key={mode}
                                onPress={() => onChangeMode(mode)}
                                className={`flex-1 py-2.5 px-3 rounded-lg items-center ${isActive ? "bg-accent" : ""}`}
                            >
                                <Text className={`${isActive ? "text-white" : "text-text-secondary"} font-bold text-sm`}>
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
