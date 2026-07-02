import { cn } from "@/lib/utils";
import { Plug } from "lucide-react";
import localFont from "next/font/local";

const logoFont = localFont({
    src: "../../public/fonts/qurova/QurovaDEMO-SemiBold.otf"
})

const Logo = () => {
    return (
        <div>
            <p className={cn("flex items-center text-2xl", logoFont.className)}>
                <span>KBN</span>
                <Plug />
                <span>PLUG</span>
            </p>
            <small className="font-poppins">1245 Youth Empowerment</small>
        </div>
    )
}

export default Logo;