import React from "react";
import { Pressable, Text, View } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Step3Couple from "../../../app/(onboarding)/step-3-couple";

const mockBack = vi.fn();
const mockReplace = vi.fn();

vi.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    replace: mockReplace,
  }),
}));

vi.mock("@/components/onboarding", () => ({
  StepContainer: ({
    children,
    onNext,
    nextLabel = "Continuer",
  }: {
    children: React.ReactNode;
    onNext: () => void;
    nextLabel?: string;
  }) => (
    <View>
      {children}
      <Pressable onPress={onNext}>
        <Text>{nextLabel}</Text>
      </Pressable>
    </View>
  ),
}));

vi.mock("@/features/onboarding", async () => {
  const inviteModule = await import("@/features/onboarding/components/InviteCodeInput");

  return {
    CoupleModeToggle: ({
      hasCouple,
      onToggleCouple,
      onChangeMode,
    }: {
      hasCouple: boolean;
      onToggleCouple: (value: boolean) => void;
      onChangeMode: (mode: "create" | "join") => void;
    }) => (
      <View>
        <Text>{hasCouple ? "couple-on" : "couple-off"}</Text>
        <Pressable onPress={() => onToggleCouple(true)}>
          <Text>toggle-couple</Text>
        </Pressable>
        <Pressable onPress={() => onChangeMode("join")}>
          <Text>switch-join</Text>
        </Pressable>
      </View>
    ),
    InviteCodeInput: inviteModule.InviteCodeInput,
    OptionGrid: () => null,
    LIVING_SITUATIONS: ["ensemble", "separes_proche", "separes_loin"],
    RELATIONSHIP_DURATIONS: [
      "moins_de_6m",
      "six_mois_un_an",
      "un_trois_ans",
      "trois_cinq_ans",
      "cinq_dix_ans",
      "dix_ans_plus",
    ],
    RELATIONSHIP_STATUSES: ["en_couple", "fiances", "pacses", "maries"],
    useOnboarding: () => ({
      createCouple: vi.fn(),
      joinCouple: vi.fn(),
      completeOnboarding: vi.fn(),
      isUpdating: false,
    }),
  };
});

describe("Step3Couple", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rend le champ de code quand le mode rejoindre est selectionne", () => {
    render(<Step3Couple />);

    fireEvent.press(screen.getByText("toggle-couple"));
    fireEvent.press(screen.getByText("switch-join"));

    expect(screen.getByText("Code d'invitation")).toBeTruthy();
    expect(screen.getByPlaceholderText("XXXXXX")).toBeTruthy();
  });

  it("permet de saisir un code invite en mode rejoindre", () => {
    render(<Step3Couple />);

    fireEvent.press(screen.getByText("toggle-couple"));
    fireEvent.press(screen.getByText("switch-join"));
    fireEvent.changeText(screen.getByPlaceholderText("XXXXXX"), "ab12");

    expect(screen.getByDisplayValue("AB12")).toBeTruthy();
  });
});
