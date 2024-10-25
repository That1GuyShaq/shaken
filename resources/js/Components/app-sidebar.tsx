import { App } from '@/types';
import { Link } from '@inertiajs/react';
import { ModeToggle } from '@/Components/ModeToggle';
import { Separator } from "@/Components/ui/separator";
import ApplicationLogo from '@/Components/ApplicationLogo';
import {  BookOpen, GalleryVerticalEnd, Martini, ShoppingBasket,  } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/Components/ui/sidebar";

const data = {
  main: [
    {
      name: "Dashboard",
      url: route('dashboard'),
      icon: GalleryVerticalEnd,
    },
    {
      name: "Ingredients",
      url: "#",
      icon: ShoppingBasket,
    },
    {
      name: "Spirits",
      url: "#",
      icon: Martini,

    }
  ],
  catalouge: [
    {
      name: "Recipes",
      url: "#",
      icon: BookOpen,
    }
  ],
}

export default function AppSidebar({ app }: { app: App }) {

    return (
        <Sidebar  collapsible="icon" variant='inset'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 ps-1">
                            <Link href={route('welcome')}>
                                <ApplicationLogo className="size-8 fill-primary" />
                            </Link>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold"> {app.name} </span>
                                <span className="truncate text-xs"> {app.slogan} </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.main.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Catalouge</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.catalouge.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Separator className="my-4" />
                <div className="flex items-center justify-between ps-5">
                    <a href={ app.owner.url } target="_blank" className='truncate transition duration-300 hover:text-primary hover:ease-in-out'>
                        <span className="text-sm">&copy; { app.owner.name } { new Date().getFullYear() }</span>
                    </a>
                    <ModeToggle />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}