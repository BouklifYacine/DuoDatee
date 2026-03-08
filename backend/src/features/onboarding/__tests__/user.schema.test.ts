import { describe, it, expect } from "vitest";
import { updateProfilSchema } from "../onboarding-user/user.schema";

describe("updateProfilSchema - Onboarding User Validation", () => {
  describe("Valid inputs", () => {
    it("should validate a valid profil with all fields", () => {
      const validInput = {
        name: "John",
        age: 25,
        gender: "homme" as const,
      };
      
      const result = updateProfilSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInput);
      }
    });

    it("should validate profil without optional gender", () => {
      const validInput = {
        name: "Jane",
        age: 30,
      };
      
      const result = updateProfilSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should trim whitespace from name", () => {
      const inputWithWhitespace = {
        name: "  John  ",
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John");
      }
    });

    it("should accept minimum age (16)", () => {
      const input = {
        name: "YoungUser",
        age: 16,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum age (99)", () => {
      const input = {
        name: "OldUser",
        age: 99,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept minimum name length (3)", () => {
      const input = {
        name: "ABC",
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum name length (20)", () => {
      const input = {
        name: "A".repeat(20),
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept female gender", () => {
      const input = {
        name: "Marie",
        age: 28,
        gender: "femme" as const,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs - Name", () => {
    it("should reject name shorter than 3 characters", () => {
      const input = {
        name: "AB",
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject name longer than 20 characters", () => {
      const input = {
        name: "A".repeat(21),
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const input = {
        name: "",
        age: 25,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject whitespace-only name (trimmed to empty)", () => {
      const input = {
        name: "   ",
        age: 25,
      };
      
      // Zod's .trim() is applied first, then min(3) is checked
      // So "   " becomes "" after trim, which fails min(3)
      const result = updateProfilSchema.safeParse(input);
      // After trimming, the name is empty, so min(3) fails
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - Age", () => {
    it("should reject age below 16", () => {
      const input = {
        name: "Test",
        age: 15,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject age above 99", () => {
      const input = {
        name: "Test",
        age: 100,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject negative age", () => {
      const input = {
        name: "Test",
        age: -5,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject decimal age", () => {
      const input = {
        name: "Test",
        age: 25.5,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject non-number age", () => {
      const input = {
        name: "Test",
        age: "25" as any,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - Gender", () => {
    it("should reject invalid gender value", () => {
      const input = {
        name: "Test",
        age: 25,
        gender: "autre" as any,
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Strict mode", () => {
    it("should reject unknown fields (strict mode)", () => {
      const input = {
        name: "Test",
        age: 25,
        unknownField: "value",
      };
      
      const result = updateProfilSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
