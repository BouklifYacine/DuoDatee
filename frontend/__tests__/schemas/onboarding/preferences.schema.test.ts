import { describe, it, expect } from "vitest";
import { 
  preferencesSchema, 
  PreferencesInput,
  PREFERRED_TYPES,
  PREFERRED_BUDGETS 
} from "../../../features/onboarding/schemas/preferences.schema";

describe("preferencesSchema - Onboarding Preferences Validation", () => {
  describe("Valid inputs", () => {
    it("should validate valid preferences with all fields", () => {
      const validInput: PreferencesInput = {
        preferredTypes: ["bouffe", "boire"],
        preferredBudget: "moyen",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.preferredTypes).toEqual(["bouffe", "boire"]);
        expect(result.data.preferredBudget).toBe("moyen");
        expect(result.data.preferredDistance).toBe(25);
      }
    });

    it("should validate with single type", () => {
      const validInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "economique",
        preferredDistance: 10,
      };

      const result = preferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should validate with all three types", () => {
      const validInput: PreferencesInput = {
        preferredTypes: ["bouffe", "boire", "activite"],
        preferredBudget: "premium",
        preferredDistance: 50,
      };

      const result = preferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept minimum distance (1 km)", () => {
      const validInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 1,
      };

      const result = preferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept maximum distance (100 km)", () => {
      const validInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 100,
      };

      const result = preferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept all budget options", () => {
      for (const budget of PREFERRED_BUDGETS) {
        const validInput: PreferencesInput = {
          preferredTypes: ["bouffe"],
          preferredBudget: budget,
          preferredDistance: 25,
        };

        const result = preferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      }
    });

    it("should accept all type options", () => {
      for (const type of PREFERRED_TYPES) {
        const validInput: PreferencesInput = {
          preferredTypes: [type],
          preferredBudget: "moyen",
          preferredDistance: 25,
        };

        const result = preferencesSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Invalid inputs", () => {
    it("should reject empty preferredTypes array", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: [],
        preferredBudget: "moyen",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("preferredTypes");
      }
    });

    it("should reject more than 3 types", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: ["bouffe", "boire", "activite", "bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid type value", () => {
      const invalidInput = {
        preferredTypes: ["invalid_type"],
        preferredBudget: "moyen",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid budget value", () => {
      const invalidInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "invalid_budget",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject distance less than 1", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 0,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("preferredDistance");
      }
    });

    it("should reject distance more than 100", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 101,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject non-integer distance", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 25.5,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject negative distance", () => {
      const invalidInput: PreferencesInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: -10,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing preferredTypes", () => {
      const invalidInput = {
        preferredBudget: "moyen",
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing preferredBudget", () => {
      const invalidInput = {
        preferredTypes: ["bouffe"],
        preferredDistance: 25,
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing preferredDistance", () => {
      const invalidInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
      };

      const result = preferencesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
