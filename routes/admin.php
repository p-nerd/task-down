<?php

use Illuminate\Support\Facades\Route;

Route::get('/dashboard', fn () => inertia('dashboard'))->middleware(['auth', 'verified'])->name('dashboard');
