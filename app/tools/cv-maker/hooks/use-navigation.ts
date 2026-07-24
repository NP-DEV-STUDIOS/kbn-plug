"use client"

import { useState } from 'react'
import { MdEditDocument, MdGrid3X3, MdLaptopMac, MdPeople, MdSchool, MdWorkHistory } from 'react-icons/md'

/**
 * Navigation tabs available in the CV maker
 */
export const NAVIGATION_TABS = [
    { id: 'fill-in', label: 'Fill in', icon: 'FileText' },
    { id: 'guidance', label: 'Guidance', icon: 'Lightbulb' },
    { id: 'analysis', label: 'Analysis', icon: 'Brain' },
    { id: 'matching', label: 'Matching', icon: 'FileUser' },
    { id: 'design', label: 'Design', icon: 'Paintbrush' },
    { id: 'cover-letter', label: 'Cover letter', icon: 'FileStack' },
] as const

/**
 * Sidebar sections for the fill-in tab
 */
export const SIDEBAR_SECTIONS = [
    { id: 'basic-info', label: 'Personal Information', icon: MdEditDocument, color: "#679CF9" },
    { id: 'work-experience', label: 'Work Experience', icon: MdWorkHistory, color: "#679CF9" },
    { id: 'education', label: 'Education', icon: MdSchool, color: "#00c950" },
    { id: 'skills', label: 'Skills', icon: MdLaptopMac, color: "#ad46ff" },
    { id: 'references', label: 'References', icon: MdPeople, color: "#ff6900" },
    { id: 'templates', label: 'Templates', icon: MdGrid3X3, color: "#679CF9" },
] as const

export type NavigationTab = typeof NAVIGATION_TABS[number]['id']
export type SidebarSection = typeof SIDEBAR_SECTIONS[number]['id']

/**
 * Hook for managing navigation state in the CV maker
 * @returns Object containing navigation state and handlers
 */
export function useNavigation() {
    const [activeTab, setActiveTab] = useState<NavigationTab>('fill-in')
    const [activeSidebarSection, setActiveSidebarSection] = useState<SidebarSection>('basic-info')

    /**
     * Changes the active navigation tab
     * @param tab - The tab ID to activate
     */
    const changeTab = (tab: NavigationTab) => {
        setActiveTab(tab)
        // Reset sidebar section when changing tabs
        if (tab !== 'fill-in') {
            setActiveSidebarSection('basic-info')
        }
    }

    /**
     * Changes the active sidebar section
     * @param section - The section ID to activate
     */
    const changeSidebarSection = (section: SidebarSection) => {
        setActiveSidebarSection(section)
    }

    return {
        activeTab,
        activeSidebarSection,
        changeTab,
        changeSidebarSection,
        navigationTabs: NAVIGATION_TABS,
        sidebarSections: SIDEBAR_SECTIONS,
    }
}