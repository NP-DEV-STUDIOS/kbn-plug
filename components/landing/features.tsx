"use client"
import {useEffect, useState, useRef} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FaCheck} from "react-icons/fa6";

type Feature = {
    title: string;
    subFeatures: string[]
    color: string;
}

const features: Feature[] = [
    {
        title: "Professional Guidelines",
        subFeatures: [
            "content tips",
            "Formating Suggestions",
            "Industry Specific Guidelines"
        ],
        color:  "rgba(139,92,246,0.3)"
    },
    {
        title: "Analysis",
        subFeatures: [
            "ATS compatibility check",
            "Readability recommendations",
            "Keyword analysis"
        ],
        color:  "rgba(245,158,11,0.3)"
    },
    {
        title: "Job Matching",
        subFeatures: [
            "Job Analyser",
            "Save favourite Jobs",
            "Improvements (Based on current markets)"
        ],
        color: "rgba(6,182,212,0.3)"
    },
    {
        title: "Professional Templates",
        subFeatures: [
            "Modern",
            "Classic",
            "And more premium templates",
        ],
        color: "rgba(99,102,241,0.3)"
    },
    {
        title: "AI Cover Letter Generator",
        subFeatures: [
            "AI Generator",
            "Pre-made Cover Letter Templates",
            "Writing tips"
        ],
        color: "rgba(132,204,22,0.3)"
    }
]

const Features = () => {
    const [currentCard, setCurrentCard] = useState<Feature>(features[0]);
    const NEXT_FEATURE_DELAY = 5000
    const index = useRef(0)

    // Automatically showing next feature after a delay of 5 seconds
    useEffect(() => {
        setInterval(() => {
           if (index.current <= features.length - 1) {
               setCurrentCard(features[index.current]);
               index.current++
           } else {
               index.current = 0
               setCurrentCard(features[index.current]);
           }
        }, NEXT_FEATURE_DELAY)

    }, [])

    return (
        <section className={"bg-white"}>
            <div className={"section-container space-y-4 p-8 grid md:grid-cols-2"}>
                <div className={"text-center md:text-left"}>
                    <h2 className={"text-3xl sm:text-4xl font-bold text-slate-800 mb-4 text-balance leading-snug"}>
                        It&apos;s not just<br/><span className={"text-primary"}>&quot;another CV Maker&quot;</span>😎 <br />
                        There&apos;s more!
                    </h2>
                    <div className={"space-y-4 space-x-4"}>
                        {features.map((feature, index) => (
                            <Button key={index} style={{backgroundColor: currentCard.title === feature.title ? `${feature.color}`: "#fff"}} onClick={() => {
                                setCurrentCard(() => {
                                    return features.find(item => item.title === feature.title)!
                                });
                            }} >
                                <FaCheck />
                                {feature.title}</Button>
                        ))}
                    </div>
                </div>
                <div className={""}>
                    <FeatureCard title={currentCard.title} subFeatures={currentCard.subFeatures} color={currentCard.color}/>
                </div>
            </div>
        </section>
    );
};

type CardProps = {
    title: string;
    subFeatures: string[],
    color: string;
}

const FeatureCard = ({title, subFeatures, color}: CardProps) => {
    return (
        <Card className={`bg-[${color}] ring-0`} style={{backgroundColor: `${color}`}}>
            <CardHeader>
                <CardTitle className={"font-bold"}>{title}</CardTitle>
            </CardHeader>
            <CardContent className={"flex gap-4 flex-wrap"}>
                {subFeatures.map((feature, index) => (
                    <div key={index} className={""}>
                        <span className={"px-4 py-1 rounded-xl"} style={{ backgroundColor: `${color}`}}>{feature}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Features;
