<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\RegisterEmployerController;
use App\Http\Middleware\EmployerMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/register-employer', [RegisterEmployerController::class, 'create'])->name('register-employer-create');
Route::post('/register-employer', [RegisterEmployerController::class, 'store'])->name('register-employer-store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->middleware(EmployerMiddleware::class);

    Route::resource('jobs', JobListingController::class);

    Route::get('jobs/{job}/apply', [JobListingController::class, 'applyPage'])->name('jobs.apply');
    Route::post('jobs/{job}/apply', [JobListingController::class, 'applySubmit'])->name('jobs.apply.submit');
});

require __DIR__.'/settings.php';
