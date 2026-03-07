import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { OptionGrid } from "./OptionGrid";

// Types pour les tests
type TestOption = "option1" | "option2" | "option3";

const TEST_OPTIONS: TestOption[] = ["option1", "option2", "option3"];

const getLabel = (option: TestOption): string => {
  const labels: Record<TestOption, string> = {
    option1: "Option 1",
    option2: "Option 2",
    option3: "Option 3",
  };
  return labels[option];
};

const getIcon = (option: TestOption): string => {
  const icons: Record<TestOption, string> = {
    option1: "🔵",
    option2: "🟢",
    option3: "🟡",
  };
  return icons[option];
};

describe("OptionGrid", () => {
  const defaultProps = {
    label: "Test Label",
    options: TEST_OPTIONS,
    getLabel,
    getIcon,
    selected: undefined as TestOption | undefined,
    onSelect: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label fourni", () => {
      render(<OptionGrid {...defaultProps} />);

      expect(screen.getByText("Test Label")).toBeTruthy();
    });

    it("affiche toutes les options", () => {
      render(<OptionGrid {...defaultProps} />);

      expect(screen.getByText("Option 1")).toBeTruthy();
      expect(screen.getByText("Option 2")).toBeTruthy();
      expect(screen.getByText("Option 3")).toBeTruthy();
    });

    it("affiche les icônes pour chaque option", () => {
      render(<OptionGrid {...defaultProps} />);

      expect(screen.getByText("🔵")).toBeTruthy();
      expect(screen.getByText("🟢")).toBeTruthy();
      expect(screen.getByText("🟡")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onSelect avec l'option lors du clic", () => {
      const onSelect = vi.fn();
      render(<OptionGrid {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Option 1"));

      expect(onSelect).toHaveBeenCalledWith("option1");
    });

    it("appelle onSelect avec option2", () => {
      const onSelect = vi.fn();
      render(<OptionGrid {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Option 2"));

      expect(onSelect).toHaveBeenCalledWith("option2");
    });

    it("appelle onSelect avec option3", () => {
      const onSelect = vi.fn();
      render(<OptionGrid {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Option 3"));

      expect(onSelect).toHaveBeenCalledWith("option3");
    });
  });

  describe("États", () => {
    it("affiche le style sélectionné quand option1 est choisie", () => {
      render(<OptionGrid {...defaultProps} selected="option1" />);

      expect(screen.getByText("Option 1")).toBeTruthy();
    });

    it("affiche le style sélectionné quand option2 est choisie", () => {
      render(<OptionGrid {...defaultProps} selected="option2" />);

      expect(screen.getByText("Option 2")).toBeTruthy();
    });

    it("affiche le style sélectionné quand option3 est choisie", () => {
      render(<OptionGrid {...defaultProps} selected="option3" />);

      expect(screen.getByText("Option 3")).toBeTruthy();
    });

    it("permet de changer de sélection", () => {
      const onSelect = vi.fn();
      render(
        <OptionGrid {...defaultProps} selected="option1" onSelect={onSelect} />
      );

      // Cliquer sur option2
      fireEvent.press(screen.getByText("Option 2"));

      expect(onSelect).toHaveBeenCalledWith("option2");
    });
  });

  describe("Options vides", () => {
    it("gère un tableau d'options vide", () => {
      render(<OptionGrid {...defaultProps} options={[]} />);

      expect(screen.getByText("Test Label")).toBeTruthy();
    });

    it("gère une seule option", () => {
      render(
        <OptionGrid
          {...defaultProps}
          options={["option1"]}
          getLabel={(o) => "Seule option"}
          getIcon={() => "⭐"}
        />
      );

      expect(screen.getByText("Seule option")).toBeTruthy();
    });
  });
});
