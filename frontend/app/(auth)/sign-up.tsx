import { useForm } from "@tanstack/react-form";
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
import { OB } from "@/constants/theme";

const DEFAULT_VALUES: SignUpInput = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpScreen() {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: ({ value }) => {
        const r = signUpSchema.safeParse(value);
        if (!r.success) {
          const flat = r.error.flatten();
          return { fields: { name: flat.fieldErrors.name?.[0], email: flat.fieldErrors.email?.[0], password: flat.fieldErrors.password?.[0] } };
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
          Créer un compte
        </Text>
        <Text style={{ textAlign: "center", color: OB.TEXT_SECONDARY, fontSize: 13, lineHeight: 20, marginBottom: 24 }}>
          Rejoignez DuoDate et trouvez{"\n"}votre prochaine activité de couple.
        </Text>

        {/* Log In / Sign Up tabs */}
        <View style={{
          flexDirection: "row",
          backgroundColor: OB.BG_CARD,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: OB.BORDER_DEFAULT,
        }}>
          <Pressable
            onPress={() => router.replace("/sign-in")}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 9,
              backgroundColor: "transparent",
              alignItems: "center",
            }}
          >
            <Text style={{ color: OB.TEXT_SECONDARY, fontWeight: "700", fontSize: 14 }}>
              Se connecter
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 9,
              backgroundColor: OB.ACCENT,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
              S'inscrire
            </Text>
          </Pressable>
        </View>

        {/* Name field */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value, fieldApi }) =>
              fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                ? validateField("name", value) ?? null
                : null,
          }}
        >
          {(field) => {
            const err = field.state.meta.errors?.[0];
            return (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", marginBottom: 6 }}>
                  Nom
                </Text>
                <View style={{
                  height: 52, borderRadius: 12,
                  borderWidth: 1.5, borderColor: err ? "#FF6B8A" : OB.BORDER_DEFAULT,
                  backgroundColor: OB.BG_CARD,
                  paddingHorizontal: 14, justifyContent: "center",
                }}>
                  <TextInput
                    style={{ color: OB.TEXT_PRIMARY, fontSize: 14 }}
                    placeholder="Votre prénom"
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    autoCapitalize="words"
                  />
                </View>
                {err ? <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4 }}>{err}</Text> : null}
              </View>
            );
          }}
        </form.Field>

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
                  height: 52, borderRadius: 12,
                  borderWidth: 1.5, borderColor: err ? "#FF6B8A" : OB.BORDER_DEFAULT,
                  backgroundColor: OB.BG_CARD,
                  paddingHorizontal: 14, justifyContent: "center",
                }}>
                  <TextInput
                    style={{ color: OB.TEXT_PRIMARY, fontSize: 14 }}
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
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: OB.TEXT_SECONDARY, fontSize: 13, fontWeight: "600", marginBottom: 6 }}>
                  Mot de passe
                </Text>
                <View style={{
                  height: 52, borderRadius: 12,
                  borderWidth: 1.5, borderColor: err ? "#FF6B8A" : OB.BORDER_DEFAULT,
                  backgroundColor: OB.BG_CARD,
                  paddingHorizontal: 14, justifyContent: "center",
                }}>
                  <TextInput
                    style={{ color: OB.TEXT_PRIMARY, fontSize: 14 }}
                    placeholder="••••••••••"
                    placeholderTextColor={OB.TEXT_SECONDARY}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {err ? <Text style={{ color: "#FF6B8A", fontSize: 12, marginTop: 4 }}>{err}</Text> : null}
              </View>
            );
          }}
        </form.Field>

        {/* API error */}
        {signUpMutation.error ? (
          <Text style={{ color: "#FF6B8A", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
            {signUpMutation.error.message}
          </Text>
        ) : null}

        {/* CTA button */}
        <Pressable
          onPress={() => form.handleSubmit()}
          disabled={signUpMutation.isPending}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 58,
            borderRadius: 999,
            backgroundColor: signUpMutation.isPending ? "#3A1A2A" : OB.ACCENT,
            opacity: signUpMutation.isPending ? 0.6 : pressed ? 0.9 : 1,
            shadowColor: OB.ACCENT,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: signUpMutation.isPending ? 0 : 0.45,
            shadowRadius: 18,
            elevation: signUpMutation.isPending ? 0 : 12,
            gap: 10,
            paddingHorizontal: 20,
            marginBottom: 24,
          })}
        >
          <View style={{
            width: 34, height: 34, borderRadius: 17,
            backgroundColor: "rgba(255,255,255,0.18)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Text style={{ fontSize: 16 }}>❤️</Text>
          </View>
          {signUpMutation.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "700" }}>
              S'inscrire
            </Text>
          )}
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700", letterSpacing: -1 }}>{`>>>`}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
