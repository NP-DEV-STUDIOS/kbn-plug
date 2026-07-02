"use client"

import { authClient } from "@/app/(auth)/lib/auth-client";
import { Button } from "@/components/ui/button";
import React from "react";

type ButtonProps = {
    text: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function GoogleLoginButton({ text, icon }: ButtonProps) {

    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        })
    }

    return (
        <Button size={"lg"} variant={"outline"} onClick={() => { signInWithGoogle() }}>
            <span>{text}</span>
        </Button>
    )
}