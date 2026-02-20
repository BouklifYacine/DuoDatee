import type { z } from "zod";

/**
 * Adapte un schéma Zod 4 au format validators TanStack Form.
 * Retourne undefined si valide, sinon un objet { fields } pour les erreurs par champ.
 */
export function createZodValidator<T>(schema: z.ZodType<T>) {
  return (value: unknown): { fields: Record<string, string> } | undefined => {
    const result = schema.safeParse(value);
    if (result.success) return undefined;

    const flat = result.error.flatten();
    const fields: Record<string, string> = {};
    for (const [key, messages] of Object.entries(flat.fieldErrors)) {
      const msg = Array.isArray(messages) ? messages[0] : messages;
      if (typeof msg === "string") fields[key] = msg;
    }
    return { fields };
  };
}
