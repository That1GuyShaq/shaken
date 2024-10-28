
import { useState } from 'react';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useIsMobile } from "@/hooks/use-mobile";
import Notification from '@/Components/Notification';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { randomInt } from 'crypto';
import MartiniGlassCard from '@/Components/MartiniGlassCard';


export default function Index({ auth }: PageProps<{}>) {
    const isMobile = useIsMobile();

    return (
        <AuthenticatedLayout user={auth.user}>

            <Head title="Recipes" />

            <section className="grid grid-cols-3 gap-4">
            {[...Array(17)].map((_, index) => (
                <MartiniGlassCard key={index} title='Cocktail of the Day' description='Discover our specially crafted cocktail, perfect for any occasion.' badges={["Refreshing", "Classic", "Happy Hour"]} />
            ))}
            </section>

        </AuthenticatedLayout>
    );
}
