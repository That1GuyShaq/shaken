import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Checkbox } from '@/Components/ui/checkbox';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

export default function Welcome() {
    const { data: loginData, setData: setLoginData, post: loginPost, processing: loginProcessing, errors: loginErrors, reset: loginReset } = useForm({
        email: '',
        password: '',
    });

    const { data: registerData, setData: setRegisterData, post: registerPost, processing: registerProcessing, errors: registerErrors, reset: registerReset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formType = (e.target as HTMLFormElement).getAttribute('form');
        console.log(formType);

        if (formType === 'login') {
            loginPost(route('login'), {
                onFinish: () => loginReset('password'),
            });
        } else {
            registerPost(route('register'), {
                onFinish: () => registerReset('password', 'password_confirmation'),
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Welcome" />
            <Tabs defaultValue="login" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="login" disabled={loginProcessing}>Login</TabsTrigger>
                    <TabsTrigger value="register" disabled={registerProcessing}>Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card className=" ">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Login & start mixing</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id='login' onSubmit={submit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        autoComplete="username"
                                        onChange={(e) => setLoginData('email', e.target.value)} />

                                        <InputError message={loginErrors.email} className="mt-2" />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password_current"
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setLoginData('password', e.target.value)} />

                                        <InputError message={loginErrors.password} className="mt-2" />
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
                            <Button variant="link" disabled={loginProcessing} asChild>
                                <Link href={route('password.request')}>Forgot your password?</Link>
                            </Button>
                            <Button disabled={loginProcessing} form='login' onClick={submit}>Log in</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="register">
                    <Card className="pt-6">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>Don`t have an account yet?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id='register' onSubmit={submit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={registerData.name}
                                        autoComplete="name"
                                        onChange={(e) => setRegisterData('name', e.target.value)} />

                                        <InputError message={registerErrors.name} className="mt-2" />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={registerData.email}
                                        autoComplete="username"
                                        onChange={(e) => setRegisterData('email', e.target.value)} />

                                        <InputError message={registerErrors.email} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={registerData.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setRegisterData('password', e.target.value)} />

                                            <InputError message={registerErrors.password} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmarion"
                                            value={registerData.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(e) => setRegisterData('password_confirmation', e.target.value)} />

                                            <InputError message={registerErrors.password} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button form='register' disabled={registerProcessing} onClick={submit}>Register</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

        </GuestLayout>
    );
}
