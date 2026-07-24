"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Palette, Eye } from "lucide-react"
import { TemplateConfig } from "../types";
import { templates } from "./templates/templates";

interface TemplateSelectorProps {
    selectedTemplate: string
    onTemplateChange: (template: string) => void
}

/**
 * Template Selector Component
 * Provides various resume templates with different styles and layouts
 */
export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {


    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Resume Templates</h3>
            </div>

            <p className="text-sm text-gray-600">
                Choose a template that best fits your industry and personal style. You can always change it later.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                            }`}
                        onClick={() => onTemplateChange(template.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                {selectedTemplate === template.id && (
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                            <CardDescription className="text-xs">{template.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                            {/* Template Preview */}
                            <div
                                className={`w-full h-32 rounded-lg border-2 border-gray-200 ${template.preview} relative overflow-hidden`}
                            >
                                <div className="absolute inset-2 bg-white rounded shadow-sm p-2">
                                    {/* Mock resume layout */}
                                    <div className="space-y-1">
                                        <div className="h-2 rounded" style={{ backgroundColor: template.colors.primary, width: "60%" }} />
                                        <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: "40%" }} />
                                        <div className="grid grid-cols-3 gap-1 mt-2">
                                            <div className="space-y-1">
                                                <div className="h-1 bg-gray-300 rounded" style={{ width: "80%" }} />
                                                <div className="h-1 bg-gray-300 rounded" style={{ width: "60%" }} />
                                                <div className="h-1 bg-gray-300 rounded" style={{ width: "90%" }} />
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <div className="h-1 bg-gray-300 rounded" />
                                                <div className="h-1 bg-gray-300 rounded" style={{ width: "85%" }} />
                                                <div className="h-1 bg-gray-300 rounded" style={{ width: "70%" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Colors:</span>
                                    <div className="flex gap-1">
                                        <div
                                            className="w-4 h-4 rounded-full border border-gray-200"
                                            style={{ backgroundColor: template.colors.primary }}
                                        />
                                        <div
                                            className="w-4 h-4 rounded-full border border-gray-200"
                                            style={{ backgroundColor: template.colors.accent }}
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">{template.fonts.heading}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Template Customization</h4>
                        <p className="text-xs text-gray-600">
                            Each template can be further customized with different colors, fonts, and layouts. The preview shows the
                            default styling, but you can adjust it to match your preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}