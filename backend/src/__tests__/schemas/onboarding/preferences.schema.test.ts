import { describe, it, expect } from "vitest";
import { updatePreferencesSchema, PREFERRED_TYPES, PREFERRED_BUDGETS } from "../../../trpc/schemas";

describe("tRPC Preferences Schema", () => {
  describe("Constants", () => {
    it("should have correct PREFERRED_TYPES", () => {
      expect(PREFERRED_TYPES).toEqual(["bouffe", "boire", "activite"]);
    });

    it("should have correct PREFERRED_BUDGETS", () => {
      expect(PREFERRED_BUDGETS).toEqual(["economique", "moyen", "premium"]);
    });
  });

  describe("updatePreferencesSchema", () => {
    describe("Valid inputs", () => {
      it("should validate valid preferences with all fields", () => {
        const validInput = {
          preferredTypes: ["bouffe", "boire"],
          preferredBudget: "moyen",
          preferredDistance: 25,
        };

        const result = updatePreferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should validate with single type", () => {
        const validInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "economique",
          preferredDistance: 10,
        };

        const result = updatePreferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept minimum distance (1 km)", () => {
        const validInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 1,
        };

        const result = updatePreferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept maximum distance (100 km)", () => {
        const validInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 100,
        };

        const result = updatePreferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept all budget options", () => {
        for (const budget of PREFERRED_BUDGETS) {
          const validInput = {
            preferredTypes: ["bouffe"],
            preferredBudget: budget,
            preferredDistance: 25,
          };

          const result = updatePreferencesSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });

      it("should accept all type options", () => {
        for (const type of PREFERRED_TYPES) {
          const validInput = {
            preferredTypes: [type],
            preferredBudget: "moyen",
            preferredDistance: 25,
          };

          const result = updatePreferencesSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });
    });

    describe("Invalid inputs", () => {
      it("should reject empty preferredTypes array", () => {
        const invalidInput = {
          preferredTypes: [],
          preferredBudget: "moyen",
          preferredDistance: 25,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject more than 3 types", () => {
        const invalidInput = {
          preferredTypes: ["bouffe", "boire", "activite", "bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 25,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject distance less than 1", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 0,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject distance more than 100", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 101,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject non-integer distance", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: 25.5,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject negative distance", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
          preferredDistance: -10,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing preferredTypes", () => {
        const invalidInput = {
          preferredBudget: "moyen",
          preferredDistance: 25,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing preferredBudget", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredDistance: 25,
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing preferredDistance", () => {
        const invalidInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: "moyen",
        };

        const result = updatePreferencesSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });
    });
  });
});
