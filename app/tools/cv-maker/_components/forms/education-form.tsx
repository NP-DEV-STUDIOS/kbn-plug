"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import RemoveCategory from "../shared/removeSection"

interface Education {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa: string
    location: string
}

interface EducationFormProps {
    data: Education[]
    onChange: (data: Education[]) => void
}

/**
 * Education Form Component
 * Manages educational background entries with degree types and GPA
 */
export default function EducationForm({ data, onChange }: EducationFormProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    // Common degree types
    const degreeTypes = [
        "High School Diploma",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctoral Degree (PhD)",
        "Professional Degree",
        "Certificate",
        "Diploma",
    ]

    /**
     * Add new education entry
     */
    const addEducation = () => {
        const newEducation: Education = {
            id: Date.now().toString(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            gpa: "",
            location: "",
        }
        const updatedData = [...data, newEducation]
        onChange(updatedData)

        // Auto-expand the new item
        setExpandedItems((prev) => new Set([...prev, newEducation.id]))
    }

    /**
     * Update specific education entry
     */
    const updateEducation = (id: string, field: keyof Education, value: string) => {
        onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
    }

    /**
     * Toggle expansion of education item
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
     * Validate GPA format
     */
    const isValidGPA = (gpa: string) => {
        if (!gpa) return true
        const gpaNum = Number.parseFloat(gpa)
        return !isNaN(gpaNum) && gpaNum >= 0 && gpaNum <= 4.0
    }

    /**
     * Format GPA display
     */
    const formatGPA = (gpa: string) => {
        if (!gpa) return ""
        const gpaNum = Number.parseFloat(gpa)
        return isNaN(gpaNum) ? gpa : `${gpaNum.toFixed(2)}/4.0`
    }



    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                </div>
                <span className="text-sm text-gray-500">{data.length} entries</span>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No education entries added yet.</p>
                    <p className="text-xs">Add your educational background to strengthen your resume.</p>
                </div>
            )}

            {data.map((education, index) => {
                const isExpanded = expandedItems.has(education.id)
                const isValidGPAValue = isValidGPA(education.gpa)

                const qualification = !education.degree || !education.field ? "untitled qualification" : `${education.degree} in ${education.field}`

                return (
                    <Card key={education.id} className="border-l-4 border-l-green-500 bg-white rounded-none">
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleExpanded(education.id)}
                        >
                            <CardTitle className="flex items-center justify-between text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                    <span>{education.degree || "New Education"}</span>
                                    {education.field && <span className="text-sm text-gray-500">in {education.field}</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    {education.gpa && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            GPA: {formatGPA(education.gpa)}
                                        </span>
                                    )}
                                    <RemoveCategory
                                        id={education.id}
                                        sectionTitle={qualification}
                                        data={data}
                                        onChange={onChange}
                                        setExpandedItems={setExpandedItems}
                                    />
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {isExpanded && (
                            <CardContent className="space-y-4">
                                {/* Institution */}
                                <div>
                                    <Label htmlFor={`institution-${education.id}`} className="text-sm font-medium">
                                        Institution *
                                    </Label>
                                    <Input
                                        id={`institution-${education.id}`}
                                        value={education.institution}
                                        onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                                        placeholder="University/School Name"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                {/* Degree and Field */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`degree-${education.id}`} className="text-sm font-medium">
                                            Degree Type *
                                        </Label>
                                        <Select
                                            value={education.degree}
                                            onValueChange={(value) => updateEducation(education.id, "degree", value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select degree type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {degreeTypes.map((degree) => (
                                                    <SelectItem key={degree} value={degree}>
                                                        {degree}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor={`field-${education.id}`} className="text-sm font-medium">
                                            Field of Study
                                        </Label>
                                        <Input
                                            id={`field-${education.id}`}
                                            value={education.field}
                                            onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                                            placeholder="Computer Science, Business, etc."
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <Label htmlFor={`location-${education.id}`} className="text-sm font-medium flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Location
                                    </Label>
                                    <Input
                                        id={`location-${education.id}`}
                                        value={education.location}
                                        onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                                        placeholder="City, State/Country"
                                        className="mt-1"
                                    />
                                </div>

                                {/* Date Range */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label
                                            htmlFor={`startDate-${education.id}`}
                                            className="text-sm font-medium flex items-center gap-1"
                                        >
                                            <Calendar className="h-3 w-3" />
                                            Start Date
                                        </Label>
                                        <Input
                                            id={`startDate-${education.id}`}
                                            type="month"
                                            value={education.startDate}
                                            onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`endDate-${education.id}`} className="text-sm font-medium flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            End Date (or Expected)
                                        </Label>
                                        <Input
                                            id={`endDate-${education.id}`}
                                            type="month"
                                            value={education.endDate}
                                            onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                {/* GPA */}
                                <div>
                                    <Label htmlFor={`gpa-${education.id}`} className="text-sm font-medium flex items-center gap-1">
                                        <Award className="h-3 w-3" />
                                        GPA (Optional)
                                    </Label>
                                    <Input
                                        id={`gpa-${education.id}`}
                                        value={education.gpa}
                                        onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                                        placeholder="3.8"
                                        className={`mt-1 ${!isValidGPAValue ? "border-red-500" : ""}`}
                                        type="number"
                                        min="0"
                                        max="4"
                                        step="0.01"
                                    />
                                    {!isValidGPAValue && (
                                        <p className="text-xs text-red-500 mt-1">Please enter a valid GPA (0.0 - 4.0)</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                        Only include if 3.5 or higher, or if specifically requested
                                    </p>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                )
            })}

            <Button
                onClick={addEducation}
                variant="outline"
                className="w-full bg-transparent border-dashed border-2 hover:bg-green-50 hover:border-green-300"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
            </Button>

            {data.length > 0 && (
                <div className="text-xs text-gray-500 text-center">
                    💡 Tip: List your education in reverse chronological order (most recent first)
                </div>
            )}
        </div>
    )
}