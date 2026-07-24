"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Briefcase, Calendar, MapPin } from "lucide-react"
import RemoveCategory from "../shared/removeSection"
import { WorkExperience } from "../../types"

interface WorkExperienceFormProps {
    data: WorkExperience[]
    onChange: (data: WorkExperience[]) => void
}

/**
 * Work Experience Form Component
 * Manages multiple work experience entries with validation
 */
export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    /**
     * Add new work experience entry
     */
    const addExperience = () => {
        const newExperience: WorkExperience = {
            id: Date.now().toString(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            location: "",
        }
        const updatedData = [...data, newExperience]
        onChange(updatedData)

        // Auto-expand the new item
        setExpandedItems((prev) => new Set([...prev, newExperience.id]))
    }

    /**
     * Update specific experience entry
     */
    const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
        const updatedData = data.map((exp) => {
            if (exp.id === id) {
                const updated = { ...exp, [field]: value }
                // Clear end date if current job is checked
                if (field === "current" && value === true) {
                    updated.endDate = ""
                }
                return updated
            }
            return exp
        })
        onChange(updatedData)
    }

    /**
     * Toggle expansion of experience item
     */
    const toggleExpanded = (id: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    /**
     * Validate date range
     */
    const isValidDateRange = (startDate: string, endDate: string, current: boolean) => {
        if (!startDate) return true
        if (current) return true
        if (!endDate) return true
        return new Date(startDate) <= new Date(endDate)
    }

    /**
     * Generate AI-powered job description suggestions
     */
    const generateDescriptionSuggestions = (position: string, company: string) => {
        const suggestions = [
            `Led cross-functional teams to deliver high-impact projects at ${company}`,
            `Developed and implemented strategic initiatives that improved operational efficiency`,
            `Collaborated with stakeholders to identify business requirements and deliver solutions`,
            `Managed multiple projects simultaneously while maintaining quality standards`,
            `Mentored junior team members and contributed to professional development programs`,
        ]
        return suggestions
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                </div>
                <span className="text-sm text-gray-500">{data.length} entries</span>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No work experience added yet.</p>
                    <p className="text-xs">Click "Add Experience" to get started.</p>
                </div>
            )}

            {data.map((experience, index) => {
                const isExpanded = expandedItems.has(experience.id)
                const isValidDates = isValidDateRange(experience.startDate, experience.endDate, experience.current)

                return (
                    <Card key={experience.id} className="border-l-4 border-l-primary rounded-none bg-white">
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleExpanded(experience.id)}
                        >
                            <CardTitle className="flex items-center justify-between text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                    <span>{experience.position || "New Position"}</span>
                                    {experience.company && <span className="text-sm text-gray-500">at {experience.company}</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    {experience.current && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
                                    )}
                                    <RemoveCategory id={experience.id} sectionTitle={`your ${experience.position} work experience`} setExpandedItems={setExpandedItems} data={data} onChange={onChange} />
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {isExpanded && (
                            <CardContent className="space-y-4">
                                {/* Company and Position */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`company-${experience.id}`} className="text-sm font-medium">
                                            Company *
                                        </Label>
                                        <Input
                                            id={`company-${experience.id}`}
                                            value={experience.company}
                                            onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                                            placeholder="Company Name"
                                            className="mt-1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`position-${experience.id}`} className="text-sm font-medium">
                                            Position *
                                        </Label>
                                        <Input
                                            id={`position-${experience.id}`}
                                            value={experience.position}
                                            onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                                            placeholder="Job Title"
                                            className="mt-1"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <Label htmlFor={`location-${experience.id}`} className="text-sm font-medium flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Location
                                    </Label>
                                    <Input
                                        id={`location-${experience.id}`}
                                        value={experience.location}
                                        onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                                        placeholder="City, State/Country"
                                        className="mt-1"
                                    />
                                </div>

                                {/* Date Range */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label
                                            htmlFor={`startDate-${experience.id}`}
                                            className="text-sm font-medium flex items-center gap-1"
                                        >
                                            <Calendar className="h-3 w-3" />
                                            Start Date *
                                        </Label>
                                        <Input
                                            id={`startDate-${experience.id}`}
                                            type="month"
                                            value={experience.startDate}
                                            onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                                            className="mt-1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`endDate-${experience.id}`} className="text-sm font-medium flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            End Date
                                        </Label>
                                        <Input
                                            id={`endDate-${experience.id}`}
                                            type="month"
                                            value={experience.endDate}
                                            onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                                            disabled={experience.current}
                                            className={`mt-1 ${!isValidDates ? "border-red-500" : ""}`}
                                        />
                                        {!isValidDates && <p className="text-xs text-red-500 mt-1">End date must be after start date</p>}
                                    </div>
                                </div>

                                {/* Current Job Checkbox */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`current-${experience.id}`}
                                        checked={experience.current}
                                        onCheckedChange={(checked) => updateExperience(experience.id, "current", checked as boolean)}
                                    />
                                    <Label htmlFor={`current-${experience.id}`} className="text-sm">
                                        I currently work here
                                    </Label>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <Label htmlFor={`description-${experience.id}`} className="text-sm font-medium">
                                        Job Description & Achievements
                                    </Label>
                                    <Textarea
                                        id={`description-${experience.id}`}
                                        value={experience.description}
                                        onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                                        placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible&#10;• Highlight skills and technologies used"
                                        className="mt-1 min-h-30"
                                        maxLength={1000}
                                    />
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-500">{experience.description.length}/1000 characters</p>
                                        {experience.position && experience.company && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    const suggestions = generateDescriptionSuggestions(experience.position, experience.company)
                                                    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
                                                    updateExperience(
                                                        experience.id,
                                                        "description",
                                                        experience.description ? `${experience.description}\n• ${suggestion}` : `• ${suggestion}`,
                                                    )
                                                }}
                                                className="text-xs text-blue-600 hover:text-blue-700"
                                            >
                                                Add Suggestion
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                )
            })}

            <Button
                onClick={addExperience}
                variant="outline"
                className="w-full bg-transparent border-dashed border-2 hover:bg-blue-50 hover:border-blue-300"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Work Experience
            </Button>

            {data.length > 0 && (
                <div className="text-xs text-gray-500 text-center">
                    💡 Tip: List your experiences in reverse chronological order (most recent first)
                </div>
            )}
        </div>
    )
}