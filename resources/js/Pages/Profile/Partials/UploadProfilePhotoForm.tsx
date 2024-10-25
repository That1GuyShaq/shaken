import { User } from "@/types";
import { Loader2, SwitchCamera, Trash } from "lucide-react";
import { Transition } from '@headlessui/react';
import { FormEventHandler, useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';

import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardTitle, CardContent} from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import { spawn } from "child_process";

export default function UpdateProfileInformation({ className = '', isMobile, user }: { className?: string; isMobile: boolean; user: User; }) {

    const [ profilePhoto, setProfilePhoto ] = useState(user.profile_photo_url);
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<{
        photo: string | File;
    }>({ photo: user.profile_photo_url || '',});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setData('photo', file); // Set the file object directly
            setProfilePhoto(URL.createObjectURL(file));
        }

    };

    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();

        const file = data.photo as File;
        if (file) {
            setData('photo', ''); // Set the file object directly
            setProfilePhoto('');
            post(route('profile.upload'));
        }
        return;

    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.photo) {
            post(route('profile.upload'));
        }
        return;
    };

    return (
        <section className={className}>
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-3 items-center">
                        <div className={`${isMobile ? 'col-span-3' : 'col-span-2'} items-center flex gap-4`}>
                            <div className="relative inline-block">
                                <Avatar className="w-24 h-24 rounded-xl">
                                    <AvatarImage src={profilePhoto} alt={user.first_name + ' ' + user.last_name} />
                                    <AvatarFallback className="text-5xl">{user.initials}</AvatarFallback>
                                </Avatar>
                                <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded shadow-md bg-card" onClick={() => document.getElementById('photo')?.click()}>
                                <SwitchCamera/>
                                </Button>
                            </div>
                            <div>
                                {isMobile ?
                                    <span>
                                        <span className="text-2xl font-semibold">{user.first_name + ' ' + user.last_name}</span>
                                        <br />
                                        <span className="font-thin">{user.email}</span>
                                    </span>
                                    :
                                    <span className="text-2xl font-semibold">Profile Photo</span>
                                }
                                <span className="font-thin">
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
                                    {errors.photo && <InputError message={errors.photo} className="mt-2" />}
                                </span>
                            </div>
                        </div>
                        <div className={`${isMobile ? 'col-span-3 gap-2 flex mt-4' : 'col-span-1 gap-2 flex justify-end'}`}>

                            <form encType="multipart/form-data">
                                <Input
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    className="hidden"
                                    accept="image/*"
                                    required
                                    onChange={handleFileChange}
                                />
                            </form>
                                <Button disabled={processing} onClick={submit} className={`${isMobile ? 'w-full' : ''}`} >
                                    {processing ? <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</span> : 'Upload Photo'}
                                </Button>
                                <Button disabled={processing} onClick={handleDelete} variant="destructive" >
                                    <Trash />
                                </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </section>
    );
}
