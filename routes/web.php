<?php

use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\RecipeController;
// use App\Http\Resources\RecipeTableResource;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashbaord', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'upload'])->name('profile.upload');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::controller(RecipeController::class)->prefix('/recipes')->name('recipes.')->group(function () {
    //     Route::get('/', 'index')->name('index');
    //     Route::get('/{recipe}', 'show')->name('show');
    //     Route::get('/create', 'create')->name('create');
    //     Route::get('/{recipe}/edit', 'edit')->name('edit');

    //     Route::post('/', 'store')->name('store');
    //     Route::patch('/{recipe}', 'update')->name('update');
    //     Route::delete('/{recipe}', 'destroy')->name('destroy');
    // });

    // Route::get('recipes/all', function () {
    //     return new RecipeTableResource(App\Models\Recipe::all());
    // });
});

require __DIR__.'/auth.php';
require __DIR__.'/recipes.php';
