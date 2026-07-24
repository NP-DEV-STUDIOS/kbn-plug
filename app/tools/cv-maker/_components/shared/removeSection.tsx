import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MdDelete } from "react-icons/md"
import { Education, Reference, SkillsCategory, WorkExperience } from "../../types";

interface RemoveCategory {
    id: string; // ID of item to remove
    sectionTitle: string;
    data: SkillsCategory[] | WorkExperience[] | Education[] | Reference[]
    setExpandedItems: React.Dispatch<React.SetStateAction<Set<string>>>
    onChange: (data: any[]) => void
}

const RemoveCategory = ({ id, sectionTitle, data, setExpandedItems, onChange }: RemoveCategory) => {

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer bg-background grow-0 shrink-0 p-2 rounded-lg" onClick={(e) => {
                e.stopPropagation()
            }}><MdDelete className="fill-red-500" /></DialogTrigger>
            <DialogContent>
                <DialogHeader className="gap-6">
                    <MdDelete className="fill-red-500 self-center" size={20} />
                    <DialogTitle className="text-center">Delete <span className="text-primary font-bold">{sectionTitle}</span>?</DialogTitle>
                    <DialogDescription className="text-center">This action is permanent and cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"destructive"}
                        onClick={() => {
                            onChange(data.filter((section) => section.id !== id))
                            setExpandedItems((prev) => {
                                const newSet = new Set(prev)
                                newSet.delete(id)
                                return newSet
                            })
                        }}>Delete</Button>
                    <DialogClose />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveCategory