<?php

namespace App\Http\Resources;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeTableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'category'    => category::find($this->category)->name,
            'tags'        => implode(', ', $this->tags),
            'bookmark'    => boolval($this->bookmarks->where('user_id', auth()->user()->id)->first())

        ];
    }
}
