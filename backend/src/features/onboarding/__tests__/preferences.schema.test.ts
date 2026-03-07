import { describe, it, expect } from "vitest";
import { updatePreferencesSchema } from "../onboarding-preferences/preferences.schema";

describe("updatePreferencesSchema - Onboarding Preferences Validation", () => {
  describe("Valid inputs", () => {
    it("should validate complete preferences", () => {
      const validInput = {
        preferredTypes: ["bouffe", "boire"],
        preferredBudget: "moyen" as const,
        preferredDistance: 10,
      };
      
      const result = updatePreferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInput);
      }
    });

    it("should validate with single activity type", () => {
      const validInput = {
        preferredTypes: ["bouffe"],
        preferredBudget: "economique" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should validate with all three activity types", () => {
      const validInput = {
        preferredTypes: ["bouffe", "boire", "activite"],
        preferredBudget: "premium" as const,
        preferredDistance: 15,
      };
      
      const result = updatePreferencesSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should accept minimum distance (1)", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 1,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept maximum distance (20)", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 20,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should accept all budget types", () => {
      const budgets = ["economique", "moyen", "premium"] as const;
      
      for (const budget of budgets) {
        const input = {
          preferredTypes: ["bouffe"],
          preferredBudget: budget,
          preferredDistance: 5,
        };
        
        const result = updatePreferencesSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it("should accept all activity types", () => {
      const types = ["bouffe", "boire", "activite"] as const;
      
      const input = {
        preferredTypes: types,
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs - preferredTypes", () => {
    it("should reject empty array", () => {
      const input = {
        preferredTypes: [],
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject more than 3 types", () => {
      const input = {
        preferredTypes: ["bouffe", "boire", "activite", "bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject invalid activity type", () => {
      const input = {
        preferredTypes: ["invalid"] as any,
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject non-array types", () => {
      const input = {
        preferredTypes: "bouffe" as any,
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - preferredBudget", () => {
    it("should reject invalid budget value", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "invalid" as any,
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject missing budget", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredDistance: 5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - preferredDistance", () => {
    it("should reject distance below 1", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 0,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject distance above 20", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 21,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject decimal distance", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 5.5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject negative distance", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: -5,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject non-number distance", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: "5" as any,
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Strict mode", () => {
    it("should reject unknown fields", () => {
      const input = {
        preferredTypes: ["bouffe"],
        preferredBudget: "moyen" as const,
        preferredDistance: 5,
        unknownField: "value",
      };
      
      const result = updatePreferencesSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
