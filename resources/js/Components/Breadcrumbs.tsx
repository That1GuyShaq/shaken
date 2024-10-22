import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/Components/ui/breadcrumb";
import { Link } from '@inertiajs/react';
import { Fragment, ReactNode } from "react";
export default function BreadcrumbBar( { title }: { title: ReactNode }) {
    const path = window.location.pathname.split('/').filter((part) => part !== '');
    return (
        <Breadcrumb className="bg-neutral-50 dark:bg-neutral-800 text-sm font-semibold">
            <div className="flex justify-between">
                <span className="ps-2 text-lg font-semibold vertical-align-middle">{title}</span>
                <BreadcrumbList className="pe-2">
                    <BreadcrumbItem>
                        <Link href="/" className="text-sm font-semibold hover:text-neutral-300 dark:hover:text-neutral-50">
                            Home
                        </Link>
                    </BreadcrumbItem>
                    {path.map((part, key) => {
                        // The last item in the breadcrumb trail should be a BreadcrumbItem
                        // and the rest should be Breadcrumb elements
                        const isLastItem = key === path.length - 1;
                        return (
                            <Fragment key={key}>
                                <BreadcrumbSeparator />
                                {isLastItem ? (
                                    <BreadcrumbItem>
                                        <Link
                                            href={`/${path.slice(0, key + 1).join('/')}`}
                                            className=" text-neutral-700 hover:text-neutral-300 dark:text-neutral-50 dark:hover:text-neutral-500"
                                        >
                                            {part.charAt(0).toUpperCase() + part.slice(1)}
                                        </Link>
                                    </BreadcrumbItem>
                                ) : (
                                    <Breadcrumb>
                                        <Link href={`/${path.slice(0, key + 1).join('/')}`}>
                                            {part.charAt(0).toUpperCase() + part.slice(1)}
                                        </Link>
                                    </Breadcrumb>
                                )}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </div>
        </Breadcrumb>
    );
}
