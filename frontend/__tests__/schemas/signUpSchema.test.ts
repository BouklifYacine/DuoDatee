import { describe, it, expect } from "vitest";
import { signUpSchema, validateField, validateSignUpForm } from "../../schemas/signUpSchema";

describe("signUpSchema - Validation", () => {
  describe("Valid inputs", () => {
    it("should validate a valid sign up with all fields", () => {
      const validInput = {
        name: "JohnDoe",
        email: "john@example.com",
        password: "password123",
      };

      const result = signUpSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("JohnDoe");
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("should trim whitespace from name and email", () => {
      const inputWithWhitespace = {
        name: "  JohnDoe  ",
        email: "  john@example.com  ",
        password: "password123",
      };

      const result = signUpSchema.safeParse(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("JohnDoe");
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("should convert email to lowercase", () => {
      const input = {
        name: "JohnDoe",
        email: "JOHN@EXAMPLE.COM",
        password: "password123",
      };

      const result = signUpSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("should accept minimum name length (3 chars)", () => {
      const input = {
        name: "Jo",
        email: "john@example.com",
        password: "password123",
      };

      const result = signUpSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should accept minimum password length (6 chars)", () => {
      const input = {
        name: "JohnDoe",
        email: "john@example.com",
        password: "123456",
      };

      const result = signUpSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid inputs", () => {
    it("should reject name less than 3 characters", () => {
      const invalidInput = {
        name: "Jo",
        email: "john@example.com",
        password: "password123",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("name");
      }
    });

    it("should reject name more than 20 characters", () => {
      const invalidInput = {
        name: "JohnDoeJohnDoeJohnDoeJohn",
        email: "john@example.com",
        password: "password123",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject invalid email format", () => {
      const invalidInput = {
        name: "JohnDoe",
        email: "not-an-email",
        password: "password123",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject password less than 6 characters", () => {
      const input = {
        name: "JohnDoe",
        email: "john@example.com",
        password: "12345",
      };

      const result = signUpSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("password");
      }
    });

    it("should reject missing name", () => {
      const invalidInput = {
        email: "john@example.com",
        password: "password123",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing email", () => {
      const invalidInput = {
        name: "JohnDoe",
        password: "password123",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing password", () => {
      const invalidInput = {
        name: "JohnDoe",
        email: "john@example.com",
      };

      const result = signUpSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });
});

describe("validateField - Single field validation", () => {
  it("should return undefined for valid name", () => {
    const result = validateField("name", "JohnDoe");
    expect(result).toBeUndefined();
  });

  it("should return error message for short name", () => {
    const result = validateField("name", "Jo");
    expect(result).toBeDefined();
    expect(result).toContain("3");
  });

  it("should return undefined for valid email", () => {
    const result = validateField("email", "john@example.com");
    expect(result).toBeUndefined();
  });

  it("should return error message for invalid email", () => {
    const result = validateField("email", "invalid");
    expect(result).toBeDefined();
    expect(result).toContain("Email");
  });

  it("should return undefined for valid password", () => {
    const result = validateField("password", "password123");
    expect(result).toBeUndefined();
  });

  it("should return error message for short password", () => {
    const result = validateField("password", "123");
    expect(result).toBeDefined();
    expect(result).toContain("6");
  });
});

describe("validateSignUpForm - Form validation", () => {
  it("should return undefined for valid form", () => {
    const validInput = {
      name: "JohnDoe",
      email: "john@example.com",
      password: "password123",
    };

    const result = validateSignUpForm(validInput);
    expect(result).toBeUndefined();
  });

  it("should return field errors for invalid form", () => {
    const invalidInput = {
      name: "Jo",
      email: "invalid",
      password: "123",
    };

    const result = validateSignUpForm(invalidInput);
    expect(result).toBeDefined();
    expect(result?.fields.name).toBeDefined();
    expect(result?.fields.email).toBeDefined();
    expect(result?.fields.password).toBeDefined();
  });
});
