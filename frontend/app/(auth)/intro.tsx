import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AUTH_INTRO_THEME } from "@/components/auth/auth-welcome-panel";
import { IntroNearbySlide } from "@/components/auth/intro-nearby-slide";
import { IntroVoteSlide } from "@/components/auth/intro-vote-slide";
import { IntroWeatherSlide } from "@/components/auth/intro-weather-slide";
import { IntroWelcomeSlide } from "@/components/auth/intro-welcome-slide";

type IntroSlide = {
  key: string;
  kind: "nearby" | "vote" | "weather" | "welcome";
};

const SLIDES: IntroSlide[] = [
  { key: "nearby", kind: "nearby" },
  { key: "vote", kind: "vote" },
  { key: "weather", kind: "weather" },
  { key: "welcome", kind: "welcome" },
];

export default function IntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<IntroSlide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    listRef.current?.scrollToIndex?.({ index, animated: true });
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / Math.max(width, 1)
    );

    setActiveIndex(Math.min(Math.max(nextIndex, 0), SLIDES.length - 1));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AUTH_INTRO_THEME.background,
      }}
    >
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        bounces={false}
        style={{ flex: 1 }}
        testID="intro-carousel"
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={2}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumEnd}
        renderItem={({ item, index }) => {
          const isActive = activeIndex === index;
          const shouldRenderContent = Math.abs(index - activeIndex) <= 1 || isActive;

          return (
            <View
              style={{
                width,
                flex: 1,
                paddingTop: insets.top + 10,
                paddingBottom: 18,
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  minHeight: 42,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {index < SLIDES.length - 1 && isActive ? (
                  <Pressable
                    accessibilityRole="button"
                    testID="intro-skip"
                    onPress={() => goToSlide(SLIDES.length - 1)}
                    style={({ pressed }) => ({
                      borderRadius: 999,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      backgroundColor: pressed
                        ? "rgba(226, 109, 90, 0.14)"
                        : "transparent",
                    })}
                  >
                    <Text
                      style={{
                        color: AUTH_INTRO_THEME.accentStrong,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      Passer
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              <View style={{ flex: 1 }}>
                {shouldRenderContent ? (
                  <SlideContent
                    kind={item.kind}
                    active={isActive}
                    onSignIn={() => router.push("/sign-in")}
                    onSignUp={() => router.push("/sign-up")}
                  />
                ) : null}
              </View>
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 20),
        }}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <Pressable
              key={slide.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              testID={`pagination-dot-${index}`}
              onPress={() => goToSlide(index)}
              style={({ pressed }) => ({
                height: 12,
                width: isActive ? 30 : 12,
                borderRadius: 999,
                backgroundColor: isActive
                  ? AUTH_INTRO_THEME.accent
                  : AUTH_INTRO_THEME.accentSoft,
                opacity: pressed ? 0.85 : 1,
              })}
            />
          );
        })}
      </View>
    </View>
  );
}

function SlideContent({
  kind,
  active,
  onSignIn,
  onSignUp,
}: {
  kind: IntroSlide["kind"];
  active: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
}) {
  if (kind === "nearby") {
    return <IntroNearbySlide active={active} />;
  }

  if (kind === "vote") {
    return <IntroVoteSlide active={active} />;
  }

  if (kind === "weather") {
    return <IntroWeatherSlide active={active} />;
  }

  return (
    <IntroWelcomeSlide
      active={active}
      onSignIn={onSignIn}
      onSignUp={onSignUp}
    />
  );
}
