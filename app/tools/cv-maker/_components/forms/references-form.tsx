"use client"


import { useState } from "react"

// Icon Imports
import { Plus, Trash2, Users, Phone, Mail, Building } from "lucide-react"

// UI Imports
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Utility Imports
import { isValidEmail } from "@/lib/utils"
import RemoveCategory from "../shared/removeSection"

interface Reference {
    id: string
    name: string
    title: string
    company: string
    email: string
    phone: string
    relationship: string
}

interface ReferencesFormProps {
    data: Reference[]
    onChange: (data: Reference[]) => void
}

/**
 * References Form Component
 * Manages professional references with contact information and relationships
 */
export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    // Common relationship types
    const relationshipTypes = [
        "Direct Supervisor",
        "Manager",
        "Colleague",
        "Client",
        "Professor",
        "Mentor",
        "Team Lead",
        "HR Representative",
    ]

    /**
     * Add new reference entry
     */
    const addReference = () => {
        const newReference: Reference = {
            id: Date.now().toString(),
            name: "",
            title: "",
            company: "",
            email: "",
            phone: "",
            relationship: "",
        }
        const updatedData = [...data, newReference]
        onChange(updatedData)

        // Auto-expand the new item
        setExpandedItems((prev) => new Set([...prev, newReference.id]))
    }

    /**
     * Update specific reference entry
     */
    const updateReference = (id: string, field: keyof Reference, value: string) => {
        onChange(data.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)))
    }


    /**
     * Toggle expansion of reference item
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



    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">References</h3>
                </div>
                <span className="text-sm text-gray-500">{data.length} references</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                    <div className="text-sm text-blue-600">
                        <p className="font-medium mb-1">Reference Guidelines:</p>
                        <ul className="text-xs space-y-1">
                            <li>• Always ask permission before listing someone as a reference</li>
                            <li>• Choose people who can speak positively about your work</li>
                            <li>• Include a mix of supervisors, colleagues, and clients if possible</li>
                            <li>• Keep your references informed about your job search</li>
                        </ul>
                    </div>
                </div>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No references added yet.</p>
                    <p className="text-xs">Add professional references to strengthen your application.</p>
                </div>
            )}

            {data.map((reference, index) => {
                const isExpanded = expandedItems.has(reference.id)
                const isValidEmailValue = isValidEmail(reference.email)

                return (
                    <Card key={reference.id} className="border-l-4 border-l-orange-500 bg-white rounded-none">
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleExpanded(reference.id)}
                        >
                            <CardTitle className="flex items-center justify-between text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                    <span>{reference.name || "New Reference"}</span>
                                    {reference.title && <span className="text-sm text-gray-500">- {reference.title}</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    {reference.relationship && (
                                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                            {reference.relationship}
                                        </span>
                                    )}
                                    <RemoveCategory id={reference.id} sectionTitle={`${reference.name} as a reference`} data={data} onChange={onChange} setExpandedItems={setExpandedItems} />
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {isExpanded && (
                            <CardContent className="space-y-4">
                                {/* Name and Title */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`name-${reference.id}`} className="text-sm font-medium">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id={`name-${reference.id}`}
                                            value={reference.name}
                                            onChange={(e) => updateReference(reference.id, "name", e.target.value)}
                                            placeholder="John Smith"
                                            className="mt-1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`title-${reference.id}`} className="text-sm font-medium">
                                            Job Title *
                                        </Label>
                                        <Input
                                            id={`title-${reference.id}`}
                                            value={reference.title}
                                            onChange={(e) => updateReference(reference.id, "title", e.target.value)}
                                            placeholder="Senior Manager"
                                            className="mt-1"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Company and Relationship */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`company-${reference.id}`} className="text-sm font-medium flex items-center gap-1">
                                            <Building className="h-3 w-3" />
                                            Company
                                        </Label>
                                        <Input
                                            id={`company-${reference.id}`}
                                            value={reference.company}
                                            onChange={(e) => updateReference(reference.id, "company", e.target.value)}
                                            placeholder="Company Name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`relationship-${reference.id}`} className="text-sm font-medium">
                                            Relationship *
                                        </Label>
                                        <Select
                                            value={reference.relationship}
                                            onValueChange={(value) => updateReference(reference.id, "relationship", value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select relationship" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {relationshipTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`email-${reference.id}`} className="text-sm font-medium flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id={`email-${reference.id}`}
                                            type="email"
                                            value={reference.email}
                                            onChange={(e) => updateReference(reference.id, "email", e.target.value)}
                                            placeholder="john.smith@company.com"
                                            className={`mt-1 ${!isValidEmailValue ? "border-red-500" : ""}`}
                                        />
                                        {!isValidEmailValue && (
                                            <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor={`phone-${reference.id}`} className="text-sm font-medium flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            Phone Number
                                        </Label>
                                        <Input
                                            id={`phone-${reference.id}`}
                                            type="tel"
                                            value={reference.phone}
                                            onChange={(e) => updateReference(reference.id, "phone", e.target.value)}
                                            placeholder="(555) 123-4567"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                )
            })}

            <Button
                onClick={addReference}
                variant="outline"
                className="w-full bg-transparent border-dashed border-2 hover:bg-orange-50 hover:border-orange-300"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Reference
            </Button>

            {data.length > 0 && (
                <div className="text-xs text-gray-500 text-center">
                    💡 Tip: 3-5 references are typically sufficient. Quality over quantity!
                </div>
            )}
        </div>
    )
}