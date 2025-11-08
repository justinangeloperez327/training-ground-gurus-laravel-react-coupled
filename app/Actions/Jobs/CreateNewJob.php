<?php

namespace App\Actions\Jobs;

use App\Models\JobListing;
use Illuminate\Support\Facades\Auth;

class CreateNewJob
{
    /**
     * Create a new job listing.
     */
    public function handle(array $data): JobListing
    {
        return JobListing::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'location' => $data['location'],
            'min_salary' => $data['min_salary'],
            'max_salary' => $data['max_salary'],
            'company_id' => Auth::user()->company->id,
        ]);
    }
}
