import { fireEvent, render, screen } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";

import IntroScreen from "../../../app/(auth)/intro";

const mockPush = vi.fn();

vi.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

vi.mock("react-native-reanimated", async () => {
  const reactNative = await import("react-native");

  return {
    __esModule: true,
    default: {
      View: reactNative.View,
      FlatList: reactNative.FlatList,
      createAnimatedComponent: (Component: unknown) => Component,
    },
    useAnimatedStyle: (updater: () => Record<string, unknown>) => updater(),
    withTiming: (value: unknown) => value,
    withDelay: (_delay: number, value: unknown) => value,
  };
});

describe("IntroScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the first value prop slide by default", () => {
    render(<IntroScreen />);

    expect(screen.getByText("Les bons plans autour de vous")).toBeTruthy();
    expect(screen.getByText("Passer")).toBeTruthy();
    expect(screen.getByTestId("pagination-dot-0").props.accessibilityState.selected).toBe(true);
  });

  it("navigates to the welcome slide when skip is pressed", () => {
    render(<IntroScreen />);

    fireEvent.press(screen.getByText("Passer"));

    expect(screen.queryByText("Passer")).toBeNull();
    expect(screen.getByText("DuoDate")).toBeTruthy();
    expect(screen.getByText("Se connecter")).toBeTruthy();
    expect(screen.getByTestId("pagination-dot-3").props.accessibilityState.selected).toBe(true);
  });

  it("updates the active slide when a pagination dot is pressed", () => {
    render(<IntroScreen />);

    fireEvent.press(screen.getByTestId("pagination-dot-2"));

    expect(screen.getByText("S'adapte a votre soiree")).toBeTruthy();
    expect(screen.getByTestId("pagination-dot-2").props.accessibilityState.selected).toBe(true);
  });

  it("routes to sign-in and sign-up from the welcome slide", () => {
    render(<IntroScreen />);

    fireEvent.press(screen.getByText("Passer"));
    fireEvent.press(screen.getByText("Se connecter"));
    fireEvent.press(screen.getByText("S'inscrire"));

    expect(mockPush).toHaveBeenNthCalledWith(1, "/sign-in");
    expect(mockPush).toHaveBeenNthCalledWith(2, "/sign-up");
  });
});
