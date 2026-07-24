"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

interface ClearConfirmationModalProps {
    onConfirm: () => void
    children: React.ReactNode
}

export default function ClearConfirmationModal({ onConfirm, children }: ClearConfirmationModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-106.25 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg text-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-gray-900">Confirm Clear Data</DialogTitle>
                    <DialogDescription className="text-gray-700">
                        Are you sure you want to clear all resume data? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="bg-white/50 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/70"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="bg-red-600/80 backdrop-blur-sm border border-red-700/30 text-white hover:bg-red-700/90"
                    >
                        Clear All Data
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}