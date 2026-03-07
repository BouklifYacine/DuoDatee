import { describe, it, expect } from "vitest";
import { cn } from "../../lib/utils";

describe("cn - Class Name Utility", () => {
  it("should merge two class strings", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle multiple class strings", () => {
    const result = cn("bg-red-500", "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("should handle conditional classes (falsy values)", () => {
    const isActive = false;
    const result = cn("bg-red-500", isActive && "text-white");
    expect(result).toBe("bg-red-500");
  });

  it("should handle conditional classes (truthy values)", () => {
    const isActive = true;
    const result = cn("bg-red-500", isActive && "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle null and undefined", () => {
    const result = cn("bg-red-500", null, undefined, "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle empty strings", () => {
    const result = cn("", "bg-red-500", "", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle arrays of classes", () => {
    const classes = ["bg-red-500", "text-white"];
    const result = cn(...classes);
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle mixed inputs", () => {
    const isLarge = true;
    const result = cn("bg-red-500", isLarge && "text-xl", "text-white");
    expect(result).toBe("bg-red-500 text-xl text-white");
  });

  it("should return empty string for no inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle numbers (converted to string)", () => {
    const result = cn("p-", 4);
    expect(result).toBe("p-4");
  });
});
