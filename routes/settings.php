<?php

// use App\Http\Controllers\Settings\AppearanceController;

use App\Http\Controllers\Settings\NoteController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('/settings')->middleware('auth')->group(function () {
    Route::redirect('/', 'settings/profile')->name('settings');

    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('settings.profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('settings.profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('settings.profile.destroy');
    });

    Route::prefix('/password')->group(function () {
        Route::get('/', [PasswordController::class, 'edit'])->name('settings.password.edit');
        Route::put('/', [PasswordController::class, 'update'])->name('settings.password.update');
    });

    // Route::prefix('/appearance')->group(function () {
    //     Route::get('/', [AppearanceController::class, 'edit'])->name('settings.appearance.edit');
    // });

    Route::prefix('/notes')->group(function () {
        Route::get('/', [NoteController::class, 'edit'])->name('settings.notes.edit');
    });
});
