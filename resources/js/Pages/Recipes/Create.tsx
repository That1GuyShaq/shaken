
import { FormEventHandler } from 'react';
import { PageProps, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/InputError';
import { Textarea } from '@/Components/ui/textarea';
import { Description } from '@radix-ui/react-toast';
import Repeater from '@/Components/Repeater';
import RepeaterIngredients from './Partials/repeater-ingredients';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

interface Category {
    id: number;
    name: string;
}
interface Categories {
    data: Category[];
}

export default function Create({ auth, categories }: PageProps<{ auth: { user: User }, status?: string, categories: Categories, }> ) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tags:[],
        name: '',
        history: '',
        category_id: 0,
        description: '',
        bookmark: false,
        Description: '',
        ingredients: [{ name: '',  unit: '', amount: 0 }],
    });
    console.log(categories);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('login'), {
        //     onFinish: () => reset('password'),
        // });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Recipe" />

            <form onSubmit={submit} className="grid grid-cols-9 gap-4">

                <Card className="col-span-12">
                    <CardHeader>
                        <CardTitle>Identifiers</CardTitle>
                        <CardDescription>
                            Key aspects used to easily identify recipes
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-12 gap-4">
                        <div className='col-span-8'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="w-full"
                                onChange={(e) => setData('name', e.target.value)} />

                            <InputError  message={errors.name} className="mt-2" />
                        </div>

                        <div className='col-span-2'>
                            <Label htmlFor='tags'>Tags</Label>
                            <Input
                                id="tags"
                                type="text"
                                name="tags"
                                value={data.tags}
                                className="w-full"
                                onChange={(e) => setData('tags', e.target.value)} />

                            <InputError  message={errors.tags} className="mt-2" />
                        </div>

                        <div className='col-span-2'>
                            <Label htmlFor='category_id'>Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categories.data.map((category: Category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                            <InputError  message={errors.tags} className="mt-2" />
                        </div>

                        <div className='col-span-6'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="w-full"
                                rows={4}
                                onChange={(e) => setData('description', e.target.value)} />

                            <InputError  message={errors.description} className="mt-2" />
                        </div>

                        <div className='col-span-6'>
                            <Label htmlFor='history'>History</Label>
                            <Textarea
                                id="history"
                                name="history"
                                value={data.history}
                                className="w-full"
                                rows={4}
                                onChange={(e) => setData('history', e.target.value)} />

                            <InputError  message={errors.history} className="mt-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-6">
                    <CardHeader>
                        <CardTitle>Ingredients</CardTitle>
                        <CardDescription>
                            Add ingredients to your recipe
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-8 gap-4">
                        <div className="col-span-4">
                            <Label htmlFor={`name`}>Name</Label>
                            <Input
                                id={`name`}
                                name="ingredients[name]" />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor={`amount`}>Amount</Label>
                            <Input
                                type="number"
                                min={0}
                                step={0.5}
                                max={999}
                                defaultValue={0.5}
                                id={`amount`}
                                name="ingredients[amount]" />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor={`unit`}>Unit</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cup">cup</SelectItem>
                                    <SelectItem value="dash">dash</SelectItem>
                                    <SelectItem value="gram">gram</SelectItem>
                                    <SelectItem value="pinch">pinch</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                    <SelectItem value="oz">oz</SelectItem>
                                    <SelectItem value="shot">shot</SelectItem>
                                    <SelectItem value="tsp">tsp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError  message={errors.ingredients} className="mt-2" />
                    </CardContent>
                </Card>

            </form>
        </AuthenticatedLayout>
    );
}
