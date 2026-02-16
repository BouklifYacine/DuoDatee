import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StyleSheet, View, Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { signOut, useSession } from "@/lib/auth-client";

export default function HomeScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const result = await signOut();
      if (result.error) {
        throw new Error(result.error.message ?? "Deconnexion impossible");
      }
      return result;
    },
    onSuccess: () => {
      router.replace("/welcome");
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText type="title">Session</ThemedText>
      <ThemedText>Nom: {session?.user.name ?? "-"}</ThemedText>
      <ThemedText>Email: {session?.user.email ?? "-"}</ThemedText>
      <ThemedText>User ID: {session?.user.id ?? "-"}</ThemedText>

      <Pressable
        onPress={() => signOutMutation.mutate()}
        disabled={signOutMutation.isPending}
        style={[styles.button, signOutMutation.isPending && styles.buttonDisabled]}
      >
        <ThemedText style={styles.buttonText}>
          {signOutMutation.isPending ? "Deconnexion..." : "Se deconnecter"}
        </ThemedText>
      </Pressable>
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
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
