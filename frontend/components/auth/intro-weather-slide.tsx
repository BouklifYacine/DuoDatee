import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";

import { AUTH_INTRO_THEME } from "@/components/auth/auth-welcome-panel";

type IntroWeatherSlideProps = {
  active: boolean;
};

export function IntroWeatherSlide({ active }: IntroWeatherSlideProps) {
  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.4, { duration: 300 }),
    transform: [
      { translateY: withTiming(active ? 0 : 24, { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.95, { duration: 300 }) },
    ],
  }));
  const cloudStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.5, { duration: 300 }),
    transform: [
      { translateX: withTiming(active ? 0 : -12, { duration: 300 }) },
      { translateY: withTiming(active ? 0 : 10, { duration: 300 }) },
    ],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: withDelay(120, withTiming(active ? 1 : 0.36, { duration: 300 })),
    transform: [
      { translateX: withDelay(120, withTiming(active ? 0 : 20, { duration: 300 })) },
      { scale: withDelay(120, withTiming(active ? 1 : 0.95, { duration: 300 })) },
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
                height: 218,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Animated.View
                style={[
                  {
                    width: 114,
                    height: 114,
                    borderRadius: 32,
                    backgroundColor: "#FFF5EC",
                    borderWidth: 1,
                    borderColor: AUTH_INTRO_THEME.border,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  cloudStyle,
                ]}
              >
                <Svg width={84} height={84} viewBox="0 0 84 84" fill="none">
                  <Path
                    d="M23 52C15.8 52 10 46.4 10 39.5C10 33.2 14.8 28.1 21 27.2C22.8 19.6 29.8 14 38 14C48.6 14 57.2 22.2 57.8 32.5C64.4 33.6 69.5 39.2 69.5 45.9C69.5 53.4 63.2 59.5 55.5 59.5H23V52Z"
                    fill="#D1E2F1"
                  />
                  <Path
                    d="M28 60L24 69"
                    stroke="#6CA6C8"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M42 60L38 69"
                    stroke="#6CA6C8"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M56 60L52 69"
                    stroke="#6CA6C8"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </Svg>
              </Animated.View>

              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 8,
                }}
              >
                <View
                  style={{
                    width: 34,
                    height: 4,
                    borderRadius: 999,
                    backgroundColor: AUTH_INTRO_THEME.accentSoft,
                  }}
                />
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderTopWidth: 4,
                    borderRightWidth: 4,
                    borderColor: AUTH_INTRO_THEME.accent,
                    transform: [{ rotate: "45deg" }],
                  }}
                />
              </View>

              <Animated.View
                style={[
                  {
                    width: 142,
                    borderRadius: 30,
                    backgroundColor: "#FFFDFC",
                    borderWidth: 1,
                    borderColor: AUTH_INTRO_THEME.border,
                    padding: 16,
                    gap: 12,
                    boxShadow: `0 16px 26px ${AUTH_INTRO_THEME.shadow}`,
                  },
                  cardStyle,
                ]}
              >
                <View
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 20,
                    backgroundColor: AUTH_INTRO_THEME.accentSoft,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                    <Rect x="4" y="7" width="20" height="14" rx="4" fill="#C95745" />
                    <Path
                      d="M10 5V7M18 5V7M9 13H19"
                      stroke="#FFF4EA"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      color: AUTH_INTRO_THEME.text,
                      fontSize: 17,
                      fontWeight: "800",
                    }}
                  >
                    Cinema cosy
                  </Text>
                  <Text
                    style={{
                      color: AUTH_INTRO_THEME.textMuted,
                      fontSize: 13,
                      lineHeight: 18,
                    }}
                  >
                    Il pleut dehors. On vous propose une salle a 12 min.
                  </Text>
                </View>
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
          S&apos;adapte a votre soiree
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
          La meteo, l&apos;heure, votre budget. L&apos;app pense a votre place.
        </Text>
      </View>
    </Animated.View>
  );
}
