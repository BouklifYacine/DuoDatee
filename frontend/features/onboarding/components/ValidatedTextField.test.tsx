import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ValidatedTextField } from "./ValidatedTextField";

// Helper pour créer un mock de field react-hook-form
const createMockField = (overrides = {}) => ({
  handleChange: vi.fn(),
  handleBlur: vi.fn(),
  state: {
    value: "",
    meta: {
      errors: [] as string[],
      isTouched: false,
    },
  },
  ...overrides,
});

describe("ValidatedTextField", () => {
  const defaultProps = {
    field: createMockField(),
    label: "Email",
    placeholder: "Entrez votre email",
    icon: "📧",
  };

  describe("Rendu", () => {
    it("affiche le label", () => {
      render(<ValidatedTextField {...defaultProps} />);

      expect(screen.getByText("Email")).toBeTruthy();
    });

    it("affiche le placeholder", () => {
      render(<ValidatedTextField {...defaultProps} />);

      expect(screen.getByPlaceholderText("Entrez votre email")).toBeTruthy();
    });

    it("affiche l'icône", () => {
      render(<ValidatedTextField {...defaultProps} />);

      expect(screen.getByText("📧")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle handleChange lors de la saisie", () => {
      const field = createMockField();
      render(<ValidatedTextField {...defaultProps} field={field} />);

      const input = screen.getByPlaceholderText("Entrez votre email");
      fireEvent.changeText(input, "test");

      expect(field.handleChange).toHaveBeenCalled();
    });

    it("appelle handleBlur lors de la perte de focus", () => {
      const field = createMockField();
      render(<ValidatedTextField {...defaultProps} field={field} />);

      const input = screen.getByPlaceholderText("Entrez votre email");
      fireEvent(input, "blur");

      expect(field.handleBlur).toHaveBeenCalled();
    });
  });

  describe("États de validation", () => {
    it("affiche le message d'erreur quand touched et invalide", () => {
      const field = createMockField({
        state: {
          value: "invalid",
          meta: {
            errors: ["Email invalide"],
            isTouched: true,
          },
        },
      });

      render(<ValidatedTextField {...defaultProps} field={field} />);

      expect(screen.getByText("Email invalide")).toBeTruthy();
    });

    it("n'affiche pas d'erreur quand pas touched", () => {
      const field = createMockField({
        state: {
          value: "invalid",
          meta: {
            errors: ["Email invalide"],
            isTouched: false,
          },
        },
      });

      render(<ValidatedTextField {...defaultProps} field={field} />);

      expect(screen.queryByText("Email invalide")).toBeNull();
    });

    it("n'affiche pas d'erreur quand pas d'erreurs", () => {
      const field = createMockField({
        state: {
          value: "test@example.com",
          meta: {
            errors: [],
            isTouched: true,
          },
        },
      });

      render(<ValidatedTextField {...defaultProps} field={field} />);

      expect(screen.queryByText("Email invalide")).toBeNull();
    });
  });

  describe("Indicateur de succès", () => {
    it("affiche la coche quand valeur valide et touched", () => {
      const field = createMockField({
        state: {
          value: "test@example.com",
          meta: {
            errors: [],
            isTouched: true,
          },
        },
      });

      render(<ValidatedTextField {...defaultProps} field={field} />);

      expect(screen.getByText("✓")).toBeTruthy();
    });

    it("n'affiche pas la coche quand pas de valeur", () => {
      const field = createMockField({
        state: {
          value: "",
          meta: {
            errors: [],
            isTouched: true,
          },
        },
      });

      render(<ValidatedTextField {...defaultProps} field={field} />);

      expect(screen.queryByText("✓")).toBeNull();
    });
  });

  describe("Props optionnelles", () => {
    it("gère le keyboardType numeric", () => {
      render(
        <ValidatedTextField
          {...defaultProps}
          keyboardType="numeric"
          placeholder="Age"
          icon="🎂"
        />
      );

      expect(screen.getByPlaceholderText("Age")).toBeTruthy();
    });

    it("gère le keyboardType email-address", () => {
      render(
        <ValidatedTextField
          {...defaultProps}
          keyboardType="email-address"
          placeholder="Email"
        />
      );

      expect(screen.getByPlaceholderText("Entrez votre email")).toBeTruthy();
    });

    it("gère autoCapitalize none", () => {
      render(
        <ValidatedTextField
          {...defaultProps}
          autoCapitalize="none"
          placeholder="Nom d'utilisateur"
        />
      );

      expect(screen.getByPlaceholderText("Nom d'utilisateur")).toBeTruthy();
    });
  });
});
