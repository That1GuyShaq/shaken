import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import { User } from "@/types";
import PrimaryButton from '@/Components/PrimaryButton';


import { Loader2 } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/Components/ui/dialog";

export default function DeleteUserForm({ className = '', isMobile }: {  className?: string; isMobile: boolean; }) {
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });
    const passwordInput = useRef<HTMLInputElement>(null);
    const [dialogIsOpen, setDialogIsOpen] = useState(false)


    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => handleOpenChange(dialogIsOpen),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const handleOpenChange  = (open: boolean) => {
        setDialogIsOpen(open)
        if (!open) {
            clearErrors();
            reset();
            console.log('foo');
        }
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription className="text-sm leading-snug">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-end">
                    <Dialog open={dialogIsOpen} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button className={isMobile ? 'w-full' : 'w-25'} disabled={dialogIsOpen} variant="destructive">
                                {dialogIsOpen ? <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Awaiting Confirmation...</span> : 'Delete Account'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                            </DialogDescription>
                            </DialogHeader>
                            <form  className="grid auto-rows-min gap-4 w-full">
                                <div className="grid w-full items-center gap-1.5 col-span-6">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        value={data.password}
                                        autoComplete="off"
                                        onChange={(e) => setData('password', e.target.value)} />

                                        <InputError message={errors['password']} className="mt-2" />
                                </div>
                            </form>

                            <DialogFooter>
                                <Button className={isMobile ? 'w-full' : 'w-25'} disabled={processing} onClick={deleteUser} variant="destructive">
                                    {processing ? <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting Accout...</span> : 'Confirm Account Deletion'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </section>
    );
}
