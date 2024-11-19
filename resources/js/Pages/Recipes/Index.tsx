
import { useState, useEffect } from 'react';
import { PageProps, User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useIsMobile } from "@/hooks/use-mobile";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { randomInt } from 'crypto';
import MartiniGlassCard from '@/Components/DrinkCard';
import { DataTable } from './Partials/data-table';
import { Recipe, columns } from './Partials/columns';
import axios from 'axios';
import { ScrollArea } from '@/Components/ui/scroll-area';
import TableLoader from '@/Components/TableLoader';
import { Skeleton } from '@/Components/ui/skeleton';
import { PartyPopper } from 'lucide-react';
import Notification from '@/Components/Notification';



export default function Index({ auth, status }: PageProps<{ auth: { user: User }, status?: string }> ) {
    const count = 3;
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    // const handleBookmark = async (setTrigger: any, setFill: any, setTip: any, setBody: any, setClassName: any, setBookmarked: any, id: number, bookmarked: boolean) => {
    //     try {
    //       await axios.post(route('bookmark.bookmark', [id, bookmarked])).then((response) => {
    //         if (response.data.success) {
    //             setTrigger(true);
    //             setBody(response.data.success);
    //             if (bookmarked) {
    //                 setFill("none");
    //                 setTip("Bookmark");
    //                 setBookmarked(false);
    //             }else{
    //                 setFill("currentColor");
    //                 setTip("Un-Bookmark");
    //                 setBookmarked(true);
    //             }
    //         }else{
    //             setTrigger(true);
    //             setClassName("text-yellow-700");
    //             setBody(response.data.error);
    //         }
    //       });

    //     } catch (error) {
    //     }
    // };

    async function getData(): Promise<Recipe[]> {
        try {
            const response = await axios.get(route('recipes.all', {source: route().current() === 'recipes.global' ? 'global' : null}));
            const data     = response.data.data as Recipe[];

            return data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const data = await getData();
            setRecipes(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Recipes" />
            {/* <Notification trigger={trigger} body={body} classes={className} /> */}
{/*
            <section className={`grid gap-4 ${isMobile ? 'grid-cols-1' : `grid-cols-${count}`}`}>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className='h-25 rounded-xl'>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle></CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                            <CardFooter className="flex justify-end">

                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </section> */}

            <section className='grid grid-cols-3 gap-4 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
                {/* <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                    <CardFooter className="flex justify-end">

                    </CardFooter>
                </Card> */}
                {loading ? (
                    <div className="col-span-3 min-h-100">
                        <div className="grid grid-cols-1 gap-4">
                            <Card className="col-span-1">
                                <CardContent className='p-2 flex justify-between'>
                                    <Skeleton className="h-8 w-[385px]"/>
                                    <Skeleton className="h-8 w-[85px]"/>
                                </CardContent>
                            </Card>

                            <Card className="col-span-1">
                                <CardContent className='p-0 flex items-center'>
                                    <TableLoader rows={9} columns={4} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="col-span-3">
                        <DataTable columns={columns} data={recipes} className="grid grid-cols-1 gap-4" />
                        {/* <section className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                            {recipes.map((recipe, index) => (
                                <MartiniGlassCard key={index} title={recipe.name} description={recipe.description} badges={(recipe.tags as string[])} />
                            ))}
                        </section> */}
                    </div>
                )}
            </section>

            {/* <section className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {[...Array(17)].map((_, index) => (
                <MartiniGlassCard key={index} title='Cocktail of the Day' description='Discover our specially crafted cocktail, perfect for any occasion.' badges={[]} />
            ))}
            </section> */}

        </AuthenticatedLayout>
    );
}
