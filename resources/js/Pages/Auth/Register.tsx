import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Card className="pt-6">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Don`t have an account yet?</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)} />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)} />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)} />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmarion"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)} />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="link" disabled={processing} asChild>
                        <Link href={route('login')} method="post">Already Registered?</Link>
                    </Button>

                    <Button disabled={processing} onClick={submit}>Register</Button>
                </CardFooter>
            </Card>
        </GuestLayout>
    );
}
