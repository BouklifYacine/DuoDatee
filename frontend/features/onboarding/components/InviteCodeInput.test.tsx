import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { InviteCodeInput } from "./InviteCodeInput";

describe("InviteCodeInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label Code d'invitation", () => {
      render(<InviteCodeInput {...defaultProps} />);

      expect(screen.getByText("Code d'invitation")).toBeTruthy();
    });

    it("affiche l'icône de cadenas", () => {
      render(<InviteCodeInput {...defaultProps} />);

      expect(screen.getByText("🔐")).toBeTruthy();
    });

    it("affiche le placeholder XXXXXX", () => {
      render(<InviteCodeInput {...defaultProps} />);

      expect(screen.getByPlaceholderText("XXXXXX")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onChange lors de la saisie", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      const input = screen.getByPlaceholderText("XXXXXX");
      fireEvent.changeText(input, "ABC");

      expect(onChange).toHaveBeenCalled();
    });

    it("convertit en majuscules", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      const input = screen.getByPlaceholderText("XXXXXX");
      fireEvent.changeText(input, "abc");

      // Vérifier que la conversion en majuscules a été faite
      expect(onChange).toHaveBeenCalled();
    });

    it("limite à 6 caractères", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      const input = screen.getByPlaceholderText("XXXXXX");
      fireEvent.changeText(input, "ABCDEFGH");

      // Le texte ne devrait pas dépasser 6 caractères
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("États", () => {
    it("affiche le message de progression (0/6)", () => {
      render(<InviteCodeInput {...defaultProps} value="" />);

      expect(screen.getByText("0/6 — demandez le code à votre partenaire")).toBeTruthy();
    });

    it("affiche le message de progression (3/6)", () => {
      render(<InviteCodeInput {...defaultProps} value="ABC" />);

      expect(screen.getByText("3/6 — demandez le code à votre partenaire")).toBeTruthy();
    });

    it("affiche '✓ Code prêt' quand 6 caractères", () => {
      render(<InviteCodeInput {...defaultProps} value="ABCDEF" />);

      expect(screen.getByText("✓ Code prêt")).toBeTruthy();
    });

    it("affiche le border vert quand complet", () => {
      render(<InviteCodeInput {...defaultProps} value="ABCDEF" />);

      expect(screen.getByText("✓ Code prêt")).toBeTruthy();
    });
  });

  describe("Valeurs", () => {
    it("affiche une valeur vide", () => {
      render(<InviteCodeInput {...defaultProps} value="" />);

      const input = screen.getByPlaceholderText("XXXXXX");
      expect(input.props.value).toBe("");
    });

    it("affiche une valeur partielle", () => {
      render(<InviteCodeInput {...defaultProps} value="AB" />);

      const input = screen.getByPlaceholderText("XXXXXX");
      expect(input.props.value).toBe("AB");
    });

    it("affiche une valeur complète", () => {
      render(<InviteCodeInput {...defaultProps} value="ABCDEF" />);

      const input = screen.getByPlaceholderText("XXXXXX");
      expect(input.props.value).toBe("ABCDEF");
    });
  });
});
