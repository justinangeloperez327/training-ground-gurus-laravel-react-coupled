<?php

namespace App\Http\Controllers;

use App\Actions\Jobs\CreateNewJob;
use App\Http\Requests\StoreJobListingRequest;
use App\Http\Requests\UpdateJobListingRequest;
use App\Http\Resources\JobResource;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user() && $request->user()->role == 'candidate') {
            $jobs = JobListing::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('description', 'like', '%'.$search.'%')
                        ->orWhere('location', 'like', '%'.$search.'%');
                })
                ->when($request->input('filter'), function ($query, $filter) {
                    if ($filter === 'applied') {
                        $query->whereHas('applications', function ($q) {
                            $q->where('applicant_id', Auth::id());
                        });
                    }
                })
                ->with('company')
                ->paginate(10);

            return Inertia::render('jobs/candidate-index', [
                'jobs' => JobResource::collection($jobs),
            ]);
        }

        $jobs = JobListing::whereHas('company', function ($query) {
            if (Auth::user()->role === 'employer') {
                $query->where('user_id', Auth::id());
            }
        })
            ->when($request->input('search'), function ($query, $search) {
                $query->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhere('location', 'like', '%'.$search.'%');
            })
            ->with('company')
            ->paginate(10);

        return Inertia::render('jobs/index', [
            'jobs' => JobResource::collection($jobs),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('jobs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobListingRequest $request, CreateNewJob $action)
    {
        $validated = $request->validated();

        $action->handle($validated);

        return to_route('jobs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobListing $job)
    {
        return Inertia::render('jobs/show', [
            'job' => $job,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobListing $job)
    {
        return Inertia::render('jobs/edit', [
            'job' => $job,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobListingRequest $request, JobListing $job)
    {
        $validated = $request->validated();

        $job->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'min_salary' => $validated['min_salary'],
            'max_salary' => $validated['max_salary'],
        ]);

        return to_route('jobs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobListing $job)
    {
        $job->delete();

        return to_route('jobs.index');
    }
}
