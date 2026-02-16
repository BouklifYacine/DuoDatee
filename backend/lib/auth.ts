import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { openAPI } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },

  account: {
    skipStateCookieCheck: true,
  },

  plugins: [openAPI(), expo()],

  trustedOrigins: [
    "frontend://",
    "frontend://**",
    baseURL,
    "http://localhost:3000",
    "http://localhost:8081",
    ...(!isProduction
      ? [
          "exp://",
          "exp://**",
          "exp://192.168.*.*:*/**",
          "https://*.ngrok-free.dev",
        ]
      : []),
  ],
});
