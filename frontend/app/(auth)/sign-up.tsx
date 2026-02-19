import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

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
    <View className="flex-1 justify-center px-6 gap-2.5">
      <Text className="text-[28px] font-bold leading-8">Creer un compte</Text>
      <Text className="opacity-80 mb-4">
        Inscription avec nom, email et mot de passe
      </Text>

      <View className="gap-2.5">
        <TextInput
          value={values.name}
          onChangeText={(text) => updateField("name", text)}
          placeholder="Nom"
          autoCapitalize="words"
          className="border border-gray-400 rounded-xl px-3.5 py-3 text-base"
        />
        {fieldErrors.name ? (
          <Text className="text-red-600 text-sm">{fieldErrors.name}</Text>
        ) : null}

        <TextInput
          value={values.email}
          onChangeText={(text) => updateField("email", text)}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          className="border border-gray-400 rounded-xl px-3.5 py-3 text-base"
        />
        {fieldErrors.email ? (
          <Text className="text-red-600 text-sm">{fieldErrors.email}</Text>
        ) : null}

        <TextInput
          value={values.password}
          onChangeText={(text) => updateField("password", text)}
          placeholder="Mot de passe (6 caracteres min)"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          className="border border-gray-400 rounded-xl px-3.5 py-3 text-base"
        />
        {fieldErrors.password ? (
          <Text className="text-red-600 text-sm">{fieldErrors.password}</Text>
        ) : null}

        {serverError ? (
          <Text className="text-red-600 text-sm">{serverError}</Text>
        ) : null}

        <Pressable
          onPress={submit}
          disabled={signUpMutation.isPending}
          className={`mt-2.5 bg-[#0a7ea4] rounded-xl py-3.5 items-center ${signUpMutation.isPending ? "opacity-70" : ""}`}
        >
          {signUpMutation.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold">S'inscrire</Text>
          )}
        </Pressable>

        <Link href="/sign-in">
          <Text className="text-base text-[#0a7ea4]">Deja un compte ? Se connecter</Text>
        </Link>
      </View>
    </View>
  );
}
