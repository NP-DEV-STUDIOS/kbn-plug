import * as z from "zod"

export const signUpSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters").max(64, "Password must be less than 64 characters"),

    confirmPassword: z
        .string()
        .min(8, "Confirm Password must be at least 8 characters")
        .max(64, "Confirm Password must be less than 64 characters"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This ties the error to the confirmPassword field
});
