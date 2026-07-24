"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Target, AlertTriangle, CheckCircle, Zap, FileText } from "lucide-react"
import type { ResumeData } from "../../types"

interface AnalysisPanelProps {
    resumeData: ResumeData
}

export default function AnalysisPanel({ resumeData }: AnalysisPanelProps) {
    const [activeAnalysis, setActiveAnalysis] = useState("ats")

    // ATS Analysis
    const getATSAnalysis = () => {
        const issues = []
        const warnings = []
        const passed = []

        // Check for ATS-friendly elements
        if (resumeData.personalInfo.email) {
            passed.push("Contact information is clearly provided")
        } else {
            issues.push("Missing email address")
        }

        if (resumeData.personalInfo.phone) {
            passed.push("Phone number is included")
        } else {
            warnings.push("Phone number not provided")
        }

        // Check experience descriptions
        const hasQuantifiedAchievements = resumeData.experience.some(
            (exp) => exp.description && /\d+/.test(exp.description),
        )
        if (hasQuantifiedAchievements) {
            passed.push("Contains quantified achievements")
        } else {
            warnings.push("Add numbers and metrics to demonstrate impact")
        }

        // Check skills section
        const totalSkills = resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0)
        if (totalSkills >= 5) {
            passed.push("Good variety of skills listed")
        } else {
            warnings.push("Consider adding more relevant skills")
        }

        // Check for keywords
        const hasRelevantKeywords = resumeData.experience.some(
            (exp) =>
                (exp.description && exp.description.toLowerCase().includes("manage")) ||
                (exp.description && exp.description.toLowerCase().includes("develop")) ||
                (exp.description && exp.description.toLowerCase().includes("lead")),
        )
        if (hasRelevantKeywords) {
            passed.push("Contains industry-relevant keywords")
        } else {
            warnings.push("Add more industry-specific keywords")
        }

        const score = Math.round((passed.length / (passed.length + warnings.length + issues.length)) * 100)

        return { score, issues, warnings, passed }
    }

    // Readability Analysis
    const getReadabilityAnalysis = () => {
        const analysis = {
            avgWordsPerBullet: 0,
            totalBullets: 0,
            longSentences: 0,
            readabilityScore: 0,
        }

        let totalWords = 0
        let bulletCount = 0

        resumeData.experience.forEach((exp) => {
            if (exp.description) {
                const bullets = exp.description.split("\n").filter((line) => line.trim())
                bulletCount += bullets.length

                bullets.forEach((bullet) => {
                    const words = bullet.split(" ").length
                    totalWords += words
                    if (words > 20) analysis.longSentences++
                })
            }
        })

        analysis.totalBullets = bulletCount
        analysis.avgWordsPerBullet = bulletCount > 0 ? Math.round(totalWords / bulletCount) : 0

        // Calculate readability score (simplified)
        let score = 100
        if (analysis.avgWordsPerBullet > 15) score -= 20
        if (analysis.longSentences > 3) score -= 30
        if (analysis.totalBullets < 5) score -= 25

        analysis.readabilityScore = Math.max(0, score)

        return analysis
    }

    // Keyword Analysis
    const getKeywordAnalysis = () => {
        const commonKeywords = [
            "leadership",
            "management",
            "development",
            "strategy",
            "analysis",
            "project",
            "team",
            "communication",
            "problem-solving",
            "innovation",
            "results",
            "growth",
            "efficiency",
            "collaboration",
            "technical",
        ]

        const foundKeywords: string[] = []
        const missingKeywords: string[] = []

        const allText = [
            resumeData.personalInfo.summary,
            ...resumeData.experience.map((exp) => exp.description),
            ...resumeData.skills.flatMap((cat) => cat.items.map((item) => item.name)),
        ]
            .join(" ")
            .toLowerCase()

        commonKeywords.forEach((keyword) => {
            if (allText.includes(keyword)) {
                foundKeywords.push(keyword)
            } else {
                missingKeywords.push(keyword)
            }
        })

        return {
            foundKeywords,
            missingKeywords,
            coverage: Math.round((foundKeywords.length / commonKeywords.length) * 100),
        }
    }

    const atsAnalysis = getATSAnalysis()
    const readabilityAnalysis = getReadabilityAnalysis()
    const keywordAnalysis = getKeywordAnalysis()

    const analysisTypes = [
        { id: "ats", label: "ATS Compatibility", icon: Target },
        { id: "readability", label: "Readability", icon: Eye },
        { id: "keywords", label: "Keywords", icon: Zap },
        { id: "structure", label: "Structure", icon: FileText },
    ]

    const renderATSAnalysis = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        ATS Compatibility Score
                    </CardTitle>
                    <CardDescription>How well your resume will perform with Applicant Tracking Systems</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold text-blue-600">{atsAnalysis.score}%</div>
                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all duration-300 ${atsAnalysis.score >= 80 ? "bg-green-500" : atsAnalysis.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                                        }`}
                                    style={{ width: `${atsAnalysis.score}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {atsAnalysis.passed.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Passed ({atsAnalysis.passed.length})
                                </h3>
                                <ul className="space-y-1">
                                    {atsAnalysis.passed.map((item, index) => (
                                        <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                                            <div className="w-1 h-1 bg-green-600 rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {atsAnalysis.warnings.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Warnings ({atsAnalysis.warnings.length})
                                </h3>
                                <ul className="space-y-1">
                                    {atsAnalysis.warnings.map((item, index) => (
                                        <li key={index} className="text-sm text-yellow-600 flex items-start gap-2">
                                            <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {atsAnalysis.issues.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Issues ({atsAnalysis.issues.length})
                                </h3>
                                <ul className="space-y-1">
                                    {atsAnalysis.issues.map((item, index) => (
                                        <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                                            <div className="w-1 h-1 bg-red-600 rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderReadabilityAnalysis = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Readability Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{readabilityAnalysis.readabilityScore}%</div>
                        <p className="text-sm text-gray-600">
                            {readabilityAnalysis.readabilityScore >= 80
                                ? "Excellent readability"
                                : readabilityAnalysis.readabilityScore >= 60
                                    ? "Good readability"
                                    : "Needs improvement"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Avg Words/Bullet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600 mb-2">{readabilityAnalysis.avgWordsPerBullet}</div>
                        <p className="text-sm text-gray-600">
                            {readabilityAnalysis.avgWordsPerBullet <= 15 ? "Good length" : "Too long"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Long Sentences</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600 mb-2">{readabilityAnalysis.longSentences}</div>
                        <p className="text-sm text-gray-600">
                            {readabilityAnalysis.longSentences <= 2 ? "Good" : "Consider shortening"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Readability Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                            <div>
                                <h3 className="font-medium">Keep bullet points concise</h3>
                                <p className="text-sm text-gray-600">Aim for 10-15 words per bullet point for maximum impact</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                            <div>
                                <h3 className="font-medium">Use active voice</h3>
                                <p className="text-sm text-gray-600">
                                    Start with action verbs to make your achievements more compelling
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                            <div>
                                <h3 className="font-medium">Avoid jargon</h3>
                                <p className="text-sm text-gray-600">Use clear, professional language that anyone can understand</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderKeywordAnalysis = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Keyword Coverage
                    </CardTitle>
                    <CardDescription>Analysis of important keywords in your resume</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold text-yellow-600">{keywordAnalysis.coverage}%</div>
                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${keywordAnalysis.coverage}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {keywordAnalysis.foundKeywords.length} of{" "}
                                {keywordAnalysis.foundKeywords.length + keywordAnalysis.missingKeywords.length} common keywords found
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-green-600 mb-3">Found Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {keywordAnalysis.foundKeywords.map((keyword, index) => (
                                    <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600 mb-3">Consider Adding</h3>
                            <div className="flex flex-wrap gap-2">
                                {keywordAnalysis.missingKeywords.slice(0, 10).map((keyword, index) => (
                                    <Badge key={index} variant="outline" className="text-gray-600">
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderStructureAnalysis = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Section Completeness</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Personal Information</span>
                                <Badge
                                    variant={
                                        resumeData.personalInfo.firstName && resumeData.personalInfo.email ? "default" : "destructive"
                                    }
                                >
                                    {resumeData.personalInfo.firstName && resumeData.personalInfo.email ? "Complete" : "Incomplete"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Work Experience</span>
                                <Badge variant={resumeData.experience.length > 0 ? "default" : "destructive"}>
                                    {resumeData.experience.length > 0 ? "Complete" : "Missing"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Education</span>
                                <Badge variant={resumeData.education.length > 0 ? "default" : "secondary"}>
                                    {resumeData.education.length > 0 ? "Complete" : "Optional"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Skills</span>
                                <Badge variant={resumeData.skills.length > 0 ? "default" : "destructive"}>
                                    {resumeData.skills.length > 0 ? "Complete" : "Missing"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Content Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Total Experience Entries</span>
                                <span className="font-semibold">{resumeData.experience.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Total Skills</span>
                                <span className="font-semibold">
                                    {resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Education Entries</span>
                                <span className="font-semibold">{resumeData.education.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">References</span>
                                <span className="font-semibold">{resumeData.references.length}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Structure Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">Optimal Resume Structure</h3>
                            <ol className="text-sm text-blue-700 space-y-1">
                                <li>1. Contact Information & Professional Title</li>
                                <li>2. Professional Summary (2-3 sentences)</li>
                                <li>3. Work Experience (reverse chronological)</li>
                                <li>4. Education</li>
                                <li>5. Skills</li>
                                <li>6. Additional Sections (certifications, projects, etc.)</li>
                            </ol>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderAnalysisContent = () => {
        switch (activeAnalysis) {
            case "ats":
                return renderATSAnalysis()
            case "readability":
                return renderReadabilityAnalysis()
            case "keywords":
                return renderKeywordAnalysis()
            case "structure":
                return renderStructureAnalysis()
            default:
                return renderATSAnalysis()
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
                    <p className="text-gray-600">
                        Comprehensive analysis of your resume's performance and optimization opportunities.
                    </p>
                </div>

                {/* Analysis Type Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {analysisTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveAnalysis(type.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeAnalysis === type.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <type.icon className="h-4 w-4" />
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {renderAnalysisContent()}
            </div>
        </div>
    )
}