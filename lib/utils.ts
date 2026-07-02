import { clsx, type ClassValue } from "clsx"
import { ToastClassnames } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ToastOptions = {
  description?: string;
  duration?: number;
  variant: "success" | "error" | "warning" | "info";
  position?: "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right";
  classNames?: ToastClassnames | undefined;
}

export const toastVariants = ({ variant, description, duration, position, classNames }: ToastOptions) => {
  return {
    description,
    duration: duration || 5000,
    position: position || "top-center",
    classNames: {
      icon: variant === "error" ? "text-red-500" : variant === "success" ? "text-green-500" : variant === "warning" ? "text-yellow-500" : "text-blue-500",
      ...classNames,
    },
  }

}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

