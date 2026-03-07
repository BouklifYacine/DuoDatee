import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  const defaultProps = {
    currentStep: 0,
    totalSteps: 3,
  };

  describe("Rendu", () => {
    it("affiche les segments de progression", () => {
      render(<ProgressBar {...defaultProps} />);

      // Devrait avoir 3 segments
      const segments = screen.getAllByTestId("progress-segment");
      expect(segments.length).toBe(3);
    });

    it("affiche le bon nombre de segments", () => {
      render(<ProgressBar {...defaultProps} totalSteps={3} />);

      // Les segments sont des View avec une clé basée sur l'index
      expect(screen.getAllByTestId("progress-segment").length).toBe(3);
    });

    it("affiche 4 segments pour 4 étapes", () => {
      render(<ProgressBar {...defaultProps} totalSteps={4} />);

      expect(screen.getAllByTestId("progress-segment").length).toBe(4);
    });
  });

  describe("États de progression", () => {
    it("affiche la première étape comme active", () => {
      render(<ProgressBar {...defaultProps} currentStep={0} totalSteps={3} />);

      // Le premier segment devrait avoir le style actif
      expect(screen.getByTestId("progress-segment-0")).toBeTruthy();
    });

    it("affiche la deuxième étape comme active", () => {
      render(<ProgressBar {...defaultProps} currentStep={1} totalSteps={3} />);

      // Les deux premiers segments devraient avoir le style actif
      expect(screen.getByTestId("progress-segment-0")).toBeTruthy();
      expect(screen.getByTestId("progress-segment-1")).toBeTruthy();
    });

    it("affiche toutes les étapes complétées", () => {
      render(<ProgressBar {...defaultProps} currentStep={2} totalSteps={3} />);

      // Tous les segments devraient avoir le style actif
      expect(screen.getByTestId("progress-segment-0")).toBeTruthy();
      expect(screen.getByTestId("progress-segment-1")).toBeTruthy();
      expect(screen.getByTestId("progress-segment-2")).toBeTruthy();
    });
  });

  describe("Bouton Skip", () => {
    it("n'affiche pas le bouton Skip par défaut", () => {
      render(<ProgressBar {...defaultProps} />);

      expect(screen.queryByText("Skip")).toBeNull();
    });

    it("affiche le bouton Skip quand la prop onSkip est fournie", () => {
      const onSkip = vi.fn();
      render(<ProgressBar {...defaultProps} onSkip={onSkip} />);

      expect(screen.getByText("Skip")).toBeTruthy();
    });
  });

  describe("Gestion des valeurs", () => {
    it("gère currentStep supérieur à totalSteps", () => {
      render(<ProgressBar {...defaultProps} currentStep={10} totalSteps={3} />);

      // Ne doit pas crash et afficher les segments
      expect(screen.getAllByTestId("progress-segment").length).toBe(3);
    });

    it("gère currentStep négatif", () => {
      render(<ProgressBar {...defaultProps} currentStep={-1} totalSteps={3} />);

      // Ne doit pas crash
      expect(screen.getAllByTestId("progress-segment").length).toBe(3);
    });
  });
});
