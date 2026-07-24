"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette } from "lucide-react"

interface CustomizationOptions {
    template: string
    fontFamily: string
    fontSize: string
    primaryColor: string
    accentColor: string
}

interface CustomizationPanelProps {
    customization: CustomizationOptions
    onChange: (customization: CustomizationOptions) => void
}

const fontFamilies = [
    { value: "Inter", label: "Inter (Modern)" },
    { value: "Times New Roman", label: "Times New Roman (Classic)" },
    { value: "Arial", label: "Arial (Clean)" },
    { value: "Georgia", label: "Georgia (Elegant)" },
    { value: "Helvetica", label: "Helvetica (Professional)" },
]

const fontSizes = [
    { value: "sm", label: "Small" },
    { value: "base", label: "Medium" },
    { value: "lg", label: "Large" },
]

const colors = [
    { value: "#1f2937", label: "Dark Gray", color: "bg-gray-800" },
    { value: "#1e40af", label: "Blue", color: "bg-blue-700" },
    { value: "#059669", label: "Green", color: "bg-green-600" },
    { value: "#7c3aed", label: "Purple", color: "bg-purple-600" },
    { value: "#dc2626", label: "Red", color: "bg-red-600" },
    { value: "#ea580c", label: "Orange", color: "bg-orange-600" },
]

export default function CustomizationPanel({ customization, onChange }: CustomizationPanelProps) {
    const updateCustomization = (field: keyof CustomizationOptions, value: string) => {
        onChange({
            ...customization,
            [field]: value,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Customization
                </CardTitle>
                <CardDescription>Personalize your resume's appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select value={customization.fontFamily} onValueChange={(value) => updateCustomization("fontFamily", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                            {fontFamilies.map((font) => (
                                <SelectItem key={font.value} value={font.value}>
                                    {font.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select value={customization.fontSize} onValueChange={(value) => updateCustomization("fontSize", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                            {fontSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Select
                        value={customization.primaryColor}
                        onValueChange={(value) => updateCustomization("primaryColor", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select primary color" />
                        </SelectTrigger>
                        <SelectContent>
                            {colors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded ${color.color}`} />
                                        {color.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <Select
                        value={customization.accentColor}
                        onValueChange={(value) => updateCustomization("accentColor", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select accent color" />
                        </SelectTrigger>
                        <SelectContent>
                            {colors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded ${color.color}`} />
                                        {color.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}