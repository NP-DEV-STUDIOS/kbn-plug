"use client"

import { authClient } from "@/app/(auth)/lib/auth-client";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
    strategy: "facebook" | "google";
    text: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function SocialLoginButton({ strategy, text, icon, className }: ButtonProps) {

    const signIn = async () => {
        await authClient.signIn.social({
            provider: strategy,
            callbackURL: "/dashboard",
        })
    }

    return (
        <Button className={cn(className, "cursor-pointer")} size={"lg"} variant={"outline"} onClick={() => { signIn() }}>
            <span>{text}</span>
        </Button>
    )
}