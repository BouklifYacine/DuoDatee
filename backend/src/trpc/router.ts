import { router } from "./index";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  // preferences: preferencesRouter,
  // couple: coupleRouter,
});

export type AppRouter = typeof appRouter;
