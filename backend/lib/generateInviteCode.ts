import { randomBytes } from "crypto";

export function generateInviteCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  return Array.from(bytes)
    .map((byte) => characters[byte % characters.length])
    .join("");
}