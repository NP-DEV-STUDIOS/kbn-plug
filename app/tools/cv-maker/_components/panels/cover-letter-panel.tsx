"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FileText, Wand2, Download, Copy, RefreshCw, Lightbulb, Target, User } from "lucide-react"
import { ResumeData } from "../../types";

interface CoverLetterPanelProps {
    resumeData: ResumeData
}

export default function CoverLetterPanel({ resumeData }: CoverLetterPanelProps) {
    const [activeTab, setActiveTab] = useState("generator")
    const [coverLetterData, setCoverLetterData] = useState({
        recipientName: "",
        recipientTitle: "",
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        customContent: "",
        tone: "professional",
        length: "medium",
    })
    const [generatedLetter, setGeneratedLetter] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const tabs = [
        { id: "generator", label: "AI Generator", icon: Wand2 },
        { id: "templates", label: "Templates", icon: FileText },
        { id: "tips", label: "Writing Tips", icon: Lightbulb },
    ]

    const toneOptions = [
        { value: "professional", label: "Professional", description: "Formal and business-appropriate" },
        { value: "enthusiastic", label: "Enthusiastic", description: "Energetic and passionate" },
        { value: "confident", label: "Confident", description: "Assertive and self-assured" },
        { value: "friendly", label: "Friendly", description: "Warm and approachable" },
    ]

    const lengthOptions = [
        { value: "short", label: "Short", description: "2-3 paragraphs, concise" },
        { value: "medium", label: "Medium", description: "3-4 paragraphs, balanced" },
        { value: "long", label: "Long", description: "4-5 paragraphs, detailed" },
    ]

    const coverLetterTemplates = [
        {
            id: "standard",
            name: "Standard Professional",
            description: "Classic format suitable for most industries",
            preview: "Dear [Hiring Manager], I am writing to express my interest in the [Position] role...",
        },
        {
            id: "creative",
            name: "Creative Industry",
            description: "More engaging tone for creative roles",
            preview: "I was thrilled to discover the [Position] opening at [Company]...",
        },
        {
            id: "tech",
            name: "Technology Focused",
            description: "Emphasizes technical skills and innovation",
            preview: "As a passionate technologist with expertise in [Skills]...",
        },
        {
            id: "executive",
            name: "Executive Level",
            description: "Sophisticated tone for senior positions",
            preview: "With [X] years of leadership experience in [Industry]...",
        },
    ]

    const writingTips = [
        {
            category: "Structure",
            tips: [
                "Start with a compelling opening that mentions the specific position",
                "Use the middle paragraphs to highlight relevant experience and achievements",
                "End with a strong call to action and professional closing",
                "Keep it to one page maximum",
            ],
        },
        {
            category: "Content",
            tips: [
                "Research the company and mention specific details about them",
                "Quantify your achievements with numbers and percentages",
                "Show how you can solve their specific problems",
                "Avoid simply repeating what's on your resume",
            ],
        },
        {
            category: "Tone",
            tips: [
                "Match the company's culture and communication style",
                "Be confident but not arrogant",
                "Show enthusiasm for the role and company",
                "Use active voice and strong action verbs",
            ],
        },
        {
            category: "Common Mistakes",
            tips: [
                "Don't use a generic template without customization",
                "Avoid focusing too much on what you want vs. what you offer",
                "Don't repeat your entire resume",
                "Avoid typos and grammatical errors",
            ],
        },
    ]

    const generateCoverLetter = async () => {
        setIsGenerating(true)

        // Simulate AI generation (in a real app, this would call an AI API)
        setTimeout(() => {
            const letter = `Dear ${coverLetterData.recipientName || "Hiring Manager"},

I am writing to express my strong interest in the ${coverLetterData.jobTitle} position at ${coverLetterData.companyName}. With my background in ${resumeData.personalInfo.professionalTitle?.toLowerCase() || "professional experience"} and proven track record of success, I am confident I would be a valuable addition to your team.

In my previous role${resumeData.experience.length > 0 ? ` as ${resumeData.experience[0].position} at ${resumeData.experience[0].company}` : ""}, I ${resumeData.experience.length > 0 ? resumeData.experience[0].description?.split(".")[0]?.toLowerCase() || "contributed significantly to organizational goals" : "developed strong professional skills"}. This experience has equipped me with the skills and knowledge necessary to excel in the ${coverLetterData.jobTitle} role.

${coverLetterData.customContent
                    ? `Additionally, ${coverLetterData.customContent}`
                    : `I am particularly drawn to ${coverLetterData.companyName} because of your commitment to innovation and excellence. I believe my skills in ${resumeData.skills.length > 0
                        ? resumeData.skills[0].items
                            .slice(0, 3)
                            .map((skill) => skill.name)
                            .join(", ")
                        : "various professional areas"
                    } align perfectly with your team's needs.`
                }

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${coverLetterData.companyName}'s continued success. Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
${resumeData.personalInfo.fullName || resumeData.personalInfo.firstName + " " + resumeData.personalInfo.lastName}`

            setGeneratedLetter(letter)
            setIsGenerating(false)
        }, 2000)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter)
        // You could add a toast notification here
    }

    const renderGenerator = () => (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Job Details
                        </CardTitle>
                        <CardDescription>Provide information about the position and company</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input
                                    id="companyName"
                                    value={coverLetterData.companyName}
                                    onChange={(e) => setCoverLetterData((prev) => ({ ...prev, companyName: e.target.value }))}
                                    placeholder="Acme Corporation"
                                />
                            </div>
                            <div>
                                <Label htmlFor="jobTitle">Job Title *</Label>
                                <Input
                                    id="jobTitle"
                                    value={coverLetterData.jobTitle}
                                    onChange={(e) => setCoverLetterData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                                    placeholder="Senior Software Engineer"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="recipientName">Recipient Name</Label>
                                <Input
                                    id="recipientName"
                                    value={coverLetterData.recipientName}
                                    onChange={(e) => setCoverLetterData((prev) => ({ ...prev, recipientName: e.target.value }))}
                                    placeholder="John Smith"
                                />
                            </div>
                            <div>
                                <Label htmlFor="recipientTitle">Recipient Title</Label>
                                <Input
                                    id="recipientTitle"
                                    value={coverLetterData.recipientTitle}
                                    onChange={(e) => setCoverLetterData((prev) => ({ ...prev, recipientTitle: e.target.value }))}
                                    placeholder="Hiring Manager"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="jobDescription">Job Description (optional)</Label>
                            <Textarea
                                id="jobDescription"
                                value={coverLetterData.jobDescription}
                                onChange={(e) => setCoverLetterData((prev) => ({ ...prev, jobDescription: e.target.value }))}
                                placeholder="Paste the job description here to get more targeted content..."
                                className="min-h-25"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-green-600" />
                            Customization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium mb-3 block">Tone</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {toneOptions.map((tone) => (
                                    <button
                                        key={tone.value}
                                        onClick={() => setCoverLetterData((prev) => ({ ...prev, tone: tone.value }))}
                                        className={`p-3 text-left border rounded-lg transition-colors ${coverLetterData.tone === tone.value
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="font-medium text-sm">{tone.label}</div>
                                        <div className="text-xs text-gray-600">{tone.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium mb-3 block">Length</Label>
                            <div className="space-y-2">
                                {lengthOptions.map((length) => (
                                    <button
                                        key={length.value}
                                        onClick={() => setCoverLetterData((prev) => ({ ...prev, length: length.value }))}
                                        className={`w-full p-3 text-left border rounded-lg transition-colors ${coverLetterData.length === length.value
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-sm">{length.label}</div>
                                                <div className="text-xs text-gray-600">{length.description}</div>
                                            </div>
                                            {coverLetterData.length === length.value && <Badge variant="default">Selected</Badge>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="customContent">Additional Content</Label>
                            <Textarea
                                id="customContent"
                                value={coverLetterData.customContent}
                                onChange={(e) => setCoverLetterData((prev) => ({ ...prev, customContent: e.target.value }))}
                                placeholder="Add any specific points you want to include..."
                                className="min-h-20"
                            />
                        </div>

                        <Button
                            onClick={generateCoverLetter}
                            disabled={!coverLetterData.companyName || !coverLetterData.jobTitle || isGenerating}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    Generate Cover Letter
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Generated Letter */}
            <div>
                <Card className="h-full">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Generated Cover Letter</CardTitle>
                            {generatedLetter && (
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                                        <Copy className="h-3 w-3 mr-1" />
                                        Copy
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {generatedLetter ? (
                            <div className="bg-white border rounded-lg p-6 min-h-125">
                                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{generatedLetter}</pre>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-125 text-gray-500">
                                <div className="text-center">
                                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-sm">Fill in the job details and click "Generate Cover Letter" to get started</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )

    const renderTemplates = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Cover Letter Templates</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {coverLetterTemplates.map((template) => (
                        <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-gray-600 italic">"{template.preview}"</p>
                                </div>
                                <Button variant="outline" className="w-full bg-transparent">
                                    Use This Template
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderTips = () => (
        <div className="space-y-6">
            {writingTips.map((section, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-lg">{section.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {section.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                                    <span className="text-sm text-gray-700">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case "generator":
                return renderGenerator()
            case "templates":
                return renderTemplates()
            case "tips":
                return renderTips()
            default:
                return renderGenerator()
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Cover Letter</h1>
                    <p className="text-gray-600">
                        Create compelling cover letters that complement your resume and increase your chances of landing interviews.
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