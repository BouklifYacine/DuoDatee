import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { error: "Le nom est requis" }),
  email: z.email({ error: "Email invalide" }),
  password: z
    .string()
    .min(6, { error: "Le mot de passe doit contenir au moins 6 caracteres" }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
