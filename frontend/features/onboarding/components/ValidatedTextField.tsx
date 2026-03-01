import { View, Text, TextInput } from "react-native";

type Props = {
    field: any;
    label: string;
    placeholder: string;
    icon: string;
    keyboardType?: "default" | "numeric" | "email-address";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

/** Champ texte avec border dynamique (err/success) et message d'erreur inline */
export function ValidatedTextField({
    field,
    label,
    placeholder,
    icon,
    keyboardType = "default",
    autoCapitalize = "sentences",
}: Props) {
    const error = field.state.meta.errors?.[0] as string | undefined;
    const isTouched = field.state.meta.isTouched;
    const hasValue = String(field.state.value).length > 0;
    const showError = !!error && isTouched;
    const showSuccess = !error && hasValue && isTouched;

    return (
        <View className="mb-6">
            <View className="flex-row items-center mb-2">
                <Text className="text-base font-medium text-gray-700">{label}</Text>
                {showSuccess && <Text className="ml-2 text-sm text-green-500">✓</Text>}
            </View>
            <View
                className={`flex-row items-center border-2 rounded-xl px-4 py-3 ${showError
                        ? "border-red-300 bg-red-50"
                        : showSuccess
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                    }`}
            >
                <Text className="text-xl mr-3">{icon}</Text>
                <TextInput
                    className="flex-1 text-base text-gray-800"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
            </View>
            {showError && (
                <Text className="text-sm mt-1 ml-1 text-red-500">{error}</Text>
            )}
        </View>
    );
}
