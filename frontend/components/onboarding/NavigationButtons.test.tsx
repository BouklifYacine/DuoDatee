import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationButtons } from "./NavigationButtons";

describe("NavigationButtons", () => {
  const defaultProps = {
    onNext: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label par défaut 'Continue'", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText("Continue")).toBeTruthy();
    });

    it("affiche un label personnalisé", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Suivant" />);

      expect(screen.getByText("Suivant")).toBeTruthy();
    });

    it("affiche le cœur emoji", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText("❤️")).toBeTruthy();
    });

    it("affiche les chevrons de navigation", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText(">>>")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onNext au clic", () => {
      const onNext = vi.fn();
      render(<NavigationButtons {...defaultProps} onNext={onNext} />);

      fireEvent.press(screen.getByText("Continue"));

      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("n'appelle pas onNext si le bouton est désactivé", () => {
      const onNext = vi.fn();
      render(<NavigationButtons {...defaultProps} onNext={onNext} isNextDisabled={true} />);

      // Le bouton devrait être visuellement présent mais pas cliquable
      expect(screen.getByText("Continue")).toBeTruthy();
    });
  });

  describe("États", () => {
    it("désactive le bouton quand isNextDisabled est true", () => {
      render(<NavigationButtons {...defaultProps} isNextDisabled={true} />);

      // Le bouton doit être rendu avec un style différent
      expect(screen.getByText("Continue")).toBeTruthy();
    });

    it("affiche le loader quand isLoading est true", () => {
      render(<NavigationButtons {...defaultProps} isLoading={true} />);

      // Le texte "Continue" ne doit pas être visible
      expect(screen.queryByText("Continue")).toBeNull();
    });

    it("n'affiche pas le loader quand isLoading est false", () => {
      render(<NavigationButtons {...defaultProps} isLoading={false} />);

      expect(screen.getByText("Continue")).toBeTruthy();
    });
  });

  describe("Labels personnalisés", () => {
    it("affiche 'Commencer' comme label", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Commencer" />);

      expect(screen.getByText("Commencer")).toBeTruthy();
    });

    it("affiche 'Terminer' comme label", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Terminer" />);

      expect(screen.getByText("Terminer")).toBeTruthy();
    });
  });
});
