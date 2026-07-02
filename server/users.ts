"use server";

import { auth } from "@/app/(auth)/lib/auth"

type signUpData = {
    email: string;
    password: string;
    name: string;
}

type AuthResponse = {
    success: boolean;
    message: string;
    error?: string;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        if (!email || !password) {
            return {
                success: false,
                message: "Email and password are required",
                error: "MISSING_CREDENTIALS"
            };
        }

        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        });

        return {
            success: true,
            message: "Signed in successfully"
        };
    } catch (error) {
        console.error("Sign-in error:", error);

        if (error instanceof Error) {
            return {
                success: false,
                message: "Sign-in failed",
                error: error.message
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred during sign-in",
            error: "UNKNOWN_ERROR"
        };
    }
}

export const signUp = async (data: signUpData): Promise<AuthResponse> => {
    try {
        // Validate input data
        if (!data.email || !data.password || !data.name) {
            return {
                success: false,
                message: "Email, password, and name are required",
                error: "MISSING_FIELDS"
            };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return {
                success: false,
                message: "Invalid email format",
                error: "INVALID_EMAIL"
            };
        }

        // Validate password strength
        if (data.password.length < 8) {
            return {
                success: false,
                message: "Password must be at least 8 characters long",
                error: "WEAK_PASSWORD"
            };
        }

        console.log("Creating account for:", data.email);

        await auth.api.signUpEmail({
            body: {
                email: data.email,
                password: data.password,
                name: data.name
            }
        });

        return {
            success: true,
            message: "Account created successfully"
        };
    } catch (error) {
        console.error("Sign-up error:", error);

        // Handle specific error cases
        if (error instanceof Error) {
            const errorMessage = error.message.toLowerCase();

            if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
                return {
                    success: false,
                    message: "An account with this email already exists",
                    error: "EMAIL_EXISTS"
                };
            }

            return {
                success: false,
                message: "Sign-up failed",
                error: error.message
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred during sign-up",
            error: "UNKNOWN_ERROR"
        };
    }
}