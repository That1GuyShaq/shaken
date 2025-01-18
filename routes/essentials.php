<?php

use App\Http\Controllers\EssentialsController;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(EssentialsController::class)->name('essentials.')->prefix('essentials')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/{essential}', 'show')->name('show');
        Route::get('/{essential}/edit', 'edit')->name('edit');

        Route::post('/store', 'store')->name('store');
        Route::patch('/{essential}', 'update')->name('update');
        Route::delete('/{essential}', 'destroy')->name('destroy');

        Route::get('essentials/list/{source?}', 'list')->name('list');
    });
});
