import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import CandidateLayout from '@/layouts/candidate-layout';
import { index, sendInterviewInvitation, show } from '@/routes/applications';
import { Application, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function ApplicationShow({
    application,
}: {
    application: Application;
}) {
    const { auth } = usePage<SharedData>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Applications',
            href: index().url,
        },
        {
            title: application.id.toString(),
            href: show(application.id).url,
        },
    ];
    return (
        <CandidateLayout breadcrumbs={breadcrumbs}>
            <Head title="Application Show" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{application.jobListing.title}</CardTitle>
                        <CardDescription>
                            {application.jobListing.description}
                        </CardDescription>
                        <CardDescription>
                            Pay: ${application.jobListing.minSalary} - $
                            {application.jobListing.maxSalary}
                        </CardDescription>
                        <CardDescription>
                            Location: {application.jobListing.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="resume">Resume</Label>
                                <span>{application.resumePath}</span>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cover_letter">
                                    Cover Letter
                                </Label>
                                <span>{application.coverLetter}</span>
                            </div>
                        </div>
                        <div>
                            {auth.user?.role === 'employer' && (
                                <div className="mt-4">
                                    <a
                                        href={
                                            sendInterviewInvitation(
                                                application.id,
                                            ).url
                                        }
                                        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Send Interview Invitation
                                    </a>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CandidateLayout>
    );
}
