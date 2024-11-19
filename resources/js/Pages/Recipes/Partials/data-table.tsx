"use client"
import axios from "axios";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import Notification from '@/Components/Notification';
import { Card, CardContent } from '@/Components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel,FilterFn } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  data: TData[]
  className?: string
  columns: ColumnDef<TData, TValue>[]
//   onBookmark: (id: number, bookmark: boolean) => void
}

export function DataTable<TData, TValue>({ className, columns, data }: DataTableProps<TData, TValue>) {
    const [status, setStatus]               = useState(null);
    const [globalFilter, setGlobalFilter]   = useState("");
    const [rowSelection, setRowSelection]   = useState({});
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
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            globalFilter,
            columnFilters,
            rowSelection,
            pagination
        },
        globalFilterFn: filterContains
    });

    return (
        <div className={className}>
            <Notification trigger={status !== null} body={`${status}`} />
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

                    <Button variant='ghost' asChild>
                        <Link className="hover:text-primary text-black text-sm" href={route("recipes.create")}>
                            <PlusIcon size={20} />Recipe
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <div className="col-span-1">
            <Card className="col-span-1">
                <CardContent className='p-2'>
                    <Table className="h-96">
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
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} rows selected.
                    </div>
                    <Pagination className="flex items-center justify-end space-x-2 py-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); table.previousPage() }} />
                            </PaginationItem>
                            {table.getPageOptions().map((page, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={table.getState().pagination.pageIndex === page}
                                        onClick={(e) => { e.preventDefault(); table.setPageIndex(page) }}
                                    >
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); table.nextPage() }} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </CardContent>
            </Card>
            </div>
        </div>
    )
}
