/**
 * Traduit les messages d'erreur d'authentification (souvent en anglais) en français.
 * Source : messages retournés par Better Auth (result.error.message) et erreurs
 * courantes des libs d'auth. À compléter au fil des tests si de nouveaux messages
 * apparaissent en anglais.
 */
const ERROR_MAP: Record<string, string> = {
  "Invalid email or password": "Email ou mot de passe incorrect",
  "Invalid credentials": "Email ou mot de passe incorrect",
  "Invalid email or password.": "Email ou mot de passe incorrect",
  "User not found": "Utilisateur introuvable",
  "Email not found": "Email introuvable",
  "Invalid password": "Mot de passe incorrect",
  "Email already in use": "Cet email est déjà utilisé",
  "User already exists": "Cet utilisateur existe déjà",
  "Password too short": "Le mot de passe doit contenir au moins 6 caractères",
  "Invalid email": "Email invalide",
  "Email verification required": "Vérification de l'email requise",
  "Account locked": "Compte verrouillé",
  "Too many attempts": "Trop de tentatives, réessayez plus tard",
};

export function translateAuthError(message: string | undefined): string {
  if (!message) return "";
  const trimmed = message.trim();
  return ERROR_MAP[trimmed] ?? trimmed;
}
