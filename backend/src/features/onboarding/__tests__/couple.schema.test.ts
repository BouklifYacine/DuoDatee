import { describe, it, expect } from "vitest";
import { updateCoupleSchema } from "../onboarding-couple/couple.schema";

describe("updateCoupleSchema - Onboarding Couple Validation", () => {
  describe("Valid inputs", () => {
    it("should validate complete couple data - en_couple", () => {
      const validInput = {
        relationshipDuration: "moins_de_6m" as const,
        relationshipStatus: "en_couple" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInput);
      }
    });

    it("should validate complete couple data - maries", () => {
      const validInput = {
        relationshipDuration: "dix_ans_plus" as const,
        relationshipStatus: "maries" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should validate all relationship durations", () => {
      const durations = [
        "moins_de_6m",
        "six_mois_un_an",
        "un_trois_ans",
        "trois_cinq_ans",
        "cinq_dix_ans",
        "dix_ans_plus",
      ] as const;
      
      for (const duration of durations) {
        const input = {
          relationshipDuration: duration,
          relationshipStatus: "en_couple" as const,
          livingSituation: "ensemble" as const,
        };
        
        const result = updateCoupleSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it("should validate all relationship statuses", () => {
      const statuses = ["en_couple", "fiances", "pacses", "maries"] as const;
      
      for (const status of statuses) {
        const input = {
          relationshipDuration: "un_trois_ans" as const,
          relationshipStatus: status,
          livingSituation: "ensemble" as const,
        };
        
        const result = updateCoupleSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it("should validate all living situations", () => {
      const situations = ["ensemble", "separes_proche", "separes_loin"] as const;
      
      for (const situation of situations) {
        const input = {
          relationshipDuration: "un_trois_ans" as const,
          relationshipStatus: "en_couple" as const,
          livingSituation: situation,
        };
        
        const result = updateCoupleSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Invalid inputs - relationshipDuration", () => {
    it("should reject invalid duration", () => {
      const input = {
        relationshipDuration: "invalid" as any,
        relationshipStatus: "en_couple" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject missing duration", () => {
      const input = {
        relationshipStatus: "en_couple" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject number duration", () => {
      const input = {
        relationshipDuration: 1 as any,
        relationshipStatus: "en_couple" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - relationshipStatus", () => {
    it("should reject invalid status", () => {
      const input = {
        relationshipDuration: "un_trois_ans" as const,
        relationshipStatus: "invalid" as any,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject missing status", () => {
      const input = {
        relationshipDuration: "un_trois_ans" as const,
        livingSituation: "ensemble" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid inputs - livingSituation", () => {
    it("should reject invalid situation", () => {
      const input = {
        relationshipDuration: "un_trois_ans" as const,
        relationshipStatus: "en_couple" as const,
        livingSituation: "invalid" as any,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject missing situation", () => {
      const input = {
        relationshipDuration: "un_trois_ans" as const,
        relationshipStatus: "en_couple" as const,
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("Strict mode", () => {
    it("should reject unknown fields", () => {
      const input = {
        relationshipDuration: "un_trois_ans" as const,
        relationshipStatus: "en_couple" as const,
        livingSituation: "ensemble" as const,
        unknownField: "value",
      };
      
      const result = updateCoupleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
