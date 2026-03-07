import { describe, it, expect } from "vitest";
import { profilSchema, ProfilInput } from "../../../features/onboarding/schemas/profil.schema";

describe("profilSchema - Onboarding Profil Validation", () => {
  describe("Valid inputs", () => {
    it("should validate a valid profil with all fields", () => {
      const validInput: ProfilInput = {
        name: "John",
        age: 25,
        gender: "homme",
      };

      const result = profilSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John");
        expect(result.data.age).toBe(25);
        expect(result.data.gender).toBe("homme");
      }
    });

    it("should validate profil without optional gender", () => {
      const validInput: ProfilInput = {
        name: "Jane",
        age: 30,
      };

      const result = profilSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.gender).toBeUndefined();
      }
    });

    it("should trim whitespace from name", () => {
      const inputWithWhitespace: ProfilInput = {
        name: "  John  ",
        age: 25,
      };

      const result = profilSchema.safeParse(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John");
      }
    });

    it("should accept minimum age (16)", () => {
      const input: ProfilInput = {
        name: "YoungUser",
        age: 16,
      };

      const result = profilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum age (99)", () => {
      const input: ProfilInput = {
        name: "OldUser",
        age: 99,
      };

      const result = profilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept minimum name length (3)", () => {
      const input: ProfilInput = {
        name: "Joh",
        age: 25,
      };

      const result = profilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum name length (20)", () => {
      const input: ProfilInput = {
        name: "J".repeat(20),
        age: 25,
      };

      const result = profilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept femme gender", () => {
      const input: ProfilInput = {
        name: "Jane",
        age: 25,
        gender: "femme",
      };

      const result = profilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs", () => {
    it("should reject name less than 3 characters", () => {
      const invalidInput: ProfilInput = {
        name: "Jo",
        age: 25,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("name");
      }
    });

    it("should reject name more than 20 characters", () => {
      const invalidInput: ProfilInput = {
        name: "J".repeat(21),
        age: 25,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject age less than 16", () => {
      const invalidInput: ProfilInput = {
        name: "John",
        age: 15,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("age");
      }
    });

    it("should reject age more than 99", () => {
      const invalidInput: ProfilInput = {
        name: "John",
        age: 100,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject non-integer age", () => {
      const invalidInput: ProfilInput = {
        name: "John",
        age: 25.5,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject negative age", () => {
      const invalidInput: ProfilInput = {
        name: "John",
        age: -5,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid gender value", () => {
      const invalidInput: ProfilInput = {
        name: "John",
        age: 25,
        gender: "other" as any,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing name", () => {
      const invalidInput = {
        age: 25,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing age", () => {
      const invalidInput = {
        name: "John",
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const invalidInput: ProfilInput = {
        name: "",
        age: 25,
      };

      const result = profilSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});

