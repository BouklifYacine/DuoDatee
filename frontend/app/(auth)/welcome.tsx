import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AuthWelcomeScreen() {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-white">
      <View className="items-center max-w-xs mb-14">
        <Text className="text-[42px] font-bold text-gray-900 text-center tracking-tight">
          Bienvenue
        </Text>
        <Text className="text-base text-gray-600 text-center mt-3 leading-relaxed">
          Connecte-toi ou crée un compte pour commencer l'aventure.
        </Text>
      </View>

      <View className="w-full gap-4 max-w-sm">
        <Link href="/sign-in" asChild>
          <Pressable className="w-full bg-primary rounded-xl py-3.5 items-center justify-center active:opacity-80">
            <Text className="text-red-500 font-semibold">Se connecter</Text>
          </Pressable>
        </Link>

        <Link href="/sign-up" asChild>
          <Pressable className="w-full border border-primary rounded-xl py-3.5 items-center justify-center active:opacity-80">
            <Text className="text-primary font-semibold">S'inscrire</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
