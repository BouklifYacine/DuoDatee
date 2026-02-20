/**
 * Traduit les erreurs Better Auth en français.
 * Source : https://www.better-auth.com/docs/reference/errors
 * - Codes d'erreur documentés par Better Auth (priorité)
 * - Messages en anglais en fallback (au cas où le code n'est pas exposé côté client)
 */
const ERROR_CODE_MAP: Record<string, string> = {
  signup_disabled: "Inscription désactivée",
  account_already_linked_to_different_user:
    "Ce compte est déjà lié à un autre utilisateur",
  unable_to_link_account: "Impossible de lier le compte",
  unable_to_get_user_info: "Impossible d'obtenir les informations utilisateur",
  "email_doesn't_match": "L'email ne correspond pas au compte",
  email_not_found: "Email introuvable",
  oauth_provider_not_found: "Fournisseur OAuth introuvable",
  no_callback_url: "URL de callback manquante",
  no_code: "Code d'autorisation manquant",
  state_mismatch: "État de session invalide",
  state_not_found: "État de session introuvable",
  invalid_callback_request: "Requête de callback invalide",
};

const ERROR_MESSAGE_MAP: Record<string, string> = {
  "Invalid email or password": "Email ou mot de passe incorrect",
  "Invalid credentials": "Email ou mot de passe incorrect",
  "User not found": "Utilisateur introuvable",
  "Email not found": "Email introuvable",
  "Invalid password": "Mot de passe incorrect",
  "Email already in use": "Cet email est déjà utilisé",
  "User already exists": "Cet utilisateur existe déjà",
  "Password too short": "Le mot de passe doit contenir au moins 6 caractères",
  "Invalid email": "Email invalide",
  "Email verification required": "Vérification de l'email requise",
};

export function translateAuthError(
  error: { code?: string; message?: string } | string | undefined
): string {
  if (!error) return "";
  if (typeof error === "string") {
    const trimmed = error.trim();
    return ERROR_MESSAGE_MAP[trimmed] ?? ERROR_CODE_MAP[trimmed] ?? trimmed;
  }
  if (error.code && ERROR_CODE_MAP[error.code]) {
    return ERROR_CODE_MAP[error.code];
  }
  if (error.message) {
    const trimmed = error.message.trim();
    return ERROR_MESSAGE_MAP[trimmed] ?? ERROR_CODE_MAP[trimmed] ?? trimmed;
  }
  return "";
}
