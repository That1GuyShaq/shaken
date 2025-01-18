"use client"

import { Link } from "@inertiajs/react";
import Bookmark from "@/Components/Bookmark";
import { Badge } from "@/Components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Martini, WineOff, GlassWater, Milk, Beer, Tag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

export type Recipe = {
    id: number
    name: string
    tags: string
    category: string
    bookmark: boolean
    description: string
}

export const columns: ColumnDef<Recipe>[] = [

    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Name",
        accessorKey: "name",
        cell: ({row}) => {
            const id  = row.original.id as number;
            const name = row.original.name as string;
            const category = row.original.category as string;

            let Icon = Tag;
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
                            <p>{category.slice(0, -1)}</p>
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
        header: "Actions",
        cell: ({row}) => {
            const id = row.original.id as number;
            const bookmarked = row.original.bookmark as boolean;

            return <Bookmark id={id} bookmarked={bookmarked} subject="recipe" isMobile={false} />;
        }
    }
]
