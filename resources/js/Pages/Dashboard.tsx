import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header={ <h2 className="text-xl font-semibold leading-tight"> Dashboard </h2> } >
            <Head title="Dashboard" />

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
