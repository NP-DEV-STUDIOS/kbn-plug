const points: { id: string; title: string; desc: string }[] = [
    {
        id: "01",
        title: "100% Free",
        desc: "No Paywall. No \"Pay to download\""
    },
    {
        id: "02",
        title: "No Signup Needed",
        desc: "Guest mode. Your data stays on your phone. Works fully offline"
    },
    {
        id: "03",
        title: "Made by SA Youth For SA Youth",
        desc: "Created by a young person, for SA youth. I know the struggle"
    }
]

const Why = () => {
    return (
        <section className='bg-white py-12'>
            <div className='section-container'>
                <h2>More than just another CV maker.</h2>

                <div className="mt-8">
                    {points.map(({ id, title, desc }, index) => (
                        <div key={id}>
                            <div className="flex items-start">
                                <div className="text-6xl font-black tracking-widest text-primary">{id}</div>
                                <div>
                                    <h3 className="">{title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                            {index < points.length - 1 && <div className="w-0.5 h-30 bg-slate-400" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Why