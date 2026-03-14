import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSignUpMutation } from "@/hooks/use-sign-up-mutation";
import {
  signUpSchema,
  validateField,
  type SignUpInput,
} from "@/schemas/signUpSchema";

const DEFAULT_VALUES: SignUpInput = {
  name: "",
  email: "",
  password: "",
};

const baseFieldClassName =
  "h-[52px] justify-center rounded-full border-[1.5px] bg-[#1A1A20] px-5";

export default function SignUpScreen() {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: ({ value }) => {
        const result = signUpSchema.safeParse(value);

        if (!result.success) {
          const flat = result.error.flatten();

          return {
            fields: {
              name: flat.fieldErrors.name?.[0],
              email: flat.fieldErrors.email?.[0],
              password: flat.fieldErrors.password?.[0],
            },
          };
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const payload = signUpSchema.parse(value);
      signUpMutation.mutate(payload);
    },
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0A0A0E]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pb-10 pt-[60px]">
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            className="mb-[18px] self-start rounded-full border border-[#2E2E38] bg-[#1A1A20] px-3.5 py-2.5"
          >
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="chevron-left"
                size={18}
                color="#FFFFFF"
              />
              <Text className="text-sm font-bold text-white">Retour</Text>
            </View>
          </Pressable>

          <Text className="mb-7 text-center text-[26px] font-extrabold tracking-[0.5px] text-white">
            DuoDate
          </Text>

          <View className="mb-5 items-center">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-[#E8185F]/15">
              <Text className="text-[28px]">😊</Text>
            </View>
          </View>

          <Text className="mb-1.5 text-center text-[22px] font-extrabold text-white">
            Creer un compte
          </Text>
          <Text className="mb-6 text-center text-[13px] leading-5 text-[#9FA3B0]">
            Rejoignez DuoDate et trouvez{"\n"}votre prochaine activite de couple.
          </Text>

          <View className="mb-6 flex-row rounded-full border border-[#2E2E38] bg-[#1A1A20] p-1">
            <Pressable
              onPress={() => router.replace("/sign-in")}
              className="flex-1 items-center rounded-full bg-transparent py-3"
            >
              <Text className="text-sm font-bold text-[#9FA3B0]">
                Se connecter
              </Text>
            </Pressable>
            <Pressable className="flex-1 items-center rounded-full bg-[#E8185F] py-3">
              <Text className="text-sm font-bold text-white">
                S&apos;inscrire
              </Text>
            </Pressable>
          </View>

          <form.Field
            name="name"
            validators={{
              onChange: ({ value, fieldApi }) =>
                fieldApi.state.meta.isBlurred ||
                form.state.submissionAttempts > 0
                  ? validateField("name", value) ?? null
                  : null,
            }}
          >
            {(field) => {
              const err = field.state.meta.errors?.[0];
              const fieldClassName = `${baseFieldClassName} ${
                err ? "border-[#FF6B8A]" : "border-[#2E2E38]"
              }`;

              return (
                <View className="mb-4">
                  <Text className="mb-1.5 text-[13px] font-semibold text-[#9FA3B0]">
                    Nom
                  </Text>
                  <View className={fieldClassName}>
                    <TextInput
                      className="text-sm text-white"
                      placeholder="Votre prenom"
                      placeholderTextColor="#9FA3B0"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      autoCapitalize="words"
                    />
                  </View>
                  {err ? (
                    <Text className="mt-1 text-xs text-[#FF6B8A]">{err}</Text>
                  ) : null}
                </View>
              );
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value, fieldApi }) =>
                fieldApi.state.meta.isBlurred ||
                form.state.submissionAttempts > 0
                  ? validateField("email", value) ?? null
                  : null,
            }}
          >
            {(field) => {
              const err = field.state.meta.errors?.[0];
              const fieldClassName = `${baseFieldClassName} ${
                err ? "border-[#FF6B8A]" : "border-[#2E2E38]"
              }`;

              return (
                <View className="mb-4">
                  <Text className="mb-1.5 text-[13px] font-semibold text-[#9FA3B0]">
                    Email
                  </Text>
                  <View className={fieldClassName}>
                    <TextInput
                      className="text-sm text-white"
                      placeholder="monster76@gmail.com"
                      placeholderTextColor="#9FA3B0"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {err ? (
                    <Text className="mt-1 text-xs text-[#FF6B8A]">{err}</Text>
                  ) : null}
                </View>
              );
            }}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value, fieldApi }) =>
                fieldApi.state.meta.isBlurred ||
                form.state.submissionAttempts > 0
                  ? validateField("password", value) ?? null
                  : null,
            }}
          >
            {(field) => {
              const err = field.state.meta.errors?.[0];
              const fieldClassName = `${baseFieldClassName} flex-row items-center ${
                err ? "border-[#FF6B8A]" : "border-[#2E2E38]"
              }`;

              return (
                <View className="mb-5">
                  <Text className="mb-1.5 text-[13px] font-semibold text-[#9FA3B0]">
                    Mot de passe
                  </Text>
                  <View className={fieldClassName}>
                    <TextInput
                      className="flex-1 text-sm text-white"
                      placeholder="••••••••••"
                      placeholderTextColor="#9FA3B0"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={8}
                      className="ml-3"
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#9FA3B0"
                      />
                    </Pressable>
                  </View>
                  {err ? (
                    <Text className="mt-1 text-xs text-[#FF6B8A]">{err}</Text>
                  ) : null}
                </View>
              );
            }}
          </form.Field>

          {signUpMutation.error ? (
            <Text className="mb-3 text-center text-[13px] text-[#FF6B8A]">
              {signUpMutation.error.message}
            </Text>
          ) : null}

          <Pressable
            onPress={() => form.handleSubmit()}
            disabled={signUpMutation.isPending}
            className={`mb-6 h-[58px] flex-row items-center justify-center rounded-full px-5 ${
              signUpMutation.isPending ? "bg-[#3A1A2A]" : "bg-[#E8185F]"
            } pressed:opacity-90 disabled:opacity-60`}
          >
            {signUpMutation.isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-center text-base font-bold text-white">
                S&apos;inscrire
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
