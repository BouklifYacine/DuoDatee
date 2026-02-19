import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { View, Pressable, Text } from "react-native";

import { signOut, useSession } from "@/lib/auth-client";

export default function HomeScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const result = await signOut();
      if (result.error) {
        throw new Error(result.error.message ?? "Deconnexion impossible");
      }
      return result;
    },
    onSuccess: () => {
      router.replace("/welcome");
    },
  });

  return (
    <View className="flex-1 justify-center px-6 gap-3">
      <Text className="text-3xl font-bold leading-8">Session</Text>
      <Text className="text-base leading-6">Nom: {session?.user.name ?? "-"}</Text>
      <Text className="text-base leading-6">Email: {session?.user.email ?? "-"}</Text>
      <Text className="text-base leading-6">User ID: {session?.user.id ?? "-"}</Text>

      <Pressable
        onPress={() => signOutMutation.mutate()}
        disabled={signOutMutation.isPending}
        className={`mt-3 bg-[#0a7ea4] rounded-xl py-3.5 items-center ${signOutMutation.isPending ? "opacity-70" : ""}`}
      >
        <Text className="text-white font-semibold">
          {signOutMutation.isPending ? "Deconnexion..." : "Se deconnecter"}
        </Text>
      </Pressable>
    </View>
  );
}
