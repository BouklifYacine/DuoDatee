import { describe, it, expect } from "vitest";
import {
  createCoupleSchema,
  joinCoupleSchema,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
} from "../../schemas/couple.schema";

describe("tRPC Couple Schema", () => {
  describe("Constants", () => {
    it("should have correct RELATIONSHIP_DURATIONS", () => {
      expect(RELATIONSHIP_DURATIONS).toEqual([
        "moins_de_6m",
        "six_mois_un_an",
        "un_trois_ans",
        "trois_cinq_ans",
        "cinq_dix_ans",
        "dix_ans_plus",
      ]);
    });

    it("should have correct RELATIONSHIP_STATUSES", () => {
      expect(RELATIONSHIP_STATUSES).toEqual([
        "en_couple",
        "fiances",
        "pacses",
        "maries",
      ]);
    });

    it("should have correct LIVING_SITUATIONS", () => {
      expect(LIVING_SITUATIONS).toEqual([
        "ensemble",
        "separes_proche",
        "separes_loin",
      ]);
    });
  });

  describe("createCoupleSchema", () => {
    describe("Valid inputs", () => {
      it("should validate complete couple data - en_couple", () => {
        const validInput = {
          relationshipDuration: "moins_de_6m",
          relationshipStatus: "en_couple",
          livingSituation: "ensemble",
        };
        
        const result = createCoupleSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should validate all relationship durations", () => {
        for (const duration of RELATIONSHIP_DURATIONS) {
          const input = {
            relationshipDuration: duration,
            relationshipStatus: "en_couple",
            livingSituation: "ensemble",
          };
          
          const result = createCoupleSchema.safeParse(input);
          expect(result.success).toBe(true);
        }
      });

      it("should validate all relationship statuses", () => {
        for (const status of RELATIONSHIP_STATUSES) {
          const input = {
            relationshipDuration: "un_trois_ans",
            relationshipStatus: status,
            livingSituation: "ensemble",
          };
          
          const result = createCoupleSchema.safeParse(input);
          expect(result.success).toBe(true);
        }
      });

      it("should validate all living situations", () => {
        for (const situation of LIVING_SITUATIONS) {
          const input = {
            relationshipDuration: "un_trois_ans",
            relationshipStatus: "en_couple",
            livingSituation: situation,
          };
          
          const result = createCoupleSchema.safeParse(input);
          expect(result.success).toBe(true);
        }
      });
    });

    describe("Invalid inputs", () => {
      it("should reject invalid duration", () => {
        const input = {
          relationshipDuration: "invalid",
          relationshipStatus: "en_couple",
          livingSituation: "ensemble",
        };
        
        const result = createCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject missing duration", () => {
        const input = {
          relationshipStatus: "en_couple",
          livingSituation: "ensemble",
        };
        
        const result = createCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("joinCoupleSchema", () => {
    describe("Valid inputs", () => {
      it("should validate 6-character invite code", () => {
        const input = { inviteCode: "ABC123" };
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(true);
      });

      it("should validate lowercase invite code", () => {
        const input = { inviteCode: "abc123" };
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    describe("Invalid inputs", () => {
      it("should reject code shorter than 6 characters", () => {
        const input = { inviteCode: "ABC12" };
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject code longer than 6 characters", () => {
        const input = { inviteCode: "ABC1234" };
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject empty code", () => {
        const input = { inviteCode: "" };
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });

      it("should reject missing code", () => {
        const input = {};
        const result = joinCoupleSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });
  });
});
