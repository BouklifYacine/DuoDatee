import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (code: string) => void;
};

export function InviteCodeInput({ value, onChange }: Props) {
  const isComplete = value.length === 6;
  const hasInput = value.length > 0;
  const borderColor = !hasInput
    ? "#2E2E38"
    : isComplete
      ? "#22C55E"
      : "#E8185F";

  const handleChangeText = (text: string) => {
    onChange(text.replace(/\s+/g, "").toUpperCase().slice(0, 6));
  };

  return (
    <View className="mb-5">
      <Text className="mb-2.5 text-[13px] font-semibold uppercase tracking-wider text-text-secondary">
        Code d'invitation
      </Text>
      <View
        className="flex-row items-center rounded-2xl bg-card px-4"
        style={[styles.inputWrapper, { borderColor }]}
      >
        <Text className="mr-3 text-xl">{"\u{1F510}"}</Text>
        <TextInput
          style={styles.input}
          placeholder="XXXXXX"
          placeholderTextColor="#9FA3B0"
          value={value}
          onChangeText={handleChangeText}
          maxLength={6}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />
      </View>
      <Text className="ml-1 mt-1.5 text-xs text-text-secondary">
        {isComplete
          ? "Code pret"
          : `${value.length}/6 - demandez le code a votre partenaire`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: 72,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
