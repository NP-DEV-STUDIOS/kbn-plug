"use client"

import { useState, useRef, useCallback, ForwardRefExoticComponent, RefAttributes } from "react"
import Link from "next/link"
import {
    ChevronDown,
    Play,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Logo } from './logo';
import UserButton from './user-button';
import { features, navlist, product, productsLeft, productsRight } from "@/lib/global-navlist"
import { Badge } from "../ui/badge"





export function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [activeDirection, setActiveDirection] = useState("banking")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMenuEnter = useCallback((menu: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setActiveMenu(menu)
    }, [])

    const handleMenuLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null)
        }, 150)
    }, [])

    return (
        <header className="w-full sticky top-0 z-50 bg-background/95 shadow backdrop-blur supports-backdrop-filter:bg-background/80 dark:shadow-secondary">
            {/* Main Navigation */}
            <nav className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Logo />

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {/* Product Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMenuEnter("features")}
                                onMouseLeave={handleMenuLeave}
                            >
                                <button
                                    className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-md transition-colors"
                                >
                                    Product
                                    <ChevronDown
                                        className={cn(
                                            "w-4 h-4 transition-transform",
                                            activeMenu === "features" && "rotate-180"
                                        )}
                                    />
                                </button>
                                {/* Invisible bridge to connect button to dropdown */}
                                {activeMenu === "features" && (
                                    <div className="absolute left-0 right-0 h-4 top-full" />
                                )}
                            </div>


                            {navlist.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="px-3 py-2 text-xs font-medium rounded-md transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <UserButton />

                    </div>
                </div>

                {/* Desktop Mega Menu Dropdown */}
                {activeMenu === "features" && (
                    <div
                        className="absolute left-0 right-0 top-full shadow-xl z-50 bg-background"

                        onMouseEnter={() => handleMenuEnter("features")}
                        onMouseLeave={handleMenuLeave}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Directions Column */}
                                <div className="col-span-3 border-r pr-8" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted-foreground)' }}>
                                        ABOUT THE PLATFORM
                                    </h3>
                                    <div className="space-y-1">
                                        {product.map(({ id, icon: Icon, title, description }) => (
                                            <button
                                                key={id}
                                                onMouseEnter={() => setActiveDirection(id)}
                                                className="w-full text-left p-3 rounded-lg transition-colors"
                                                style={{
                                                    backgroundColor: activeDirection === id ? 'var(--muted)' : 'transparent'
                                                }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                        style={{ backgroundColor: 'var(--muted)' }}
                                                    >
                                                        <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                                                            {title}
                                                        </h4>
                                                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                                            {description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-5 border-r pr-8" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                                        TOOLS
                                    </h3>
                                    <div className="grid grid-cols-2 gap-x-6">
                                        <div className="space-y-1">
                                            {productsLeft.map(({ title, icon: Icon, href }) => (
                                                <Link
                                                    key={title}
                                                    href={href}
                                                    className="relative flex items-center gap-3 p-2 rounded-lg transition-colors group"
                                                >
                                                    <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    <span className="text-sm">
                                                        {title}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="space-y-1">
                                            {productsRight.map(({ title, icon: Icon, href }) => (
                                                <Link
                                                    key={title}
                                                    href={href}
                                                    className="relative flex items-center gap-3 p-2 rounded-lg transition-colors group"
                                                >
                                                    <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    <span className="text-sm">
                                                        {title}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Need Different Solutions */}
                                    <div className="mt-6 pt-6" style={{ borderTop: `1px solid var(--border)` }}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                                                    Explore all subjects
                                                </h4>
                                                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                                                    Browse our complete catalog of CAPS/IEB-aligned courses
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="rounded-full text-sm"
                                                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                            >
                                                Browse all
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Video/Promo Column */}
                                <div className="col-span-4 pl-4">
                                    <div className="relative aspect-video rounded-xl">
                                        <video src={"/demo-video.mp4"} controls muted autoPlay />
                                    </div>
                                    <h4 className="font-medium mt-4 text-sm">
                                        Learn more about our features
                                    </h4>
                                    <div className="mt-3 space-y-2">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-xs"
                                            >
                                                <feature.icon className="w-4 h-4" />
                                                <span>{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </nav>
        </header>
    );
}



