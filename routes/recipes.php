<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\BookmarkController;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(RecipeController::class)->name('recipes.')->group(function () {
        Route::get('recipes/my-recipes', 'index')->name('index');
        Route::get('recipes/all-recipes', 'index')->name('global');
        Route::get('recipes/create', 'create')->name('create');
        Route::get('recipes/{recipe}', 'show')->name('show')->where('recipe', '^(?!list).*');
        Route::get('recipe/{recipe}/edit', 'edit')->name('edit');

        Route::post('recipe/', 'store')->name('store');
        Route::patch('recipe/{recipe}', 'update')->name('update');
        Route::delete('recipe/{recipe}', 'destroy')->name('destroy');

        Route::get('recipes/list/{source?}', 'list')->name('list');
    });
});
