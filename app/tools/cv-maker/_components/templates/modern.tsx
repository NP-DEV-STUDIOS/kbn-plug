"use client"

import { Mail, Phone, MapPin, Globe } from "lucide-react"
import Image from "next/image"
import type { ResumeData } from "../../types"
import { formatDate } from "@/lib/utils"

interface ModernTemplateProps {
    data: ResumeData
}

/**
 * Modern Professional Template
 * Clean design with teal accents and modern typography
 */
export default function ModernTemplate({ data }: ModernTemplateProps) {


    return (
        <div className="p-8 bg-white min-h-250 font-sans">
            {/* Header Section */}
            <div className="flex items-start gap-6 mb-8">
                {data.personalInfo.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shrink-0 border-4 border-teal-100">
                        <Image
                            src={data.personalInfo.photo || "/placeholder.svg"}
                            alt={data.personalInfo.fullName}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        <span className="text-teal-600">{data.personalInfo.firstName.toUpperCase()}</span>{" "}
                        <span className="text-gray-400 font-light">{data.personalInfo.lastName.toUpperCase()}</span>
                    </h1>
                    <p className="text-xl text-gray-600 font-medium mb-4">{data.personalInfo.professionalTitle}</p>

                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        {data.personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-teal-600" />
                                <span className="text-gray-700">{data.personalInfo.email}</span>
                            </div>
                        )}
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-teal-600" />
                                <span className="text-gray-700">{data.personalInfo.phone}</span>
                            </div>
                        )}
                        {data.personalInfo.address && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-teal-600" />
                                <span className="text-gray-700">{data.personalInfo.address}</span>
                            </div>
                        )}
                        {data.personalInfo.website && (
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-teal-600" />
                                <span className="text-gray-700">{data.personalInfo.website}</span>
                            </div>
                        )}
                        {data.personalInfo.linkedin && (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700">{data.personalInfo.linkedin}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Profile Section */}
                    {data.personalInfo.summary && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-4 border-b-2 border-teal-200 pb-2">PROFILE</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Career Objectives */}
                    {data.personalInfo.careerObjectives && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-4 border-b-2 border-teal-200 pb-2">OBJECTIVES</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.careerObjectives}</p>
                        </section>
                    )}

                    {/* Education Section */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-4 border-b-2 border-teal-200 pb-2">EDUCATION</h2>
                            <div className="space-y-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                                            {edu.degree} {edu.field && `IN ${edu.field.toUpperCase()}`}
                                        </h3>
                                        <p className="text-xs text-gray-600 mb-1">
                                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                        </p>
                                        <p className="text-xs text-gray-700 font-medium">{edu.institution}</p>
                                        {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
                                        {edu.gpa && <p className="text-xs text-teal-600 font-medium">GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* References Section */}
                    {data.references.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-4 border-b-2 border-teal-200 pb-2">REFERENCES</h2>
                            <div className="space-y-3">
                                {data.references.map((ref) => (
                                    <div key={ref.id} className="text-xs">
                                        <p className="font-semibold text-gray-900">{ref.name}</p>
                                        <p className="text-gray-600">{ref.title}</p>
                                        {ref.company && <p className="text-gray-600">{ref.company}</p>}
                                        {ref.email && <p className="text-gray-600">{ref.email}</p>}
                                        {ref.phone && <p className="text-gray-600">{ref.phone}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="col-span-2 space-y-8">
                    {/* Work Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-6 border-b-2 border-teal-200 pb-2">WORK EXPERIENCE</h2>
                            <div className="space-y-6">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                                                <p className="text-base font-medium text-teal-600">{exp.company}</p>
                                                {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                                            </div>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <div className="text-sm text-gray-700 leading-relaxed">
                                                {exp.description.split("\n").map((line, index) => (
                                                    <p key={index} className="mb-1">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-teal-600 mb-6 border-b-2 border-teal-200 pb-2">SKILLS</h2>
                            <div className="space-y-6">
                                {data.skills.map((skillCategory) => (
                                    <div key={skillCategory.id}>
                                        <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">
                                            {skillCategory.category}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {skillCategory.items.map((skill, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                                        <span className="text-xs text-gray-500">{skill.level}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${skill.level}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}