'use client'

import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

interface RepeaterProps<T> {
    emptyItem: T;
  initialItems?: T[];
  addButtonText?: string;
  onItemsChange?: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function Repeater<T>({ initialItems = [], renderItem, onItemsChange, addButtonText = 'Add Item', emptyItem }: RepeaterProps<T>) {
    const [items, setItems] = useState<T[]>(initialItems)

    /**
     * Add a new item to the list by appending the emptyItem to the end of the list.
     * The component will re-render with the new item and the onItemsChange callback will be called.
     */
    const addItem = () => {
        const newItems = [...items, emptyItem];
        setItems(newItems);
        onItemsChange?.(newItems);
    }

    /**
     * Remove an item from the list at the given index.
     * @param {number} index The index of the item to remove.
     */
    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onItemsChange?.(newItems);
    }

    /**
     * Update an item in the list at the given index with the given updated item.
     * @param {number} index The index of the item to update.
     * @param {T} updatedItem The updated item.
     */
    const updateItem = (index: number, updatedItem: T) => {
        const newItems = items.map((item, i) => (i === index ? updatedItem : item));
        setItems(newItems);
        onItemsChange?.(newItems);
    }

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="grid grid-col-6 gap-2">
                    <div className="flex-grow">
                        {renderItem(item, index)}
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeItem(index)} aria-label="Remove item" >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button onClick={addItem} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                {addButtonText}
            </Button>
        </div>
    )
}
