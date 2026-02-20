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

  user: {
    additionalFields: {
      age: {
        type: "number",
        required: false,
        input: true,
      },
      gender: {
        type: "string",
        required: false,
        input: true,
      },
      avatarPlaceholder: {
        type: "string",
        required: false,
        input: true,
      },
      preferredBudget: {
        type: "string",
        required: false,
        defaultValue: "€€",
        input: true,
      },
      preferredDistance: {
        type: "number",
        required: false,
        defaultValue: 5,
        input: true,
      },
    },
  },

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
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
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
    "http://10.0.2.2:3000", // Android emulator
    "http://192.168.1.12:3000", // Téléphone sur même WiFi
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
