"use client"

import { Mail, Phone, MapPin, Globe } from "lucide-react"
import type { ResumeData } from "../../types"
import { formatDate } from "@/lib/utils"

interface MinimalTemplateProps {
    data: ResumeData
}

/**
 * Minimal Clean Template
 * Simple and clean with plenty of white space
 */
export default function MinimalTemplate({ data }: MinimalTemplateProps) {


    return (
        <div className="p-12 bg-white min-h-250 max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
                <h1 className="text-6xl font-light text-gray-900 mb-4 tracking-tight">
                    {data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                </h1>
                <p className="text-2xl text-gray-600 font-light mb-8">{data.personalInfo.professionalTitle}</p>

                {/* Contact */}
                <div className="flex flex-wrap gap-8 text-gray-600">
                    {data.personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{data.personalInfo.email}</span>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{data.personalInfo.phone}</span>
                        </div>
                    )}
                    {data.personalInfo.address && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{data.personalInfo.address}</span>
                        </div>
                    )}
                    {data.personalInfo.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{data.personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed font-light max-w-3xl">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Experience</h2>
                    <div className="space-y-10">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-3">
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                                        <p className="text-lg text-gray-600">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-500 font-light">
                                        {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed font-light max-w-3xl">
                                        {exp.description.split("\n").map((line, index) => (
                                            <p key={index} className="mb-2">
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

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-lg text-gray-600">{edu.institution}</p>
                                    </div>
                                    <span className="text-gray-500 font-light">
                                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                    </span>
                                </div>
                                {edu.gpa && <p className="text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Skills</h2>
                    <div className="space-y-6">
                        {data.skills.map((skillCategory) => (
                            <div key={skillCategory.id}>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">{skillCategory.category}</h3>
                                <div className="flex flex-wrap gap-4">
                                    {skillCategory.items.map((skill, index) => (
                                        <span key={index} className="text-gray-700 font-light">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* References */}
            {data.references.length > 0 && (
                <section>
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">References</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.references.map((ref) => (
                            <div key={ref.id}>
                                <h3 className="text-lg font-medium text-gray-900">{ref.name}</h3>
                                <p className="text-gray-600">{ref.title}</p>
                                {ref.company && <p className="text-gray-600">{ref.company}</p>}
                                <div className="mt-2 text-sm text-gray-500">
                                    {ref.email && <p>{ref.email}</p>}
                                    {ref.phone && <p>{ref.phone}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}