"use client"

import { useState, useCallback } from 'react'
import jsPDF from 'jspdf'
import { ResumeData } from '../types'

/**
 * Hook for handling PDF export functionality
 * @param resumeData - The resume data to export
 * @param resumeRef - Reference to the resume preview element
 * @returns Object containing export functions and loading state
 */
export function usePDFExport(resumeData: ResumeData, resumeRef: React.RefObject<HTMLDivElement | null>) {
    const [isExporting, setIsExporting] = useState(false)

    /**
     * Exports the resume as a true PDF file with selectable text
     * Uses jsPDF's html() method to convert HTML to PDF while preserving text content
     */
    const exportPDF = useCallback(async () => {
        if (!resumeRef.current) {
            alert('Please wait for the preview to load before exporting.')
            return
        }

        setIsExporting(true)

        try {
            // Create a new PDF document
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true,
            })

            // Clone the resume element to avoid modifying the original
            const resumeElement = resumeRef.current.cloneNode(true) as HTMLElement

            // Get PDF dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth()

            // Convert HTML to PDF with proper scaling
            // @ts-ignore - html method is available in jsPDF but types might be incomplete
            await pdf.html(resumeElement, {
                x: 10,
                y: 10,
                width: pdfWidth - 20,
            })

            // Generate filename from user's name or default
            const fileName = resumeData.personalInfo.fullName
                ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
                : 'Resume.pdf'

            pdf.save(fileName)
        } catch (error) {
            console.error('Error generating PDF:', error)
            alert('Error generating PDF. Please try again.')
        } finally {
            setIsExporting(false)
        }
    }, [resumeData.personalInfo.fullName, resumeRef])

    return {
        exportPDF,
        isExporting,
    }
}