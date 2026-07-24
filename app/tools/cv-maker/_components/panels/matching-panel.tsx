"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Target,
    Search,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Plus,
    X,
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
} from "lucide-react"
import { ResumeData } from "../../types";

interface MatchingPanelProps {
    resumeData: ResumeData
}

interface JobPosting {
    id: string
    title: string
    company: string
    location: string
    salary?: string
    description: string
    requirements: string[]
    posted: string
}

export default function MatchingPanel({ resumeData }: MatchingPanelProps) {
    const [activeTab, setActiveTab] = useState("analyzer")
    const [jobDescription, setJobDescription] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [savedJobs, setSavedJobs] = useState<JobPosting[]>([
        {
            id: "1",
            title: "Senior Software Engineer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            salary: "$120k - $160k",
            description: "We are looking for a Senior Software Engineer to join our team...",
            requirements: ["JavaScript", "React", "Node.js", "5+ years experience", "Team leadership"],
            posted: "2 days ago",
        },
        {
            id: "2",
            title: "Product Manager",
            company: "StartupXYZ",
            location: "Remote",
            salary: "$100k - $140k",
            description: "Seeking an experienced Product Manager to drive product strategy...",
            requirements: ["Product management", "Agile", "Data analysis", "3+ years experience"],
            posted: "1 week ago",
        },
    ])

    // Analyze job match
    const analyzeJobMatch = (jobRequirements: string[], jobDescription: string) => {
        const userSkills = resumeData.skills.flatMap((cat) => cat.items.map((item) => item.name.toLowerCase()))
        const userExperience = resumeData.experience.map((exp) => exp.description?.toLowerCase() || "").join(" ")
        const userSummary = resumeData.personalInfo.summary?.toLowerCase() || ""
        const allUserContent = [userSummary, userExperience].join(" ")

        const matchedRequirements: string[] = []
        const missingRequirements: string[] = []
        const partialMatches: string[] = []

        jobRequirements.forEach((req) => {
            const reqLower = req.toLowerCase()
            const skillMatch = userSkills.some((skill) => skill.includes(reqLower) || reqLower.includes(skill))
            const contentMatch = allUserContent.includes(reqLower)

            if (skillMatch || contentMatch) {
                matchedRequirements.push(req)
            } else {
                // Check for partial matches
                const words = reqLower.split(" ")
                const hasPartialMatch = words.some(
                    (word) =>
                        word.length > 3 && (userSkills.some((skill) => skill.includes(word)) || allUserContent.includes(word)),
                )

                if (hasPartialMatch) {
                    partialMatches.push(req)
                } else {
                    missingRequirements.push(req)
                }
            }
        })

        const matchScore = Math.round((matchedRequirements.length / jobRequirements.length) * 100)

        return {
            matchScore,
            matchedRequirements,
            missingRequirements,
            partialMatches,
        }
    }

    // Extract keywords from job description
    const extractKeywords = (text: string) => {
        const commonWords = [
            "the",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
            "is",
            "are",
            "was",
            "were",
            "be",
            "been",
            "have",
            "has",
            "had",
            "do",
            "does",
            "did",
            "will",
            "would",
            "could",
            "should",
            "may",
            "might",
            "must",
            "can",
            "shall",
            "a",
            "an",
            "this",
            "that",
            "these",
            "those",
        ]

        const words = text
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .split(/\s+/)
            .filter((word) => word.length > 2 && !commonWords.includes(word))

        const wordCount: Record<string, number> = {}
        words.forEach((word) => {
            wordCount[word] = (wordCount[word] || 0) + 1
        })

        return Object.entries(wordCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20)
            .map(([word]) => word)
    }

    const tabs = [
        { id: "analyzer", label: "Job Analyzer", icon: Target },
        { id: "saved", label: "Saved Jobs", icon: Briefcase },
        { id: "suggestions", label: "Improvements", icon: TrendingUp },
    ]

    const renderJobAnalyzer = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Job Description Analyzer
                    </CardTitle>
                    <CardDescription>
                        Paste a job description to see how well your resume matches the requirements
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Job URL (optional)</label>
                        <Input
                            placeholder="https://company.com/jobs/position"
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Job Description</label>
                        <Textarea
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="min-h-50"
                        />
                    </div>

                    <Button
                        onClick={() => {
                            if (jobDescription.trim()) {
                                const keywords = extractKeywords(jobDescription)
                                // You could save this analysis or display it
                            }
                        }}
                        disabled={!jobDescription.trim()}
                        className="w-full"
                    >
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Match
                    </Button>
                </CardContent>
            </Card>

            {jobDescription && (
                <Card>
                    <CardHeader>
                        <CardTitle>Match Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            const keywords = extractKeywords(jobDescription)
                            const analysis = analyzeJobMatch(keywords, jobDescription)

                            return (
                                <div className="space-y-6">
                                    {/* Match Score */}
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">{analysis.matchScore}%</div>
                                        <p className="text-gray-600">Overall Match Score</p>
                                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-300 ${analysis.matchScore >= 80
                                                    ? "bg-green-500"
                                                    : analysis.matchScore >= 60
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                    }`}
                                                style={{ width: `${analysis.matchScore}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Detailed Breakdown */}
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" />
                                                Matched ({analysis.matchedRequirements.length})
                                            </h3>
                                            <div className="space-y-2">
                                                {analysis.matchedRequirements.map((req, index) => (
                                                    <Badge key={index} variant="default" className="bg-green-100 text-green-800 mr-2 mb-2">
                                                        {req}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4" />
                                                Partial ({analysis.partialMatches.length})
                                            </h3>
                                            <div className="space-y-2">
                                                {analysis.partialMatches.map((req, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 mr-2 mb-2">
                                                        {req}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                Missing ({analysis.missingRequirements.length})
                                            </h3>
                                            <div className="space-y-2">
                                                {analysis.missingRequirements.map((req, index) => (
                                                    <Badge key={index} variant="outline" className="text-red-600 border-red-300 mr-2 mb-2">
                                                        {req}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recommendations */}
                                    {analysis.missingRequirements.length > 0 && (
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h3 className="font-semibold text-blue-800 mb-2">Recommendations to Improve Match</h3>
                                            <ul className="text-sm text-blue-700 space-y-1">
                                                {analysis.missingRequirements.slice(0, 3).map((req, index) => (
                                                    <li key={index}>• Consider adding "{req}" to your skills or experience descriptions</li>
                                                ))}
                                                {analysis.missingRequirements.length > 3 && (
                                                    <li>• And {analysis.missingRequirements.length - 3} more requirements...</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )
                        })()}
                    </CardContent>
                </Card>
            )}
        </div>
    )

    const renderSavedJobs = () => (
        <div className="space-y-4">
            {savedJobs.map((job) => {
                const analysis = analyzeJobMatch(job.requirements, job.description)

                return (
                    <Card key={job.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{job.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-4 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-3 w-3" />
                                            {job.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {job.location}
                                        </span>
                                        {job.salary && (
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="h-3 w-3" />
                                                {job.salary}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {job.posted}
                                        </span>
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">{analysis.matchScore}%</div>
                                    <p className="text-xs text-gray-500">Match</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                                <div>
                                    <h4 className="font-medium mb-2">Requirements Match</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requirements.map((req, index) => {
                                            const isMatched = analysis.matchedRequirements.includes(req)
                                            const isPartial = analysis.partialMatches.includes(req)

                                            return (
                                                <Badge
                                                    key={index}
                                                    variant={isMatched ? "default" : isPartial ? "secondary" : "outline"}
                                                    className={
                                                        isMatched
                                                            ? "bg-green-100 text-green-800"
                                                            : isPartial
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "text-red-600 border-red-300"
                                                    }
                                                >
                                                    {req}
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                        View Details
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Optimize Resume
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-red-600">
                                        <X className="h-3 w-3 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}

            <Card className="border-dashed">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <h3 className="font-medium text-gray-900 mb-1">Add New Job</h3>
                        <p className="text-sm text-gray-600 mb-4">Save job postings to track your application progress</p>
                        <Button variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Job Posting
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderSuggestions = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Resume Optimization Suggestions
                    </CardTitle>
                    <CardDescription>Based on current job market trends and your profile</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Add In-Demand Skills</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                These skills are frequently mentioned in job postings for your field:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Cloud Computing", "Data Analysis", "Agile Methodology", "API Development", "DevOps"].map(
                                    (skill, index) => (
                                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50">
                                            <Plus className="h-3 w-3 mr-1" />
                                            {skill}
                                        </Badge>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Improve Experience Descriptions</h3>
                            <p className="text-sm text-gray-600 mb-3">Add these elements to make your experience more compelling:</p>
                            <ul className="text-sm space-y-1">
                                <li>• Quantify your achievements with specific numbers and percentages</li>
                                <li>• Include relevant technologies and tools you used</li>
                                <li>• Highlight leadership and collaboration experiences</li>
                                <li>• Mention any cost savings or revenue generation</li>
                            </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Industry Certifications</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Consider pursuing these certifications to strengthen your profile:
                            </p>
                            <div className="space-y-2">
                                {[
                                    { name: "AWS Certified Solutions Architect", priority: "High" },
                                    { name: "PMP (Project Management Professional)", priority: "Medium" },
                                    { name: "Certified Scrum Master", priority: "Medium" },
                                ].map((cert, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{cert.name}</span>
                                        <Badge variant={cert.priority === "High" ? "default" : "secondary"}>{cert.priority} Priority</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case "analyzer":
                return renderJobAnalyzer()
            case "saved":
                return renderSavedJobs()
            case "suggestions":
                return renderSuggestions()
            default:
                return renderJobAnalyzer()
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Matching</h1>
                    <p className="text-gray-600">
                        Analyze how well your resume matches specific job requirements and get personalized recommendations.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {renderTabContent()}
            </div>
        </div>
    )
}