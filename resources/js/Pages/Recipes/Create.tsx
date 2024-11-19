
import { PageProps, User } from '@/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ auth, categories }: PageProps<{ auth: { user: User }, status?: string, categories?: any, }> ) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Recipe" />
            {categories}
                <h1 className="text-3xl font-bold">Create Recipe</h1>
        </AuthenticatedLayout>
    );
}
