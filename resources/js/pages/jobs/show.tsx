import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import jobs, { edit, index } from '@/routes/jobs';
import { Job, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function ShowJob({ job }: { job: Job }) {
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Job" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                Job Show
                <>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                readOnly
                                id="title"
                                defaultValue={job.title}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                readOnly
                                id="description"
                                defaultValue={job.description}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                readOnly
                                id="location"
                                defaultValue={job.location}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="min_salary">Min Salary</Label>
                            <Input
                                readOnly
                                id="min_salary"
                                defaultValue={job.minSalary}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="max_salary">Max Salary</Label>
                            <Input
                                readOnly
                                id="max_salary"
                                defaultValue={job.maxSalary}
                            />
                        </div>

                        <Button asChild>
                            <Link href={edit(job.id).url}>Edit Job</Link>
                        </Button>
                    </div>
                </>
            </div>
        </AppLayout>
    );
}
