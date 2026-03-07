import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { BudgetSelector } from "./BudgetSelector";
import { PREFERRED_BUDGETS } from "../schemas";

describe("BudgetSelector", () => {
  const defaultProps = {
    selected: undefined as string | undefined,
    onSelect: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche les trois options de budget", () => {
      render(<BudgetSelector {...defaultProps} />);

      expect(screen.getByText("Économique")).toBeTruthy();
      expect(screen.getByText("Moyen")).toBeTruthy();
      expect(screen.getByText("Premium")).toBeTruthy();
    });

    it("affiche le label Budget", () => {
      render(<BudgetSelector {...defaultProps} />);

      expect(screen.getByText("Budget")).toBeTruthy();
    });

    it("affiche les icônes pour chaque option", () => {
      render(<BudgetSelector {...defaultProps} />);

      expect(screen.getByText("💰")).toBeTruthy();
      expect(screen.getByText("💵")).toBeTruthy();
      expect(screen.getByText("✨")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onSelect avec 'economique' lors du clic", () => {
      const onSelect = vi.fn();
      render(<BudgetSelector {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Économique"));

      expect(onSelect).toHaveBeenCalledWith("economique");
    });

    it("appelle onSelect avec 'moyen' lors du clic", () => {
      const onSelect = vi.fn();
      render(<BudgetSelector {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Moyen"));

      expect(onSelect).toHaveBeenCalledWith("moyen");
    });

    it("appelle onSelect avec 'premium' lors du clic", () => {
      const onSelect = vi.fn();
      render(<BudgetSelector {...defaultProps} onSelect={onSelect} />);

      fireEvent.press(screen.getByText("Premium"));

      expect(onSelect).toHaveBeenCalledWith("premium");
    });
  });

  describe("États", () => {
    it("affiche le style sélectionné quand 'economique' est choisi", () => {
      render(<BudgetSelector {...defaultProps} selected="economique" />);

      expect(screen.getByText("Économique")).toBeTruthy();
    });

    it("affiche le style sélectionné quand 'moyen' est choisi", () => {
      render(<BudgetSelector {...defaultProps} selected="moyen" />);

      expect(screen.getByText("Moyen")).toBeTruthy();
    });

    it("affiche le style sélectionné quand 'premium' est choisi", () => {
      render(<BudgetSelector {...defaultProps} selected="premium" />);

      expect(screen.getByText("Premium")).toBeTruthy();
    });

    it("permet de changer de sélection", () => {
      const onSelect = vi.fn();
      render(<BudgetSelector {...defaultProps} selected="economique" onSelect={onSelect} />);

      // Cliquer sur Premium
      fireEvent.press(screen.getByText("Premium"));

      expect(onSelect).toHaveBeenCalledWith("premium");
    });
  });

  describe("Constants", () => {
    it("a les bonnes valeurs de budgets", () => {
      expect(PREFERRED_BUDGETS).toEqual(["economique", "moyen", "premium"]);
    });
  });
});
