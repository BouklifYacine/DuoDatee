import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "../../../middleware/AuthMiddleware";
import type { AuthVariables } from "../../../middleware/AuthMiddleware";
import { updateCoupleSchema } from "./couple.schema";
import { CoupleService } from "./couple.services";

const coupleRoutes = new Hono<{ Variables: AuthVariables }>();

coupleRoutes.patch("/", requireAuth, async (c) => {
  const body = await c.req.json();
  const parseResult = updateCoupleSchema.safeParse(body);

  if (!parseResult.success) {
    throw new HTTPException(400, {
      message: "Données invalides",
      cause: parseResult.error.flatten(),
    });
  }

  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Non authentifié", code: "UNAUTHORIZED" }, 401);
  }
  const couple = await CoupleService.updateOnboarding(user.id, parseResult.data);
  return c.json(couple, 200);
});

export default coupleRoutes;
