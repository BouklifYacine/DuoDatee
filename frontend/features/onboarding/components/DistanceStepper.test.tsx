import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { DistanceStepper } from "./DistanceStepper";

describe("DistanceStepper", () => {
  const defaultProps = {
    value: 25,
    onChange: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche la valeur actuelle", () => {
      render(<DistanceStepper {...defaultProps} value={25} />);

      expect(screen.getByText("25")).toBeTruthy();
    });

    it("affiche le label Distance maximale", () => {
      render(<DistanceStepper {...defaultProps} />);

      expect(screen.getByText("Distance maximale")).toBeTruthy();
    });

    it("affiche l'unité km", () => {
      render(<DistanceStepper {...defaultProps} />);

      expect(screen.getByText("km")).toBeTruthy();
    });

    it("affiche le bouton +", () => {
      render(<DistanceStepper {...defaultProps} />);

      expect(screen.getByText("+")).toBeTruthy();
    });

    it("affiche le bouton −", () => {
      render(<DistanceStepper {...defaultProps} />);

      expect(screen.getByText("−")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onChange avec value + 5 au clic sur +", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={25} onChange={onChange} />);

      fireEvent.press(screen.getByText("+"));

      expect(onChange).toHaveBeenCalledWith(30);
    });

    it("appelle onChange avec value - 5 au clic sur −", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={25} onChange={onChange} />);

      fireEvent.press(screen.getByText("−"));

      expect(onChange).toHaveBeenCalledWith(20);
    });
  });

  describe("Limites", () => {
    it("ne dépasse pas 100 au clic sur +", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={100} onChange={onChange} />);

      fireEvent.press(screen.getByText("+"));

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it("ne descend pas en dessous de 1 au clic sur −", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={1} onChange={onChange} />);

      fireEvent.press(screen.getByText("−"));

      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("incrémente de 5 en 5", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={10} onChange={onChange} />);

      fireEvent.press(screen.getByText("+"));

      expect(onChange).toHaveBeenCalledWith(15);
    });

    it("décrémente de 5 en 5", () => {
      const onChange = vi.fn();
      render(<DistanceStepper {...defaultProps} value={10} onChange={onChange} />);

      fireEvent.press(screen.getByText("−"));

      expect(onChange).toHaveBeenCalledWith(5);
    });
  });

  describe("Valeurs extrêmes", () => {
    it("affiche 0 comme valeur minimale (après clamping)", () => {
      render(<DistanceStepper {...defaultProps} value={0} />);

      expect(screen.getByText("0")).toBeTruthy();
    });

    it("affiche 100 comme valeur maximale", () => {
      render(<DistanceStepper {...defaultProps} value={100} />);

      expect(screen.getByText("100")).toBeTruthy();
    });
  });
});
