import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import LoveCouple from "~/assets/images/LoveCouple2.svg";

export default function AuthWelcomeScreen() {
  const router = useRouter();

  return (
    <View className="  mt-14">
      <View className="items-center mb-14">
        <Text className="text-primary text-center text-7xl font-bold tracking-tight">
          Duodate
        </Text>
        <Text className=" text-center text-lg ">
          Trouvez une activité de couple {'\n'} en moins de 30 secondes
        </Text>

        <View className="mt-8">
          <LoveCouple width={450} height={370} />
        </View>
      </View>

      <View className="gap-5 px-4 mt-6">
        <Button className="w-full h-16 rounded-4xl items-center justify-center bg-[##8B3A52]" onPress={() => router.push("/sign-in")}>
          <Text className="flex-1 text-center text-xl font-semibold text-tertiary">Connectez vous</Text>
        </Button>

        <Button className="w-full h-16 rounded-4xl items-center justify-center bg-white border border-[#D4838F]" onPress={() => router.push("/sign-in")}>
          <Text className="flex-1 text-center text-xl font-semibold text-[#D4838F]">S'inscrire</Text>
        </Button>
      </View>
    </View>
  );
}
