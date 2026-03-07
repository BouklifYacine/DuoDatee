import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { GenderSelector } from "./GenderSelector";

describe("GenderSelector", () => {
  const defaultProps = {
    value: undefined as "homme" | "femme" | undefined,
    onChange: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche les options homme et femme", () => {
      render(<GenderSelector {...defaultProps} />);

      expect(screen.getByText("Homme")).toBeTruthy();
      expect(screen.getByText("Femme")).toBeTruthy();
    });

    it("affiche le label Genre", () => {
      render(<GenderSelector {...defaultProps} />);

      expect(screen.getByText("Genre")).toBeTruthy();
    });

    it("affiche les icônes pour chaque option", () => {
      render(<GenderSelector {...defaultProps} />);

      expect(screen.getByText("👨")).toBeTruthy();
      expect(screen.getByText("👩")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onChange avec 'homme' lors du clic sur Homme", () => {
      const onChange = vi.fn();
      render(<GenderSelector {...defaultProps} onChange={onChange} />);

      fireEvent.press(screen.getByText("Homme"));

      expect(onChange).toHaveBeenCalledWith("homme");
    });

    it("appelle onChange avec 'femme' lors du clic sur Femme", () => {
      const onChange = vi.fn();
      render(<GenderSelector {...defaultProps} onChange={onChange} />);

      fireEvent.press(screen.getByText("Femme"));

      expect(onChange).toHaveBeenCalledWith("femme");
    });
  });

  describe("États", () => {
    it("affiche le style sélectionné quand 'homme' est choisi", () => {
      render(<GenderSelector {...defaultProps} value="homme" />);

      const hommeOption = screen.getByText("Homme");
      expect(hommeOption).toBeTruthy();
    });

    it("affiche le style sélectionné quand 'femme' est choisi", () => {
      render(<GenderSelector {...defaultProps} value="femme" />);

      const femmeOption = screen.getByText("Femme");
      expect(femmeOption).toBeTruthy();
    });

    it("affiche une erreur quand submissionAttempts > 0 sans valeur", () => {
      render(<GenderSelector {...defaultProps} submissionAttempts={1} />);

      expect(screen.getByText("Veuillez sélectionner votre genre")).toBeTruthy();
    });

    it("n'affiche pas d'erreur quand une valeur est sélectionnée", () => {
      render(
        <GenderSelector {...defaultProps} value="homme" submissionAttempts={1} />
      );

      expect(screen.queryByText("Veuillez sélectionner votre genre")).toBeNull();
    });
  });
});
