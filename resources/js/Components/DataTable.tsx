"use client"

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from '@/Components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, ColumnFiltersState, getSortedRowModel, SortingState, getFilteredRowModel, FilterFn } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    data: TData[];
    create?: boolean;
    className?: string;
    columns: ColumnDef<TData, TValue>[];
    link?: { name: string; href: string; };
    dialog?:  JSX.Element;
}

export function DataTable<TData, TValue>({ className, columns, data, create = true, link, dialog }: DataTableProps<TData, TValue>) {

    const [globalFilter, setGlobalFilter]   = useState("");
    const [sorting, setSorting]             = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination]       = useState({ pageIndex: 0,  pageSize: 8});

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
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            globalFilter,
            columnFilters,
            pagination,
            columnVisibility: {
                id:false
            }
        },
        globalFilterFn: filterContains
    });

    return (
        <div className={className}>
            <Card className="col-span-1">
                <CardContent className='p-2 flex justify-between'>
                    <TooltipProvider>
                        <Tooltip  delayDuration={100} >
                            <TooltipTrigger asChild>
                                <Input
                                    className="max-w-sm"
                                    placeholder="Search..."
                                    value={globalFilter ?? ""}
                                    onChange={(event) => setGlobalFilter(event.target.value)}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Search by mulitple tags with a comma</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {create && (
                        link ? (
                            <Button variant='ghost' asChild>
                                <Link className="text-sm" href={link?.href}>
                                    <PlusIcon size={20} />{link?.name}
                                </Link>
                            </Button>
                        ) : dialog ? (
                            dialog
                        ) : null
                    )}

                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardContent className='p-2'>
                    <Table className="h-full">
                        <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext() )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                        </TableHeader>
                        <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>

                    <Pagination className="space-x-2 py-4">
                        <PaginationContent>
                            <PaginationItem className="flex items-center text-sm font-medium opacity-50">
                                Page {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); table.previousPage() }} />
                            </PaginationItem>
                            {/* {table.getPageOptions().map((page, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={table.getState().pagination.pageIndex === page}
                                        onClick={(e) => { e.preventDefault(); table.setPageIndex(page) }}
                                    >
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))} */}
                            <PaginationItem>
                                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); table.nextPage() }} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </CardContent>
            </Card>
        </div>
    )
}
