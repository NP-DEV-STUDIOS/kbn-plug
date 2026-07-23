import { authClient } from '@/app/(auth)/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignoutButton from '../../app/(auth)/_components/sign-out';
import { Skeleton } from '../ui/skeleton';
import { buttonVariants } from '../ui/button';
import Link from "next/link";
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { toastVariants } from '@/lib/utils';

const UserButton = () => {
    const { data: session, error, isPending } = authClient.useSession()

    if (isPending) {
        return (
            <Skeleton className='size-8 rounded-full bg-slate-400' />
        )
    }

    if (error) {
        console.error("Error fetching session:", error);
        toast.error("Something went wrong. Please refresh the page.", toastVariants({
            variant: "error",
        }));
    }
    if (!session) {
        return (
            <Link className={buttonVariants({
                size: 'lg'
            })} href={"/login"}>Login <LogIn /></Link>
        );
    }
    return (
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarImage src={session.user?.image!} alt={session.user?.name || "User Avatar"} />
                <AvatarFallback className='bg-primary border-none'>{session.user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <SignoutButton />
        </div>
    );
}

export default UserButton