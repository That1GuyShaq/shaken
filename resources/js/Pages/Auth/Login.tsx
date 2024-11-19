
import axios from 'axios';
import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Checkbox } from '@/Components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '', remember: false, });

    const refreshCsrfToken = async () => {
        try {
            const response = await axios.get('/refresh-csrf');
            axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token;
        } catch (error) {
            console.error("Could not refresh CSRF token:", error);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshCsrfToken();
        }, 10 * 60 * 1000); // Refresh every 10 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Card className="mx-6 my-4">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login & start mixing</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid w-full items-center gap-4">
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

                            <div className="block mt-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember" />
                                    <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="link" disabled={processing} asChild>
                        <Link href={route('password.request')}>Forgot your password?</Link>
                    </Button>
                    <Button disabled={processing} onClick={submit}>Log in</Button>
                </CardFooter>
            </Card>

        </GuestLayout>
    );
}
