
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/Components/ui/breadcrumb";
import { Link } from '@inertiajs/react';
import { Fragment, ReactNode } from "react";
import { App } from '@/types';
export default function BreadcrumbBar({ app }: { app: App }) {
    const path = window.location.pathname.split('/').filter((part) => part !== '');

    return (
        <Breadcrumb>
            <BreadcrumbList >
                <BreadcrumbItem>
                    {app.name}
                </BreadcrumbItem>
                {path.map((part, key) => {
                    // The last item in the breadcrumb trail should be a BreadcrumbPage
                    // and the rest should be BreadcrumbItem elements
                    const isLastItem = key === path.length - 1;
                    return (
                        <Fragment key={key}>
                            <BreadcrumbSeparator />
                            {isLastItem ? (
                                <BreadcrumbPage>
                                    <Link href={`/${path.slice(0, key + 1).join('/')}`} >
                                        {part.charAt(0).toUpperCase() + part.slice(1)}
                                    </Link>
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbItem>
                                    {/* <BreadcrumbLink href={`/${path.slice(0, key + 1).join('/')}`}> */}
                                        {part.charAt(0).toUpperCase() + part.slice(1)}
                                    {/* </BreadcrumbLink> */}
                                </BreadcrumbItem>
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
