import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { OB } from "@/constants/theme";

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
        ? "#FF6B8A"
        : showSuccess
            ? "#4CAF82"
            : focused
                ? OB.ACCENT
                : OB.BORDER_DEFAULT;

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>
                {label}
            </Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1.5,
                borderRadius: 14,
                borderColor,
                backgroundColor: OB.BG_CARD,
                paddingHorizontal: 16,
                height: 58,
            }}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>{icon}</Text>
                <TextInput
                    style={{ flex: 1, fontSize: 15, color: OB.TEXT_PRIMARY }}
                    placeholder={placeholder}
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={() => { field.handleBlur(); setFocused(false); }}
                    onFocus={() => setFocused(true)}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {showSuccess && <Text style={{ color: "#4CAF82", fontSize: 16 }}>✓</Text>}
            </View>
            {showError && (
                <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                    {error}
                </Text>
            )}
        </View>
    );
}
