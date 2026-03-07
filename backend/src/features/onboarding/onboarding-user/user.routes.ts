import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "../../../middleware/AuthMiddleware";
import type { AuthVariables } from "../../../middleware/AuthMiddleware";
import { updateProfilSchema } from "./user.schema";
import { UserService } from "./user.services";

const userRoutes = new Hono<{ Variables: AuthVariables }>();

userRoutes.patch("/profil", requireAuth, async (c) => {
  const body = await c.req.json();
  const parseResult = updateProfilSchema.safeParse(body);

  if (!parseResult.success) {
    throw new HTTPException(400, {
      message: "Données invalides",
      cause: parseResult.error.flatten(),
    });
  }

  const user = c.get("user")!;
  const updated = await UserService.updateProfil(user.id, parseResult.data);
  return c.json(updated, 200);
});

export default userRoutes;
