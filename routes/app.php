<?php

use App\Http\Controllers\App\ArchiveController;
use App\Http\Controllers\App\ImageController;
use App\Http\Controllers\App\NoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('/notes')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [NoteController::class, 'index'])->name('notes.index');

    Route::post('/', [NoteController::class, 'store'])->name('notes.store');

    Route::patch('/reorder', [NoteController::class, 'reorder'])->name('notes.reorder');
    Route::patch('/{note}', [NoteController::class, 'update'])->name('notes.update');

    Route::delete('/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
});

Route::prefix('/todos')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => inertia('app/todos/index'))->name('todos.index');
});

Route::prefix('/pomodoro')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => inertia('app/pomodoro/index'))->name('pomodoro.index');
});

Route::prefix('/images')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ImageController::class, 'index'])->name('images.index');

    Route::post('/', [ImageController::class, 'store'])->name('images.store');

    Route::delete('/{image}', [ImageController::class, 'destroy'])->name('images.destroy');
    Route::delete('/', [ImageController::class, 'destroys'])->name('images.destroys');
});

Route::prefix('/archive')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ArchiveController::class, 'index'])->name('archive.index');
});
