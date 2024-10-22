import { User } from '@/types';
import { Search,  CircleUser } from "lucide-react";
import { Link } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/Components/ui/dropdown-menu";
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function Topbar({ user }: { user: User }) {

    return (
        <div className="w-full h-14 p-4 bg-neutral-100 dark:bg-neutral-900 border-b-2 dark:border-neutral-700 flex items-center justify-between">
            <div className="flex items-center">
                <div className="shrink-0 flex items-center align-middle">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input type="search" placeholder="Search..." className="pl-9 pr-4 h-8" />
                    </div>
                </div>
            </div>

            <div className="pe-4 text-sm">
            <DropdownMenu>
                <DropdownMenuTrigger className='p-2 border rounded-full bg-neutral-200 hover:bg-neutral-200  dark:bg-neutral-700'>
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className="ms-4 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={route('profile.edit')}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('profile.edit')}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link method="post" href={route('logout')}>Log Out</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
    );
};
