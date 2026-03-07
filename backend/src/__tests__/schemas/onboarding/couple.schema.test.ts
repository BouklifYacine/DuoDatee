import { describe, it, expect } from "vitest";
import {
  createCoupleSchema,
  joinCoupleSchema,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS,
} from "../../../trpc/schemas";

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
      it("should validate valid couple data", () => {
        const validInput = {
          relationshipDuration: "six_mois_un_an",
          relationshipStatus: "en_couple",
          livingSituation: "ensemble",
        };

        const result = createCoupleSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept all relationship durations", () => {
        for (const duration of RELATIONSHIP_DURATIONS) {
          const validInput = {
            relationshipDuration: duration,
            relationshipStatus: "en_couple",
            livingSituation: "ensemble",
          };

          const result = createCoupleSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });

      it("should accept all relationship statuses", () => {
        for (const status of RELATIONSHIP_STATUSES) {
          const validInput = {
            relationshipDuration: "six_mois_un_an",
            relationshipStatus: status,
            livingSituation: "ensemble",
          };

          const result = createCoupleSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });

      it("should accept all living situations", () => {
        for (const situation of LIVING_SITUATIONS) {
          const validInput = {
            relationshipDuration: "six_mois_un_an",
            relationshipStatus: "en_couple",
            livingSituation: situation,
          };

          const result = createCoupleSchema.safeParse(validInput);
          expect(result.success).toBe(true);
        }
      });
    });

    describe("Invalid inputs", () => {
      it("should reject missing relationship duration", () => {
        const invalidInput = {
          relationshipStatus: "en_couple",
          livingSituation: "ensemble",
        };

        const result = createCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing relationship status", () => {
        const invalidInput = {
          relationshipDuration: "six_mois_un_an",
          livingSituation: "ensemble",
        };

        const result = createCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing living situation", () => {
        const invalidInput = {
          relationshipDuration: "six_mois_un_an",
          relationshipStatus: "en_couple",
        };

        const result = createCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("joinCoupleSchema", () => {
    describe("Valid inputs", () => {
      it("should validate a valid 6-character invite code", () => {
        const validInput = {
          inviteCode: "ABC123",
        };

        const result = joinCoupleSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });

      it("should accept exactly 6 characters", () => {
        const validInput = {
          inviteCode: "123456",
        };

        const result = joinCoupleSchema.safeParse(validInput);
        expect(result.success).toBe(true);
      });
    });

    describe("Invalid inputs", () => {
      it("should reject invite code less than 6 characters", () => {
        const invalidInput = {
          inviteCode: "ABC12",
        };

        const result = joinCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject invite code more than 6 characters", () => {
        const invalidInput = {
          inviteCode: "ABC1234",
        };

        const result = joinCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject empty invite code", () => {
        const invalidInput = {
          inviteCode: "",
        };

        const result = joinCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });

      it("should reject missing invite code", () => {
        const invalidInput = {};

        const result = joinCoupleSchema.safeParse(invalidInput);
        expect(result.success).toBe(false);
      });
    });
  });
});
