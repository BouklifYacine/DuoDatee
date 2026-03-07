import { Hono } from "hono";
import { requireAuth } from "../../../middleware/AuthMiddleware";
import type { AuthVariables } from "../../../middleware/AuthMiddleware";
import { StatusService } from "./status.services";

const statusRoutes = new Hono<{ Variables: AuthVariables }>();

statusRoutes.get("/", requireAuth, async (c) => {
  const user = c.get("user")!;

  const status = await StatusService.getOnboardingStatus(user.id);
  return c.json(status, 200);
});

export default statusRoutes;
