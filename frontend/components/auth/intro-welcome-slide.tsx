import type { ReactNode } from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { AuthWelcomePanel } from "@/components/auth/auth-welcome-panel";

type IntroWelcomeSlideProps = {
  active: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
};

export function IntroWelcomeSlide({
  active,
  onSignIn,
  onSignUp,
}: IntroWelcomeSlideProps) {
  return (
    <AnimatedSlideContainer active={active}>
      <AuthWelcomePanel compact onSignIn={onSignIn} onSignUp={onSignUp} />
    </AnimatedSlideContainer>
  );
}

function AnimatedSlideContainer({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.42, { duration: 300 }),
    transform: [
      { translateY: withTiming(active ? 0 : 18, { duration: 300 }) },
      { scale: withTiming(active ? 1 : 0.96, { duration: 300 }) },
    ],
  }));

  return (
    <Animated.View style={[{ flex: 1, justifyContent: "center" }, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
