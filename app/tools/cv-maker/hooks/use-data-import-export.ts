"use client"

import { useCallback } from 'react'
import { ResumeData } from '../types'

/**
 * Hook for handling resume data import and export functionality
 * @param resumeData - The current resume data
 * @param setResumeData - Function to update resume data
 * @returns Object containing import and export functions
 */
export function useDataImportExport(
    resumeData: ResumeData,
    setResumeData: (data: ResumeData) => void
) {
    /**
     * Exports resume data as a JSON file
     * Creates a downloadable JSON file with the current resume data
     */
    const exportJSON = useCallback(() => {
        try {
            const dataStr = JSON.stringify(resumeData, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${resumeData.personalInfo.fullName || 'Resume'}_Data.json`
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error exporting JSON:', error)
            alert('Error exporting data. Please try again.')
        }
    }, [resumeData])

    /**
     * Handles file upload for resume data import
     * Validates file type and parses JSON data
     * @param event - File input change event
     */
    const importJSON = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (file.type !== 'application/json') {
            alert('Please select a valid JSON file.')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target?.result as string)

                // Basic validation - check if it has the expected structure
                if (!importedData.personalInfo || !Array.isArray(importedData.experience)) {
                    throw new Error('Invalid resume data structure')
                }

                setResumeData(importedData)
                alert('Resume imported successfully!')
            } catch (error) {
                console.error('Error importing resume:', error)
                alert('Error importing resume. Please check the file format.')
            }
        }

        reader.onerror = () => {
            alert('Error reading file. Please try again.')
        }

        reader.readAsText(file)

        // Reset the input value to allow re-uploading the same file
        event.target.value = ''
    }, [setResumeData])

    return {
        exportJSON,
        importJSON,
    }
}