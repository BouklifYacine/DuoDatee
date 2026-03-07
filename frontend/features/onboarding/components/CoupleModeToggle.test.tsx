import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { CoupleModeToggle } from "./CoupleModeToggle";

describe("CoupleModeToggle", () => {
  const defaultProps = {
    hasCouple: false,
    coupleMode: "create" as "create" | "join",
    onToggleCouple: vi.fn(),
    onChangeMode: vi.fn(),
  };

  describe("Rendu", () => {
    it("affiche le label 'Je suis en couple'", () => {
      render(<CoupleModeToggle {...defaultProps} />);

      expect(screen.getByText("Je suis en couple")).toBeTruthy();
    });

    it("affiche l'icône personne quand pas en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={false} />);

      expect(screen.getByText("👤")).toBeTruthy();
    });

    it("affiche l'icône couple quand en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} />);

      expect(screen.getByText("💑")).toBeTruthy();
    });
  });

  describe("Modes", () => {
    it("n'affiche pas les onglets quand pas en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={false} />);

      expect(screen.queryByText("✨ Créer")).toBeNull();
      expect(screen.queryByText("🔗 Rejoindre")).toBeNull();
    });

    it("affiche les onglets create et join quand en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} />);

      expect(screen.getByText("✨ Créer")).toBeTruthy();
      expect(screen.getByText("🔗 Rejoindre")).toBeTruthy();
    });

    it("affiche l'onglet create comme actif par défaut", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} coupleMode="create" />);

      expect(screen.getByText("✨ Créer")).toBeTruthy();
    });

    it("affiche l'onglet join comme actif", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} coupleMode="join" />);

      expect(screen.getByText("🔗 Rejoindre")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("appelle onToggleCouple lors du toggle", () => {
      const onToggleCouple = vi.fn();
      render(<CoupleModeToggle {...defaultProps} onToggleCouple={onToggleCouple} />);

      // Le toggle est un Switch, on peut utiliser fireEvent pour changer sa valeur
      const toggle = screen.getByText("Je suis en couple");
      fireEvent(toggle, "onValueChange", true);

      expect(onToggleCouple).toHaveBeenCalledWith(true);
    });

    it("appelle onChangeMode avec 'join' lors du clic sur Rejoindre", () => {
      const onChangeMode = vi.fn();
      render(
        <CoupleModeToggle
          {...defaultProps}
          hasCouple={true}
          onChangeMode={onChangeMode}
        />
      );

      fireEvent.press(screen.getByText("🔗 Rejoindre"));

      expect(onChangeMode).toHaveBeenCalledWith("join");
    });

    it("appelle onChangeMode avec 'create' lors du clic sur Créer", () => {
      const onChangeMode = vi.fn();
      render(
        <CoupleModeToggle
          {...defaultProps}
          hasCouple={true}
          coupleMode="join"
          onChangeMode={onChangeMode}
        />
      );

      fireEvent.press(screen.getByText("✨ Créer"));

      expect(onChangeMode).toHaveBeenCalledWith("create");
    });
  });

  describe("États", () => {
    it("affiche le bon style quand en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} />);

      expect(screen.getByText("💑")).toBeTruthy();
    });

    it("affiche le bon style quand pas en couple", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={false} />);

      expect(screen.getByText("👤")).toBeTruthy();
    });

    it("affiche les deux modes disponibles", () => {
      render(<CoupleModeToggle {...defaultProps} hasCouple={true} />);

      expect(screen.getByText("✨ Créer")).toBeTruthy();
      expect(screen.getByText("🔗 Rejoindre")).toBeTruthy();
    });
  });
});
