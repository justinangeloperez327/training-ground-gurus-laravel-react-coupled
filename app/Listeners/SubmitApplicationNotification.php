<?php

namespace App\Listeners;

use App\Events\SubmitApplication;
use App\Notifications\ApplicationReceivedNotification;
use App\Notifications\SubmitApplicationNotification as NotificationsSubmitApplicationNotification;
use Illuminate\Support\Facades\Notification;

class SubmitApplicationNotification
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
    public function handle(SubmitApplication $event): void
    {
        Notification::send(
            $event->application->applicant,
            new NotificationsSubmitApplicationNotification($event->application),
        );

        Notification::send(
            $event->application->jobListing->company->user,
            new ApplicationReceivedNotification($event->application),
        );
    }
}
