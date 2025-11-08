<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $jobs = JobListing::with('company')->get();

        return Inertia::render('welcome', [
            'jobs' => JobResource::collection($jobs),
        ]);
    }
}
