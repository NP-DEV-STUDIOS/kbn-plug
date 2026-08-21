import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="container mx-auto max-w-5xl px-4 md:flex items-center gap-6 lg:gap-10">
            <div className="py-12 md:py-12 flex-1">
                <div className="bg-green-200/50 p-2 rounded-full mb-4 block md:inline-block w-fit mx-auto space-x-2">
                    <Badge className="bg-green-300 p-2 text-xs md:text-sm">Developer</Badge>
                    <span className="text-xs md:text-sm">Built and maintained by <Link className="text-blue-500 font-bold underline" href={"https://perfectnkosi.vercel.app"}>Perfect Nkosi</Link></span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold leading-[1.6] mb-4 text-center md:text-left">
                    Land your dream job with our AI-powered CV builder.
                </h1>
                <p className="my-4 text-sm md:text-base text-center md:text-left">
                    Create a professional resume in minutes with our AI-powered tools.
                </p>

                <div className={"flex flex-col md:flex-row gap-4"}>
                    <Link href={"/tools/cv-maker"} className="block md:inline-block text-center bg-black text-white px-6 py-4 rounded-xl">Create my CV</Link>
                    <Link href={"/jobs"} className={"block md:inline-block text-center bg-slate-300 text-slate-600 px-6 py-4 rounded-xl"}>Looking for a job?</Link>
                </div>
            </div>


            <div className="relative flex-1 w-full min-h-64 md:min-h-96 lg:min-h-full self-end overflow-hidden">
                <div className="relative w-full h-full">
                    {/* Main Image */}
                    <div className="opacity-0-initial animate-scaleIn animation-delay-200 relative z-10 w-full h-full flex items-center justify-center">
                        <div className="relative w-full aspect-square max-w-xs md:max-w-sm lg:max-w-none">
                            <Image
                                src="/hero-woman.png"
                                alt="Professional woman using job search app"
                                width={800}
                                height={800}
                                className="rounded-3xl w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Email Notification Card */}
                    <div className="opacity-0-initial animate-slideInBounce animation-delay-500 absolute top-[5%] left-2 md:left-[-15%] lg:left-[0%] z-20 animate-float">
                        <div className="bg-card rounded-xl shadow-xl p-2 md:p-3 flex items-start gap-2 md:gap-3 w-fit max-w-xs">
                            <div className="w-6 md:w-8 h-6 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail className="w-3 md:w-4 h-3 md:h-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs md:text-sm font-semibold text-foreground">
                                    Congrats!
                                </p>
                                <p className="text-[10px] md:text-xs text-muted-foreground">
                                    You have got an Email
                                </p>
                            </div>
                            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-primary shrink-0 animate-ping"></div>
                        </div>
                    </div>

                    {/* Live Badge */}
                    <div className="opacity-0-initial animate-fadeInRight animation-delay-600 absolute top-[20%] right-2 md:right-[-10%] lg:right-[0%] z-20">
                        <div className="bg-card rounded-lg shadow-lg px-2 md:px-3 py-1.5 md:py-2 flex items-center gap-2">
                            <div className="w-5 md:w-10 h-5 md:h-6 rounded bg-red-500 flex items-center justify-center shrink-0 animate-pulse">
                                <span className="text-white text-[8px] md:text-[10px] font-bold">
                                    LIVE
                                </span>
                            </div>
                            <span className="text-[10px] md:text-xs text-foreground font-medium hidden sm:inline">Status</span>
                        </div>
                    </div>

                    {/* Job Holders Badge */}
                    <div className="opacity-0-initial animate-slideInBounce animation-delay-700 absolute bottom-[15%] md:bottom-[30%] lg:bottom-[35%] right-2 md:right-[-15%] lg:right-[0%] z-20 animate-floatDelayed">
                        <div className="bg-card rounded-full shadow-xl px-2 md:px-4 py-1.5 md:py-2 flex items-center gap-2">
                            <span className="text-[10px] md:text-xs font-medium text-primary whitespace-nowrap">10k+</span>
                            <span className="text-[9px] md:text-xs text-muted-foreground hidden sm:inline">
                                Get job
                            </span>
                            <div className="flex -space-x-1.5 md:-space-x-2 shrink-0">
                                <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-orange-400 border-[1.5px] md:border-2 border-card"></div>
                                <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-blue-400 border-[1.5px] md:border-2 border-card"></div>
                                <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-pink-400 border-[1.5px] md:border-2 border-card"></div>
                                <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-muted border-[1.5px] md:border-2 border-card flex items-center justify-center shrink-0">
                                    <span className="text-[7px] md:text-[8px] text-muted-foreground">
                                        +
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Bubble */}
                    <div className="opacity-0-initial animate-fadeInUp animation-delay-800 absolute bottom-[8%] md:bottom-[10%] left-2 md:left-[5%] lg:left-[10%] z-20">
                        <div className="space-y-1.5 md:space-y-2 w-fit max-w-35 md:max-w-xs">
                            <div className="bg-card rounded-xl rounded-bl-none shadow-lg p-2 md:p-3">
                                <p className="text-[10px] md:text-xs text-foreground font-medium">Hi,</p>
                                <p className="text-[9px] md:text-xs text-muted-foreground">
                                    I am looking for a job, could you explain more?
                                </p>
                            </div>
                            <div className="bg-accent rounded-xl rounded-br-none shadow-lg p-1.5 md:p-2 ml-auto w-fit">
                                <p className="text-[8px] md:text-[10px] text-accent-foreground">3:52 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero