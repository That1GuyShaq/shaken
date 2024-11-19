<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Jermain Cole',
            'email' => 'j.cole@example.com',
            'password' => Hash::make('123.321A'),
        ]);

        $this->call([
            TagSeeder::class,
            CategorySeeder::class,
            RecipeSeeder::class,
        ]);
    }
}
