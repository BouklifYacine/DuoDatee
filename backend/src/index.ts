import "dotenv/config";
import { Hono } from "hono";
import { auth } from "../lib/auth";
import { cors } from "hono/cors";
import {
  authMiddleware,
  type AuthVariables,
} from "./middleware/AuthMiddleware";
import onboardingUserRoutes from "./features/onboarding/onboardinguser/user.routes";

const app = new Hono<{ Variables: AuthVariables }>();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "http://10.0.2.2:3000",
  "http://192.168.1.12:3000",
  process.env.BETTER_AUTH_URL,
  "frontend://",
].filter(Boolean) as string[];

app.use(
  "/api/auth/*",
  cors({
    origin: (origin) => {
      if (!origin) return allowedOrigins[0];
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("exp://") ||
        origin.startsWith("frontend://")
      ) {
        return origin;
      }
      return allowedOrigins[0];
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("/api/*", authMiddleware);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  try {
    return await auth.handler(c.req.raw);
  } catch (error) {
    console.error("[auth] unhandled exception", {
      method: c.req.method,
      path: c.req.path,
      error: error instanceof Error ? error.message : String(error),
    });
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.route("/api/onboarding", onboardingUserRoutes);

export default app;
