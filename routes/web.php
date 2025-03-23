<?php

use App\Http\Controllers\Api\ImageController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/notes')->name('home');

Route::prefix('/images')->group(function () {
    Route::post('/', [ImageController::class, 'store'])->middleware('auth')->name('api.images.store');
});

require __DIR__.'/auth.php';
require __DIR__.'/app.php';
require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
