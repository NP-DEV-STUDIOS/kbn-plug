"use client"

import type React from "react"
import { useRef } from "react"

// Components
import PersonalInfoSidebar from "@/app/tools/cv-maker/_components/personal-info-sidebar"
import WorkExperienceForm from "@/app/tools/cv-maker/_components/forms/work-experience-form"
import EducationForm from "@/app/tools/cv-maker/_components/forms/education-form"
import SkillsForm from "@/app/tools/cv-maker/_components/forms/skills-form"
import ReferencesForm from "@/app/tools/cv-maker/_components/forms/references-form"
import TemplateSelector from "@/app/tools/cv-maker/_components/template-selector"
import ResumePreview from "@/app/tools/cv-maker/_components/resume-preview"
import GuidancePanel from "@/app/tools/cv-maker/_components/panels/guidance-panel"
import AnalysisPanel from "@/app/tools/cv-maker/_components/panels/analysis-panel"
import MatchingPanel from "@/app/tools/cv-maker/_components/panels/matching-panel"
import DesignPanel from "@/app/tools/cv-maker/_components/panels/design-panel"
import CoverLetterPanel from "@/app/tools/cv-maker/_components/panels/cover-letter-panel"

// Context and Hooks
import { ResumeProvider, useResume } from "./context/resume-context"
import { usePDFExport } from "./hooks/use-pdf-export"
import { useDataImportExport } from "./hooks/use-data-import-export"
import { useNavigation } from "./hooks/use-navigation"

// UI Components
import Sidebar from "@/app/tools/cv-maker/_components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/shared/navbar";
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Eye } from "lucide-react"
import {BiReset} from "react-icons/bi";

/**
 * Main content component that uses the resume context
 * Handles the rendering of different tabs and sections
 */
