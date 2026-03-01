import { router } from "./index";
import { userRouter } from "./routes/user";
import { coupleRouter } from "./routes/couple";

export const appRouter = router({
  user: userRouter,
  couple: coupleRouter,
});

export type AppRouter = typeof appRouter;
