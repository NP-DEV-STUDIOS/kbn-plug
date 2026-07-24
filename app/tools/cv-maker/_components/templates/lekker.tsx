import React, { useState } from 'react'
import { ResumeData } from '../../types'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { useResume } from '../../context/resume-context'

type LekkerTemplateProps = {
    data: ResumeData
}

const LekkerTemplate = ({ data }: LekkerTemplateProps) => {
    const [needTemplete, setNeedTemplate] = useState(false)
    const { setSelectedTemplate } = useResume()

    return (
        <div className='relative p-8 bg-white min-h-250'>
            <header className='border-b-2 pb-2'>
                <h1 className='capitalize font-bold text-4xl text-center'>carriculum vitae of<br />{data.personalInfo.fullName}</h1>
            </header>
            <section>
                <h3 className='text-lg font-semibold'>Personal Details</h3>
                <div className='grid grid-cols-2'>
                    <div>
                        <p>Name</p>
                        <p>Surname</p>
                        <p>Phone Number</p>
                    </div>
                    <div>
                        <p>{data.personalInfo.firstName}</p>
                        <p>{data.personalInfo.lastName}</p>
                        <p>{data.personalInfo.phone}</p>
                    </div>
                </div>
                <p className='text-3xl'>
                    {needTemplete ? "Udakiwe mshana 😂😂😂" : "Uhm yeah... I'm not finishing this template😒😒😒 Just included it as an example of what NOT TO DO!"}
                </p>
                <Dialog >
                    {!needTemplete && <DialogTrigger className={buttonVariants({
                        size: "lg"
                    })}>I want this template</DialogTrigger>}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>😒😒😒PLEASE DON'T😒😒😒</DialogTitle>
                            <DialogDescription>I understand that it's hard to let go of horrible habits. Say it with me "This layout is BAD". Maybe just use the Classic Executive templete</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button onClick={() => {
                                    setNeedTemplate(true)
                                }}>I don't care...still want the template</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>
            {needTemplete && <div className='absolute left-1/3 -right-1/2 top-0 text-red-500 text-[20rem] animate-pulse'>X</div>}
            {needTemplete && <Button onClick={() => setSelectedTemplate("classic")}>Click here to use a SERIOUS TEMPLATE</Button>}
        </div>
    )
}

export default LekkerTemplate