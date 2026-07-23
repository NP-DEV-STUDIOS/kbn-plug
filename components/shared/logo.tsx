import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Plug } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import { CSSProperties } from "react";

const logoFont = localFont({
    src: "../../public/fonts/qurova/QurovaDEMO-SemiBold.otf"
})

type LogoProps = {
    iconClassName?: string
    kbnClassName?: ClassValue,
    plugClassName?: ClassValue
}

const Logo = ({ iconClassName, kbnClassName, plugClassName }: LogoProps) => {
    return (
        <div className="flex flex-col items-center">
            <p className={cn("flex items-center text-2xl", logoFont.className)}>
                <span className={cn("text-primary", kbnClassName)}>KBN</span>
                <Plug className={iconClassName} />
                <span className={cn(plugClassName)}>PLUG</span>
            </p>
            <small className="font-poppins">1245 Youth Empowerment</small>
        </div>
    )
}

const LogoWithLink = () => {
    return (
        <Link href={"/"}>
            <Logo />
        </Link>
    )
}

export { Logo, LogoWithLink }