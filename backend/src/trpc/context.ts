import { auth } from "../../lib/auth";
import type { AuthVariables } from "../middleware/AuthMiddleware";

export type Context = {
  user: AuthVariables["user"];
  session: AuthVariables["session"];
};

export const createContext = async (headers: Headers): Promise<Context> => {
  const session = await auth.api.getSession({ headers });

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
  };
};
