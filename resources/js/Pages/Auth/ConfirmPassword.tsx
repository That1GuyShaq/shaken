import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter, } from "@/Components/ui/card";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Card className="pt-6 mx-0 my-4">
                <CardHeader>
                    <CardDescription>
                        This is a secure area of the application. Please confirm your password before continuing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)} />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={submit} disabled={processing}>Conmfirm</Button>
                </CardFooter>
            </Card>

        </GuestLayout>
    );
}
