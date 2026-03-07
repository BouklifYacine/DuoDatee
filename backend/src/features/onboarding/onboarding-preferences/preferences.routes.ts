import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "../../../middleware/AuthMiddleware";
import type { AuthVariables } from "../../../middleware/AuthMiddleware";
import { updatePreferencesSchema } from "./preferences.schema";
import { PreferencesService } from "./preferences.services";

const preferencesRoutes = new Hono<{ Variables: AuthVariables }>();

preferencesRoutes.patch("/", requireAuth, async (c) => {
  const body = await c.req.json();
  const parseResult = updatePreferencesSchema.safeParse(body);

  if (!parseResult.success) {
    throw new HTTPException(400, {
      message: "Données invalides",
      cause: parseResult.error.flatten(),
    });
  }

  const user = c.get("user")!;
  const updated = await PreferencesService.update(user.id, parseResult.data);
  return c.json(updated, 200);
});

export default preferencesRoutes;
