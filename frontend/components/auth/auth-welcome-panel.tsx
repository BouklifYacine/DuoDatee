import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";

export const AUTH_INTRO_THEME = {
  background: "#F7F0E8",
  surface: "#FFF9F3",
  surfaceStrong: "#F2E2D5",
  text: "#35231B",
  textMuted: "#8E6C5D",
  accent: "#E26D5A",
  accentStrong: "#C95745",
  accentSoft: "#F6C9B4",
  border: "#E7D3C6",
  shadow: "rgba(136, 74, 58, 0.14)",
} as const;

type AuthWelcomePanelProps = {
  compact?: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
};

export function AuthWelcomePanel({
  compact = false,
  onSignIn,
  onSignUp,
}: AuthWelcomePanelProps) {
  const heroHeight = compact ? 220 : 260;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: compact ? 26 : 34,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 340,
            height: heroHeight,
            borderRadius: 34,
            borderWidth: 1,
            borderColor: AUTH_INTRO_THEME.border,
            backgroundColor: AUTH_INTRO_THEME.surface,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: `0 18px 40px ${AUTH_INTRO_THEME.shadow}`,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 22,
              right: 24,
              height: 56,
              width: 56,
              borderRadius: 28,
              backgroundColor: AUTH_INTRO_THEME.accentSoft,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 24,
              left: 28,
              height: 72,
              width: 72,
              borderRadius: 36,
              backgroundColor: "#FCE9DE",
            }}
          />
          <Svg width={280} height={190} viewBox="0 0 280 190" fill="none">
            <Defs>
              <LinearGradient id="welcomeCard" x1="42" y1="24" x2="228" y2="164">
                <Stop offset="0" stopColor="#FFF4EA" />
                <Stop offset="1" stopColor="#F6D4C2" />
              </LinearGradient>
              <LinearGradient id="heartBadge" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#E26D5A" />
                <Stop offset="1" stopColor="#C95745" />
              </LinearGradient>
            </Defs>

            <Rect
              x="36"
              y="38"
              width="88"
              height="118"
              rx="28"
              fill="#FFFDFC"
              stroke="#E7D3C6"
              strokeWidth="2"
            />
            <Rect
              x="156"
              y="34"
              width="88"
              height="118"
              rx="28"
              fill="#FFFDFC"
              stroke="#E7D3C6"
              strokeWidth="2"
            />
            <Rect
              x="52"
              y="56"
              width="56"
              height="70"
              rx="18"
              fill="url(#welcomeCard)"
            />
            <Rect
              x="172"
              y="52"
              width="56"
              height="70"
              rx="18"
              fill="#F4E0D5"
            />
            <Circle cx="140" cy="94" r="30" fill="url(#heartBadge)" />
            <Path
              d="M140 116C132 110 122 102 122 92C122 84.5 128 79 135 79C138.8 79 142.4 80.8 144.7 83.8C147 80.8 150.6 79 154.4 79C161.4 79 167 84.5 167 92C167 102 157.8 109.8 149.4 116L144.7 119.4L140 116Z"
              fill="#FFF4EA"
            />
            <Path
              d="M83 146C95 146 104 136.6 104 125H62C62 136.6 71.4 146 83 146Z"
              fill="#E9B59B"
            />
            <Path
              d="M196 142C208 142 217 132.6 217 121H175C175 132.6 184.4 142 196 142Z"
              fill="#D8A48A"
            />
          </Svg>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: AUTH_INTRO_THEME.text,
            fontSize: compact ? 34 : 42,
            fontWeight: "900",
            letterSpacing: -1.2,
          }}
        >
          DuoDate
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: AUTH_INTRO_THEME.textMuted,
            fontSize: compact ? 16 : 17,
            lineHeight: compact ? 24 : 26,
            paddingHorizontal: compact ? 8 : 18,
          }}
        >
          Choisissez votre prochaine sortie a deux sans debattre pendant des
          heures.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <Pressable
          accessibilityRole="button"
          testID="welcome-sign-in"
          onPress={onSignIn}
          style={({ pressed }) => ({
            minHeight: 58,
            borderRadius: 999,
            backgroundColor: AUTH_INTRO_THEME.accent,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 22,
            opacity: pressed ? 0.9 : 1,
            boxShadow: `0 14px 30px ${AUTH_INTRO_THEME.shadow}`,
          })}
        >
          <Text
            style={{
              color: "#FFF9F3",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            Se connecter
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          testID="welcome-sign-up"
          onPress={onSignUp}
          style={({ pressed }) => ({
            minHeight: 58,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: AUTH_INTRO_THEME.border,
            backgroundColor: AUTH_INTRO_THEME.surface,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 22,
            opacity: pressed ? 0.82 : 1,
          })}
        >
          <Text
            style={{
              color: AUTH_INTRO_THEME.text,
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            S'inscrire
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
