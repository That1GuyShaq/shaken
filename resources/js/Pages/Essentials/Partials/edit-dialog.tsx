
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlusIcon } from "lucide-react";
import { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import InputError from '@/Components/InputError';
import { Textarea } from '@/Components/ui/textarea';
import Notification from '@/Components/Notification';
import MultiTagInput from '@/Components/MultiTagInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/Components/ui/dialog";

interface Essential {
    id: number;
    name: string;
    tags: string;
    category: string;
    description: string;
}

export function EssentialEditDialog({ essential, categories }: { essential: Essential, categories: string[] } ) {

    const [open, setOpen] = useState(false);
    const [body, setBody] = useState<string>('');
    const [trigger, setTrigger] = useState(false);
    const { data, setData, processing, errors, setError, reset } = useForm({
        name: essential.name,
        tags: essential.tags.split(',') as string[],
        category: essential.category,
        description: essential.description,
    });
    console.log(essential);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        axios.patch(route('essentials.update'), data)
            .then((response) => {
                console.log('Response', response);
                // if (response.status === 201) {
                //     setOpen(false);
                //     setTrigger(true);
                //     // setReloadEssentials(true);
                //     setBody(response.data.success);
                //     reset();
                // } else {
                //     if (response.data.errors) {
                //         setError('name', response.data.errors.name);
                //         setError('tags', response.data.errors.tags);
                //         setError('category', response.data.errors.category);
                //         setError('description', response.data.errors.description);
                //     }
                // }
            })
            .catch((error) => {
                //
            }).finally(() => {
                reset();
            })
    };

    return (
        <>
            <Notification trigger={trigger} body={body} />
            <Dialog  open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    Edit Essential
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update</DialogTitle>
                        <DialogDescription>
                            Update {essential.category} {essential.name}
                        </DialogDescription>
                    </DialogHeader>
                        <form id='create' autoComplete="off" onSubmit={submit}>
                            <div className="grid grid-cols-5 w-full items-center gap-4">
                                <div className="col-span-3 flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)} />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="col-span-2 flex flex-col space-y-1.5 ">
                                    <Label>Category</Label>
                                    <Select
                                        name='category'
                                        defaultValue={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                categories.map(( category: any) => (
                                                    <SelectItem key={category.id as number} value={category.id}>{category.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

                                    <InputError message={errors.category} className="mt-2" />
                                </div>

                                <div className="col-span-5 flex flex-col space-y-1.5">
                                    <Label htmlFor="description">Desctiption</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        autoComplete="username"
                                        onChange={(e) => setData('description', e.target.value)} />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="col-span-5 flex flex-col space-y-1.5">
                                    <Label htmlFor="tags">Tags</Label>
                                    <MultiTagInput
                                        id="tags"
                                        name="tags"
                                        initialTags={data.tags}
                                        onChange={(tags) => setData('tags', tags)}
                                    />

                                    <InputError message={errors.tags} className="mt-2" />
                                </div>


                            </div>
                        </form>
                    <DialogFooter className="sm:justify-start">
                            <Button type="submit" disabled={processing} form='create'>
                                Update
                            </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
