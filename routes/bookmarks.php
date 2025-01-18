<?php

use App\Http\Controllers\BookmarkController;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(BookmarkController::class)->prefix('/bookmark')->name('bookmark.')->group(function () {
        Route::post('/{recipe}/{bookmarked}/{subject}', 'bookmark')->name('bookmark')->where('recipe', '^(?!list).*');
        Route::post('/{essential}/{bookmarked}/{subject}', 'bookmark')->name('bookmark')->where('essential', '^(?!list).*');
    });
});
