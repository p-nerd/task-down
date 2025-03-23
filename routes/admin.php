<?php

use Illuminate\Support\Facades\Route;

Route::get('/dashboard', fn () => inertia('admin/dashboard'))->middleware(['auth', 'verified'])->name('dashboard');
