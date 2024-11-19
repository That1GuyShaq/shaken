<?php

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Resources\RecipeTableResource;
use App\Http\Controllers\BookmarkController;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(RecipeController::class)->name('recipes.')->group(function () {
        Route::get('recipes/my-recipes', 'index')->name('index');
        Route::get('recipes/all-recipes', 'index')->name('global');
        Route::get('recipes/create', 'create')->name('create');
        Route::get('recipes/{recipe}', 'show')->name('show')->where('recipe', '^(?!all).*');
        Route::get('recipe/{recipe}/edit', 'edit')->name('edit');

        Route::post('recipe/', 'store')->name('store');
        Route::patch('recipe/{recipe}', 'update')->name('update');
        Route::delete('recipe/{recipe}', 'destroy')->name('destroy');
    });

    Route::controller(BookmarkController::class)->prefix('/bookmark')->name('bookmark.')->group(function () {
        Route::post('/{recipe}/{bookmarked}', 'bookmark')->name('bookmark')->where('recipe', '^(?!all).*');
    });

    Route::get('recipes/all/{source?}', function (Request $request) {
        $recipe = new Recipe();
        if ($request->source === 'global') {
            $recipes = Recipe::where('user_id', auth()->user()->id)->get();
        }else {
            $recipes = $recipe->bookmarked();
        }
        // dd($request->source);
        return RecipeTableResource::collection($recipes);
    })->name('recipes.all');
});
