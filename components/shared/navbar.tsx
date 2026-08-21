"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
    ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Logo, LogoWithLink } from './logo';
import { features, navlist, product, productsLeft, productsRight } from "@/lib/global-navlist"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

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
                        <LogoWithLink />

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
                        {/* Place the <UserButton /> component here */}
                        <p className="text-sm">Guest mode</p>

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
                                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" >
                                        ABOUT THE PLATFORM
                                    </h3>
                                    <div className="space-y-1">
                                        {product.map(({ id, icon: Icon, title, description }) => (
                                            <div
                                                key={id}
                                                onMouseEnter={() => setActiveDirection(id)}
                                                className="w-full text-left p-3 rounded-lg transition-colors"

                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                        style={{ backgroundColor: 'var(--muted)' }}
                                                    >
                                                        <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">
                                                            {title}
                                                        </h4>
                                                        <p className="text-xs mt-0.5 leading-relaxed" >
                                                            {description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-5 border-r pr-8" >
                                    <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                                        TOOLS & RESOURCES
                                    </h3>
                                    <div className="grid grid-cols-2 gap-x-6">
                                        <div className="space-y-1">
                                            {productsLeft.map(({ title, description, icon: Icon, href }) => (
                                                <Link
                                                    key={title}
                                                    href={href}
                                                    className="relative flex items-center gap-3 p-2 rounded-lg transition-colors group"
                                                >
                                                    <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    <div>
                                                        <h4 className="font-bold text-sm">
                                                            {title}
                                                        </h4>
                                                        <p className="text-xs mt-0.5 leading-relaxed" >
                                                            {description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="space-y-1">
                                            {productsRight.map(({ title, description, icon: Icon, href }) => (
                                                <Link
                                                    key={title}
                                                    href={href}
                                                    className="relative flex items-center gap-3 p-2 rounded-lg transition-colors group"
                                                >
                                                    <Icon className="w-5 h-5 fill-primary stroke-primary" />
                                                    <div>
                                                        <h4 className="font-bold text-sm">
                                                            {title}
                                                        </h4>
                                                        <p className="text-xs mt-0.5 leading-relaxed" >
                                                            {description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Need Different Solutions */}
                                    <div className="mt-6 pt-6" style={{ borderTop: `1px solid var(--border)` }}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-sm" >
                                                    Ready to get hired?
                                                </h4>

                                            </div>
                                            <Link href={"/tools/cv-maker"} className="block md:inline-block text-center bg-black text-white px-6 py-4 rounded-xl">Create my CV</Link>

                                        </div>
                                    </div>
                                </div>

                                {/* Picture Column */}
                                <Card className="col-span-4 bg-primary">
                                    <CardHeader>
                                        <CardTitle className="text-white text-xl">
                                            Learn more about our features
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="mt-3 space-y-2">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-white"
                                            >
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                                <span>{feature.text}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

            </nav>
        </header>
    );
}



