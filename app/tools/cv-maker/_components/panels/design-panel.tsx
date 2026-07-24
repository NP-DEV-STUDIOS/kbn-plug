"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, Layout, BracketsIcon as Spacing, Download, Eye, Settings, RefreshCw, CheckCircle } from "lucide-react"
import ResumePreview from "@/app/tools/cv-maker/_components/resume-preview"
import type { ResumeData, TemplateConfig } from "../../types"
import { templates } from "../templates/templates"

interface DesignPanelProps {
    resumeData: ResumeData
    selectedTemplate: string
    onTemplateChange: (template: string) => void
    resumeRef: React.RefObject<HTMLDivElement>
}

export default function DesignPanel({ resumeData, selectedTemplate, onTemplateChange, resumeRef }: DesignPanelProps) {
    const [activeDesignTab, setActiveDesignTab] = useState("templates")
    const [customization, setCustomization] = useState({
        fontSize: "base",
        fontFamily: "Inter",
        primaryColor: "#1f2937",
        accentColor: "#3b82f6",
        spacing: 16,
        margins: 24,
        lineHeight: 1.5,
    })

    const fontOptions = [
        { value: "Inter", label: "Inter (Modern Sans-serif)" },
        { value: "Times New Roman", label: "Times New Roman (Classic Serif)" },
        { value: "Arial", label: "Arial (Clean Sans-serif)" },
        { value: "Georgia", label: "Georgia (Elegant Serif)" },
        { value: "Helvetica", label: "Helvetica (Professional)" },
        { value: "Roboto", label: "Roboto (Google Font)" },
    ]

    const colorPresets = [
        { name: "Professional Blue", primary: "#1e40af", accent: "#3b82f6" },
        { name: "Corporate slate", primary: "#1f2937", accent: "#4b5563" },
        { name: "Creative Purple", primary: "#7c3aed", accent: "#a855f7" },
        { name: "Modern Teal", primary: "#0f766e", accent: "#14b8a6" },
        { name: "Elegant Gold", primary: "#92400e", accent: "#d97706" },
        { name: "Tech Green", primary: "#059669", accent: "#10b981" },
    ]

    const designTabs = [
        { id: "templates", label: "Templates", icon: Layout },
        { id: "colors", label: "Colors", icon: Palette },
        { id: "typography", label: "Typography", icon: Type },
        { id: "spacing", label: "Spacing", icon: Spacing },
    ]

    const updateCustomization = (field: string, value: any) => {
        setCustomization((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const renderTemplates = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        className={`relative cursor-pointer hover:shadow-lg border-none ring-0 bg-background ${selectedTemplate === template.id ? "shadow-lg bg-card" : "hover:shadow-md"
                            }`}
                        onClick={() => onTemplateChange(template.id)}
                    >
                        <div className="absolute top-2 right-2 flex items-center justify-between">
                            {selectedTemplate === template.id && <CheckCircle className={`stroke-3`} style={{
                                stroke: template.colors.primary
                            }} />}
                        </div>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <CardDescription className="text-xs">{template.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                            {/* Template Preview */}
                            <div
                                className={`w-full h-32 rounded-lg border-2 border-slate-200 ${template.preview} relative overflow-hidden`}
                            >
                                <div className="absolute inset-2 bg-white rounded shadow-sm p-2">
                                    {/* Mock resume layout */}
                                    <div className="space-y-1">
                                        <div className="h-2 rounded" style={{ backgroundColor: template.colors.primary, width: "60%" }} />
                                        <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: "40%" }} />
                                        <div className="grid grid-cols-3 gap-1 mt-2">
                                            <div className="space-y-1">
                                                <div className="h-1 bg-slate-300 rounded" style={{ width: "80%" }} />
                                                <div className="h-1 bg-slate-300 rounded" style={{ width: "60%" }} />
                                                <div className="h-1 bg-slate-300 rounded" style={{ width: "90%" }} />
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <div className="h-1 bg-slate-300 rounded" />
                                                <div className="h-1 bg-slate-300 rounded" style={{ width: "85%" }} />
                                                <div className="h-1 bg-slate-300 rounded" style={{ width: "70%" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Colors:</span>
                                    <div className="flex gap-1">
                                        <div
                                            className="w-4 h-4 rounded-full border border-slate-200"
                                            style={{ backgroundColor: template.colors.primary }}
                                        />
                                        <div
                                            className="w-4 h-4 rounded-full border border-slate-200"
                                            style={{ backgroundColor: template.colors.accent }}
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500">{template.fonts.heading}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )

    const renderColors = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>

                {/* Color Presets */}
                <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">Quick Presets</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {colorPresets.map((preset, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    updateCustomization("primaryColor", preset.primary)
                                    updateCustomization("accentColor", preset.accent)
                                }}
                                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex gap-1">
                                    <div
                                        className="w-4 h-4 rounded-full border border-slate-200"
                                        style={{ backgroundColor: preset.primary }}
                                    />
                                    <div
                                        className="w-4 h-4 rounded-full border border-slate-200"
                                        style={{ backgroundColor: preset.accent }}
                                    />
                                </div>
                                <span className="text-sm font-medium">{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Colors */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={customization.primaryColor}
                                onChange={(e) => updateCustomization("primaryColor", e.target.value)}
                                className="w-12 h-10 rounded border border-slate-300"
                            />
                            <input
                                type="text"
                                value={customization.primaryColor}
                                onChange={(e) => updateCustomization("primaryColor", e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                                placeholder="#1f2937"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-medium mb-2 block">Accent Color</Label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={customization.accentColor}
                                onChange={(e) => updateCustomization("accentColor", e.target.value)}
                                className="w-12 h-10 rounded border border-slate-300"
                            />
                            <input
                                type="text"
                                value={customization.accentColor}
                                onChange={(e) => updateCustomization("accentColor", e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                                placeholder="#3b82f6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderTypography = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>

                <div className="space-y-6">
                    <div>
                        <Label className="text-sm font-medium mb-2 block">Font Family</Label>
                        <Select
                            value={customization.fontFamily}
                            onValueChange={(value) => updateCustomization("fontFamily", value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {fontOptions.map((font) => (
                                    <SelectItem key={font.value} value={font.value}>
                                        {font.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-sm font-medium mb-2 block">Font Size</Label>
                        <Select value={customization.fontSize} onValueChange={(value) => updateCustomization("fontSize", value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sm">Small (14px)</SelectItem>
                                <SelectItem value="base">Medium (16px)</SelectItem>
                                <SelectItem value="lg">Large (18px)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-sm font-medium mb-2 block">Line Height: {customization.lineHeight}</Label>
                        <Slider
                            value={[customization.lineHeight]}
                            onValueChange={(value) => updateCustomization("lineHeight", value[0])}
                            min={1.2}
                            max={2.0}
                            step={0.1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Tight</span>
                            <span>Normal</span>
                            <span>Loose</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderSpacing = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Spacing & Layout</h3>

                <div className="space-y-6">
                    <div>
                        <Label className="text-sm font-medium mb-2 block">Section Spacing: {customization.spacing}px</Label>
                        <Slider
                            value={[customization.spacing]}
                            onValueChange={(value) => updateCustomization("spacing", value[0])}
                            min={8}
                            max={32}
                            step={2}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Compact</span>
                            <span>Normal</span>
                            <span>Spacious</span>
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-medium mb-2 block">Page Margins: {customization.margins}px</Label>
                        <Slider
                            value={[customization.margins]}
                            onValueChange={(value) => updateCustomization("margins", value[0])}
                            min={16}
                            max={48}
                            step={4}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Narrow</span>
                            <span>Normal</span>
                            <span>Wide</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderDesignContent = () => {
        switch (activeDesignTab) {
            case "templates":
                return renderTemplates()
            case "colors":
                return renderColors()
            case "typography":
                return renderTypography()
            case "spacing":
                return renderSpacing()
            default:
                return renderTemplates()
        }
    }

    return (
        <div className="">
            {/* Design Tab Navigation */}
            <div className="relative h-[10vh] flex items-center overflow-x-auto">
                {designTabs.map(({ id, icon: Icon, label }, index) => (
                    <Button
                        key={id}
                        onClick={() => setActiveDesignTab(id)}
                        variant={"ghost"}
                        className={`px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium rounded-lg lg:rounded-xl transition-all duration-200 transform hover:scale-105 whitespace-nowrap ${activeDesignTab === id
                            ? "text-primary"
                            : "text-slate-500"
                            }`}
                    >
                        <Icon size={32} className={`[&_svg:not([class*='size-'])]:size-4" p-2 rounded-full text-white ${activeDesignTab === id ? "bg-primary " : "bg-slate-600"}`} />
                        {label}
                        {index < designTabs.length - 1 ? <div className="h-0.5 w-10 bg-primary" /> : null}
                    </Button>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-20vh-48px)] w-full overflow-hidden">
                {/* Design Controls */}
                <div className="lg:col-span-2 border-r border-slate-200 bg-slate-50">
                    {/* Design Content */}
                    <div className="overflow-y-auto h-[75dvh]">{renderDesignContent()}</div>
                </div>

                {/* Resume Preview */}
                <div className="lg:col-span-3 relative max-w-4xl mx-auto w-full bg-linear-to-br from-slate-50 to-white flex flex-col overflow-hidden flex-1 overflow-y-auto p-4 lg:p-6 h-[75vh]">
                    <ResumePreview data={resumeData} templateId={selectedTemplate} />
                </div>
            </div>
        </div>

    )
}