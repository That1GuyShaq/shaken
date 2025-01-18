
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { DataCard } from '@/Components/DataCard';
import { useIsMobile } from "@/hooks/use-mobile";
import { DataTable } from '@/Components/DataTable';
import { CardLoader } from '@/Components/CardLoader';
import { useState, useEffect, Fragment } from 'react';
import { TableLoader } from '@/Components/TableLoader';
import { Essential, columns } from './Partials/columns';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { EssentialCreateDialog } from "./Partials/create-dialog";



export default function Index({ auth, categories }: PageProps<{ auth: { user: User }, categories: string[] }> ) {
    const isMobile = useIsMobile();
    const [router, setRouter] = useState('');
    const [loading, setLoading] = useState(true);
    const [essentials, setEssentials] = useState<Essential[]>([]);
    const [reloadEssentials, setReloadEssentials] = useState(false);

    async function getData(): Promise<Essential[]> {
        try {
            // let response = await axios.get(route('essentials.list', {source: route().current() === 'essentials.global' ? 'global' : null}));
            let response = await axios.get(route('essentials.list', 'global'));
            if (isMobile) {
                response = await axios.get(route('essentials.list', {source: router}));
            }
            const data   = response.data.data as Essential[];

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
                setEssentials(data);
            } catch (error) {
                console.log('Error fetching essentials:', error);
            } finally {
                setLoading(false);
                setReloadEssentials(false)
            }
        };
        fetchData();
    }, [router, reloadEssentials]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Essentials" />
            {isMobile ? (
                <Tabs defaultValue="my_essentials" className="grid gap-4 grid-cols-1">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="my_essentials"  onClick={() => setRouter('')}>My Essentials</TabsTrigger>
                        <TabsTrigger value="all_essentials" onClick={() => setRouter('global')}>All Essentials</TabsTrigger>
                    </TabsList>
                    {(isMobile && loading) ? (
                        <CardLoader cards={5}/>
                    ) : (
                        <Fragment>
                            <TabsContent value="my_essentials" className="col-span-1">
                                <DataCard data={essentials} columns={columns} create={true} link={{name: 'Essential', href: route('essentials.create')}} className="grid grid-cols-1 gap-4"/>
                            </TabsContent>
                            <TabsContent value="all_essentials" className="col-span-1">
                                <DataCard data={essentials} columns={columns} create={true} link={{name: 'Essential', href: route('essentials.create')}} className="grid grid-cols-1 gap-4"/>
                            </TabsContent>
                        </Fragment>
                    )}

                </Tabs>
            ) : (
                <section className='grid grid-cols-3 gap-4 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
                    {(!isMobile && loading) ? (
                        <TableLoader rows={9} columns={5} span={3} />
                    ) : (
                        <div className="col-span-3">
                            <DataTable data={essentials} columns={columns} create={true} dialog={<EssentialCreateDialog categories={categories} setReloadEssentials={setReloadEssentials} />} className="grid grid-cols-1 gap-4" />
                        </div>
                    )}
                </section>
            )}

        </AuthenticatedLayout>
    );
}
