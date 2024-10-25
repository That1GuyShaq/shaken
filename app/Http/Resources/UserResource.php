<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $name = explode(' ', $this->name);
        return [
            'id' => $this->id,
            'first_name' => $name[0],
            'last_name' => $name[1],
            'email' => $this->email,
            'profile_photo_url' => 'storage/',

        ];
    }
}
