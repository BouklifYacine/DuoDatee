import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AuthWelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center px-6 gap-3">
      <Text className="text-4xl font-bold text-red-500 text-center">Bienvenue</Text>
      <Text className="text-lg text-purple-500 text-center">
        Connecte-toi ou crée un compte.
      </Text>

      <Link href="/sign-in" asChild>
        <Pressable className="mt-3 w-full bg-[#0a7ea4] rounded-xl py-3.5">
          <Text className="text-center font-semibold text-white">Se connecter</Text>
        </Pressable>
      </Link>

      <Link href="/sign-up" asChild>
        <Pressable className="w-full border border-[#0a7ea4] rounded-xl py-3.5">
          <Text className="text-center font-semibold text-[#0a7ea4]">S'inscrire</Text>
        </Pressable>
      </Link>
    </View>
  );
}
