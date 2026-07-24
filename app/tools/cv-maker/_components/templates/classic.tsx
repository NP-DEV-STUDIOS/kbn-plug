"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { ResumeData } from "../../types"
import { formatDate } from "@/lib/utils"

interface ClassicTemplateProps {
    data: ResumeData
}

/**
 * Classic Executive Template
 * Traditional professional layout with serif fonts
 */
export default function ClassicTemplate({ data }: ClassicTemplateProps) {


    return (
        <div className="p-8 bg-white min-h-250">
            {/* Header Section */}
            <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                </h1>
                <p className="text-xl text-gray-700 mb-4">{data.personalInfo.professionalTitle}</p>

                {/* Contact Info */}
                <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
                    {data.personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {data.personalInfo.email}
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {data.personalInfo.phone}
                        </div>
                    )}
                    {data.personalInfo.address && (
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {data.personalInfo.address}
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {data.personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1">PROFESSIONAL SUMMARY</h2>
                    <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">
                        PROFESSIONAL EXPERIENCE
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                        <p className="font-semibold text-gray-700">{exp.company}</p>
                                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed">
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

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">EDUCATION</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="font-semibold text-gray-700">{edu.institution}</p>
                                        {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                        {edu.gpa && <div>GPA: {edu.gpa}</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">SKILLS</h2>
                    <div className="space-y-4">
                        {data.skills.map((skillCategory) => (
                            <div key={skillCategory.id}>
                                <h3 className="font-semibold text-gray-900 mb-2">{skillCategory.category}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {skillCategory.items.map((skill, index) => (
                                        <span key={index} className="text-gray-700">
                                            {skill.name}
                                            {index < skillCategory.items.length - 1 && " •"}
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
                    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">REFERENCES</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.references.map((ref) => (
                            <div key={ref.id}>
                                <h3 className="font-bold text-gray-900">{ref.name}</h3>
                                <p className="text-gray-700">{ref.title}</p>
                                {ref.company && <p className="text-gray-700">{ref.company}</p>}
                                {ref.email && <p className="text-gray-600 text-sm">{ref.email}</p>}
                                {ref.phone && <p className="text-gray-600 text-sm">{ref.phone}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}