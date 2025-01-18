<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Essentials extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'tags',
        'category',
        'description',
        'user_id',
        'generated',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags'       => 'array',
            'generated'  => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category', 'id');
    }

    public function tags()
    {
        $tag_ids     = json_decode($this->attributes['tags'], true);
        $flavor_tags = Tag::whereIn('id', $tag_ids['flavor'] ?? [])->pluck('name')->toArray();
        $aroma_tags  = Tag::whereIn('id', $tag_ids['aroma'] ?? [])->pluck('name')->toArray();

        return [
            'flavor' => $flavor_tags,
            'aroma' => $aroma_tags,
        ];
    }

    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }

    /**
     * Get the recipes bookmarked by the user.
     *
     * @return \Illuminate\Support\Collection<\App\Models\Recipe>
     */
    public function bookmarked()
    {
        return $this->bookmarks()
            ->where('user_id', 1)
            ->get()
            ->map(function ($bookmark) {
                return $bookmark->recipe;
            });
    }
}
