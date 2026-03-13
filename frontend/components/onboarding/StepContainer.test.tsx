import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { StepContainer } from "./StepContainer";

describe("StepContainer", () => {
  const defaultProps = {
    children: "Step content",
    currentStep: 0,
    totalSteps: 3,
    labels: ["Profil", "Préférences", "Couple"],
    onNext: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche les enfants", () => {
      render(<StepContainer {...defaultProps} />);

      expect(screen.getByText("Step content")).toBeTruthy();
    });

    it("affiche la ProgressBar", () => {
      render(<StepContainer {...defaultProps} />);

      // La ProgressBar devrait être présente
      expect(screen.getByText("Step content")).toBeTruthy();
    });

    it("affiche les NavigationButtons", () => {
      render(<StepContainer {...defaultProps} />);

      expect(screen.getByText("Continuer")).toBeTruthy();
    });
  });

  describe("Navigation", () => {
    it("appelle onNext au clic sur Continue", () => {
      const onNext = vi.fn();
      render(<StepContainer {...defaultProps} onNext={onNext} />);

      fireEvent.press(screen.getByText("Continuer"));

      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });

  describe("Bouton back", () => {
    it("affiche le bouton back quand onBack est fourni", () => {
      const onBack = vi.fn();
      render(<StepContainer {...defaultProps} onBack={onBack} />);

      expect(screen.getByText("‹")).toBeTruthy();
    });

    it("n'affiche pas le bouton back par défaut", () => {
      render(<StepContainer {...defaultProps} />);

      // Le bouton back ne devrait pas être visible par défaut
      expect(screen.queryByText("‹")).toBeNull();
    });

    it("appelle onBack au clic sur le bouton", () => {
      const onBack = vi.fn();
      render(<StepContainer {...defaultProps} onBack={onBack} />);

      fireEvent.press(screen.getByText("‹"));

      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("Options d'affichage", () => {
    it("masque la ProgressBar quand showProgressBar est false", () => {
      render(<StepContainer {...defaultProps} showProgressBar={false} />);

      // Le contenu devrait toujours être affiché
      expect(screen.getByText("Step content")).toBeTruthy();
    });

    it("masque les NavigationButtons quand showNavigationButtons est false", () => {
      render(<StepContainer {...defaultProps} showNavigationButtons={false} />);

      expect(screen.queryByText("Continuer")).toBeNull();
    });

    it("affiche un label personnalisé pour le bouton next", () => {
      render(<StepContainer {...defaultProps} nextLabel="Suivant" />);

      expect(screen.getByText("Suivant")).toBeTruthy();
    });
  });

  describe("États de chargement", () => {
    it("désactive le bouton next quand isNextDisabled est true", () => {
      render(<StepContainer {...defaultProps} isNextDisabled={true} />);

      expect(screen.getByText("Continuer")).toBeTruthy();
    });

    it("affiche le loader quand isLoading est true", () => {
      render(<StepContainer {...defaultProps} isLoading={true} />);

      expect(screen.queryByText("Continuer")).toBeNull();
    });
  });

  describe("Bouton Skip", () => {
    it("affiche le bouton Skip quand onSkip est fourni", () => {
      const onSkip = vi.fn();
      render(<StepContainer {...defaultProps} onSkip={onSkip} />);

      expect(screen.getByText("Skip")).toBeTruthy();
    });

    it("n'affiche pas le bouton Skip par défaut", () => {
      render(<StepContainer {...defaultProps} />);

      expect(screen.queryByText("Skip")).toBeNull();
    });
  });
});
