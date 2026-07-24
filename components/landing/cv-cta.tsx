import Image from 'next/image'
import Link from 'next/link'
import DotGrid from '../shared/dot-grid'


const CVCta = () => {
    return (
        <section className='relative bg-linear-90 from-primary to-indigo-600'>
            <div className='absolute left-5 bottom-2 md:left-10 md:top-10'>
                <DotGrid color='#ECF1F4' />
            </div>
            <div className='hidden md:block absolute right-5 bottom-2'>
                <DotGrid color='#ECF1F4' />
            </div>
            <div className='container mx-auto max-w-5xl px-4 md:flex items-center gap-6 lg:gap-10'>
                <div className="hidden md:block relative w-full aspect-square max-w-xs md:max-w-sm lg:max-w-none">
                    <Image
                        src="/hero-woman.png"
                        alt="Professional woman using job search app"
                        width={800}
                        height={800}
                        className="rounded-3xl w-full h-full object-cover"
                        priority
                    />
                </div>
                <div className='space-y-4 p-8 text-center md:text-left'>
                    <h2 className={"text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"}>
                        Kickstart your future with a FREE CV today.
                    </h2>
                    <p className='text-slate-200'>No credit card required. Only takes a couple of minutes</p>
                    <Link href={"/tools/cv-maker"} className='inline-block bg-teal-500 text-white px-6 py-4 rounded-xl'>Create my CV</Link>
                </div>
            </div>
        </section>
    )
}

export default CVCta