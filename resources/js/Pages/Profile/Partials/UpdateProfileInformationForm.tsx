import { User } from "@/types";
import { FormEventHandler} from 'react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/react';

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Badge } from '@/Components/ui/badge';
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";
import { Loader2 } from "lucide-react";


export default function UpdateProfileInformation({ mustVerifyEmail, isMobile, className = '', user }: { mustVerifyEmail: boolean; isMobile?: boolean; className?: string; user: User }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription className="text-sm leading-snug">
                        Update your account's profile information and email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-6' : 'grid-cols-12'}`}>

                        <div className='grid w-full items-center gap-1.5 col-span-6'>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                name="first_name"
                                required
                                value={data.first_name}
                                autoComplete="first_name"
                                onChange={(e) => setData('first_name', e.target.value)} />

                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        <div className='grid w-full items-center gap-1.5 col-span-6'>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                name="last_name"
                                required
                                value={data.last_name}
                                autoComplete="last_name"
                                onChange={(e) => setData('last_name', e.target.value)} />

                            <InputError message={errors.last_name} className="mt-2" />
                        </div>

                        <div className={`grid w-full items-center gap-1.5 ${isMobile ? 'col-span-6' : 'col-span-10'}`}>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)} />

                                <InputError message={errors['email']} className="mt-2" />

                                {mustVerifyEmail && (
                                    <Link href={route('verification.send')} method="post"
                                        className="rounded-md text-sm transition duration-300 hover:text-primary hover:ease-in-out"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                )}
                        </div>


                        <div className={isMobile ? 'hidden' : 'flex justify-end w-full items-center col-span-2'}>
                            <Badge  variant={user.email_verified ? 'default' : 'secondary'}>
                                {user.email_verified ? 'Verified' : 'Unverified'}
                            </Badge>
                        </div>

                    </form>
                </CardContent>
                <CardFooter className='gap-4'>
                    <Button className={isMobile ? 'w-full' : 'w-25'} disabled={processing} onClick={submit} variant="default">
                        {processing ? <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Udpating Personal Details...</span> : 'Update personal Details'}
                    </Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </CardFooter>
            </Card>
        </section>
    );
}
