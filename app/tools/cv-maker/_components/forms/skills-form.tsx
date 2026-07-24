"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Zap, Code, Palette, Users } from "lucide-react"
import { SkillItem, SkillsCategory } from "../../types"
import RemoveCategory from "../shared/removeSection"

interface SkillsFormProps {
    data: SkillsCategory[]
    onChange: (data: SkillsCategory[]) => void
}

/**
 * Skills Form Component
 * Manages skill categories with proficiency levels and predefined skill suggestions
 */
export default function SkillsForm({ data, onChange }: SkillsFormProps) {
    const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({})
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    // Predefined skill categories and suggestions
    const skillSuggestions = {
        "Technical Skills": [
            "JavaScript",
            "Python",
            "React",
            "Node.js",
            "TypeScript",
            "Java",
            "C++",
            "SQL",
            "MongoDB",
            "PostgreSQL",
            "AWS",
            "Docker",
            "Kubernetes",
            "Git",
            "Linux",
        ],
        "Design Skills": [
            "Figma",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Sketch",
            "InVision",
            "Canva",
            "UI/UX Design",
            "Wireframing",
            "Prototyping",
            "Adobe XD",
        ],
        "Soft Skills": [
            "Leadership",
            "Communication",
            "Problem Solving",
            "Team Collaboration",
            "Project Management",
            "Time Management",
            "Critical Thinking",
            "Adaptability",
            "Creativity",
            "Public Speaking",
        ],
        Languages: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic", "Portuguese"],
    }

    /**
     * Add new skill category
     */
    const addSkillCategory = () => {
        const newCategory: SkillsCategory = {
            id: Date.now().toString(),
            category: "",
            items: [],
        }
        const updatedData = [...data, newCategory]
        onChange(updatedData)

        // Auto-expand the new category
        setExpandedItems((prev) => new Set([...prev, newCategory.id]))
    }

    /**
     * Update category name
     */
    const updateCategory = (id: string, category: string) => {
        onChange(data.map((skill) => (skill.id === id ? { ...skill, category } : skill)))
    }

    /**
     * Add skill to category
     */
    const addSkillToCategory = (categoryId: string, skillName?: string) => {
        const skillText = skillName || newSkillInputs[categoryId]?.trim()
        if (!skillText) return

        const newSkill: SkillItem = {
            name: skillText,
            level: 70, // Default proficiency level
        }

        onChange(data.map((skill) => (skill.id === categoryId ? { ...skill, items: [...skill.items, newSkill] } : skill)))

        // Clear input if it was from text input
        if (!skillName) {
            setNewSkillInputs((prev) => ({ ...prev, [categoryId]: "" }))
        }
    }

    /**
     * Update skill proficiency level
     */
    const updateSkillLevel = (categoryId: string, skillIndex: number, level: number) => {
        onChange(
            data.map((category) =>
                category.id === categoryId
                    ? {
                        ...category,
                        items: category.items.map((skill, index) => (index === skillIndex ? { ...skill, level } : skill)),
                    }
                    : category,
            ),
        )
    }

    /**
     * Remove skill from category
     */
    const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
        onChange(
            data.map((skill) =>
                skill.id === categoryId ? { ...skill, items: skill.items.filter((_, index) => index !== skillIndex) } : skill,
            ),
        )
    }



    /**
     * Toggle category expansion
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
     * Handle skill input key press
     */
    const handleSkillInputKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addSkillToCategory(categoryId)
        }
    }

    /**
     * Get proficiency level label
     */
    const getProficiencyLabel = (level: number) => {
        if (level >= 90) return "Expert"
        if (level >= 75) return "Advanced"
        if (level >= 60) return "Intermediate"
        if (level >= 40) return "Beginner"
        return "Novice"
    }

    /**
     * Get category icon
     */
    const getCategoryIcon = (category: string) => {
        const lowerCategory = category.toLowerCase()
        if (lowerCategory.includes("technical") || lowerCategory.includes("programming")) {
            return <Code className="h-4 w-4" />
        }
        if (lowerCategory.includes("design")) {
            return <Palette className="h-4 w-4" />
        }
        if (lowerCategory.includes("soft") || lowerCategory.includes("leadership")) {
            return <Users className="h-4 w-4" />
        }
        return <Zap className="h-4 w-4" />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                </div>
                <span className="text-sm text-gray-500">
                    {data.reduce((total, category) => total + category.items.length, 0)} skills
                </span>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No skills added yet.</p>
                    <p className="text-xs">Showcase your abilities by adding skill categories.</p>
                </div>
            )}

            {data.map((skillCategory, index) => {
                const isExpanded = expandedItems.has(skillCategory.id)
                const suggestions = skillSuggestions[skillCategory.category as keyof typeof skillSuggestions] || []

                return (
                    <Card key={skillCategory.id} className="border-l-4 border-l-purple-500 bg-white rounded-none">
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleExpanded(skillCategory.id)}
                        >
                            <CardTitle className="flex items-center justify-between text-base">
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary flex items-center gap-1 py-1 px-2 rounded-lg text-white">
                                        {getCategoryIcon(skillCategory.category)}
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <span>{skillCategory.category || "New Category"}</span>
                                    <span className="text-sm text-gray-500">({skillCategory.items.length} skills)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RemoveCategory id={skillCategory.id} sectionTitle={skillCategory.category} data={data} onChange={onChange} setExpandedItems={setExpandedItems} />
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {isExpanded && (
                            <CardContent className="space-y-4">
                                {/* Category Name */}
                                <div>
                                    <Label htmlFor={`category-${skillCategory.id}`} className="text-sm font-medium">
                                        Category Name *
                                    </Label>
                                    <Input
                                        id={`category-${skillCategory.id}`}
                                        value={skillCategory.category}
                                        onChange={(e) => updateCategory(skillCategory.id, e.target.value)}
                                        placeholder="e.g., Technical Skills, Languages, Soft Skills"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                {/* Skill Suggestions */}
                                {suggestions.length > 0 && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Quick Add Suggestions</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestions.slice(0, 8).map((suggestion) => (
                                                <Button
                                                    key={suggestion}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addSkillToCategory(skillCategory.id, suggestion)}
                                                    className="text-xs bg-transparent hover:bg-purple-50"
                                                    disabled={skillCategory.items.some((item) => item.name === suggestion)}
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    {suggestion}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add New Skill */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Add Skills</Label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            value={newSkillInputs[skillCategory.id] || ""}
                                            onChange={(e) =>
                                                setNewSkillInputs((prev) => ({
                                                    ...prev,
                                                    [skillCategory.id]: e.target.value,
                                                }))
                                            }
                                            onKeyPress={(e) => handleSkillInputKeyPress(e, skillCategory.id)}
                                            placeholder="Type a skill and press Enter"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => addSkillToCategory(skillCategory.id)}
                                            size="sm"
                                            disabled={!newSkillInputs[skillCategory.id]?.trim()}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                {/* Skills List */}
                                {skillCategory.items.length > 0 && (
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-gray-700">Skills & Proficiency</Label>
                                        {skillCategory.items.map((skill, skillIndex) => (
                                            <div key={skillIndex} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-sm">{skill.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500">
                                                            {getProficiencyLabel(skill.level)} ({skill.level}%)
                                                        </span>
                                                        <button
                                                            onClick={() => removeSkillFromCategory(skillCategory.id, skillIndex)}
                                                            className="text-red-600 hover:text-red-700"
                                                            aria-label={`Remove ${skill.name}`}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Slider
                                                        value={[skill.level]}
                                                        onValueChange={(value) => updateSkillLevel(skillCategory.id, skillIndex, value[0])}
                                                        max={100}
                                                        min={10}
                                                        step={5}
                                                        className="w-full"
                                                    />
                                                    <div className="flex justify-between text-xs text-gray-500">
                                                        <span>Beginner</span>
                                                        <span>Intermediate</span>
                                                        <span>Advanced</span>
                                                        <span>Expert</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>
                )
            })}

            <Button
                onClick={addSkillCategory}
                variant="outline"
                className="w-full bg-transparent border-dashed border-2 hover:bg-purple-50 hover:border-purple-300"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill Category
            </Button>

            {data.length > 0 && (
                <div className="text-xs text-gray-500 text-center">
                    💡 Tip: Focus on skills relevant to your target job and be honest about proficiency levels
                </div>
            )}
        </div>
    )
}