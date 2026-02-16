import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function AuthWelcomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Bienvenue</ThemedText>
      <ThemedText>Connecte-toi ou cree un compte.</ThemedText>

      <Link href="/sign-in" style={styles.button}>
        <ThemedText style={styles.buttonText}>Se connecter</ThemedText>
      </Link>

      <Link href="/sign-up" style={styles.buttonSecondary}>
        <ThemedText style={styles.buttonSecondaryText}>S'inscrire</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#0a7ea4",
    borderRadius: 10,
    paddingVertical: 14,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 10,
    paddingVertical: 14,
    textAlign: "center",
  },
  buttonSecondaryText: {
    color: "#0a7ea4",
    fontWeight: "600",
    textAlign: "center",
  },
});
