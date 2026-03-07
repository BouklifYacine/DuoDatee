import { describe, it, expect } from "vitest";
import { 
  createCoupleSchema, 
  joinCoupleSchema,
  CreateCoupleInput,
  JoinCoupleInput,
  RELATIONSHIP_DURATIONS,
  RELATIONSHIP_STATUSES,
  LIVING_SITUATIONS
} from "../../../features/onboarding/schemas/couple.schema";

describe("createCoupleSchema - Create Couple Validation", () => {
  describe("Valid inputs", () => {
    it("should validate valid couple data", () => {
      const validInput: CreateCoupleInput = {
        relationshipDuration: "six_mois_un_an",
        relationshipStatus: "en_couple",
        livingSituation: "ensemble",
      };

      const result = createCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.relationshipDuration).toBe("six_mois_un_an");
        expect(result.data.relationshipStatus).toBe("en_couple");
        expect(result.data.livingSituation).toBe("ensemble");
      }
    });

    it("should accept all relationship durations", () => {
      for (const duration of RELATIONSHIP_DURATIONS) {
        const validInput: CreateCoupleInput = {
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
        const validInput: CreateCoupleInput = {
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
        const validInput: CreateCoupleInput = {
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
    it("should reject invalid relationship duration", () => {
      const invalidInput = {
        relationshipDuration: "invalid_duration",
        relationshipStatus: "en_couple",
        livingSituation: "ensemble",
      };

      const result = createCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid relationship status", () => {
      const invalidInput = {
        relationshipDuration: "six_mois_un_an",
        relationshipStatus: "invalid_status",
        livingSituation: "ensemble",
      };

      const result = createCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid living situation", () => {
      const invalidInput = {
        relationshipDuration: "six_mois_un_an",
        relationshipStatus: "en_couple",
        livingSituation: "invalid_situation",
      };

      const result = createCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

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

describe("joinCoupleSchema - Join Couple Validation", () => {
  describe("Valid inputs", () => {
    it("should validate a valid 6-character invite code", () => {
      const validInput: JoinCoupleInput = {
        inviteCode: "ABC123",
      };

      const result = joinCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.inviteCode).toBe("ABC123");
      }
    });

    it("should convert invite code to uppercase", () => {
      const validInput: JoinCoupleInput = {
        inviteCode: "abc123",
      };

      const result = joinCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.inviteCode).toBe("ABC123");
      }
    });

    it("should accept exactly 6 characters", () => {
      const validInput: JoinCoupleInput = {
        inviteCode: "123456",
      };

      const result = joinCoupleSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs", () => {
    it("should reject invite code less than 6 characters", () => {
      const invalidInput: JoinCoupleInput = {
        inviteCode: "ABC12",
      };

      const result = joinCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("inviteCode");
      }
    });

    it("should reject invite code more than 6 characters", () => {
      const invalidInput: JoinCoupleInput = {
        inviteCode: "ABC1234",
      };

      const result = joinCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject empty invite code", () => {
      const invalidInput: JoinCoupleInput = {
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

    it("should reject invite code with special characters", () => {
      const invalidInput: JoinCoupleInput = {
        inviteCode: "AB@123",
      };

      const result = joinCoupleSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});
