'use client'

import React from "react";
import Repeater from "@/Components/Repeater";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface Ingredient {
    name:   string;
    unit:   string;
    amount: string;
}

export default function RepeaterIngredients() {
    const updatedIngredient = (index: number, updatedIngredient: Ingredient) => {
        console.log(`Updated person at index ${index}:`, updatedIngredient);
    }

    const renderIngredient = (ingredient: Ingredient, index: number) => {
        return (
            <div className="grid grid-col-6 gap-2">
                <div className="col-span-4">
                    <Label htmlFor={`name-${index}`}>Ingredient</Label>
                    <Input
                        name="name"
                        id={`name-${index}`}
                        value={ingredient.name}
                        onChange={(e) => updatedIngredient(index, { ...ingredient, name: e.target.value })} />
                </div>
                <div className="col-span-1">
                    <Label htmlFor={`amount-${index}`}>Amount</Label>
                    <Input
                        name="amount"
                        id={`amount-${index}`}
                        value={ingredient.amount}
                        onChange={(e) => updatedIngredient(index, { ...ingredient, amount: e.target.value })} />
                </div>
                <div className="col-span-1">
                    <Label htmlFor={`amount-${index}`}>Amount</Label>
                    <Input
                        name="unit"
                        id={`unit-${index}`}
                        value={ingredient.unit}
                        onChange={(e) => updatedIngredient(index, { ...ingredient, unit: e.target.value })} />
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <Repeater<Ingredient>
                initialItems={[{ name: '', amount: '', unit: '' }]}
                renderItem={renderIngredient}
                onItemsChange={(items) => console.log('Items changed:', items)}
                addButtonText="Add Ingredient"
                emptyItem={{ name: '', amount: '', unit: '' }}
            />
        </div>
    );
}
