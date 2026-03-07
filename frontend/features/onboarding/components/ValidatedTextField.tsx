import { useState } from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
    field: any;
    label: string;
    placeholder: string;
    icon: string;
    keyboardType?: "default" | "numeric" | "email-address";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function ValidatedTextField({
    field,
    label,
    placeholder,
    icon,
    keyboardType = "default",
    autoCapitalize = "sentences",
}: Props) {
    const [focused, setFocused] = useState(false);
    const error = field.state.meta.errors?.[0] as string | undefined;
    const isTouched = field.state.meta.isTouched;
    const hasValue = String(field.state.value).length > 0;
    const showError = !!error && isTouched;
    const showSuccess = !error && hasValue && isTouched;

    const borderColor = showError
        ? "border-pink-400"
        : showSuccess
            ? "border-green-500"
            : focused
                ? "border-accent"
                : "border-border";

    return (
        <View className="mb-5">
            <Text className="text-text-secondary text-[13px] font-semibold tracking-wider uppercase mb-2">
                {label}
            </Text>
            <View className={`flex-row items-center border-2 rounded-2xl px-4 h-14 bg-card ${borderColor}`}>
                <Text className="text-xl mr-3">{icon}</Text>
                <TextInput
                    className="flex-1 text-base text-white"
                    placeholder={placeholder}
                    placeholderTextColor="#9FA3B0"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={() => { field.handleBlur(); setFocused(false); }}
                    onFocus={() => setFocused(true)}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {showSuccess && <Text className="text-green-500 text-base">✓</Text>}
            </View>
            {showError && (
                <Text className="text-pink-400 text-xs mt-1 ml-1">
                    {error}
                </Text>
            )}
        </View>
    );
}
