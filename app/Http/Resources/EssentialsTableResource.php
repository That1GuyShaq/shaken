<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EssentialsTableResource extends JsonResource
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
            'category'    => Category::find($this->category)->name,
            'description' => $this->description,
            'tags'        => implode(', ', $this->tags),
            'bookmark'    => boolval($this->bookmarks->where('user_id', auth()->user()->id)->first())
        ];
    }
}
