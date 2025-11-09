<?php

namespace App\Listeners;

use App\Events\InterviewInvitation;
use App\Notifications\InterviewInvitationNotification;
use Illuminate\Support\Facades\Notification;

class SendInterviewInvitation
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(InterviewInvitation $event): void
    {
        Notification::send(
            $event->application->applicant,
            new InterviewInvitationNotification($event->application),
        );
    }
}
