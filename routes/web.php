<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/notes')->name('home');

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
require __DIR__.'/app.php';
require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
