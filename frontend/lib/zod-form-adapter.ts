/**
 * Zod v4 form validators for TanStack Form v1
 * Uses safeParse directly — no third-party adapter needed.
 */
import type { z } from "zod";

type FieldErrors<T> = {
  fields?: Partial<Record<keyof T, string | undefined>>;
};

/**
 * Creates a top-level form validator (for validators.onSubmit / validators.onChange)
 * that integrates Zod v4 safeParse with TanStack Form's error format.
 *
 * Returns `undefined` on success, or an object with `fields` on failure.
 */
export function zodFormValidator<T extends z.ZodTypeAny>(schema: T) {
  return ({ value }: { value: z.input<T> }): FieldErrors<z.input<T>> | undefined => {
    const result = schema.safeParse(value);
    if (result.success) return undefined;

    const flat = result.error.flatten();
    const fieldErrors: Partial<Record<string, string | undefined>> = {};
    for (const [key, messages] of Object.entries(flat.fieldErrors)) {
      if (Array.isArray(messages) && messages.length > 0) {
        fieldErrors[key] = messages[0];
      }
    }
    return { fields: fieldErrors as Partial<Record<keyof z.input<T>, string | undefined>> };
  };
}

/**
 * Creates a single-field validator using a Zod v4 schema.
 * Returns the first error message, or undefined if valid.
 */
export function zodFieldValidator<T extends z.ZodTypeAny>(schema: T) {
  return ({ value }: { value: z.input<T> }): string | undefined => {
    const result = schema.safeParse(value);
    if (result.success) return undefined;
    return result.error.issues?.[0]?.message ?? "Valeur invalide";
  };
}
