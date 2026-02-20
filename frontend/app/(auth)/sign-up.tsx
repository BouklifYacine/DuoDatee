import { useForm } from "@tanstack/react-form";
import { Link } from "expo-router";
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
import { createZodValidator } from "@/lib/zod-form-adapter";
import { useSignUpMutation } from "@/hooks/use-sign-up-mutation";
import {
  signUpSchema,
  validateField,
  type SignUpInput,
} from "@/schemas/signUpSchema";

// ─── Default values ─────────────────────────────────────────────────────────

const DEFAULT_VALUES: SignUpInput = {
  name: "",
  email: "",
  password: "",
};

const signUpValidator = createZodValidator(signUpSchema);

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

function SignUpFormField({ field, label, ...inputProps }: FormFieldProps) {
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

export default function SignUpScreen() {
  const signUpMutation = useSignUpMutation();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: ({ value }) => signUpValidator(value) ?? null,
    },
    onSubmit: async ({ value }) => {
      const payload = signUpSchema.parse(value);
      signUpMutation.mutate(payload);
    },
  });

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
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-[28px] font-bold leading-8">Créer un compte</Text>
        <Text className="mb-4 opacity-80">
          Inscription avec nom, email et mot de passe
        </Text>

        <View className="gap-2.5">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value, fieldApi }) =>
                fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                  ? validateField("name", value) ?? null
                  : null,
            }}
          >
            {(field) => (
              <SignUpFormField
                field={field}
                label="Nom"
                autoCapitalize="words"
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value, fieldApi }) =>
                fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                  ? validateField("email", value) ?? null
                  : null,
            }}
          >
            {(field) => (
              <SignUpFormField
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
                fieldApi.state.meta.isBlurred || form.state.submissionAttempts > 0
                  ? validateField("password", value) ?? null
                  : null,
            }}
          >
            {(field) => (
              <SignUpFormField
                field={field}
                label="Mot de passe (6 caractères min)"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          </form.Field>

          {signUpMutation.error ? (
            <Text className="text-sm text-red-500">
              {signUpMutation.error.message}
            </Text>
          ) : null}

          <Pressable
            onPress={() => form.handleSubmit()}
            disabled={signUpMutation.isPending}
            className={`mt-2.5 items-center rounded-xl bg-primary py-3.5 ${
              signUpMutation.isPending ? "opacity-70" : ""
            }`}
          >
            {signUpMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="font-semibold text-white">S&apos;inscrire</Text>
            )}
          </Pressable>

          <Link href="/sign-in">
            <Text className="text-base text-primary">
              Déjà un compte ? Se connecter
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
