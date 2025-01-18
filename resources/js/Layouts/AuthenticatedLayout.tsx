
import { User, App } from '@/types';
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from '@/Components/ui/toaster';
import { AppFooter } from "@/Components/app-footer";
import { AppTopbar } from "@/Components/app-topbar";
import { AppSidebar } from "@/Components/app-sidebar";
import { PropsWithChildren, ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";

const app: App = {
    name: import.meta.env.VITE_APP_NAME,
    owner: {
        name: import.meta.env.VITE_APP_OWNER,
        url: import.meta.env.VITE_APP_OWNER_URL
    },
    slogan: import.meta.env.VITE_APP_SLOGAN
};


export default function Authenticated({ user, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const isMobile = useIsMobile();
    return (
        <>
            <SidebarProvider defaultOpen >
                <AppSidebar app={app} />
                <SidebarInset>
                    <AppTopbar user={user} app={app}/>
                    <div className={`flex flex-1 flex-col gap-4 p-4 pt-0 ${isMobile && 'pb-20'}`}>
                        { children }
                    </div>

                    { isMobile && <AppFooter /> }
                    <Toaster />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
