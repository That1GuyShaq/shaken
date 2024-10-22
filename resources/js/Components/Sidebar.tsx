import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
import { ModeToggle } from "@/Components/ModeToggle";
import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Menu, CircleGauge, Ship, Users, BadgePlus, List, CalendarDays, ChevronRight, ChevronDown, Ticket, ListChecks, ChevronsLeft } from "lucide-react";


export default function Sidebar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isCrewMenuCollapsed, setCrewMenuIsCollapsed] = useState(true);
    const [isBoatMenuCollapsed, setBoatMenuIsCollapsed] = useState(true);

    const appName  = import.meta.env.VITE_APP_NAME  || "Laravel";
    const appOwner = import.meta.env.VITE_APP_OWNER || "Laravel";

    const toggleSidebar  = () => { setBoatMenuIsCollapsed(true);setCrewMenuIsCollapsed(true);setIsSidebarCollapsed(!isSidebarCollapsed); };
    const toggleBoatMenu = () => { setBoatMenuIsCollapsed(!isBoatMenuCollapsed); };
    const toggleCrewMenu = () => { setCrewMenuIsCollapsed(!isCrewMenuCollapsed); };

    // Effect to handle automatic collapse at different breakpoints
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true); // Collapse for mobile
            } else {
                setIsSidebarCollapsed(false); // Expand for larger screens
            }
        };

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Call the function initially to set the correct state
        handleResize();

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (
            (route().current('boats.index') ||
            route().current('boats.create') ||
            route().current('sailings.index')) &&
            !isSidebarCollapsed
        ) {
            setBoatMenuIsCollapsed(false);
        } else if (
            (route().current('crew.index') ||
            route().current('crew.create')) &&
            !isSidebarCollapsed
        ) {
            setCrewMenuIsCollapsed(false);
        }
        }, [
            route().current('boats.index'),
            route().current('boats.create'),
            route().current('sailings.index'),
            route().current('crew.index'),
            route().current('crew.create'),
            isSidebarCollapsed,
    ]);

    return (
        <div className="flex min-h-screen bg-accent">
            {/* Sidebar */}
            <div className={`transition-width duration-700 border-e-2 flex flex-col ${ isSidebarCollapsed ? "w-16" : "w-60"}`} >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 pb-10 text-nuetral-50">
                    {
                        !isSidebarCollapsed && (
                            <div className="flex items-center">
                                <a href={route('dashboard')}>
                                    <ApplicationLogo className="h-7 w-auto fill-current"/>
                                </a>
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block" } text-lg text-nowrap font-bold ps-2`}>{ appName }</span>
                            </div>
                        )
                    }


                    {/* <motion.div
                        onClick={toggleSidebar}
                        style={{ cursor: 'pointer' }}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isSidebarCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                    { isSidebarCollapsed ? <ChevronsLeft size={24} className="justify-center" /> : <Menu size={16} /> }
                    </motion.div> */}
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-grow text-nuetral-50 ">
                    {/* Main Menu */}
                    <p className="ps-3 pb-2 text-xs font-bold text-nuetral-400">Menu</p>
                    <ul className="ps-4 pb-4 space-y-2">
                        {/* <li>
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} className="text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                <CircleGauge size={16} className={`${ isSidebarCollapsed ? "justify-center" : null }`} />
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block ps-2" }`}>Dashbaord</span>
                            </ResponsiveNavLink>
                        </li>

                        <li>
                            <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.index')} className="text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                <Ticket  size={16} className={`${ isSidebarCollapsed ? "justify-center" : null }`} />
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block ps-3" }`}>Tickets</span>
                            </ResponsiveNavLink>
                        </li>

                        <li>
                            <ResponsiveNavLink href={route('manifests')} active={route().current('manifests')} className="text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                <ListChecks  size={16} className={`${ isSidebarCollapsed ? "justify-center" : null }`} />
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block ps-3" }`}>Manifests</span>
                            </ResponsiveNavLink>
                        </li> */}
                    </ul>

                    {/* Boats Navigation */}
                    <p className="ps-3 pb-2 text-xs font-bold text-nuetral-400">Boats</p>
                    <ul className="ps-4 pb-4 space-y-2">
                        {/* <li>
                        <ResponsiveNavLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (isSidebarCollapsed) {
                                    toggleSidebar();
                                }
                                toggleBoatMenu();
                            }}
                            className="text-sm flex items-center rounded-md"
                        >
                                <Ship  size={16} className={`${ isSidebarCollapsed ? "justify-center" : null }`} />
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block ps-3" }`}>Boats</span>
                                <span className={`ms-auto ${ isSidebarCollapsed ? "hidden" : null }`}>
                                    { isBoatMenuCollapsed ? <ChevronRight /> : <ChevronDown /> }
                                </span>
                            </ResponsiveNavLink>
                            <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${isBoatMenuCollapsed ? 'max-h-0 opacity-0' : 'ps-6 pb-1 space-y-2 max-h-60 opacity-100'}`}>
                                <li>
                                    <ResponsiveNavLink href={route('boats.index')} active={route().current('boats.index')} className="py-0 text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                        <List size={16} /> <span className="block ps-3">All</span>
                                    </ResponsiveNavLink>
                                </li>

                                <li>
                                    <ResponsiveNavLink href={route('boats.create')} active={route().current('boats.create')} className="py-0 text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                        <BadgePlus size={16} /> <span className="block ps-3">New</span>
                                    </ResponsiveNavLink>
                                </li>

                                <li>
                                    <ResponsiveNavLink href={route('sailings.index')} active={route().current('sailings.index')} className="py-0 text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                        <CalendarDays size={16} /> <span className="block ps-3">Sailings</span>
                                    </ResponsiveNavLink>
                                </li>
                            </ul>
                        </li> */}

                        {/* Crew Navigation */}
                        {/* <li>
                            <ResponsiveNavLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isSidebarCollapsed) {
                                        toggleSidebar();
                                    }
                                    toggleCrewMenu();
                                }}
                                className="text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                <Users  size={16} className={`${ isSidebarCollapsed ? "justify-center" : null }`} />
                                <span className={`${ isSidebarCollapsed ? "hidden" : "block ps-3" }`}>Crew</span>
                                <span className={`ms-auto ${ isSidebarCollapsed ? "hidden" : null }`}>
                                    { isCrewMenuCollapsed ? <ChevronRight /> : <ChevronDown /> }
                                </span>
                            </ResponsiveNavLink>
                            <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${isCrewMenuCollapsed ? 'max-h-0 opacity-0' : 'ps-6 pb-4 space-y-2 max-h-60 opacity-100'}`}>
                                <li>
                                    <ResponsiveNavLink  href={route('crew.index')} active={route().current('crew.index')} className="py-0 text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                        <List size={16} /> <span className="block ps-3">All</span>
                                    </ResponsiveNavLink>
                                </li>

                                <li>
                                    <ResponsiveNavLink href={route('crew.create')} active={route().current('crew.create')} className="py-0 text-sm flex items-center hover:bg-nuetral-700 rounded-md">
                                        <BadgePlus size={16} /> <span className="block ps-3">New</span>
                                    </ResponsiveNavLink>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="flex items-center justify-between ps-2 border-t border-nuetral-800">
                <span className={`${ isSidebarCollapsed ? "hidden" : "block" } text-ms text-nuetral-400`}>&copy; { appOwner } { new Date().getFullYear() }</span>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};
