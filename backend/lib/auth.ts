import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { openAPI } from "better-auth/plugins"
import { expo } from "@better-auth/expo";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        minPasswordLength: 6,
    },

    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            partitioned: true // New browser standards will mandate this for foreign cookies
        },
        crossSubDomainCookies: {
            enabled: true
        }
    },
    plugins: [openAPI(), expo()],
    trustedOrigins: [
        "myapp://",
        "frontend://",
        "http://localhost:3000",
        "http://localhost:8081",

        // Non-production mode - Expo's exp:// scheme with local IP ranges
        ...(!isProduction ? [
            "exp://",                      // Trust all Expo URLs (prefix matching)
            "exp://**",                    // Trust all Expo URLs (wildcard matching)
            "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
        ] : [])
    ]


});