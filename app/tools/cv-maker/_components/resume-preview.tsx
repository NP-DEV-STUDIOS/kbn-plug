"use client"
import LekkerTemplate from "./templates/lekker"
import ModernTemplate from "@/app/tools/cv-maker/_components/templates/modern"
import ClassicTemplate from "@/app/tools/cv-maker/_components/templates/classic"
import CreativeTemplate from "@/app/tools/cv-maker/_components/templates/creative"
import MinimalTemplate from "@/app/tools/cv-maker/_components/templates/minimal"
import TechTemplate from "@/app/tools/cv-maker/_components/templates/tech"
import ElegantTemplate from "@/app/tools/cv-maker/_components/templates/elegant"
import { ResumeData } from "../types";


interface ResumePreviewProps {
    data: ResumeData
    templateId: string
}

export default function ResumePreview({ data, templateId }: ResumePreviewProps) {
    const renderTemplate = () => {
        switch (templateId) {
            case "lekker":
                return <LekkerTemplate data={data} />
            case "classic":
                return <ClassicTemplate data={data} />
            case "creative":
                return <CreativeTemplate data={data} />
            case "minimal":
                return <MinimalTemplate data={data} />
            case "tech":
                return <TechTemplate data={data} />
            case "elegant":
                return <ElegantTemplate data={data} />
            case "modern":
            default:
                return <ModernTemplate data={data} />
        }
    }

    return <div className="bg-white shadow-lg">{renderTemplate()}</div>
}