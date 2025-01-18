import { User, App } from '@/types';
import { Link } from '@inertiajs/react';
import BreadcrumbBar from './Breadcrumbs';
import { Button } from '@/Components/ui/button';
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from '@/Components/ModeToggle';
import { Separator } from "@/Components/ui/separator";
import { SidebarTrigger, } from "@/Components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage, } from "@/Components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

export function AppTopbar({ user, app }: { user: User, app: App }) {
    const isMobile = useIsMobile();

    return (
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                {!isMobile &&
                    <>
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </>
                }
                <BreadcrumbBar app={app} />
            </div>

            <div className=" flex items-center text-sm pe-1">
                {isMobile && <ModeToggle />}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                        <Avatar className="h-8 w-8 rounded-lg" >
                            <AvatarImage src={user.profile_photo_url} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        {!isMobile &&
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.first_name + ' ' + user.last_name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                        }
                        <span className="sr-only">Toggle user menu</span>
                        </Button>
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
        </header>
        // <div className="w-full h-14 p-4 bg-neutral-100 dark:bg-neutral-900 border-b-2 dark:border-neutral-700 flex items-center justify-between">
        //     <div className="flex items-center">
        //         <div className="shrink-0 flex items-center align-middle">
        //             <div className="relative w-full max-w-sm">
        //                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
        //                 <Input type="search" placeholder="Search..." className="pl-9 pr-4 h-8" />
        //             </div>
        //         </div>
        //     </div>

        //     <div className="pe-4 text-sm">
        //     <DropdownMenu>
        //         <DropdownMenuTrigger className='p-2 border rounded-full bg-neutral-200 hover:bg-neutral-200  dark:bg-neutral-700'>
        //             <CircleUser className="h-5 w-5" />
        //             <span className="sr-only">Toggle user menu</span>
        //         </DropdownMenuTrigger>
        //         <DropdownMenuContent align='end' className="ms-4 mt-2">
        //             <DropdownMenuLabel>My Account</DropdownMenuLabel>
        //             <DropdownMenuSeparator />
        //             <DropdownMenuItem>
        //                 <Link href={route('profile.edit')}>Profile</Link>
        //             </DropdownMenuItem>
        //             <DropdownMenuItem>
        //                 <Link href={route('profile.edit')}>Settings</Link>
        //             </DropdownMenuItem>
        //             <DropdownMenuSeparator />
        //             <DropdownMenuItem>
        //                 <Link method="post" href={route('logout')}>Log Out</Link>
        //             </DropdownMenuItem>
        //         </DropdownMenuContent>
        //     </DropdownMenu>
        //     </div>
        // </div>
    );
};
