import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react-native";
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

    it("affiche l'icone de cadenas", () => {
      render(<InviteCodeInput {...defaultProps} />);

      expect(screen.getByText("\u{1F510}")).toBeTruthy();
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

      fireEvent.changeText(screen.getByPlaceholderText("XXXXXX"), "ABC");

      expect(onChange).toHaveBeenCalledWith("ABC");
    });

    it("convertit en majuscules", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      fireEvent.changeText(screen.getByPlaceholderText("XXXXXX"), "abc");

      expect(onChange).toHaveBeenCalledWith("ABC");
    });

    it("limite a 6 caracteres", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      fireEvent.changeText(screen.getByPlaceholderText("XXXXXX"), "ABCDEFGH");

      expect(onChange).toHaveBeenCalledWith("ABCDEF");
    });

    it("supprime les espaces avant validation", () => {
      const onChange = vi.fn();
      render(<InviteCodeInput {...defaultProps} onChange={onChange} />);

      fireEvent.changeText(screen.getByPlaceholderText("XXXXXX"), "ab 12");

      expect(onChange).toHaveBeenCalledWith("AB12");
    });
  });

  describe("Etats", () => {
    it("affiche le message de progression (0/6)", () => {
      render(<InviteCodeInput {...defaultProps} value="" />);

      expect(screen.getByText("0/6 - demandez le code a votre partenaire")).toBeTruthy();
    });

    it("affiche le message de progression (3/6)", () => {
      render(<InviteCodeInput {...defaultProps} value="ABC" />);

      expect(screen.getByText("3/6 - demandez le code a votre partenaire")).toBeTruthy();
    });

    it("affiche 'Code pret' quand 6 caracteres", () => {
      render(<InviteCodeInput {...defaultProps} value="ABCDEF" />);

      expect(screen.getByText("Code pret")).toBeTruthy();
    });
  });

  describe("Valeurs", () => {
    it("affiche une valeur vide", () => {
      render(<InviteCodeInput {...defaultProps} value="" />);

      expect(screen.getByPlaceholderText("XXXXXX").props.value).toBe("");
    });

    it("affiche une valeur partielle", () => {
      render(<InviteCodeInput {...defaultProps} value="AB" />);

      expect(screen.getByPlaceholderText("XXXXXX").props.value).toBe("AB");
    });

    it("affiche une valeur complete", () => {
      render(<InviteCodeInput {...defaultProps} value="ABCDEF" />);

      expect(screen.getByPlaceholderText("XXXXXX").props.value).toBe("ABCDEF");
    });
  });
});
