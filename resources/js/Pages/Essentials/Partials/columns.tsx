"use client"

import axios from "axios";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import Bookmark from "@/Components/Bookmark";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EssentialEditDialog } from "./edit-dialog";
import Notification from "@/Components/Notification";
import { GlassWater, Hammer, Tag, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

export type Essential = {
    id: number
    name: string
    tags: string
    category: string
    bookmark: boolean
    description: string
}

export const columns: ColumnDef<Essential>[] = [

    {
        header: "ID",
        accessorKey: "id"
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <span>
                        {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
                    </span>
                </Button>
            )
        },
        cell: ({row}) => {
            const id  = row.original.id as number;
            const name = row.original.name as string;
            const category = row.original.category as string;

            let Icon = Tag;
            switch (category) {
                case 'Drinkware':
                    Icon = GlassWater;
                    break;

                case 'Tool':
                    Icon = Hammer;
                    break;

                default:
                    break;
            }

            return (
                <TooltipProvider>
                    <Tooltip  delayDuration={100} >
                        <TooltipTrigger asChild>
                            <Link href={route('recipes.show', id)} className="font-semibold text-nowrap flex items-center"><Icon className="m-1 h-4 text-primary"/>{name}</Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{category}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }
    },
    {
        header: "Description",
        accessorKey: "description"
    },
    {
        header: "Tags",
        accessorKey: "tags",
        cell: ({row}) => {
            const tags = (row.original.tags as string).split(',');
            return tags.map((tag: string) => <Badge className="m-1 text-xs bg-primary" key={tag}>{tag}</Badge>);

        }
    },
    {
        accessorKey: "bookmark",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-center">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Bookmarks
                        <span>
                            {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
                        </span>
                    </Button>
                </div>
            )
        }, cell: ({row}) => {
            const id = row.original.id as number;
            const bookmarked = row.original.bookmark as boolean;

            return <Bookmark id={id} bookmarked={bookmarked} subject="essentials" isMobile={false} />;
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const essential = row.original
            const categories = ['Drinkware', 'Tool'];
            const [triggerState, setTriggerState] = useState(false);

            const deleteEssential = async () => {
                try {
                    await axios.delete(route('essentials.destroy', essential.id))
                    .then((response) => {
                        if (response.status === 204) {
                            setTriggerState(true);
                            window.location.reload();
                        }
                    });

                } catch (error) {
                    console.error(error);
                }
            };
            return (
            <>
                <Notification body={`${essential.name} deleted successfully`} trigger={triggerState} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(essential.name + ' - ' + essential.description)} >
                            Copy Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <EssentialEditDialog essential={essential as Essential} categories={categories}/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={deleteEssential}>
                            Delete {essential.category}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
            )
        },
      },
]
