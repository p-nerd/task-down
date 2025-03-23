<?php

use App\Http\Controllers\Api\ImageController;
use Illuminate\Support\Facades\Route;

Route::prefix('/images')->group(function () {
    Route::post('/', [ImageController::class, 'store'])->name('api.images.store');
});
