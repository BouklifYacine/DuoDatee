import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

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
    <View className="flex-1 justify-center px-6 gap-2.5">
      <Text className="text-[28px] font-bold leading-8">Se connecter</Text>

      <View className="gap-2.5">
        <TextInput
          value={values.email}
          onChangeText={(text) => setValues((prev) => ({ ...prev, email: text }))}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          className="border border-gray-400 rounded-xl px-3.5 py-3 text-base"
        />
        <TextInput
          value={values.password}
          onChangeText={(text) => setValues((prev) => ({ ...prev, password: text }))}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          className="border border-gray-400 rounded-xl px-3.5 py-3 text-base"
        />

        {error ? (
          <Text className="text-red-600 text-sm">{error}</Text>
        ) : null}

        <Pressable
          onPress={submit}
          disabled={signInMutation.isPending}
          className={`mt-2.5 bg-primary rounded-xl py-3.5 items-center ${signInMutation.isPending ? "opacity-70" : ""}`}
        >
          {signInMutation.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold">Se connecter</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setError(null);
            googleSignInMutation.mutate();
          }}
          disabled={googleSignInMutation.isPending}
          className={`border border-primary rounded-xl py-3.5 items-center ${googleSignInMutation.isPending ? "opacity-70" : ""}`}
        >
          {googleSignInMutation.isPending ? (
            <ActivityIndicator color="#0a7ea4" />
          ) : (
            <Text className="text-primary font-semibold">
              Continuer avec Google
            </Text>
          )}
        </Pressable>

        <Link href="/sign-up">
          <Text className="text-base text-primary">Pas de compte ? S'inscrire</Text>
        </Link>
      </View>
    </View>
  );
}
