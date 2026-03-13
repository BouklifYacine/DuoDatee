import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationButtons } from "./NavigationButtons";

describe("NavigationButtons", () => {
  const defaultProps = {
    onNext: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label par defaut 'Continue'", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText("Continue")).toBeTruthy();
    });

    it("affiche un label personnalise", () => {
      render(<NavigationButtons {...defaultProps} nextLabel="Suivant" />);

      expect(screen.getByText("Suivant")).toBeTruthy();
    });

    it("affiche le badge de progression", () => {
      render(<NavigationButtons {...defaultProps} />);

      expect(screen.getByText("Etape suivante")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onNext au clic", () => {
      const onNext = vi.fn();
      render(<NavigationButtons {...defaultProps} onNext={onNext} />);

      fireEvent.press(screen.getByText("Continue"));

      expect(onNext).toHaveBeenCalledTimes(1);
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

      expect(screen.getByText("Continue")).toBeTruthy();
    });
  });

  describe("Etats", () => {
    it("desactive le bouton quand isNextDisabled est true", () => {
      render(<NavigationButtons {...defaultProps} isNextDisabled={true} />);

      expect(screen.getByText("Continue")).toBeTruthy();
    });

    it("affiche le loader quand isLoading est true", () => {
      render(<NavigationButtons {...defaultProps} isLoading={true} />);

      expect(screen.queryByText("Continue")).toBeNull();
    });

    it("n'affiche pas le loader quand isLoading est false", () => {
      render(<NavigationButtons {...defaultProps} isLoading={false} />);

      expect(screen.getByText("Continue")).toBeTruthy();
    });
  });

  describe("Labels personnalises", () => {
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
