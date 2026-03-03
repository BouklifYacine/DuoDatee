import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
import {
  useGoogleSignInMutation,
  useSignInMutation,
} from "@/hooks/use-sign-in-mutation";
import {
  signInSchema,
  validateField,
  type SignInInput,
} from "@/schemas/signInSchema";
import { OB } from "@/constants/theme";

const DEFAULT_VALUES: SignInInput = {
  email: "",
  password: "",
};

export default function SignInScreen() {
  const router = useRouter();
  const signInMutation = useSignInMutation();
  const googleSignInMutation = useGoogleSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: ({ value }) => {
        const r = signInSchema.safeParse(value);
        if (!r.success) {
          const flat = r.error.flatten();
          return { fields: { email: flat.fieldErrors.email?.[0], password: flat.fieldErrors.password?.[0] } };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const payload = signInSchema.parse(value);
      signInMutation.mutate(payload);
    },
  });

  const handleGoogleSignIn = () => {
    googleSignInMutation.mutate();
  };

  const isPending = signInMutation.isPending || googleSignInMutation.isPending;
  const error = signInMutation.error ?? googleSignInMutation.error;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: OB.BG_DARK }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* App name */}
        <Text style={{ textAlign: "center", color: OB.TEXT_PRIMARY, fontSize: 26, fontWeight: "800", letterSpacing: 0.5, marginBottom: 28 }}>
          DuoDate
        </Text>

        {/* Pink icon */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View style={{
            width: 56, height: 56, borderRadius: 28,
            backgroundColor: "rgba(232, 24, 95, 0.15)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Text style={{ fontSize: 28 }}>😊</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={{ textAlign: "center", color: OB.TEXT_PRIMARY, fontSize: 22, fontWeight: "800", marginBottom: 6 }}>
          Connectez-vous ou inscrivez-vous
        </Text>
        <Text style={{ textAlign: "center", color: OB.TEXT_SECONDARY, fontSize: 13, lineHeight: 20, marginBottom: 24 }}>
          Votre prochaine date vous attend. Connectez-vous{"\n"}pour commencer l'aventure.
        </Text>

        {/* Log In / Sign Up tabs */}
        <View style={{
          flexDirection: "row",
          backgroundColor: OB.BG_CARD,
          borderRadius: 999,
          padding: 4,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: OB.BORDER_DEFAULT,
        }}>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: OB.ACCENT,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
              Se connecter
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/sign-up")}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: "transparent",
              alignItems: "center",
            }}
          >
            <Text style={{ color: OB.TEXT_SECONDARY, fontWeight: "700", fontSize: 14 }}>
              S'inscrire
            </Text>
          </Pressable>
        </View>

        {/* Email field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value, fieldApi }) =>
              fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                ? validateField("email", value) ?? null
                : null,
          }}
        >
          {(field) => {
            const err = field.state.meta.errors?.[0];
            return (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", marginBottom: 6 }}>
                  Email
                </Text>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 52,
                  borderRadius: 999,
                  borderWidth: 1.5,
                  borderColor: err ? "#FF6B8A" : OB.BORDER_DEFAULT,
                  backgroundColor: OB.BG_CARD,
                  paddingHorizontal: 20,
                }}>
                  <TextInput
                    style={{ flex: 1, color: OB.TEXT_PRIMARY, fontSize: 14 }}
                    placeholder="monster76@gmail.com"
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {err ? <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4 }}>{err}</Text> : null}
              </View>
            );
          }}
        </form.Field>

        {/* Password field */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value, fieldApi }) =>
              fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                ? validateField("password", value) ?? null
                : null,
          }}
        >
          {(field) => {
            const err = field.state.meta.errors?.[0];
            return (
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", marginBottom: 6 }}>
                  Mot de passe
                </Text>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 52,
                  borderRadius: 999,
                  borderWidth: 1.5,
                  borderColor: err ? "#FF6B8A" : OB.BORDER_DEFAULT,
                  backgroundColor: OB.BG_CARD,
                  paddingHorizontal: 20,
                }}>
                  <TextInput
                    style={{ flex: 1, color: OB.TEXT_PRIMARY, fontSize: 14 }}
                    placeholder="••••••••••"
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color={OB.TEXT_SECONDARY}
                    />
                  </Pressable>
                </View>
                {err ? <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4 }}>{err}</Text> : null}
              </View>
            );
          }}
        </form.Field>

        {/* Remember me + Forgot password */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <View style={{
              width: 18, height: 18, borderRadius: 4,
              borderWidth: 1.5,
              borderColor: rememberMe ? OB.ACCENT : OB.BORDER_DEFAULT,
              backgroundColor: rememberMe ? OB.ACCENT : "transparent",
              alignItems: "center", justifyContent: "center",
            }}>
              {rememberMe && <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>✓</Text>}
            </View>
            <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13 }}>Se souvenir</Text>
          </Pressable>
          <Pressable>
            <Text style={{ color: OB.ACCENT, fontSize: 13, fontWeight: "600" }}>
              Mot de passe oublié ?
            </Text>
          </Pressable>
        </View>

        {/* API error */}
        {error ? (
          <Text style={{ color: "#FF6B8A", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
            {error.message}
          </Text>
        ) : null}

        {/* Swipe to Login CTA */}
        <Pressable
          onPress={() => form.handleSubmit()}
          disabled={isPending}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 58,
            borderRadius: 999,
            backgroundColor: isPending ? "#3A1A2A" : OB.ACCENT,
            opacity: isPending ? 0.6 : pressed ? 0.9 : 1,
            gap: 10,
            paddingHorizontal: 20,
            marginBottom: 24,
          })}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "700" }}>
              Se connecter
            </Text>
          )}
        </Pressable>

        {/* Divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: OB.BORDER_DEFAULT }} />
          <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 12, marginHorizontal: 12 }}>Ou se connecter avec</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: OB.BORDER_DEFAULT }} />
        </View>

        {/* Social login icons */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          {/* Google */}
          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isPending}
            style={({ pressed }) => ({
              width: 52, height: 52, borderRadius: 26,
              borderWidth: 1.5, borderColor: OB.BORDER_DEFAULT,
              backgroundColor: OB.BG_CARD,
              alignItems: "center", justifyContent: "center",
              opacity: pressed || isPending ? 0.7 : 1,
            })}
          >
            {googleSignInMutation.isPending ? (
              <ActivityIndicator color={OB.ACCENT} size="small" />
            ) : (
              <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
