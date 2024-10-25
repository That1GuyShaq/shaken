import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import Notification from '@/Components/Notification';
import { Card, CardContent, CardFooter, } from "@/Components/ui/card";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            { status && <Notification body={status} trigger /> }
            <Card className="p-4 w-100">
                <CardContent>
                    <div className="text-sm">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one.
                    </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={submit} className="w-full">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder='Email'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)} />

                            <InputError message={errors.email}/>
                        <div className="flex items-center justify-end mt-4">
                            <Button disabled={processing}>Email Password Reset Link</Button>
                        </div>
                    </form>
                </CardFooter>
            </Card>
        </GuestLayout>
    );
}
