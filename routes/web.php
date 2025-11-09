<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\RegisterEmployerController;
use App\Http\Controllers\SendInterviewInvitationController;
use App\Http\Middleware\EmployerMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/register-employer', [RegisterEmployerController::class, 'create'])->name('register-employer-create');
Route::post('/register-employer', [RegisterEmployerController::class, 'store'])->name('register-employer-store');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->middleware(EmployerMiddleware::class);

    Route::resource('jobs', JobListingController::class);

    Route::resource('applications', ApplicationController::class);

    Route::get('applications/{application}/send-interview-invitation', SendInterviewInvitationController::class)
        ->name('applications.send-interview-invitation');
});

require __DIR__.'/settings.php';
