import { View, Text, Pressable } from "react-native";
import { OB } from "@/constants/theme";

type Props<T extends string> = {
    label: string;
    options: readonly T[];
    getLabel: (o: T) => string;
    getIcon: (o: T) => string;
    selected: T | undefined;
    onSelect: (o: T) => void;
};

/** Generic single-select option list — dark pill card style */
export function OptionGrid<T extends string>({
    label,
    options,
    getLabel,
    getIcon,
    selected,
    onSelect,
}: Props<T>) {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                {label}
            </Text>
            {options.map((opt) => {
                const isSelected = selected === opt;
                return (
                    <Pressable
                        key={opt}
                        onPress={() => onSelect(opt)}
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
                        <Text style={{ fontSize: 22, marginRight: 12 }}>{getIcon(opt)}</Text>
                        <Text style={{ flex: 1, color: OB.TEXT_PRIMARY, fontSize: 15, fontWeight: "600" }}>
                            {getLabel(opt)}
                        </Text>
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
        </View>
    );
}
