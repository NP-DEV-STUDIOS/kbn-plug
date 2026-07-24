"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, AlertCircle, TrendingUp, FileText, Star, Target, Zap } from "lucide-react"
import { ResumeData } from "../../types";

interface GuidancePanelProps {
    resumeData: ResumeData
    onUpdateData: (data: ResumeData) => void
}

export default function GuidancePanel({ resumeData, onUpdateData }: GuidancePanelProps) {
    const [activeCategory, setActiveCategory] = useState("overview")

    // Analyze resume completeness
    const getCompletionAnalysis = () => {
        const analysis = {
            personalInfo: {
                score: 0,
                issues: [] as string[],
                suggestions: [] as string[],
            },
            experience: {
                score: 0,
                issues: [] as string[],
                suggestions: [] as string[],
            },
            education: {
                score: 0,
                issues: [] as string[],
                suggestions: [] as string[],
            },
            skills: {
                score: 0,
                issues: [] as string[],
                suggestions: [] as string[],
            },
        }

        // Personal Info Analysis
        let personalScore = 0
        if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName) personalScore += 20
        if (resumeData.personalInfo.email) personalScore += 20
        if (resumeData.personalInfo.phone) personalScore += 15
        if (resumeData.personalInfo.professionalTitle) personalScore += 20
        if (resumeData.personalInfo.summary) personalScore += 25

        analysis.personalInfo.score = personalScore

        if (!resumeData.personalInfo.summary) {
            analysis.personalInfo.issues.push("Missing professional summary")
            analysis.personalInfo.suggestions.push("Add a compelling 2-3 sentence summary highlighting your key strengths")
        }
        if (!resumeData.personalInfo.professionalTitle) {
            analysis.personalInfo.issues.push("Missing professional title")
            analysis.personalInfo.suggestions.push("Add your current or target job title")
        }

        // Experience Analysis
        let expScore = 0
        if (resumeData.experience.length > 0) expScore += 40
        if (resumeData.experience.length >= 2) expScore += 30
        if (resumeData.experience.some((exp) => exp.description && exp.description.length > 50)) expScore += 30

        analysis.experience.score = expScore

        if (resumeData.experience.length === 0) {
            analysis.experience.issues.push("No work experience added")
            analysis.experience.suggestions.push("Add at least one work experience entry")
        }
        if (resumeData.experience.some((exp) => !exp.description || exp.description.length < 50)) {
            analysis.experience.suggestions.push("Add detailed descriptions with quantifiable achievements")
        }

        // Education Analysis
        let eduScore = resumeData.education.length > 0 ? 80 : 0
        if (resumeData.education.some((edu) => edu.gpa && Number.parseFloat(edu.gpa) >= 3.5)) eduScore += 20

        analysis.education.score = eduScore

        if (resumeData.education.length === 0) {
            analysis.education.issues.push("No education information")
            analysis.education.suggestions.push("Add your educational background")
        }

        // Skills Analysis
        let skillsScore = 0
        const totalSkills = resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0)
        if (totalSkills > 0) skillsScore += 30
        if (totalSkills >= 5) skillsScore += 30
        if (totalSkills >= 10) skillsScore += 40

        analysis.skills.score = skillsScore

        if (totalSkills === 0) {
            analysis.skills.issues.push("No skills listed")
            analysis.skills.suggestions.push("Add relevant technical and soft skills")
        }
        if (totalSkills < 5) {
            analysis.skills.suggestions.push("Add more skills to showcase your expertise")
        }

        return analysis
    }

    const analysis = getCompletionAnalysis()
    const overallScore = Math.round(
        (analysis.personalInfo.score + analysis.experience.score + analysis.education.score + analysis.skills.score) / 4,
    )

    const categories = [
        { id: "overview", label: "Overview", icon: Target },
        { id: "content", label: "Content Tips", icon: FileText },
        { id: "formatting", label: "Formatting", icon: Star },
        { id: "industry", label: "Industry Specific", icon: TrendingUp },
    ]

    const contentTips = [
        {
            title: "Use Action Verbs",
            description: "Start bullet points with strong action verbs like 'Led', 'Developed', 'Implemented', 'Achieved'",
            example: "Led a team of 5 developers to deliver project 2 weeks ahead of schedule",
        },
        {
            title: "Quantify Achievements",
            description: "Include numbers, percentages, and metrics to demonstrate impact",
            example: "Increased sales by 25% through implementation of new CRM system",
        },
        {
            title: "Tailor to Job Description",
            description: "Customize your resume for each application by matching keywords from the job posting",
            example: "If job requires 'project management', ensure this phrase appears in your experience",
        },
        {
            title: "Show Progression",
            description: "Demonstrate career growth and increasing responsibilities",
            example: "Promoted from Junior Developer to Senior Developer within 18 months",
        },
    ]

    const formattingTips = [
        {
            title: "Consistent Formatting",
            description: "Use consistent fonts, spacing, and bullet points throughout",
            priority: "high",
        },
        {
            title: "ATS-Friendly Design",
            description: "Avoid complex graphics, tables, and unusual fonts that ATS systems can't read",
            priority: "high",
        },
        {
            title: "Optimal Length",
            description: "Keep to 1-2 pages maximum. One page for early career, two for experienced professionals",
            priority: "medium",
        },
        {
            title: "White Space",
            description: "Use adequate white space to make your resume easy to scan",
            priority: "medium",
        },
    ]

    const renderOverview = () => (
        <div className="space-y-6 overflow-hidden overflow-y-auto">
            {/* Overall Score */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Resume Score
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-blue-600">{overallScore}%</div>
                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${overallScore}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {overallScore >= 80
                                    ? "Excellent! Your resume is well-optimized."
                                    : overallScore >= 60
                                        ? "Good progress! A few improvements will make it great."
                                        : "Needs improvement. Follow the suggestions below."}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Section Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(analysis).map(([section, data]) => (
                    <Card key={section}>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base capitalize flex items-center justify-between">
                                {section.replace(/([A-Z])/g, " $1").trim()}
                                <Badge variant={data.score >= 80 ? "default" : data.score >= 60 ? "secondary" : "destructive"}>
                                    {data.score}%
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.issues.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-sm font-medium text-red-600 mb-1">Issues:</h4>
                                    <ul className="text-sm text-red-600 space-y-1">
                                        {data.issues.map((issue, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                                                {issue}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {data.suggestions.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-blue-600 mb-1">Suggestions:</h4>
                                    <ul className="text-sm text-blue-600 space-y-1">
                                        {data.suggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Lightbulb className="h-3 w-3 mt-0.5 shrink-0" />
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )

    const renderContent = () => (
        <div className="space-y-6">
            <div className="grid gap-6">
                {contentTips.map((tip, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                {tip.title}
                            </CardTitle>
                            <CardDescription>{tip.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-1">Example:</p>
                                <p className="text-sm text-gray-600 italic">"{tip.example}"</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )

    const renderFormatting = () => (
        <div className="space-y-4">
            {formattingTips.map((tip, index) => (
                <Card key={index}>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <div
                                className={`w-2 h-2 rounded-full mt-2 ${tip.priority === "high" ? "bg-red-500" : "bg-yellow-500"}`}
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                                <p className="text-sm text-gray-600">{tip.description}</p>
                            </div>
                            <Badge variant={tip.priority === "high" ? "destructive" : "secondary"}>{tip.priority}</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderIndustry = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Industry-Specific Tips</CardTitle>
                    <CardDescription>Customize your resume based on your target industry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-blue-600 mb-2">Technology</h3>
                            <ul className="text-sm space-y-1">
                                <li>• Highlight programming languages and frameworks</li>
                                <li>• Include GitHub/portfolio links</li>
                                <li>• Mention specific technologies used</li>
                                <li>• Show impact through metrics (performance improvements, etc.)</li>
                            </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-green-600 mb-2">Marketing</h3>
                            <ul className="text-sm space-y-1">
                                <li>• Quantify campaign results and ROI</li>
                                <li>• Mention specific tools (Google Analytics, HubSpot)</li>
                                <li>• Highlight creative achievements</li>
                                <li>• Include relevant certifications</li>
                            </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-purple-600 mb-2">Finance</h3>
                            <ul className="text-sm space-y-1">
                                <li>• Emphasize analytical and quantitative skills</li>
                                <li>• Include relevant certifications (CPA, CFA)</li>
                                <li>• Highlight cost savings and revenue impact</li>
                                <li>• Mention financial software proficiency</li>
                            </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-orange-600 mb-2">Healthcare</h3>
                            <ul className="text-sm space-y-1">
                                <li>• List relevant licenses and certifications</li>
                                <li>• Highlight patient care experience</li>
                                <li>• Mention compliance and safety protocols</li>
                                <li>• Include continuing education</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderCategoryContent = () => {
        switch (activeCategory) {
            case "overview":
                return renderOverview()
            case "content":
                return renderContent()
            case "formatting":
                return renderFormatting()
            case "industry":
                return renderIndustry()
            default:
                return renderOverview()
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Guidance</h1>
                    <p className="text-gray-600">
                        Get personalized tips and suggestions to improve your resume and increase your chances of landing
                        interviews.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeCategory === category.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <category.icon className="h-4 w-4" />
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="overflow-auto">
                    {renderCategoryContent()}
                </div>
            </div>
        </div>
    )
}