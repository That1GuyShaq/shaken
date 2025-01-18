
import axios from 'axios';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { useIsMobile } from "@/hooks/use-mobile";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


export default function Create({ auth }: PageProps<{ auth: { user: User }}> ) {
    const isMobile = useIsMobile();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Essentials" />
            {isMobile ? (
                <section className="grid gap-4 grid-cols-1">
                </section>
            ) : (
                <section className='grid grid-cols-3 gap-4 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>

                </section>
            )}

        </AuthenticatedLayout>
    );
}
