import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema"; // your drizzle schema
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL!, "http://localhost:3000"],
    appName: "careerblob",
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            display: "popup",
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [nextCookies()]
});