"use client"

import { Mail, Phone, MapPin, Award } from "lucide-react"
import Image from "next/image"
import { ResumeData } from "../../types";
import { formatDate } from "@/lib/utils"

interface ElegantTemplateProps {
    data: ResumeData
}

/**
 * Elegant Professional Template
 * Sophisticated design with gold accents
 */
export default function ElegantTemplate({ data }: ElegantTemplateProps) {


    return (
        <div className="bg-linear-to-br from-amber-50 to-yellow-50 min-h-250 font-serif">
            {/* Header */}
            <div className="bg-linear-to-r from-amber-100 to-yellow-100 border-b-4 border-amber-400 p-8">
                <div className="max-w-5xl mx-auto text-center">
                    {data.personalInfo.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400 mx-auto mb-6 shadow-lg">
                            <Image
                                src={data.personalInfo.photo || "/placeholder.svg"}
                                alt={data.personalInfo.fullName}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <h1 className="text-5xl font-bold text-amber-900 mb-3 tracking-wide">
                        {data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                    </h1>
                    <p className="text-2xl text-amber-700 mb-6 font-light italic">{data.personalInfo.professionalTitle}</p>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px bg-amber-400 w-20"></div>
                        <Award className="h-6 w-6 text-amber-600 mx-4" />
                        <div className="h-px bg-amber-400 w-20"></div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex justify-center items-center gap-8 text-amber-800">
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
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-8">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-10">
                        <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-8">
                            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Professional Summary</h2>
                            <div className="w-16 h-1 bg-amber-400 mx-auto mb-6"></div>
                            <p className="text-gray-700 leading-relaxed text-lg text-center italic">&ldquo;{data.personalInfo.summary}&rdquo;</p>
                        </div>
                    </section>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        {data.education.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-6">
                                <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">Education</h2>
                                <div className="w-12 h-1 bg-amber-400 mx-auto mb-6"></div>
                                <div className="space-y-6">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="text-center">
                                            <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                                            {edu.field && <p className="text-amber-700 font-medium italic">{edu.field}</p>}
                                            <p className="text-gray-700 font-medium">{edu.institution}</p>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                            </p>
                                            {edu.gpa && <p className="text-amber-600 font-medium text-sm">GPA: {edu.gpa}</p>}
                                            <div className="w-8 h-px bg-amber-300 mx-auto mt-4"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-6">
                                <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">Expertise</h2>
                                <div className="w-12 h-1 bg-amber-400 mx-auto mb-6"></div>
                                {data.skills.map((skillCategory) => (
                                    <div key={skillCategory.id} className="mb-6">
                                        <h3 className="font-bold text-amber-800 mb-3 text-center text-sm uppercase tracking-wider">
                                            {skillCategory.category}
                                        </h3>
                                        <div className="space-y-3">
                                            {skillCategory.items.map((skill, index) => (
                                                <div key={index} className="text-center">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="font-medium text-gray-900">{skill.name}</span>
                                                        <span className="text-amber-600">{skill.level}%</span>
                                                    </div>
                                                    <div className="w-full bg-amber-100 rounded-full h-2">
                                                        <div
                                                            className="bg-linear-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
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
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2">
                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-8">
                                <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Professional Experience</h2>
                                <div className="w-16 h-1 bg-amber-400 mx-auto mb-8"></div>
                                <div className="space-y-8">
                                    {data.experience.map((exp, index) => (
                                        <div key={exp.id} className="relative">
                                            {index > 0 && (
                                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-8 bg-amber-300" />
                                            )}
                                            <div className="text-center">
                                                <div className="inline-block bg-amber-100 rounded-full p-3 mb-4">
                                                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                                                <p className="text-lg text-amber-700 font-medium mb-2">{exp.company}</p>
                                                {exp.location && <p className="text-gray-600 mb-2">{exp.location}</p>}
                                                <p className="text-sm text-amber-600 font-medium mb-4">
                                                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                                </p>
                                                {exp.description && (
                                                    <div className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                                        {exp.description.split("\n").map((line, lineIndex) => (
                                                            <p key={lineIndex} className="mb-2">
                                                                {line}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* References */}
                        {data.references.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-6 mt-8">
                                <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">References</h2>
                                <div className="w-12 h-1 bg-amber-400 mx-auto mb-6"></div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {data.references.map((ref) => (
                                        <div key={ref.id} className="text-center border border-amber-200 rounded-lg p-4 bg-amber-50">
                                            <h3 className="font-bold text-gray-900">{ref.name}</h3>
                                            <p className="text-amber-700 font-medium italic">{ref.title}</p>
                                            {ref.company && <p className="text-gray-700">{ref.company}</p>}
                                            <div className="mt-3 text-sm text-gray-600">
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