import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import CandidateLayout from '@/layouts/candidate-layout';
import { store } from '@/routes/applications';
import jobs, { index } from '@/routes/jobs';
import { Job, type BreadcrumbItem } from '@/types';
import { Textarea } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';

export default function ApplicationCreate({ job }: { job: Job }) {
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
                        <Form
                            {...store.form()}
                            resetOnSuccess={[]}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input
                                        type="hidden"
                                        name="job_id"
                                        value={job.id}
                                    />
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="resume">
                                                Resume
                                            </Label>
                                            <Input
                                                id="resume"
                                                type="file"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="resume"
                                                name="resume"
                                                placeholder="Job resume"
                                            />
                                            <InputError
                                                message={errors.resume}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cover_letter">
                                                Cover Letter
                                            </Label>
                                            <Textarea
                                                id="cover_letter"
                                                required
                                                autoFocus
                                                tabIndex={2}
                                                autoComplete="cover_letter"
                                                name="cover_letter"
                                                placeholder="Job cover letter"
                                                className="px-4 py-2"
                                            />
                                            <InputError
                                                message={errors.cover_letter}
                                                className="mt-2"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full"
                                            tabIndex={5}
                                            data-test="register-user-button"
                                        >
                                            {processing && <Spinner />}
                                            Apply
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CandidateLayout>
    );
}
