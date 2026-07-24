import { Button } from "@/components/ui/button"
import { MdCompare, MdEditDocument, MdFormatPaint, MdLibraryBooks, MdLightbulb, MdMenuOpen, MdSwapHoriz } from "react-icons/md"
import { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type NavigationTab = "fill-in" | "guidance" | "analysis" | "matching" | "design" | "cover-letter"

interface SidebarProps {
    activeTab: NavigationTab
    setActiveTab: (tab: NavigationTab) => void
}


const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {

    const tabs: Array<{
        id: NavigationTab
        label: string
        icon: IconType
        description: string
    }> = [
            {
                id: "fill-in",
                label: "Fill in",
                icon: MdEditDocument,
                description: "Enter your information"
            },
            {
                id: "guidance",
                label: "Guidance",
                icon: MdLightbulb,
                description: "Get expert tips"
            },
            {
                id: "analysis",
                label: "Analysis",
                icon: MdCompare,
                description: "Analyze your resume"
            },
            {
                id: "matching",
                label: "Matching",
                icon: MdSwapHoriz,
                description: "Job matching"
            },
            {
                id: "design",
                label: "Design",
                icon: MdFormatPaint,
                description: "Customize appearance"
            },
            {
                id: "cover-letter",
                label: "Cover Letter",
                icon: MdLibraryBooks,
                description: "Create cover letter"
            },
        ]

    return (
        <Sheet>
            <SheetTrigger className="flex items-center gap-1 bg-slate-500 hover:bg-slate-700 cursor-pointer transition-colors duration-200 p-2 rounded-lg text-white ml-4"><MdMenuOpen size={20} /><span className="text-xs hidden lg:inline">Toggle Sidebar</span></SheetTrigger>
            <SheetContent side="left" className="p-6">
                <SheetTitle>CV Maker</SheetTitle>
                <SheetDescription>version 1.0</SheetDescription>
                <div className="overflow-y-auto space-y-1 flex flex-col gap-8 h-full">
                    {tabs.map(({ id, label, icon: Icon, description }) => (
                        <Button
                            key={id}
                            variant="ghost"
                            className="justify-start group rounded-xl cursor-pointer group"
                            onClick={() => setActiveTab(id)}
                        >
                            <div className={cn("flex items-center gap-4")}>
                                <Icon size={20} className={cn("[& _svg:not([class*='size-'])]:size-4", activeTab === id ? "fill-primary" : "", "transition-all duration-200 group-hover:fill-primary")} />
                                <div className={cn("text-left min-w-0")}>
                                    <p className={cn(activeTab === id ? "font-bold" : "", "group-hover:font-bold")}>{label}</p>
                                    <small className="text-slate-400 text-xs group-hover:text-slate-500 transition-colors duration-200">
                                        {description}
                                    </small>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}



export default Sidebar
