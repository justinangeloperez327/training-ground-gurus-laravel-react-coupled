<?php

namespace App\Http\Controllers;

use App\Events\SubmitApplication;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\JobResource;
use App\Models\Application;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if (Auth::user()->role == 'candidate') {
            $applications = Application::where('applicant_id', Auth::id())
                ->when($request->input('search'), function ($query, $search) {
                    $query->whereHas('jobListing', function ($q) use ($search) {
                        $q->where('title', 'like', '%'.$search.'%')
                            ->orWhere('description', 'like', '%'.$search.'%')
                            ->orWhere('location', 'like', '%'.$search.'%');
                    });
                })
                ->with(['jobListing.company'])
                ->paginate(5);

            return Inertia::render('applications/candidate-index', [
                'applications' => ApplicationResource::collection($applications),
            ]);
        }

        if (Auth::user()->role === 'employer') {
            $applications = Application::whereHas('jobListing', function ($query) {
                $query->where('company_id', Auth::user()->company->id);
            })
                ->when($request->input('search'), function ($query, $search) {
                    $query->whereHas('jobListing', function ($q) use ($search) {
                        $q->where('title', 'like', '%'.$search.'%');
                    })->orWhereHas('applicant', function ($q) use ($search) {
                        $q->where('name', 'like', '%'.$search.'%');
                    });
                })
                ->with(['applicant', 'jobListing.company'])
                ->paginate(5);
        }

        if (Auth::user()->role === 'admin') {
            $applications = Application::with(['jobListing.company'])
                ->when($request->input('search'), function ($query, $search) {
                    $query->whereHas('jobListing', function ($q) use ($search) {
                        $q->where('title', 'like', '%'.$search.'%')
                            ->orWhere('description', 'like', '%'.$search.'%')
                            ->orWhere('location', 'like', '%'.$search.'%');
                    });
                })
                ->paginate(5);
        }

        return Inertia::render('applications/index', [
            'applications' => ApplicationResource::collection($applications),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $job = JobListing::when($request->input('job_id'), function ($query, $jobId) {
            $query->where('id', $jobId);
        })->firstOrFail();

        return Inertia::render('applications/create', [
            'job' => new JobResource($job->load('company')),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationRequest $request)
    {

        $resumePath = $request->file('resume')->store('resumes', 'public');

        $application = Application::create([
            'job_listing_id' => $request->job_id,
            'applicant_id' => Auth::id(),
            'resume_path' => $resumePath,
            'cover_letter' => $request->cover_letter,
        ]);

        SubmitApplication::dispatch($application);

        return to_route('applications.show', $application->id)->with('success', 'Application submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        return Inertia::render('applications/show', [
            'application' => new ApplicationResource($application->load(['jobListing.company', 'applicant'])),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        //
    }
}
