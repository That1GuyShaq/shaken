"use client"

import axios from "axios";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox";
import Notification from '@/Components/Notification';
import { Martini, WineOff, GlassWater, Milk, Beer, Tag, Bookmark } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

export type Recipe = {
    id: number
    name: string
    tags: string
    category: string
    description: string
    bookmark: boolean
}

const handleBookmark = async (setTrigger: any, setFill: any, setTip: any, setBody: any, setClassName: any, setBookmarked: any, id: number, bookmarked: boolean) => {
    try {
      await axios.post(route('bookmark.bookmark', [id, bookmarked])).then((response) => {
        if (response.data.success) {
            setTrigger(true);
            setBody(response.data.success);
            if (bookmarked) {
                setFill("none");
                setTip("Bookmark");
                setBookmarked(false);
            }else{
                setFill("currentColor");
                setTip("Un-Bookmark");
                setBookmarked(true);
            }
        }else{
            setTrigger(true);
            setClassName("text-yellow-700");
            setBody(response.data.error);
        }
      });

    } catch (error) {
    }
};

export const columns: ColumnDef<Recipe>[] = [

    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox aria-label="Select all" checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox caria-label="Select row" checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
    //     ),
    // },
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
        header: "Actions",
        cell: ({row}) => {
            const id = row.original.id as number;
            const [body, setBody] = useState<string>('');
            const [trigger, setTrigger] = useState<boolean>(false);
            const [className, setClassName] = useState<string>('');
            const [bookmarked, setBookmarked] = useState<boolean>(row.original.bookmark as boolean);
            const [fill, setFill] = useState<string>(bookmarked ? "currentColor" : "none");
            const [tip, setTip] = useState<string>(bookmarked ? "Un-Bookmark" : "Bookmark");

            // let fill = 'none';

            // if (bookmark) {
            //     // setFill('currentColor');
            //     tip  = 'Un-Bookmark';
            //     // fill = 'currentColor';
            // }

            return(
                <>
                <Notification trigger={trigger} body={body} classes={className} />
                <TooltipProvider>
                    <Tooltip delayDuration={100} >
                        <TooltipTrigger asChild>

                        <Button variant="link" onClick={() => handleBookmark(setTrigger, setFill, setTip, setBody, setClassName,setBookmarked, id, bookmarked)} className="text-primary">
                                <Bookmark fill={fill} className="h-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {tip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </>
            );
        }
    }
]
