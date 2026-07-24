"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { ResumeData } from '../types'

/**
 * Context interface for resume builder functionality
 */
interface ResumeContextType {
    /** Current resume data */
    resumeData: ResumeData
    /** Function to update resume data */
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
    /** Function to update a specific section of resume data */
    updateResumeSection: <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => void
    /** Function to reset resume data to initial state */
    resetResumeData: () => void
    /** Currently selected template ID */
    selectedTemplate: string
    /** Function to change selected template */
    setSelectedTemplate: (template: string) => void
}

/**
 * Initial resume data structure
 */
const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        website: '',
        summary: '',
        professionalTitle: '',
        careerObjectives: '',
        photo: '',
    },
    experience: [],
    education: [],
    skills: [],
    references: [],
}

/**
 * Resume Context - Provides centralized state management for the CV maker
 */
const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

/**
 * Resume Provider Component
 * Wraps the application to provide resume data context
 */
export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resume-data', initialResumeData)
    const [selectedTemplate, setSelectedTemplate] = useLocalStorage<string>('selected-template', 'modern')

    /**
     * Updates a specific section of the resume data
     * @param section - The section key to update
     * @param data - The new data for the section
     */
    const updateResumeSection = <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
        }))
    }

    /**
     * Resets all resume data to initial empty state
     */
    const resetResumeData = () => {
        setResumeData(initialResumeData)
    }

    const value: ResumeContextType = {
        resumeData,
        setResumeData,
        updateResumeSection,
        resetResumeData,
        selectedTemplate,
        setSelectedTemplate,
    }

    return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

/**
 * Custom hook to use resume context
 * @returns Resume context value
 * @throws Error if used outside of ResumeProvider
 */
export function useResume() {
    const context = useContext(ResumeContext)
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider')
    }
    return context
}