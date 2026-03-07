import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ActivityTypeSelector } from "./ActivityTypeSelector";
import { PREFERRED_TYPES } from "../schemas";

describe("ActivityTypeSelector", () => {
  const defaultProps = {
    selected: [] as string[],
    onToggle: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche les trois types d'activité", () => {
      render(<ActivityTypeSelector {...defaultProps} />);

      expect(screen.getByText("Bouffe")).toBeTruthy();
      expect(screen.getByText("Boire")).toBeTruthy();
      expect(screen.getByText("Activité")).toBeTruthy();
    });

    it("affiche le label Types d'activité", () => {
      render(<ActivityTypeSelector {...defaultProps} />);

      expect(screen.getByText("Types d'activité")).toBeTruthy();
    });

    it("affiche les icônes pour chaque type", () => {
      render(<ActivityTypeSelector {...defaultProps} />);

      expect(screen.getByText("🍽️")).toBeTruthy();
      expect(screen.getByText("🍷")).toBeTruthy();
      expect(screen.getByText("🎯")).toBeTruthy();
    });

    it("affiche le compteur 0/3 quand rien n'est sélectionné", () => {
      render(<ActivityTypeSelector {...defaultProps} selected={[]} />);

      expect(screen.getByText("0/3")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onToggle avec 'bouffe' lors du clic", () => {
      const onToggle = vi.fn();
      render(<ActivityTypeSelector {...defaultProps} onToggle={onToggle} />);

      fireEvent.press(screen.getByText("Bouffe"));

      expect(onToggle).toHaveBeenCalledWith("bouffe");
    });

    it("appelle onToggle avec 'boire' lors du clic", () => {
      const onToggle = vi.fn();
      render(<ActivityTypeSelector {...defaultProps} onToggle={onToggle} />);

      fireEvent.press(screen.getByText("Boire"));

      expect(onToggle).toHaveBeenCalledWith("boire");
    });

    it("appelle onToggle avec 'activite' lors du clic", () => {
      const onToggle = vi.fn();
      render(<ActivityTypeSelector {...defaultProps} onToggle={onToggle} />);

      fireEvent.press(screen.getByText("Activité"));

      expect(onToggle).toHaveBeenCalledWith("activite");
    });
  });

  describe("États", () => {
    it("met à jour le compteur quand un type est sélectionné", () => {
      render(
        <ActivityTypeSelector {...defaultProps} selected={["bouffe"]} />
      );

      expect(screen.getByText("1/3")).toBeTruthy();
    });

    it("met à jour le compteur quand deux types sont sélectionnés", () => {
      render(
        <ActivityTypeSelector
          {...defaultProps}
          selected={["bouffe", "boire"]}
        />
      );

      expect(screen.getByText("2/3")).toBeTruthy();
    });

    it("met à jour le compteur quand trois types sont sélectionnés", () => {
      render(
        <ActivityTypeSelector
          {...defaultProps}
          selected={["bouffe", "boire", "activite"]}
        />
      );

      expect(screen.getByText("3/3")).toBeTruthy();
    });

    it("permet la sélection multiple", () => {
      const onToggle = vi.fn();
      render(
        <ActivityTypeSelector
          {...defaultProps}
          selected={["bouffe"]}
          onToggle={onToggle}
        />
      );

      // Cliquer sur Boire
      fireEvent.press(screen.getByText("Boire"));

      expect(onToggle).toHaveBeenCalledWith("boire");
    });

    it("permet de désélectionner un type", () => {
      const onToggle = vi.fn();
      render(
        <ActivityTypeSelector
          {...defaultProps}
          selected={["bouffe", "boire"]}
          onToggle={onToggle}
        />
      );

      // Cliquer sur Bouffe pour le désélectionner
      fireEvent.press(screen.getByText("Bouffe"));

      expect(onToggle).toHaveBeenCalledWith("bouffe");
    });
  });

  describe("Constants", () => {
    it("a les bonnes valeurs de types", () => {
      expect(PREFERRED_TYPES).toEqual(["bouffe", "boire", "activite"]);
    });
  });
});
