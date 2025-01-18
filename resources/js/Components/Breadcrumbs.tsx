
import { App } from '@/types';
import { Fragment } from "react";
import { Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/Components/ui/breadcrumb";
export default function BreadcrumbBar({ app }: { app: App }) {
    const path = window.location.pathname.split('/').filter((part) => part !== '');

    const splitAndCapitalize = (str: string): string => {
        return str.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return (
        <Breadcrumb>
            <BreadcrumbList >
                <BreadcrumbItem>
                    {app.name}
                </BreadcrumbItem>
                {path.map((part, key) => {
                    const isLastItem = key === path.length - 1;
                    return (
                        <Fragment key={key}>
                            <BreadcrumbSeparator />
                            {isLastItem ? (
                                <BreadcrumbPage>
                                    <Link href={`/${path.slice(0, key + 1).join('/')}`} >
                                        {splitAndCapitalize(part)}
                                    </Link>
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbItem>
                                    {splitAndCapitalize(part)}
                                </BreadcrumbItem>
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
