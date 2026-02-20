import { useForm } from "@tanstack/react-form";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Input } from "@/components/ui/input";
import {
  useGoogleSignInMutation,
  useSignInMutation,
} from "@/hooks/use-sign-in-mutation";
import { createZodValidator } from "@/lib/zod-form-adapter";
import {
  signInSchema,
  validateField,
  type SignInInput,
} from "@/schemas/signInSchema";

// ─── Default values ─────────────────────────────────────────────────────────

const DEFAULT_VALUES: SignInInput = {
  email: "",
  password: "",
};

const signInValidator = createZodValidator(signInSchema);

// ─── FormField component ─────────────────────────────────────────────────────

type FormFieldProps = React.ComponentProps<typeof Input> & {
  field: {
    state: {
      value: string;
      meta: { errors: (string | null | undefined)[]; isBlurred: boolean };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
    name: string;
  };
  label: string;
};

function SignInFormField({ field, label, ...inputProps }: FormFieldProps) {
  const { state, handleChange, handleBlur } = field;
  const error = state.meta.errors?.[0];
  const hasError = Boolean(error);

  return (
    <>
      <Input
        value={state.value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholder={label}
        placeholderTextColor="#9ca3af"
        className={`rounded-xl ${
          hasError ? "border-red-500" : "border-gray-400"
        }`}
        {...inputProps}
      />
      {error ? (
        <Text className="mt-0.5 text-sm text-red-500">{error}</Text>
      ) : null}
    </>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function SignInScreen() {
  const signInMutation = useSignInMutation();
  const googleSignInMutation = useGoogleSignInMutation();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: ({ value }) => signInValidator(value) ?? null,
    },
    onSubmit: async ({ value }) => {
      const payload = signInSchema.parse(value);
      signInMutation.mutate(payload);
    },
  });

  const handleGoogleSignIn = () => {
    googleSignInMutation.mutate();
  };

  const error = signInMutation.error ?? googleSignInMutation.error;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-[28px] font-bold leading-8">Se connecter</Text>

        <View className="mt-4 gap-2.5">
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
            {(field) => (
              <SignInFormField
                field={field}
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
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
            {(field) => (
              <SignInFormField
                field={field}
                label="Mot de passe (6 caractères min)"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          </form.Field>

          {error ? (
            <Text className="text-sm text-red-500">{error.message}</Text>
          ) : null}

          <Pressable
            onPress={() => form.handleSubmit()}
            disabled={signInMutation.isPending || googleSignInMutation.isPending}
            className={`mt-2.5 items-center justify-center rounded-xl bg-primary py-3.5 ${
              signInMutation.isPending || googleSignInMutation.isPending
                ? "opacity-70"
                : ""
            }`}
          >
            {signInMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="font-semibold text-white">Se connecter</Text>
            )}
          </Pressable>

          <Pressable
            onPress={handleGoogleSignIn}
            disabled={signInMutation.isPending || googleSignInMutation.isPending}
            className={`flex-row items-center justify-center gap-2 rounded-xl border border-primary py-3.5 ${
              signInMutation.isPending || googleSignInMutation.isPending
                ? "opacity-70"
                : ""
            }`}
          >
            {googleSignInMutation.isPending ? (
              <ActivityIndicator color="#0a7ea4" size="small" />
            ) : (
              <MaterialCommunityIcons
                name="google"
                size={22}
                color="#0a7ea4"
              />
            )}
            <Text className="font-semibold text-primary">
              Continuer avec Google
            </Text>
          </Pressable>

          <Link href="/sign-up">
            <Text className="text-base text-primary">
              Pas de compte ? S&apos;inscrire
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
