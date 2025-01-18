
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { DataCard } from '@/Components/DataCard';
import { useIsMobile } from "@/hooks/use-mobile";
import { DataTable } from '@/Components/DataTable';
import { Recipe, columns } from './Partials/columns';
import { CardLoader } from '@/Components/CardLoader';
import { useState, useEffect, Fragment } from 'react';
import { TableLoader } from '@/Components/TableLoader';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";


export default function Index({ auth }: PageProps<{ auth: { user: User }}> ) {
    const isMobile = useIsMobile();
    const [router, setRouter] = useState('');
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    async function getData(): Promise<Recipe[]> {
        try {
            let response = await axios.get(route('recipes.list', {source: route().current() === 'recipes.global' ? 'global' : null}));
            if (isMobile) {
                response = await axios.get(route('recipes.list', {source: router}));
            }
            const data   = response.data.data as Recipe[];

            return data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const data = await getData();
                setRecipes(data);
            } catch (error) {
                console.log('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Recipes" />
            {isMobile ? (
                <Tabs defaultValue="my_recipes" className="grid gap-4 grid-cols-1">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="my_recipes"  onClick={() => setRouter('')}>My Recipes</TabsTrigger>
                        <TabsTrigger value="all_recipes" onClick={() => setRouter('global')}>All Recipes</TabsTrigger>
                    </TabsList>
                    {(isMobile && loading) ? (
                        <CardLoader cards={5}/>
                    ) : (
                        <Fragment>
                            <TabsContent value="my_recipes" className="col-span-1">
                                <DataCard data={recipes} columns={columns} create={true} link={{name: 'Recipe', href: route('recipes.create')}} className="grid grid-cols-1 gap-4"/>
                            </TabsContent>
                            <TabsContent value="all_recipes" className="col-span-1">
                                <DataCard data={recipes} columns={columns} create={true} link={{name: 'Recipe', href: route('recipes.create')}} className="grid grid-cols-1 gap-4"/>
                            </TabsContent>
                        </Fragment>
                    )}

                </Tabs>
            ) : (
                <section className='grid grid-cols-3 gap-4 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
                    {(!isMobile && loading) ? (
                        <TableLoader rows={12} columns={4} span={3} />
                    ) : (
                        <div className="col-span-3">
                            <DataTable data={recipes} columns={columns} create={true} link={{name: 'Recipe', href: route('recipes.create')}} className="grid grid-cols-1 gap-4" />
                        </div>
                    )}
                </section>
            )}

        </AuthenticatedLayout>
    );
}
