import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationButtons } from "./NavigationButtons";

describe("NavigationButtons", () => {
  const defaultProps = {
    onNext: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le libelle par defaut du bouton suivant", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText("Continuer")).toBeTruthy();
    });

    it("affiche un label personnalise pour le bouton suivant", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Suivant" />);

      expect(screen.getByText("Suivant")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onNext au clic", () => {
      const onNext = vi.fn();
      render(<NavigationButtons {...defaultProps} onNext={onNext} />);

      fireEvent.press(screen.getByText("Continuer"));

      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("appelle onBack au clic sur Retour", () => {
      const onBack = vi.fn();
      render(<NavigationButtons {...defaultProps} onBack={onBack} />);

      fireEvent.press(screen.getByText("Retour"));

      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it("n'appelle pas onNext si le bouton est desactive", () => {
      const onNext = vi.fn();
      render(
        <NavigationButtons
          {...defaultProps}
          onNext={onNext}
          isNextDisabled={true}
        />
      );

      expect(screen.getByText("Continuer")).toBeTruthy();
    });
  });

  describe("Etats", () => {
    it("desactive le bouton quand isNextDisabled est true", () => {
      render(<NavigationButtons {...defaultProps} isNextDisabled={true} />);

      expect(screen.getByText("Continuer")).toBeTruthy();
    });

    it("affiche le loader quand isLoading est true", () => {
      render(<NavigationButtons {...defaultProps} isLoading={true} />);

      expect(screen.queryByText("Continuer")).toBeNull();
    });

    it("n'affiche pas le loader quand isLoading est false", () => {
      render(<NavigationButtons {...defaultProps} isLoading={false} />);

      expect(screen.getByText("Continuer")).toBeTruthy();
    });

    it("affiche le bouton Retour quand onBack est fourni", () => {
      render(<NavigationButtons {...defaultProps} onBack={vi.fn()} />);

      expect(screen.getByText("Retour")).toBeTruthy();
    });

    it("masque le bouton Retour quand onBack n'est pas fourni", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.queryByText("Retour")).toBeNull();
    });
  });
});
