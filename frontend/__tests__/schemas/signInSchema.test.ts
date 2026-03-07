import { describe, it, expect } from "vitest";
import { signInSchema, validateSignInField } from "../../schemas";

describe("signInSchema - Validation", () => {
  describe("Valid inputs", () => {
    it("should validate a valid email and password", () => {
      const validInput = {
        email: "test@example.com",
        password: "password123",
      };

      const result = signInSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
        expect(result.data.password).toBe("password123");
      }
    });

    it("should trim whitespace from email", () => {
      const inputWithWhitespace = {
        email: "  test@example.com  ",
        password: "password123",
      };

      const result = signInSchema.safeParse(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("should convert email to lowercase", () => {
      const input = {
        email: "TEST@EXAMPLE.COM",
        password: "password123",
      };

      const result = signInSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("should accept minimum password length (6 chars)", () => {
      const input = {
        email: "test@example.com",
        password: "123456",
      };

      const result = signInSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs", () => {
    it("should reject invalid email format", () => {
      const invalidInput = {
        email: "not-an-email",
        password: "password123",
      };

      const result = signInSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("should reject empty email", () => {
      const invalidInput = {
        email: "",
        password: "password123",
      };

      const result = signInSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject password less than 6 characters", () => {
      const input = {
        email: "test@example.com",
        password: "12345",
      };

      const result = signInSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("password");
      }
    });

    it("should reject missing email", () => {
      const invalidInput = {
        password: "password123",
      };

      const result = signInSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing password", () => {
      const invalidInput = {
        email: "test@example.com",
      };

      const result = signInSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});

describe("validateSignInField - Single field validation", () => {
  it("should return undefined for valid email", () => {
    const result = validateSignInField("email", "test@example.com");
    expect(result).toBeUndefined();
  });

  it("should return error message for invalid email", () => {
    const result = validateSignInField("email", "invalid");
    expect(result).toBeDefined();
    expect(result).toContain("Email");
  });

  it("should return undefined for valid password", () => {
    const result = validateSignInField("password", "password123");
    expect(result).toBeUndefined();
  });

  it("should return error message for short password", () => {
    const result = validateSignInField("password", "123");
    expect(result).toBeDefined();
    expect(result).toContain("6");
  });
});
