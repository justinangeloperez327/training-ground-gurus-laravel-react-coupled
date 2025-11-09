import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import GuestLayout from '@/layouts/guest-layout';
import { Job } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ jobs }: { jobs: Job[] }) {
    return (
        <GuestLayout>
            <Head title="Jobs">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                Jobs
                <div className="mt-4 grid grid-cols-1 gap-2">
                    {jobs.map((job) => (
                        <Item key={job.id} variant="outline">
                            <ItemContent>
                                <ItemTitle>{job.title}</ItemTitle>
                                <ItemDescription>
                                    {job.description}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button
                                    variant="outline"
                                    type="button"
                                    size="sm"
                                    asChild
                                >
                                    <Link
                                        href={`/applications/create?job_id=${job.id}`}
                                    >
                                        Apply
                                    </Link>
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
