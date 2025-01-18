<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'definition',
        'classification',
        'characteristics',
        'examples',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'examples'   => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the recipes that belong to this category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    public function essentials()
    {
        return $this->hasMany(Essentials::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function essentialsListing()
    {
        return self::where('classification', 'Essential')
            ->get(['name', 'id'])
            ->map(fn($category) => [
                'name' => $category->name,
                'id'   => (string) $category->id,
            ])
            ->toArray();
    }
}
