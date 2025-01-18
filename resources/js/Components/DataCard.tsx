"use client"

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import  Bookmark  from "@/Components/Bookmark";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Card, CardContent } from '@/Components/ui/card';
import { Martini, WineOff, GlassWater, Milk, Beer, Hammer, PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { ColumnDef, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, FilterFn } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    data: TData[];
    create: boolean;
    className?: string;
    columns: ColumnDef<TData, TValue>[];
    link: { name: string; href: string; };
}

export function DataCard<TData, TValue>({ className, columns, data, create, link }: DataTableProps<TData, TValue>) {

    const [globalFilter, setGlobalFilter]   = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const filterContains: FilterFn<any> = (row, columnId, filterValue) => {
        const cellValue = row.original[columnId];

        if (Array.isArray(cellValue)) {
            return cellValue.some((item) =>
                item.toString().toLowerCase().includes(filterValue.toLowerCase())
            );
        } else {
            return cellValue ? cellValue.toString().toLowerCase().includes(filterValue.toLowerCase()) : false;
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            columnFilters,
            columnVisibility: {
                id:false
            }
        },
        globalFilterFn: filterContains
    });

    const handleIcon = ( category: string ) => {
        let Icon;
        switch (category) {
            case 'Cocktails':
                Icon = Martini;
                break;

            case 'Martinis':
                Icon = Martini;
                break;

            case 'Shots':
                Icon = GlassWater;
                break;

            case 'Highballs':
                Icon = GlassWater;
                break;

            case 'Sours':
                Icon = Martini;
                break;

            case 'Virgin (Non-Alcoholic) Drinks':
                Icon = WineOff;
                break;

            case 'Aperitifs and Digestifs':
                Icon = Martini;
                break;

            case 'Liqueurs':
                Icon = Milk;
                break;

            case 'Beer and Cider Cocktails':
                Icon = Beer;
                break;

            case 'Mocktails':
                Icon = WineOff;
                break;

            case 'Drinkware':
                Icon = GlassWater;
                break;

            case 'Tiils':
                Icon = Hammer;
                break;

            default:
                break;
        };

        return Icon ? <Icon className="inline text-primary" /> : null;
    };


    return (
        <div className={className}>
            <Card className="col-span-1">
                <CardContent className='p-2 flex justify-between'>
                    <TooltipProvider>
                        <Tooltip  delayDuration={100} >
                            <TooltipTrigger asChild>
                                <Input
                                    className="max-w-sm me-4"
                                    placeholder="Search..."
                                    value={globalFilter ?? ""}
                                    onChange={(event) => setGlobalFilter(event.target.value)}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Search by mulitple items  with a comma</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {create && (
                        <Button variant='ghost' asChild>
                            <Link className="text-sm" href={link.href}>
                                <PlusIcon size={20} />{link.name}
                            </Link>
                        </Button>
                    )}

                </CardContent>
            </Card>

            <ScrollArea className="h-auto w-[100]">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <Card key={row.id} className="overflow-hidden mb-3">
                            <div className="flex">
                                <CardContent className="w-full p-1 ms-1">
                                    <div className="flex justify-between">
                                        <Link href={route("recipes.show", row.original.id)} className="font-bold mt-2 inline">
                                            {handleIcon(row.original.category) && <>{handleIcon(row.original.category)}</>}
                                            {row.original.name}
                                        </Link>

                                        <Bookmark id={row.original.id} bookmarked={row.original.bookmark} isMobile={true} />
                                    </div>
                                    <p className="text-muted-foreground leading-tight text-sm pe-2">
                                        {row.original.description}
                                    </p>
                                    {row.original.tags && <div className="flex flex-wrap gap-2 my-2">
                                        {row.original.tags.split(',').map((badge : string, key : number) => (
                                            <Badge key={key} variant="default" className="text-xs">
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>}
                                </CardContent>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="h-24 text-center flex justify-center items-center">
                            <h1>No {link.name}s found</h1>
                        </CardContent>
                    </Card>
                )}
            </ScrollArea>
        </div>
    )
}
