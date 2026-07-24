"use client"

import { Mail, Phone, Globe, Code, Terminal } from "lucide-react"
import Image from "next/image"
import { ResumeData } from "../../types";
import { formatDate } from "@/lib/utils"

interface TechTemplateProps {
    data: ResumeData
}

/**
 * Tech Professional Template
 * Modern tech-focused design with blue accents
 */
export default function TechTemplate({ data }: TechTemplateProps) {


    return (
        <div className="bg-gray-50 min-h-250">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-6">
                        {data.personalInfo.photo && (
                            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-300 shrink-0">
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
                            <h1 className="text-4xl font-bold mb-2 font-mono">
                                {data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                            </h1>
                            <p className="text-xl text-blue-100 mb-4 flex items-center gap-2">
                                <Terminal className="h-5 w-5" />
                                {data.personalInfo.professionalTitle}
                            </p>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                {data.personalInfo.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <span className="truncate">{data.personalInfo.email}</span>
                                    </div>
                                )}
                                {data.personalInfo.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <span>{data.personalInfo.phone}</span>
                                    </div>
                                )}
                                {data.personalInfo.website && (
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4" />
                                        <span className="truncate">{data.personalInfo.website}</span>
                                    </div>
                                )}
                                {data.personalInfo.linkedin && (
                                    <div className="flex items-center gap-2">
                                        <span className="truncate">{data.personalInfo.linkedin}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Code className="h-5 w-5 text-blue-600" />
                                About
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
                        </div>
                    </section>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Technical Skills</h2>
                                {data.skills.map((skillCategory) => (
                                    <div key={skillCategory.id} className="mb-6">
                                        <h3 className="font-semibold text-blue-600 mb-3 text-sm uppercase tracking-wide">
                                            {skillCategory.category}
                                        </h3>
                                        <div className="space-y-3">
                                            {skillCategory.items.map((skill, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="font-mono text-gray-900">{skill.name}</span>
                                                        <span className="text-blue-600 font-medium">{skill.level}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-linear-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${skill.level}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="border-l-4 border-blue-400 pl-4">
                                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                            {edu.field && <p className="text-blue-600 font-medium">{edu.field}</p>}
                                            <p className="text-gray-700 text-sm">{edu.institution}</p>
                                            <p className="text-xs text-gray-500 font-mono">
                                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                            </p>
                                            {edu.gpa && <p className="text-xs text-blue-600 font-mono">GPA: {edu.gpa}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2">
                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Experience</h2>
                                <div className="space-y-8">
                                    {data.experience.map((exp, index) => (
                                        <div key={exp.id} className="relative">
                                            {index > 0 && <div className="absolute -top-4 left-6 w-0.5 h-8 bg-blue-200" />}
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                                    <span className="text-blue-600 font-bold font-mono">{index + 1}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                                            <p className="text-blue-600 font-semibold">{exp.company}</p>
                                                            {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                                                        </div>
                                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-mono">
                                                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                                        </span>
                                                    </div>
                                                    {exp.description && (
                                                        <div className="text-gray-700 leading-relaxed">
                                                            {exp.description.split("\n").map((line, lineIndex) => (
                                                                <p key={lineIndex} className="mb-2">
                                                                    {line}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* References */}
                        {data.references.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">References</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {data.references.map((ref) => (
                                        <div key={ref.id} className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                                            <h3 className="font-bold text-gray-900">{ref.name}</h3>
                                            <p className="text-blue-600 font-medium text-sm">{ref.title}</p>
                                            {ref.company && <p className="text-gray-700 text-sm">{ref.company}</p>}
                                            <div className="mt-2 text-xs text-gray-600 font-mono">
                                                {ref.email && <p>{ref.email}</p>}
                                                {ref.phone && <p>{ref.phone}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}