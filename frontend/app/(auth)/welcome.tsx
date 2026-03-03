import { useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import LoveCouple from "~/assets/images/LoveCouple2.svg";
import { OB } from "@/constants/theme";

export default function AuthWelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: OB.BG_DARK, paddingTop: 80 }}>
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text style={{ textAlign: "center", fontSize: 52, fontWeight: "900", letterSpacing: -0.5, color: OB.TEXT_PRIMARY }}>
          DuoDate
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: OB.TEXT_SECONDARY, marginTop: 6, lineHeight: 24 }}>
          Trouvez une activité de couple{"\n"}en moins de 30 secondes
        </Text>

        <View style={{ marginTop: 32 }}>
          <LoveCouple width={400} height={300} />
        </View>
      </View>

      <View style={{ gap: 14, paddingHorizontal: 24, marginTop: 12 }}>
        {/* Primary CTA */}
        <Pressable
          onPress={() => router.push("/sign-in")}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 58,
            borderRadius: 999,
            backgroundColor: OB.ACCENT,
            opacity: pressed ? 0.9 : 1,
            shadowColor: OB.ACCENT,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.45,
            shadowRadius: 18,
            elevation: 12,
            gap: 10,
            paddingHorizontal: 20,
          })}
        >
          <View style={{
            width: 34, height: 34, borderRadius: 17,
            backgroundColor: "rgba(255,255,255,0.18)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Text style={{ fontSize: 16 }}>❤️</Text>
          </View>
          <Text style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "700" }}>
            Connectez-vous
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "700", letterSpacing: -1 }}>{`>>>`}</Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          onPress={() => router.push("/sign-up")}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 58,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: OB.BORDER_DEFAULT,
            backgroundColor: OB.BG_CARD,
            opacity: pressed ? 0.8 : 1,
            paddingHorizontal: 20,
          })}
        >
          <Text style={{ textAlign: "center", color: OB.TEXT_PRIMARY, fontSize: 17, fontWeight: "700" }}>
            S'inscrire
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
