<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::prefix('/notes')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [NoteController::class, 'index'])->name('notes.index');

    Route::get('/create', [NoteController::class, 'create'])->name('notes.create');
    Route::post('/', [NoteController::class, 'store'])->name('notes.store');

    Route::get('/{note}', [NoteController::class, 'show'])->name('notes.show');

    Route::patch('/reorder', [NoteController::class, 'reorder'])->name('notes.reorder');
    Route::get('/{note}/edit', [NoteController::class, 'edit'])->name('notes.edit');
    Route::patch('/{note}', [NoteController::class, 'update'])->name('notes.update');

    Route::delete('/{note}', [NoteController::class, 'destroy']);
});

Route::prefix('/todos')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => inertia('todos/index'))->name('todos.index');
});

Route::prefix('/pomodoro')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => inertia('pomodoro/index'))->name('pomodoro.index');
});
