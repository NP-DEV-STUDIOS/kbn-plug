import { Cog, DownloadCloud, Laptop, LucideIcon } from 'lucide-react';
import React from 'react'

type Props = {}

const features: { icon: LucideIcon; title: string; content: string }[] = [
    {
        icon: Cog,
        title: "Intutive form",
        content: "An intuitive, user-friendly form, works offline and save your data automatically"
    },
    {
        icon: Laptop,
        title: "Live Preview",
        content: "See the changes live as you build your CV. on mobile, tap the eye icon, see your CV"
    },
    {
        icon: DownloadCloud,
        title: "Download PDF CV",
        content: "Save your CV to your phone or Desktop, or choose to send on WhatsApp"
    }
]

const Features = () => {
    return (
        <section className='section-container'>
            <div className='flex items-center gap-4 mb-8'>
                <h2 className='flex-1 w-full'>Why it works?</h2>
                <div className='relative w-full'>
                    <div className='h-4 w-4 bg-primary/80' />
                    <div className='h-[1.5px] w-full bg-zinc-400 absolute top-1/2 -translate-y-1/2 left-4' />
                </div>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
                {features.map(({ icon: Icon, title, content }, index) => (
                    <div key={index} className='bg-white shadow-md shadow-slate-300 p-4 text-center rounded-md'>
                        <Icon className='stroke-primary mx-auto mb-3' size={30} />
                        <h3 className='mb-2 tracking-tight'>{title}</h3>
                        <p className='text-[14px] text-slate-700 font-medium'>{content}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features