import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import { FormEventHandler, useRef } from 'react';

import { Loader2 } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";

export default function UpdatePasswordForm({ className = '', isMobile }: {  className?: string; isMobile: boolean; }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset,  processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Card>
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription className="text-sm leading-snug">
                        Ensure your account is using a long, random password to stay secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form  className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-6' : 'grid-cols-12'}`}>
                        <div className={`grid w-full items-center gap-1.5 ${isMobile ? 'col-span-6' : 'col-span-12'}`}>
                            <Label htmlFor="current_password">Current Password</Label>
                            <Input
                                id="current_password"
                                type="password"
                                name="current_password"
                                required
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)} />

                                <InputError message={errors['current_password']} className="mt-2" />
                        </div>

                        <div className="grid w-full items-center gap-1.5 col-span-6">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)} />

                                <InputError message={errors['password']} className="mt-2" />
                        </div>

                        <div className="grid w-full items-center gap-1.5 col-span-6">
                            <Label htmlFor="password_confirmation">Confirm New Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)} />

                                <InputError message={errors['password_confirmation']} className="mt-2" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button className={isMobile ? 'w-full' : 'w-25'} disabled={processing} onClick={updatePassword} variant="default">
                        {processing ? <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Changing Password...</span> : 'Change Password'}
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
