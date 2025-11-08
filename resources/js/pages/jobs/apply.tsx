import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CandidateLayout from '@/layouts/candidate-layout';
import jobs, { index } from '@/routes/jobs';
import { Job, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function ApplyJob({ job }: { job: Job }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Jobs',
            href: index().url,
        },
        {
            title: job.id.toString(),
            href: jobs.show(job.id).url,
        },
    ];
    return (
        <CandidateLayout breadcrumbs={breadcrumbs}>
            <Head title="Apply Job" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.description}</CardDescription>
                        <CardDescription>
                            Pay: ${job.minSalary} - ${job.maxSalary}
                        </CardDescription>
                        <CardDescription>
                            Location: {job.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button type="submit">Apply for Job</Button>
                    </CardContent>
                </Card>
            </div>
        </CandidateLayout>
    );
}
