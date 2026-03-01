import { View, Text, Switch, Pressable } from "react-native";

type CoupleMode = "create" | "join";

type Props = {
    hasCouple: boolean;
    coupleMode: CoupleMode;
    onToggleCouple: (v: boolean) => void;
    onChangeMode: (mode: CoupleMode) => void;
};

/** Toggle "Je suis en couple" + onglets Créer / Rejoindre */
export function CoupleModeToggle({
    hasCouple,
    coupleMode,
    onToggleCouple,
    onChangeMode,
}: Props) {
    return (
        <View>
            {/* Switch couple */}
            <View className="flex-row items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">{hasCouple ? "💑" : "👤"}</Text>
                    <Text className="text-lg font-medium text-gray-800">Je suis en couple</Text>
                </View>
                <Switch
                    value={hasCouple}
                    onValueChange={onToggleCouple}
                    trackColor={{ false: "#E5E7EB", true: "#F472B6" }}
                    thumbColor={hasCouple ? "#DB2777" : "#F9FAFB"}
                />
            </View>

            {/* Tabs Créer / Rejoindre */}
            {hasCouple && (
                <View className="flex-row mb-6 bg-gray-100 rounded-xl p-1">
                    {(["create", "join"] as const).map((mode) => (
                        <Pressable
                            key={mode}
                            className={`flex-1 py-3 px-4 rounded-lg ${coupleMode === mode ? "bg-white shadow-sm" : ""
                                }`}
                            onPress={() => onChangeMode(mode)}
                        >
                            <Text
                                className={`text-center font-medium ${coupleMode === mode ? "text-primary" : "text-gray-500"
                                    }`}
                            >
                                {mode === "create" ? "✨ Créer" : "🔗 Rejoindre"}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}
