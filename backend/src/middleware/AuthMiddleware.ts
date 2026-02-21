import type { Context, Next } from "hono";
import { auth } from "../../lib/auth";

// Types inférés depuis Better Auth
export type AuthUser = typeof auth.$Infer.Session.user;
export type AuthSession = typeof auth.$Infer.Session.session;

export type AuthVariables = {
  user: AuthUser | null;
  session: AuthSession | null;
};

/**
 * Middleware : injecte user et session dans le contexte pour toutes les requêtes.
 * Si pas de session valide → user = null, session = null
 */
export async function authMiddleware(c: Context<{ Variables: AuthVariables }>, next: Next) {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
}

/**
 * Middleware de protection : exige une session valide.
 * Si non connecté → 401 Unauthorized
 */
export async function requireAuth(c: Context<{ Variables: AuthVariables }>, next: Next) {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Non authentifié", code: "UNAUTHORIZED" }, 401);
  }
  await next();
}
