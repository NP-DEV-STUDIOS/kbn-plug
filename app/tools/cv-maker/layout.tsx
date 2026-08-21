import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Create a Free CV",
    description: "Create a Free CV. No hidden costs and fees"
}

const CVMakerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default CVMakerLayout