import { describe, it, expect } from "vitest";
import { updatePreferencesSchema, PREFERRED_TYPES, PREFERRED_BUDGETS } from "../../schemas/preferences.schema";

describe("tRPC Preferences Schema", () => {
  describe("Constants", () => {
    it("should have correct PREFERRED_TYPES", () => {
      expect(PREFERRED_TYPES).toEqual(["bouffe", "boire", "activite"]);
    });

    it("should have correct PREFERRED_BUDGETS", () => {
      expect(PREFERRED_BUDGETS).toEqual(["economique", "moyen", "premium"]);
    });
  });

  describe("Valid inputs", () => {
    it("should validate complete preferences", () => {
      const validInput = {
        preferredTypes: ["bouffe", "boire"],
        preferredBudget: "moyen",
        preferredDistance: 10,
      };
      
      const result = updatePreferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should validate single activity type", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "economique",
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should validate all three activity types", () => {
      const input = {
        preferredTypes: ["bouffe", "boire", "activite"],
        preferredBudget: "premium",
        preferredDistance: 15,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept minimum distance (1)", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 1,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum distance (100)", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 100,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept all budget types", () => {
      for (const budget of PREFERRED_BUDGETS) {
        const input = {
          preferredTypes: ["bouffe"],
          preferredBudget: budget,
          preferredDistance: 5,
        };
        
        const result = updatePreferencesSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Invalid inputs", () => {
    it("should reject empty array", () => {
      const input = {
        preferredTypes: [],
        preferredBudget: "moyen",
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject more than 3 types", () => {
      const input = {
        preferredTypes: ["bouffe", "boire", "activite", "bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject invalid activity type", () => {
      const input = {
        preferredTypes: ["invalid"],
        preferredBudget: "moyen",
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject invalid budget", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "invalid",
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject distance below 1", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 0,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject distance above 100", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 101,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject decimal distance", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen",
        preferredDistance: 5.5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      const input = {
        preferredTypes: ["bouffe"],
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