function ResumeBuilderContent() {
    const resumeRef = useRef<HTMLDivElement>(null)
    const { resumeData, updateResumeSection, resetResumeData, selectedTemplate, setSelectedTemplate } = useResume()
    const { exportPDF, isExporting } = usePDFExport(resumeData, resumeRef)
    const { exportJSON } = useDataImportExport(resumeData, (data) => {
        Object.keys(data).forEach((key) => {
            updateResumeSection(key as keyof typeof data, data[key as keyof typeof data])
        })
    })
    const { activeTab, activeSidebarSection, changeTab, changeSidebarSection, sidebarSections } = useNavigation()

    /**
     * Clear all resume data
     */
    const handleClearData = () => {
        resetResumeData()
    }

    /**
     * Render the appropriate sidebar content based on active section
     */
    const renderSidebarContent = () => {
        switch (activeSidebarSection) {
            case "basic-info":
                return (
                    <PersonalInfoSidebar
                        data={resumeData.personalInfo}
                        onChange={(data) => updateResumeSection("personalInfo", data)}
                        onExportPDF={exportPDF}
                        onExportJSON={exportJSON}
                        onClearData={handleClearData}
                        isExporting={isExporting}
                    />
                )
            case "work-experience":
                return (
                    <WorkExperienceForm
                        data={resumeData.experience}
                        onChange={(data) => updateResumeSection("experience", data)}
                    />
                )
            case "education":
                return (
                    <EducationForm
                        data={resumeData.education}
                        onChange={(data) => updateResumeSection("education", data)}
                    />
                )
            case "skills":
                return (
                    <SkillsForm
                        data={resumeData.skills}
                        onChange={(data) => updateResumeSection("skills", data)}
                    />
                )
            case "references":
                return (
                    <ReferencesForm
                        data={resumeData.references}
                        onChange={(data) => updateResumeSection("references", data)}
                    />
                )
            case "templates":
                return (
                    <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        onTemplateChange={setSelectedTemplate}
                    />
                )
            default:
                return null
        }
    }

    /**
     * Render the main content based on the active tab
     */

    const renderMainContent = () => {
        switch (activeTab) {
            case "fill-in":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <div className="relative h-[10vh] flex items-center overflow-x-auto">
                            {sidebarSections.map(({ id, icon: Icon, label, color }, index) => (
                                <div key={id} className="flex items-center">
                                    <Button
                                        onClick={() => changeSidebarSection(id)}
                                        variant={"ghost"}
                                        className={`px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium rounded-lg lg:rounded-xl transition-all duration-200 transform hover:scale-105 whitespace-nowrap ${activeSidebarSection === id
                                            ? `font-medium`
                                            : "text-slate-500"
                                            }`}
                                    >
                                        <Icon size={32} className={cn(`[&_svg:not([class*='size-'])]:size-4" p-2 rounded-full text-white`)}
                                            style={{
                                                backgroundColor: activeSidebarSection === id ? color : "#45556c"
                                            }}
                                        />
                                        <span style={{ color: activeSidebarSection === id ? color : "#45556c" }}>{label}</span>
                                    </Button>
                                    {index < sidebarSections.length - 1 ? <div className="h-0.5 w-10 bg-primary" /> : null}
                                </div>

                            ))}
                        </div>
                        <div className="flex flex-col lg:flex-row h-[calc(100vh-20vh-48px)] w-full overflow-hidden">
                            <div className="w-full lg:w-2/5  overflow-hidden overflow-y-auto">
                                {renderSidebarContent()}
                            </div>

                            {/* Resume Preview */}
                            <div className="hidden max-w-4xl mx-auto w-full lg:w-3/5 relative bg-linear-to-br from-gray-50 to-white lg:flex flex-col overflow-hidden flex-1 overflow-y-auto p-4 lg:p-6">
                                <ResumePreview data={resumeData} templateId={selectedTemplate} />
                            </div>
                        </div>
                    </div>
                )
            case "guidance":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <GuidancePanel resumeData={resumeData} onUpdateData={(data) => {
                            Object.keys(data).forEach((key) => {
                                updateResumeSection(key as keyof typeof data, data[key as keyof typeof data])
                            })
                        }} />
                    </div>
                )
            case "analysis":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <AnalysisPanel resumeData={resumeData} />
                    </div>
                )
            case "matching":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <MatchingPanel resumeData={resumeData} />
                    </div>
                )
            case "design":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <DesignPanel
                            resumeData={resumeData}
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={setSelectedTemplate}
                            resumeRef={resumeRef as React.RefObject<HTMLDivElement>}
                        />
                    </div>
                )
            case "cover-letter":
                return (
                    <div className="overflow-hidden lg:px-6">
                        <CoverLetterPanel resumeData={resumeData} />
                    </div>
                )
            default:
                return null
        }
    }



    return (
        <div className="flex flex-col h-[88dvh] bg-linear-to-br from-slate-50 to-blue-50 lg:gap-0">
            {/* Navigation Sidebar - Desktop */}
            <div className="flex items-center h-[8vh] justify-between sticky top-[10vh] z-10">
                <Sidebar setActiveTab={changeTab} activeTab={activeTab} />
                <div className="">
                    <Button size={"sm"} variant={"outline"} onClick={resetResumeData}>
                        <BiReset /> <span className={"text-sm"}>Reset</span>
                    </Button>
                    <MobilePreview />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white/80 backdrop-blur-sm flex-1 w-full  ">
                {renderMainContent()}
            </div>
        </div>
    )
}

const MobilePreview = () => {
    const { resumeData, selectedTemplate } = useResume()
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden bg-slate-500 text-white p-2 rounded-xl cursor-pointer hover:bg-slate-600"><Eye size={20} /></SheetTrigger>
            <SheetContent className="data-[side=right]:w-screen">
                <SheetTitle>Preview</SheetTitle>
                <div className="max-w-4xl mx-auto w-full relative bg-linear-to-br from-gray-50 to-white lg:flex flex-col overflow-hidden flex-1 overflow-y-auto p-4 lg:p-6">
                    <ResumePreview data={resumeData} templateId={selectedTemplate} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

/**
 * Main Resume Builder Application Component
 * Provides the resume context and renders the main application
 */
export default function ResumeBuilder() {
    return (
        <ResumeProvider>
            <Navbar />
            <ResumeBuilderContent />
        </ResumeProvider>
    )
}
