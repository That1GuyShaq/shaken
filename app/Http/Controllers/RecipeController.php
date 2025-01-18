<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRecipeRequest;
use App\Http\Requests\UpdateRecipeRequest;
use App\Http\Resources\RecipeTableResource;
use App\Http\Resources\CategoryListResource;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Recipes/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all()->sortBy('name');
        return Inertia::render('Recipes/Create', [
            'spirits'     => [],
            'ingredients' => [],
            'categories'  => CategoryListResource::collection($categories),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecipeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        dd($recipe);
        return Inertia::render('Recipes/Show', [
            'recipe' => RecipeTableResource::make($recipe),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecipeRequest $request, Recipe $recipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        //
    }

    /**
     * List all recipes in storage
     */
    public function list(Request $request)
    {
        $user = User::find(auth()->user()->id);

        if ($request->source === 'global') {
            $recipes = Recipe::all();
        }else {
            $recipes = $user->bookmarkedRecipes();
        }

        return RecipeTableResource::collection($recipes);
    }
}
