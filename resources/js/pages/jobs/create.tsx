import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import jobs, { store } from '@/routes/jobs';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jobs',
        href: jobs.index().url,
    },
    {
        title: 'Create Job',
        href: jobs.create().url,
    },
];

export default function CreateJob() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Job" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                Create Job Page
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="title"
                                        name="title"
                                        placeholder="Job title"
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="description"
                                        name="description"
                                        placeholder="Job description"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="location"
                                        name="location"
                                        placeholder="Job location"
                                    />
                                    <InputError
                                        message={errors.location}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="min_salary">
                                        Min Salary
                                    </Label>
                                    <Input
                                        id="min_salary"
                                        type="number"
                                        min="0.00"
                                        step="0.01"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="min_salary"
                                        name="min_salary"
                                        placeholder="Min Salary"
                                    />
                                    <InputError
                                        message={errors.min_salary}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="max_salary">
                                        Max Salary
                                    </Label>
                                    <Input
                                        id="max_salary"
                                        type="number"
                                        min="0.00"
                                        step="0.01"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="max_salary"
                                        name="max_salary"
                                        placeholder="Max Salary"
                                    />
                                    <InputError
                                        message={errors.max_salary}
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
                                    Create Job
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
