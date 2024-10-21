import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from "@/Components/ui/button";
import Notification from '@/Components/Notification';
import { Card, CardContent, CardFooter, } from "@/Components/ui/card";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <Notification body={'A new verification link has been sent to the email address you provided during registration.'} trigger={status === 'verification-link-sent'} />
            <Card className="p-4 w-100">
                <CardContent className='p-0'>
                    <div className="mb-4 text-sm">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </div>
                </CardContent>
                <CardFooter className='p-0'>
                    <form onSubmit={submit} className="w-full">
                        <div className="flex items-center justify-between">
                            <Button disabled={processing}>Resend Verification Email</Button>
                            <Button variant="link" disabled={processing} asChild>
                                <Link href={route('logout')} method="post">Log Out</Link>
                            </Button>
                        </div>
                    </form>
                </CardFooter>
            </Card>
        </GuestLayout>
    );
}
