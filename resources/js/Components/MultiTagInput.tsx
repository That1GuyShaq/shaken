"use client"

import { useState, KeyboardEvent } from "react"
import { X } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"

export default function MultiTagInput( { id, name, initialTags, onChange }: { id: string, name: string, initialTags: string[], onChange: (tags: string[]) => void } ) {
    const [tags, setTags] = useState<string[]>(initialTags)
    const [inputValue, setInputValue] = useState("")

    const addTag = () => {
        if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
            onChange([...tags, inputValue.trim()]);
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
        onChange(tags.filter((tag) => tag !== tagToRemove));
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

  return (
    <div className="w-full space-y-4">
        <div className="flex space-x-2">
            <Input
                id={id}
                name={name}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a tag"
                className="flex-grow"
            />
            <Button onClick={addTag} type="button" variant="secondary">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm py-1 px-2">
                    {tag}
                    <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={`Remove ${tag} tag`}
                    >
                    <X size={14} />
                    </button>
                </Badge>
            ))}
        </div>
        {tags.length > 0 && (
            <p className="text-sm text-gray-500">
                {tags.length} tag{tags.length !== 1 ? "s" : ""} added
            </p>
        )}
    </div>
  )
}

