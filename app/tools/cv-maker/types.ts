/**
 * Personal information section of the resume
 */
export interface PersonalInfo {
    /** Full name of the person */
    fullName: string
    /** First name */
    firstName: string
    /** Last name */
    lastName: string
    /** Email address */
    email: string
    /** Phone number */
    phone: string
    /** Physical address */
    address: string
    /** LinkedIn profile URL */
    linkedin: string
    /** Personal website or portfolio URL */
    website: string
    /** Professional summary or bio */
    summary: string
    /** Current professional title */
    professionalTitle: string
    /** Career objectives */
    careerObjectives: string
    /** Profile photo URL */
    photo: string
}

/**
 * Work experience entry
 */
export interface WorkExperience {
    /** Unique identifier for the experience entry */
    id: string
    /** Company name */
    company: string
    /** Job position/title */
    position: string
    /** Start date in YYYY-MM format */
    startDate: string
    /** End date in YYYY-MM format (empty if current position) */
    endDate: string
    /** Whether this is the current position */
    current: boolean
    /** Job description and responsibilities */
    description: string
    /** Location of the job */
    location: string
}

/**
 * Education entry
 */
export interface Education {
    /** Unique identifier for the education entry */
    id: string
    /** Educational institution name */
    institution: string
    /** Degree earned */
    degree: string
    /** Field of study */
    field: string
    /** Start date in YYYY-MM format */
    startDate: string
    /** End date in YYYY-MM format */
    endDate: string
    /** GPA (optional) */
    gpa: string
    /** Location of the institution */
    location: string
}

/**
 * Skill item with proficiency level
 */
export interface SkillItem {
    /** Skill name */
    name: string
    /** Proficiency level (1-5) */
    level: number
}

/**
 * Skills category containing multiple skill items
 */
export interface SkillsCategory {
    /** Unique identifier for the category */
    id: string
    /** Category name (e.g., "Technical Skills", "Soft Skills") */
    category: string
    /** Array of skills in this category */
    items: SkillItem[]
}

/**
 * Reference entry
 */
export interface Reference {
    /** Unique identifier for the reference */
    id: string
    /** Reference person's full name */
    name: string
    /** Reference person's job title */
    title: string
    /** Reference person's company */
    company: string
    /** Reference person's email */
    email: string
    /** Reference person's phone number */
    phone: string
    /** Relationship to the reference person */
    relationship: string
}

/**
 * Complete resume data structure
 */
export interface ResumeData {
    /** Personal information section */
    personalInfo: PersonalInfo
    /** Array of work experience entries */
    experience: WorkExperience[]
    /** Array of education entries */
    education: Education[]
    /** Array of skills categories */
    skills: SkillsCategory[]
    /** Array of references */
    references: Reference[]
}

/**
 * Template configuration interface for CV templates
 * Each template should implement this interface to ensure consistency
 */
export interface TemplateConfig {
    /** Unique identifier for the template */
    id: string
    /** Display name of the template */
    name: string
    /** Description of the template */
    description: string
    /** Preview image URL */
    preview: string
    /** Color scheme configuration */
    colors: {
        /** Primary color for headings and accents */
        primary: string
        /** Secondary accent color */
        accent: string
        /** Main text color */
        text: string
        /** Background color */
        background: string
    }
    /** Font configuration */
    fonts: {
        /** Font for headings */
        heading: string
        /** Font for body text */
        body: string
    }
}

/**
 * Form field configuration for dynamic form generation
 */
export interface FormField {
    /** Field name/key */
    name: keyof PersonalInfo
    /** Display label */
    label: string
    /** Input type */
    type: 'text' | 'email' | 'tel' | 'url' | 'textarea'
    /** Placeholder text */
    placeholder: string
    /** Whether the field is required */
    required?: boolean
    /** Grid column span for responsive layout */
    gridSpan?: string
}