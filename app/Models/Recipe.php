<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'description',
        'history',
        'ingredients',
        'instructirons',
        'tags',
        'category',
        'user_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * The user that created this recipe.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * The category this recipe belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
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
        return $this->hasMany(Bookmark::class);
    }

    public function bookmarked()
    {
        return Bookmark::where('user_id', 1)
            ->whereHas('recipe')
            ->get()
            ->map(function ($bookmark) {
                return $bookmark->recipe;
            });
    }
}
