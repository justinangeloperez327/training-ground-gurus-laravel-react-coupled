import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index, show } from '@/routes/jobs';
import { Job, type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jobs',
        href: index().url,
    },
];

interface Props {
    jobs: Job[];
}

export default function JobsIndex({ jobs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jobs" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Button asChild>
                    <Link href={create().url}>Create New Job</Link>
                </Button>

                <div>
                    <Form
                        {...index.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing }) => (
                            <div className="grid gap-2">
                                <Input
                                    id="search"
                                    type="text"
                                    name="search"
                                    placeholder="Search jobs..."
                                    className="max-w-sm"
                                />
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="outline"
                                >
                                    {processing ? 'Searching...' : 'Search'}
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>
                <Table>
                    <TableCaption>A list of your recent jobs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Salary</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.id}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell className="text-right">
                                    ${job.minSalary} - ${job.maxSalary}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" asChild>
                                        <Link href={show(job.id).url}>
                                            View
                                        </Link>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <Link href={edit(job.id).url}>
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (
                                                confirm(
                                                    'Are you sure you want to delete this job?',
                                                )
                                            ) {
                                                router.delete(
                                                    destroy(job.id).url,
                                                    {
                                                        preserveScroll: true,
                                                        onSuccess: () =>
                                                            console.log(
                                                                'Job deleted',
                                                            ),
                                                        onError: (errors) =>
                                                            console.error(
                                                                errors,
                                                            ),
                                                    },
                                                );
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
