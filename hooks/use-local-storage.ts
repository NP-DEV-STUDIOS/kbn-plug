"use client"

import { toastVariants } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for localStorage with SSR support
 * provides persistent state management across sessions and page reloads */

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load value from localStorage on mount
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                setStoredValue(JSON.parse(item))
            }
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error)
            toast.error("ERROR", toastVariants({
                variant: "error",
                description: "Failed to load data from local storage."
            }))
        } finally {
            setIsLoaded(true)
        }
    }, [key])

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value

            // Save state
            setStoredValue(valueToStore)

            // Save to localStorage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }
    return [storedValue, setValue, isLoaded] as const

}