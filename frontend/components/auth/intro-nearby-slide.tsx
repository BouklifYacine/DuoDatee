import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

import { AUTH_INTRO_THEME } from "@/components/auth/auth-welcome-panel";

type IntroNearbySlideProps = {
  active: boolean;
};

export function IntroNearbySlide({ active }: IntroNearbySlideProps) {
  const markerOne = useMarkerStyle(active, 0);
  const markerTwo = useMarkerStyle(active, 90);
  const markerThree = useMarkerStyle(active, 180);
  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.4, { duration: 300 }),
    transform: [
      { translateY: withTiming(active ? 0 : 24, { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.95, { duration: 300 }) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          gap: 30,
        },
        containerStyle,
      ]}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            maxWidth: 340,
            minHeight: 286,
            borderRadius: 36,
            borderWidth: 1,
            borderColor: AUTH_INTRO_THEME.border,
            backgroundColor: AUTH_INTRO_THEME.surface,
            padding: 18,
            justifyContent: "center",
            boxShadow: `0 18px 40px ${AUTH_INTRO_THEME.shadow}`,
          }}
        >
          <View
            style={{
              height: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                maxWidth: 290,
                height: 214,
                borderRadius: 30,
                overflow: "hidden",
                backgroundColor: "#FFF3E8",
              }}
            >
              <Svg width="100%" height="100%" viewBox="0 0 290 214" fill="none">
                <Defs>
                  <LinearGradient id="mapBg" x1="24" y1="16" x2="250" y2="190">
                    <Stop offset="0" stopColor="#FFF7F0" />
                    <Stop offset="1" stopColor="#F6D5C0" />
                  </LinearGradient>
                </Defs>

                <Rect x="0" y="0" width="290" height="214" fill="url(#mapBg)" />
                <Path
                  d="M20 74C56 60 86 66 122 84C156 101 186 104 220 88C242 77 258 74 270 76"
                  stroke="#E0BAA5"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <Path
                  d="M28 156C60 137 90 132 132 142C166 151 202 148 238 130C252 123 264 118 276 114"
                  stroke="#E9C9B6"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <Path
                  d="M74 20V194"
                  stroke="#F0DDCF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="12 18"
                />
                <Path
                  d="M206 20V194"
                  stroke="#F0DDCF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="12 18"
                />
                <Rect
                  x="110"
                  y="22"
                  width="70"
                  height="26"
                  rx="13"
                  fill="rgba(255, 249, 243, 0.75)"
                />
                <Circle cx="126" cy="35" r="4" fill="#E26D5A" />
                <Rect x="136" y="31" width="28" height="8" rx="4" fill="#C59B87" />
              </Svg>

              <Animated.View
                style={[
                  markerBubbleStyle,
                  { top: 48, left: 48, backgroundColor: "#E26D5A" },
                  markerOne,
                ]}
              >
                <View style={markerDotStyle} />
              </Animated.View>
              <Animated.View
                style={[
                  markerBubbleStyle,
                  { top: 98, right: 56, backgroundColor: "#D96A56" },
                  markerTwo,
                ]}
              >
                <View style={markerDotStyle} />
              </Animated.View>
              <Animated.View
                style={[
                  markerBubbleStyle,
                  { bottom: 34, left: 126, backgroundColor: "#C95745" },
                  markerThree,
                ]}
              >
                <View style={markerDotStyle} />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text
          style={{
            color: AUTH_INTRO_THEME.text,
            fontSize: 31,
            lineHeight: 36,
            fontWeight: "900",
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Les bons plans autour de vous
        </Text>
        <Text
          style={{
            color: AUTH_INTRO_THEME.textMuted,
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            paddingHorizontal: 12,
          }}
        >
          Restaurants, bars, activites. Selectionnes pour les couples.
        </Text>
      </View>
    </Animated.View>
  );
}

function useMarkerStyle(active: boolean, delay: number) {
  return useAnimatedStyle(() => ({
    opacity: withDelay(delay, withTiming(active ? 1 : 0, { duration: 300 })),
    transform: [
      { translateY: withDelay(delay, withTiming(active ? 0 : 14, { duration: 300 })) },
      { scale: withDelay(delay, withTiming(active ? 1 : 0.7, { duration: 300 })) },
    ],
  }));
}

const markerBubbleStyle = {
  position: "absolute" as const,
  width: 28,
  height: 28,
  borderRadius: 14,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  boxShadow: `0 12px 24px ${AUTH_INTRO_THEME.shadow}`,
};

const markerDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#FFF9F3",
};
