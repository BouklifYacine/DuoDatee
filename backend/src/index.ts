import { Hono } from 'hono'
import { auth } from '../lib/auth';
import { cors } from 'hono/cors';

const app = new Hono()

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("/api/auth/*", async (c, next) => {
  const startedAt = Date.now();
  console.log("[auth-route] request:start", {
    method: c.req.method,
    path: c.req.path,
    origin: c.req.header("origin") ?? null,
    userAgent: c.req.header("user-agent") ?? null,
  });

  await next();

  console.log("[auth-route] request:end", {
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: Date.now() - startedAt,
  });
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  try {
    return await auth.handler(c.req.raw);
  } catch (error) {
    console.error("[auth-route] request:exception", {
      method: c.req.method,
      path: c.req.path,
      error: error instanceof Error ? error.message : String(error),
    });
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default app
