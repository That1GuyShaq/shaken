<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'name' => 'Margarita',
                'description' => 'A refreshing cocktail made with tequila, lime juice, and orange liqueur.',
                'history' => 'Originated in Mexico, popularized in the 1930s.',
                'ingredients' => json_encode(['Tequila', 'Lime Juice', 'Orange Liqueur', 'Salt']),
                'instructions' => json_encode(['1. Rim the glass with salt.', '2. Shake ingredients with ice and strain into glass.']),
                'tags' => json_encode(['Tequila', 'Citrus', 'Salt Rim', 'Refreshing']),
                'category' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Old Fashioned',
                'description' => 'A classic cocktail with whiskey, bitters, and a hint of citrus.',
                'history' => 'One of the oldest known cocktails, dating back to the early 19th century.',
                'ingredients' => json_encode(['Whiskey', 'Sugar', 'Bitters', 'Orange Peel']),
                'instructions' => json_encode(['1. Muddle sugar and bitters.', '2. Add whiskey and ice and stir.']),
                'tags' => json_encode(['Whiskey', 'Bitters', 'Classic']),
                'category' => 3,
                'user_id' => 1
            ],
            [
                'name' => 'Mojito',
                'description' => 'A light, refreshing Cuban cocktail made with rum, lime, mint, and soda water.',
                'history' => 'Originated in Cuba and became popular worldwide in the mid-20th century.',
                'ingredients' => json_encode(['White Rum', 'Mint Leaves', 'Lime', 'Sugar', 'Soda Water']),
                'instructions' => json_encode(['1. Muddle mint and sugar.', '2. Add rum and lime juice and top with soda water.']),
                'tags' => json_encode(['Rum', 'Mint', 'Citrus', 'Refreshing']),
                'category' => 5,
                'user_id' => 1
            ],
            [
                'name' => 'Cosmopolitan',
                'description' => 'A vibrant pink cocktail made with vodka, triple sec, cranberry juice, and lime.',
                'history' => 'Popularized in the 1990s by the TV show "Sex and the City."',
                'ingredients' => json_encode(['Vodka', 'Triple Sec', 'Cranberry Juice', 'Lime']),
                'instructions' => json_encode(['1. Shake ingredients with ice and strain into a martini glass.']),
                'tags' => json_encode(['Vodka', 'Cranberry', 'Citrus', 'Trendy']),
                'category' => 2,
                'user_id' => 1
            ],
            [
                'name' => 'Whiskey Sour',
                'description' => 'A tart cocktail made with whiskey, lemon juice, and simple syrup.',
                'history' => 'Believed to have originated in the mid-1800s in the United States.',
                'ingredients' => json_encode(['Whiskey', 'Lemon Juice', 'Simple Syrup']),
                'instructions' => json_encode(['1. Shake ingredients with ice and strain into a glass.']),
                'tags' => json_encode(['Whiskey', 'Sour', 'Citrus']),
                'category' => 4,
                'user_id' => 1
            ],
            [
                'name' => 'Piña Colada',
                'description' => 'A tropical cocktail made with rum, coconut cream, and pineapple juice.',
                'history' => 'Originated in Puerto Rico in the 1950s.',
                'ingredients' => json_encode(['White Rum', 'Coconut Cream', 'Pineapple Juice']),
                'instructions' => json_encode(['1. Blend ingredients with ice until smooth.', '2. Serve in a chilled glass.']),
                'tags' => json_encode(['Rum', 'Coconut', 'Tropical', 'Sweet']),
                'category' => 7,
                'user_id' => 1
            ],
            [
                'name' => 'Gin and Tonic',
                'description' => 'A simple yet refreshing drink made with gin and tonic water.',
                'history' => 'Popularized by British officers in India as a way to make quinine more palatable.',
                'ingredients' => json_encode(['Gin', 'Tonic Water', 'Lime']),
                'instructions' => json_encode(['1. Pour gin over ice and top with tonic.', '2. Garnish with lime.']),
                'tags' => json_encode(['Gin', 'Tonic', 'Refreshing']),
                'category' => 6,
                'user_id' => 1
            ],
            [
                'name' => 'Mai Tai',
                'description' => 'A fruity cocktail with rum, lime, orgeat syrup, and orange liqueur.',
                'history' => 'Created in the 1940s in California as a Polynesian-inspired drink.',
                'ingredients' => json_encode(['White Rum', 'Dark Rum', 'Lime Juice', 'Orgeat Syrup', 'Orange Liqueur']),
                'instructions' => json_encode(['1. Shake ingredients with ice and strain over fresh ice.']),
                'tags' => json_encode(['Rum', 'Tropical', 'Fruity', 'Citrus']),
                'category' => 8,
                'user_id' => 1
            ],
            [
                'name' => 'Negroni',
                'description' => 'An Italian cocktail made with gin, Campari, and sweet vermouth.',
                'history' => 'Created in Florence, Italy, in 1919.',
                'ingredients' => json_encode(['Gin', 'Campari', 'Sweet Vermouth']),
                'instructions' => json_encode(['1. Stir ingredients with ice and strain into a rocks glass.']),
                'tags' => json_encode(['Gin', 'Bitter', 'Italian']),
                'category' => 9,
                'user_id' => 1
            ],
            [
                'name' => 'Bloody Mary',
                'description' => 'A savory cocktail made with vodka, tomato juice, and spices.',
                'history' => 'Created in the 1920s and became popular for brunch in the 20th century.',
                'ingredients' => json_encode(['Vodka', 'Tomato Juice', 'Worcestershire Sauce', 'Hot Sauce', 'Celery']),
                'instructions' => json_encode(['1. Shake ingredients with ice and strain into a glass.', '2. Garnish with celery.']),
                'tags' => json_encode(['Vodka', 'Savory', 'Brunch', 'Spicy']),
                'category' => 6,
                'user_id' => 1
            ],
            [
                'name' => 'Manhattan',
                'description' => 'A sophisticated cocktail made with whiskey, sweet vermouth, and bitters.',
                'history' => 'First created in New York City in the late 1800s.',
                'ingredients' => json_encode(['Whiskey', 'Sweet Vermouth', 'Bitters']),
                'instructions' => json_encode(['1. Stir ingredients with ice and strain into a glass.']),
                'tags' => json_encode(['Whiskey', 'Classic', 'Sophisticated']),
                'category' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Daiquiri',
                'description' => 'A simple cocktail made with rum, lime juice, and sugar.',
                'history' => 'Originated in Cuba in the early 1900s.',
                'ingredients' => json_encode(['White Rum', 'Lime Juice', 'Simple Syrup']),
                'instructions' => json_encode(['1. Shake ingredients with ice and strain into a glass.']),
                'tags' => json_encode(['Rum', 'Citrus', 'Simple']),
                'category' => 2,
                'user_id' => 1
            ],
            [
                'name' => 'Long Island Iced Tea',
                'description' => 'A strong cocktail made with a mix of spirits, lemon, and cola.',
                'history' => 'Created in the 1970s in Long Island, New York.',
                'ingredients' => json_encode(['Vodka', 'Tequila', 'Rum', 'Gin', 'Triple Sec', 'Lemon Juice', 'Cola']),
                'instructions' => json_encode(['1. Combine ingredients over ice and top with cola.']),
                'tags' => json_encode(['Vodka', 'Rum', 'Tequila', 'Gin', 'Strong']),
                'category' => 3,
                'user_id' => 1
            ],
            [
                'name' => 'Caipirinha',
                'description' => 'A Brazilian cocktail made with cachaça, lime, and sugar.',
                'history' => 'Originated in Brazil and became a national drink in the 20th century.',
                'ingredients' => json_encode(['Cachaça', 'Lime', 'Sugar']),
                'instructions' => json_encode(['1. Muddle lime and sugar, add ice and cachaça, and stir.']),
                'tags' => json_encode(['Cachaça', 'Citrus', 'Tropical']),
                'category' => 4,
                'user_id' => 1
            ],
            [
                'name' => 'Sazerac',
                'description' => 'A New Orleans classic made with rye whiskey, absinthe, and bitters.',
                'history' => 'Created in the 19th century in New Orleans, known as one of the first American cocktails.',
                'ingredients' => json_encode(['Rye Whiskey', 'Absinthe', 'Bitters', 'Sugar']),
                'instructions' => json_encode(['1. Rinse glass with absinthe.', '2. Stir remaining ingredients with ice and strain.']),
                'tags' => json_encode(['Whiskey', 'Herbal', 'Classic']),
                'category' => 5,
                'user_id' => 1
            ],
        ];

        foreach ($recipes as $recipe) {
            \App\Models\Recipe::create($recipe);
        }
    }
}
