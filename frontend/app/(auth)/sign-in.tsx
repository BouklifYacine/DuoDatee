import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { signIn } from "@/lib/auth-client";

type SignInValues = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const router = useRouter();
  const [values, setValues] = useState<SignInValues>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const signInMutation = useMutation({
    mutationFn: async (input: SignInValues) => {
      const result = await signIn.email({
        email: input.email.trim().toLowerCase(),
        password: input.password,
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Connexion impossible");
      }

      return result;
    },
    onSuccess: () => {
      router.replace("/(tabs)");
    },
    onError: (mutationError) => {
      setError(mutationError.message);
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/(tabs)",
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Connexion Google impossible");
      }

      return result;
    },
    onError: (mutationError) => {
      setError(mutationError.message);
    },
  });

  const submit = () => {
    setError(null);
    signInMutation.mutate(values);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Se connecter
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          value={values.email}
          onChangeText={(text) => setValues((prev) => ({ ...prev, email: text }))}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          value={values.password}
          onChangeText={(text) => setValues((prev) => ({ ...prev, password: text }))}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}

        <Pressable
          onPress={submit}
          disabled={signInMutation.isPending}
          style={[styles.button, signInMutation.isPending && styles.buttonDisabled]}
        >
          {signInMutation.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText style={styles.buttonText}>Se connecter</ThemedText>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setError(null);
            googleSignInMutation.mutate();
          }}
          disabled={googleSignInMutation.isPending}
          style={[styles.buttonSecondary, googleSignInMutation.isPending && styles.buttonDisabled]}
        >
          {googleSignInMutation.isPending ? (
            <ActivityIndicator color="#0a7ea4" />
          ) : (
            <ThemedText style={styles.buttonSecondaryText}>Continuer avec Google</ThemedText>
          )}
        </Pressable>

        <Link href="/sign-up">
          <ThemedText type="link">Pas de compte ? S'inscrire</ThemedText>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 10,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
  },
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
  },
  button: {
    marginTop: 10,
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
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
});
