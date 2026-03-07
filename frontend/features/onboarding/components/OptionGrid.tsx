import { View, Text, Pressable } from "react-native";

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
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2.5">
                {label}
            </Text>
            {options.map((opt) => {
                const isSelected = selected === opt;
                return (
                    <Pressable
                        key={opt}
                        onPress={() => onSelect(opt)}
                        className={`flex-row items-center h-14 rounded-2xl border-2 px-4 mb-2.5 ${isSelected ? "border-accent bg-card-selected" : "border-border bg-card"}`}
                    >
                        <Text className="text-xl mr-3">{getIcon(opt)}</Text>
                        <Text className="flex-1 text-white text-base font-semibold">
                            {getLabel(opt)}
                        </Text>
                        <View className={`w-[22px] h-[22px] rounded-full border-2 ${isSelected ? "border-accent bg-accent" : "border-border bg-transparent"} items-center justify-center`}>
                            {isSelected && <View className="w-2 h-2 rounded-sm bg-white" />}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
