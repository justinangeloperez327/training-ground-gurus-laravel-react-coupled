<?php

namespace App\Http\Controllers;

use App\Events\InterviewInvitation;
use App\Models\Application;

class SendInterviewInvitationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Application $application)
    {
        InterviewInvitation::dispatch($application);

        // Logic to send interview invitation (e.g., via email) goes here.
        return to_route('applications.index')->with('status', 'Interview invitation sent successfully!');
    }
}
