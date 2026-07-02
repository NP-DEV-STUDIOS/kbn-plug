"use client"

import { authClient } from '@/app/(auth)/lib/auth-client'
import { Button } from '../../../components/ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SignoutButton = () => {
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/')
                }
            }
        })
    }
    return (
        <Button size={"lg"} variant={"outline"} onClick={handleSignOut}>
            <LogOut />
            <span>Sign Out</span>
        </Button>
    )
}

export default SignoutButton