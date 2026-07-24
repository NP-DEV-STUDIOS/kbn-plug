"use client"

import { Mail, Phone, Globe, Star } from "lucide-react"
import Image from "next/image"
import { ResumeData } from "../../types";
import { formatDate } from "@/lib/utils"

interface CreativeTemplateProps {
    data: ResumeData
}

/**
 * Creative Designer Template
 * Bold design with vibrant colors for creative professionals
 */
export default function CreativeTemplate({ data }: CreativeTemplateProps) {


    return (
        <div className="bg-linear-to-br from-purple-50 to-pink-50 min-h-250">
            {/* Header Section */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white p-8">
                <div className="flex items-center gap-6">
                    {data.personalInfo.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                            <Image
                                src={data.personalInfo.photo || "/placeholder.svg"}
                                alt={data.personalInfo.fullName}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold mb-2">
                            {data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                        </h1>
                        <p className="text-2xl font-light mb-4 text-purple-100">{data.personalInfo.professionalTitle}</p>

                        {/* Contact Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {data.personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {data.personalInfo.email}
                                </div>
                            )}
                            {data.personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {data.personalInfo.phone}
                                </div>
                            )}
                            {data.personalInfo.website && (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    {data.personalInfo.website}
                                </div>
                            )}
                            {data.personalInfo.linkedin && (
                                <div className="flex items-center gap-2">
                                    {data.personalInfo.linkedin}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                                <Star className="h-6 w-6" />
                                About Me
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{data.personalInfo.summary}</p>
                        </div>
                    </section>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-bold text-purple-600 mb-4">Skills</h2>
                                {data.skills.map((skillCategory) => (
                                    <div key={skillCategory.id} className="mb-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">{skillCategory.category}</h3>
                                        <div className="space-y-2">
                                            {skillCategory.items.map((skill, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="font-medium">{skill.name}</span>
                                                        <span className="text-gray-500">{skill.level}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full"
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
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-bold text-purple-600 mb-4">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="border-l-4 border-purple-400 pl-4">
                                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                            {edu.field && <p className="text-purple-600 font-medium">{edu.field}</p>}
                                            <p className="text-gray-700">{edu.institution}</p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                            </p>
                                            {edu.gpa && <p className="text-sm text-purple-600">GPA: {edu.gpa}</p>}
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
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-purple-600 mb-6">Experience</h2>
                                <div className="space-y-6">
                                    {data.experience.map((exp, index) => (
                                        <div key={exp.id} className="relative">
                                            {index > 0 && <div className="absolute -top-3 left-4 w-0.5 h-6 bg-purple-300" />}
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                                            <p className="text-lg text-purple-600 font-medium">{exp.company}</p>
                                                            {exp.location && <p className="text-gray-600">{exp.location}</p>}
                                                        </div>
                                                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
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
                    </div>
                </div>

                {/* References */}
                {data.references.length > 0 && (
                    <section className="mt-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-purple-600 mb-4">References</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {data.references.map((ref) => (
                                    <div key={ref.id} className="border border-purple-200 rounded-lg p-4">
                                        <h3 className="font-bold text-gray-900">{ref.name}</h3>
                                        <p className="text-purple-600 font-medium">{ref.title}</p>
                                        {ref.company && <p className="text-gray-700">{ref.company}</p>}
                                        {ref.email && <p className="text-gray-600 text-sm">{ref.email}</p>}
                                        {ref.phone && <p className="text-gray-600 text-sm">{ref.phone}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}