import type { ResumeData } from "../types";

/**
 * Calculate resume completion progress as a percentage
 * Based on filled required fields and sections
 */
export function calculateProgress(data: ResumeData): number {
    let totalFields = 0
    let filledFields = 0

    // Personal Info (weight: 40%)
    const personalInfoFields = [
        data.personalInfo.firstName,
        data.personalInfo.lastName,
        data.personalInfo.email,
        data.personalInfo.professionalTitle,
        data.personalInfo.summary,
    ]

    totalFields += personalInfoFields.length * 8 // Higher weight for personal info
    filledFields += personalInfoFields.filter((field) => field && field.trim()).length * 8

    // Experience (weight: 30%)
    totalFields += 6 // Expect at least 1-2 experiences
    filledFields += Math.min(data.experience.length * 3, 6)

    // Education (weight: 15%)
    totalFields += 3 // Expect at least 1 education
    filledFields += Math.min(data.education.length * 3, 3)

    // Skills (weight: 10%)
    totalFields += 2 // Expect at least 1 skill category
    const skillCount = data.skills.reduce((acc, category) => acc + category.items.length, 0)
    filledFields += Math.min(skillCount, 2)

    // References (weight: 5%)
    totalFields += 1 // References are optional but add value
    filledFields += Math.min(data.references.length, 1)

    const progress = Math.round((filledFields / totalFields) * 100)
    return Math.min(progress, 100) // Cap at 100%
}
