<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Coffee', 'class' => 'Notes'],
            ['name' => 'Vodka', 'class' => 'Palete'],
            ['name' => 'Smooth', 'class' => 'Palete'],
            ['name' => 'Strong', 'class' => 'Strength'],
            ['name' => 'Easy', 'class' => 'Difficulty'],
            ['name' => '5 min', 'class' => 'Preperation Time'],
            ['name' => 'Whiskey', 'class' => 'Palete'],
            ['name' => 'Gin', 'class' => 'Palete'],
            ['name' => 'Rum', 'class' => 'Palete'],
            ['name' => 'Tequila', 'class' => 'Palete'],
            ['name' => 'Sour', 'class' => 'Palete'],
            ['name' => 'Sweet', 'class' => 'Palete'],
            ['name' => 'Bitter', 'class' => 'Palete'],
            ['name' => 'Umami', 'class' => 'Palete'],
            ['name' => 'Savory', 'class' => 'Palete'],
            ['name' => 'Chocolate', 'class' => 'Pairings'],
            ['name' => 'Fruit', 'class' => 'Pairings'],
            ['name' => 'Nuts', 'class' => 'Pairings'],
            ['name' => 'Herbs', 'class' => 'Pairings'],
            ['name' => 'Spicy', 'class' => 'Pairings'],
        ];

        foreach ($tags as $tag) {
            \App\Models\Tag::create($tag);
        }
    }
}
