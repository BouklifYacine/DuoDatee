import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { AUTH_INTRO_THEME } from "@/components/auth/auth-welcome-panel";

type IntroVoteSlideProps = {
  active: boolean;
};

export function IntroVoteSlide({ active }: IntroVoteSlideProps) {
  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.4, { duration: 300 }),
    transform: [
      { translateY: withTiming(active ? 0 : 24, { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.95, { duration: 300 }) },
    ],
  }));
  const leftPhoneStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(active ? 0 : 16, { duration: 300 }) },
      { rotate: withTiming(active ? "-6deg" : "-10deg", { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.94, { duration: 300 }) },
    ],
    opacity: withTiming(active ? 1 : 0.55, { duration: 300 }),
  }));
  const rightPhoneStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(active ? 0 : 16, { duration: 300 }) },
      { rotate: withTiming(active ? "6deg" : "10deg", { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.94, { duration: 300 }) },
    ],
    opacity: withTiming(active ? 1 : 0.55, { duration: 300 }),
  }));
  const matchStyle = useAnimatedStyle(() => ({
    opacity: withDelay(160, withTiming(active ? 1 : 0, { duration: 300 })),
    transform: [
      { scale: withDelay(160, withTiming(active ? 1 : 0.7, { duration: 300 })) },
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.View style={[phoneCardStyle, { left: 28 }, leftPhoneStyle]}>
                <PhoneScreen
                  accent="#E26D5A"
                  buttonText="Oui"
                  detailText="Brunch cosy"
                />
              </Animated.View>

              <Animated.View style={[phoneCardStyle, { right: 28 }, rightPhoneStyle]}>
                <PhoneScreen
                  accent="#C95745"
                  buttonText="Go"
                  detailText="Bar a vins"
                />
              </Animated.View>

              <Animated.View
                style={[
                  {
                    position: "absolute",
                    height: 84,
                    width: 84,
                    borderRadius: 42,
                    backgroundColor: AUTH_INTRO_THEME.accent,
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: `0 16px 26px ${AUTH_INTRO_THEME.shadow}`,
                  },
                  matchStyle,
                ]}
              >
                <Text
                  style={{
                    color: "#FFF9F3",
                    fontSize: 14,
                    fontWeight: "900",
                    letterSpacing: 1.2,
                  }}
                >
                  MATCH
                </Text>
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
          Decidez en un tap
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
          Envoyez un lien a votre partenaire. Match = c&apos;est decide.
        </Text>
      </View>
    </Animated.View>
  );
}

function PhoneScreen({
  accent,
  buttonText,
  detailText,
}: {
  accent: string;
  buttonText: string;
  detailText: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 26,
        backgroundColor: "#FFF9F3",
        padding: 16,
        gap: 14,
      }}
    >
      <View
        style={{
          height: 82,
          borderRadius: 20,
          backgroundColor: "#F8E7DB",
        }}
      />
      <View style={{ gap: 8 }}>
        <View
          style={{
            width: "70%",
            height: 10,
            borderRadius: 999,
            backgroundColor: "#D3B29F",
          }}
        />
        <View
          style={{
            width: "54%",
            height: 10,
            borderRadius: 999,
            backgroundColor: "#E7D3C6",
          }}
        />
      </View>
      <View
        style={{
          marginTop: "auto",
          gap: 10,
        }}
      >
        <Text
          style={{
            color: AUTH_INTRO_THEME.textMuted,
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          {detailText}
        </Text>
        <View
          style={{
            height: 42,
            borderRadius: 999,
            backgroundColor: accent,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFF9F3",
              fontWeight: "800",
              fontSize: 14,
            }}
          >
            {buttonText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const phoneCardStyle = {
  position: "absolute" as const,
  width: 122,
  height: 204,
  borderRadius: 34,
  padding: 8,
  backgroundColor: "#F3E4D8",
  borderWidth: 1,
  borderColor: AUTH_INTRO_THEME.border,
  boxShadow: `0 18px 30px ${AUTH_INTRO_THEME.shadow}`,
};
