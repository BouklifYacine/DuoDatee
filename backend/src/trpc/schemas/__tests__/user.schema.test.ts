import { describe, it, expect } from "vitest";
import { updateProfilSchema, completeOnboardingSchema } from "../../schemas/user.schema";

describe("tRPC User Schemas", () => {
  describe("updateProfilSchema", () => {
    describe("Valid inputs", () => {
      it("should validate a valid profil", () => {
        const validInput = {
          name: "John",
          age: 25,
          gender: "homme",
        };
        
        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should validate without optional gender", () => {
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
        const input = { name: "Test", age: 16 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(true);
      });

      it("should accept maximum age (99)", () => {
        const input = { name: "Test", age: 99 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    describe("Invalid inputs", () => {
      it("should reject name shorter than 3 characters", () => {
        const input = { name: "AB", age: 25 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject name longer than 20 characters", () => {
        const input = { name: "A".repeat(21), age: 25 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject age below 16", () => {
        const input = { name: "Test", age: 15 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject age above 99", () => {
        const input = { name: "Test", age: 100 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject invalid gender", () => {
        const input = { name: "Test", age: 25, gender: "autre" };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject decimal age", () => {
        const input = { name: "Test", age: 25.5 };
        const result = updateProfilSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("completeOnboardingSchema", () => {
    it("should validate empty object", () => {
      const result = completeOnboardingSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("should accept empty input", () => {
      // Zod does not accept undefined directly, only empty object
      const result = completeOnboardingSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
