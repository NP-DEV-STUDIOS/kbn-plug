"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Trash2, Info, Camera, User, Mail, MapPin, Globe } from "lucide-react"
import { PersonalInfo } from "../types"
import { toast } from "sonner"
import { isValidEmail, toastVariants } from "@/lib/utils"
import {BiLogoLinkedin} from "react-icons/bi";

interface PersonalInfoSidebarProps {
    data: PersonalInfo
    onChange: (data: PersonalInfo) => void
    onExportPDF: () => void
    onExportJSON: () => void
    onClearData: () => void
    isExporting: boolean
}

export default function PersonalInfoSidebar({ data, onChange }: PersonalInfoSidebarProps) {
    const [photoPreview, setPhotoPreview] = useState<string>(data.photo)
    const fileInputRef = useRef<HTMLInputElement>(null)

    /**
     * Handle form field changes and update parent state
     * Auto-generates full name when first/last name changes
     */
    const handleChange = (field: keyof PersonalInfo, value: string) => {
        const updatedData = { ...data, [field]: value }

        // Auto-generate full name when first/last name changes
        if (field === "firstName" || field === "lastName") {
            updatedData.fullName =
                `${field === "firstName" ? value : data.firstName} ${field === "lastName" ? value : data.lastName}`.trim()
        }

        onChange(updatedData)
    }

    /**
     * Handle photo upload with validation and base64 conversion
     * Validates file type and size before processing
     */
    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                toast.error("Invalid File Type",
                    toastVariants({
                        variant: "error",
                        description: "Please upload a valid image file (JPG, PNG, etc.)",
                        position: "top-center",

                    }))

                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image too large",
                    toastVariants({
                        variant: "error",
                        description: "Please upload an image smaller than MB",
                        position: "top-center",

                    }))
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setPhotoPreview(result)
                handleChange("photo", result)
                toast.success("Image Uploaded!",
                    toastVariants({
                        variant: "success",
                        description: "Image uploaded successfully",
                        position: "top-center",

                    }))
            }
            reader.readAsDataURL(file)
        }
    }

    /**
     * Remove uploaded photo and reset file input
     */
    const handleRemovePhoto = () => {
        setPhotoPreview("")
        handleChange("photo", "")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
        toast.info("Image removed",
            toastVariants({
                variant: "info",
                position: "top-center",

            }))
    }

    return (
        <div className="space-y-8">
            {/* Profile Photo Section */}
            <Card className="bg-white border-none ring-0 outline-none">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="h-5 w-5 text-blue-600" />
                        <span>Profile Photo</span>
                    </CardTitle>
                    <CardDescription>
                        Recommended: Square image, at least 400x400px. Max 5MB.
                        <br />
                        Supported formats: JPG, PNG, WebP
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden border-4 border-white shadow-lg">
                                {photoPreview ? (
                                    <Image
                                        src={photoPreview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        width={200}
                                        height={200}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Camera className="h-10 w-10 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            {photoPreview && (
                                <button
                                    onClick={handleRemovePhoto}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                                id="photo-upload"
                            />
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-white hover:bg-slate-100 border-dotted border-4 transition-all duration-200 h-24 w-full"
                            >
                                <Upload className="h-10 w-10 mr-2" />
                                {photoPreview ? "Change Photo" : "Upload Photo"}
                            </Button>

                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="ring-0 bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-green-600" />
                        Basic Information
                    </CardTitle>
                    <CardDescription>
                        Your core personal details that will appear prominently on your resume
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="firstName" value={data.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                value={data.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Professional Title */}
                    <div className="space-y-2">
                        <Label htmlFor="professionalTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            Professional Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="professionalTitle"
                            value={data.professionalTitle}
                            onChange={(e) => handleChange("professionalTitle", e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 ring-0 bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-purple-600" />
                        Contact Information
                    </CardTitle>
                    <CardDescription className="">
                        How employers can reach you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 ${data.email && !isValidEmail(data.email) ? "border-red-500 focus:border-red-500" : ""
                                }`}
                            required
                        />
                        {data.email && !isValidEmail(data.email) && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <Info className="h-4 w-4" />
                                Please enter a valid email address
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                            Phone Number
                        </Label>
                        <div className="flex gap-2">
                            <Select defaultValue="+1">
                                <SelectTrigger className="w-24 border-gray-300 focus:border-blue-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+27">+27 ZA</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={data.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            Address
                        </Label>
                        <Input
                            id="address"
                            value={data.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <BiLogoLinkedin className="h-4 w-4 text-blue-600" />
                            LinkedIn Profile
                        </Label>
                        <Input
                            id="linkedin"
                            value={data.linkedin}
                            onChange={(e) => handleChange("linkedin", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Globe className="h-4 w-4 text-green-600" />
                            Website/Portfolio
                        </Label>
                        <Input
                            id="website"
                            value={data.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="border-0 ring-0 bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-orange-600" />
                        Professional Summary
                    </CardTitle>
                    <CardDescription>
                        A compelling overview of your professional background and key strengths
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Textarea
                            id="summary"
                            value={data.summary}
                            onChange={(e) => handleChange("summary", e.target.value)}
                            className="min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                            maxLength={500}
                        />
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Highlight your key skills and experience</span>
                            <span className={`font-medium ${data.summary.length > 450 ? 'text-orange-600' : 'text-gray-500'}`}>
                                {data.summary.length}/500
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Career Objectives */}
            <Card className="border-0 ring-0 bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-indigo-600" />
                        Career Objectives
                    </CardTitle>
                    <CardDescription>
                        Your professional goals and aspirations
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Textarea
                            id="careerObjectives"
                            value={data.careerObjectives}
                            onChange={(e) => handleChange("careerObjectives", e.target.value)}
                            className="min-h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                            maxLength={300}
                        />
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">What are you looking to achieve?</span>
                            <span className={`font-medium ${data.careerObjectives.length > 250 ? 'text-orange-600' : 'text-gray-500'}`}>
                                {data.careerObjectives.length}/300
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}