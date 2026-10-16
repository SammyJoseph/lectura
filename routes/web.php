<?php

use App\Http\Controllers\StudentAccessController;
use Illuminate\Support\Facades\Route;

Route::get('/', [StudentAccessController::class, 'home'])->name('home');
Route::get('/salir', [StudentAccessController::class, 'logout'])->name('student.logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::view('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

Route::get('/{slug}/{token}', [StudentAccessController::class, 'accessByLink'])
    ->where('slug', '^(?!admin|dashboard|settings|login|register|logout|salir|up|_boost)[a-z0-9\-]+$')
    ->name('student.access');

Route::get('/{slug}', [StudentAccessController::class, 'accessMissingToken'])
    ->where('slug', '^(?!admin|dashboard|settings|login|register|logout|salir|up|_boost)[a-z0-9\-]+$');
