
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useIsMobile } from "@/hooks/use-mobile";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { RadialChartStack } from '@/Pages/Dashboard/Partials/RadialChart-Stack';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

interface Recipes {
    bookmarked: number;
    un_bookmarked: number;
}

export default function Dashboard({ auth, recipes }: PageProps <{ recipes: Recipes}>) {
    const isMobile = useIsMobile();

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard" />

            <div className="grid auto-rows-min gap-4 grid-cols-3">
                <div className={`aspect-video rounded-xl ${isMobile  ? 'col-span-3' : 'col-span-3'}`}>
                    <RadialChartStack chartData={recipes} />
                </div>
                <div className='aspect-video rounded-xl'>
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
                <div className='aspect-video rounded-xl'>
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
            </div>

            <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
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

        </AuthenticatedLayout>
    );
}
