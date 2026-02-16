import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/schemas/auth";

type FormErrors = Partial<Record<keyof SignUpInput, string>>;

export default function SignUpScreen() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const signUpMutation = useMutation({
    mutationFn: async (input: SignUpInput) => {
      const result = await signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Inscription impossible");
      }

      return result;
    },
    onSuccess: () => {
      router.replace("/sign-in");
    },
    onError: (error) => {
      setServerError(error.message);
    },
  });

  const updateField = (field: keyof SignUpInput, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  };

  const submit = () => {
    const payload: SignUpInput = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
    };

    const parsed = signUpSchema.safeParse(payload);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    setServerError(null);
    signUpMutation.mutate(parsed.data);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Creer un compte
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Inscription avec nom, email et mot de passe
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          value={values.name}
          onChangeText={(text) => updateField("name", text)}
          placeholder="Nom"
          autoCapitalize="words"
          style={styles.input}
        />
        {fieldErrors.name ? (
          <ThemedText style={styles.errorText}>{fieldErrors.name}</ThemedText>
        ) : null}

        <TextInput
          value={values.email}
          onChangeText={(text) => updateField("email", text)}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {fieldErrors.email ? (
          <ThemedText style={styles.errorText}>{fieldErrors.email}</ThemedText>
        ) : null}

        <TextInput
          value={values.password}
          onChangeText={(text) => updateField("password", text)}
          placeholder="Mot de passe (6 caracteres min)"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {fieldErrors.password ? (
          <ThemedText style={styles.errorText}>{fieldErrors.password}</ThemedText>
        ) : null}

        {serverError ? (
          <ThemedText style={styles.errorText}>{serverError}</ThemedText>
        ) : null}

        <Pressable
          onPress={submit}
          disabled={signUpMutation.isPending}
          style={[styles.button, signUpMutation.isPending && styles.buttonDisabled]}
        >
          {signUpMutation.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText style={styles.buttonText}>S'inscrire</ThemedText>
          )}
        </Pressable>

        <Link href="/sign-in">
          <ThemedText type="link">Deja un compte ? Se connecter</ThemedText>
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
  subtitle: {
    opacity: 0.8,
    marginBottom: 18,
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
});
