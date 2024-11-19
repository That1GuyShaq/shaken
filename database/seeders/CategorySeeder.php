<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categroies = [
            [
                'name' => 'Cocktail',
                'definition' => 'Mixed drinks made from a combination of at least two ingredients, typically including a spirit, mixer, and sometimes garnishes or flavoring agents.',
                'characteristics' => 'Wide range of flavors and preparations, often balanced between strong, sweet, sour, and bitter elements, and served in various glassware.',
                'examples' => json_encode(['Margarita', 'Tequila Sunrise', 'Mojito'])
            ],
            [
                'name' => 'Martini',
                'definition' => 'A classic cocktail known for its spirit-forward profile, typically made with gin or vodka and dry vermouth, served with a garnish.',
                'characteristics' => 'Minimal ingredients, typically garnished with olives or a lemon twist, served in a martini glass, and often associated with sophistication and elegance.',
                'examples' => json_encode(['Classic Martini', 'Dirty Martini', 'Espresso Martini'])
            ],
            [
                'name' => 'Shot',
                'definition' => 'Small, concentrated servings of liquor or liquor mixes intended to be consumed in one gulp.',
                'characteristics' => 'Strong and intense flavors, typically consumed quickly for effect rather than taste, often used in social settings or celebratory events.',
                'examples' => json_encode(['Tequila Shot', 'Lemon Drop', 'Kamikaze'])
            ],
            [
                'name' => 'Highball',
                'definition' => 'Simple, refreshing mixed drinks made by combining a spirit with a larger portion of a non-alcoholic mixer in a tall glass.',
                'characteristics' => 'Light and refreshing, typically served over ice, with the mixer diluting the spirit, making it an easy-to-drink option.',
                'examples' => json_encode(['Gin and Tonic', 'Whiskey Highball', 'Rum and Coke'])
            ],
            [
                'name' => 'Sour',
                'definition' => 'Drinks that combine a base spirit with citrus juice (typically lemon or lime) and a sweetener, often shaken for a frothy texture.',
                'characteristics' => 'Balanced blend of tart and sweet flavors, frothy texture from shaking, usually garnished with a cherry or orange slice.',
                'examples' => json_encode(['Whiskey Sour', 'Amaretto Sour', 'Pisco Sour'])
            ],
            [
                'name' => 'Virgin (Non-Alcoholic)',
                'definition' => 'Alcohol-free versions of popular cocktails, crafted to mimic the flavors and presentation of traditional cocktails without alcohol.',
                'characteristics' => 'Suitable for all ages, focus on fresh and flavorful ingredients, popular in social settings for non-drinkers.',
                'examples' => json_encode(['Virgin Mojito', 'Virgin Piña Colada', 'Shirley Temple'])
            ],
            [
                'name' => 'Aperitif and Digestif',
                'definition' => 'Drinks specifically served before (aperitifs) or after (digestifs) a meal to stimulate appetite or aid digestion.',
                'characteristics' => 'Aperitifs are often light and dry, while digestifs are stronger and sweeter, commonly consumed in smaller quantities.',
                'examples' => json_encode(['Aperol Spritz', 'Negroni', 'Brandy'])
            ],
            [
                'name' => 'Liqueur',
                'definition' => 'Sweetened spirits infused with flavors, such as herbs, fruits, spices, or cream, often used in cocktails or enjoyed as a digestif.',
                'characteristics' => 'Sweet and flavorful, lower in alcohol than most spirits, can be served neat, over ice, or as cocktail ingredients.',
                'examples' => json_encode(['Baileys Irish Cream', 'Grand Marnier', 'Kahlúa'])
            ],
            [
                'name' => 'Beer and Cider Cocktail',
                'definition' => 'Mixed drinks that incorporate beer or cider as a base, often combined with spirits or other flavors.',
                'characteristics' => 'Lighter in alcohol content than spirit-based cocktails, often refreshing, with the effervescence from beer or cider adding texture.',
                'examples' => json_encode(['Michelada', 'Black and Tan', 'Snakebite'])
            ],
            [
                'name' => 'Mocktail',
                'definition' => 'Complex, non-alcoholic drinks that replicate the flavor and presentation of cocktails, crafted with fresh ingredients.',
                'characteristics' => 'Mimic cocktails in taste and presentation, ideal for social gatherings, and provide options for non-drinkers with fresh and creative ingredients.',
                'examples' => json_encode(['Nojito', 'Virgin Mary', 'Non-Alcoholic Sangria'])
            ]
        ];

        foreach ($categroies as $category) {
            \App\Models\Category::create($category);
        }
    }
}
