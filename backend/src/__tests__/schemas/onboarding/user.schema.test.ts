import { describe, it, expect } from "vitest";
import { updateProfilSchema, completeOnboardingSchema } from "../../../trpc/schemas";

describe("tRPC User Schemas", () => {
  describe("updateProfilSchema", () => {
    describe("Valid inputs", () => {
      it("should validate a valid profil", () => {
        const validInput = {
          name: "John",
          age: 25,
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should validate with gender", () => {
        const validInput = {
          name: "John",
          age: 25,
          gender: "homme",
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept minimum age (16)", () => {
        const validInput = {
          name: "John",
          age: 16,
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept maximum age (99)", () => {
        const validInput = {
          name: "John",
          age: 99,
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept minimum name length (3)", () => {
        const validInput = {
          name: "Joh",
          age: 25,
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept maximum name length (20)", () => {
        const validInput = {
          name: "JohnDoeJohnDoeJohnDo",
          age: 25,
        };

        const result = updateProfilSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept both genders", () => {
        for (const gender of ["homme", "femme"]) {
          const validInput = {
            name: "John",
            age: 25,
            gender,
          };

          const result = updateProfilSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });
    });

    describe("Invalid inputs", () => {
      it("should reject missing name", () => {
        const invalidInput = {
          age: 25,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing age", () => {
        const invalidInput = {
          name: "John",
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject name too short", () => {
        const invalidInput = {
          name: "Jo",
          age: 25,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject name too long", () => {
        const invalidInput = {
          name: "JohnDoeJohnDoeJohnDoe",
          age: 25,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject age less than 16", () => {
        const invalidInput = {
          name: "John",
          age: 15,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject age more than 99", () => {
        const invalidInput = {
          name: "John",
          age: 100,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject non-integer age", () => {
        const invalidInput = {
          name: "John",
          age: 25.5,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject negative age", () => {
        const invalidInput = {
          name: "John",
          age: -10,
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject invalid gender", () => {
        const invalidInput = {
          name: "John",
          age: 25,
          gender: "invalid",
        };

        const result = updateProfilSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("completeOnboardingSchema", () => {
    it("should accept empty object", () => {
      const validInput = {};

      const result = completeOnboardingSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });
  });
});
