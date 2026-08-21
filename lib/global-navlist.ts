import { IconType } from "react-icons/lib";
import {
    LucideProps,
    LaptopMinimal,
    BriefcaseBusiness,
    Sparkles,
    BookOpen,
    Check,
    Settings2,
    Trophy,
    Car,
    UserRound,
} from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTiktok } from "react-icons/bi";

type ProductProps = {
    title: string
    description: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | IconType
    href: string
}

type socialLink = {
    icon: IconType
    text: string
}

const navlist: { href: string; label: string }[] = [
    {
        label: "Jobs",
        href: "/jobs"
    },
    {
        label: "News",
        href: "/news"
    }
]

const product = [
    {
        id: "vision",
        title: "Vision",
        description: "A South Africa where every young person can get hired, regardless of data or background.",
        icon: Trophy,
    },
    {
        id: "mission",
        title: "Mission",
        description: "To provide a free, offline-first career platform built by SA youth, for SA Youth",
        icon: Car,
    },
    {
        id: "about",
        title: "The Developer",
        description: "Developed by Perfect Nkosi from Kabokweni (1245). Actively maintained",
        icon: UserRound,
    },
]

const productsLeft: ProductProps[] = [
    { title: "CV Maker", description: "Create and download ATS CVs", icon: LaptopMinimal, href: "/tools/cv-maker" },
    // { title: "AI Interview Assistant", icon: Sparkles, href: "#" },
    { title: "Jobs", description: "Browse real opportunities across Mzansi", icon: BriefcaseBusiness, href: "/tools/job-board", },

]

const productsRight: ProductProps[] = [
    // { title: "Study Notes", icon: BookOpen, href: "/resources/study-notes" },
]

const features = [
    { text: "Quick cover letter generation from CV data", icon: Sparkles },
    { text: "ATS compatibility checks", icon: Check },
    { text: "Expert tips and analysis", icon: Settings2 },
]

const socialLinks: socialLink[] = [
    {
        icon: BiLogoFacebook,
        text: "KBN PLUG"
    },
    {
        icon: BiLogoInstagram,
        text: "@KBN_PLUG"
    },
    {
        icon: BiLogoTiktok,
        text: "@KBN_PLUG"
    },
]

export { product, productsLeft, productsRight, features, navlist, socialLinks }