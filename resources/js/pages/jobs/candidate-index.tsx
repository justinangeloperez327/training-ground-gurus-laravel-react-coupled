import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import CandidateLayout from '@/layouts/candidate-layout';
import { index } from '@/routes/jobs';
import { Job, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jobs',
        href: index().url,
    },
];

interface Link {
    url: string | null;
    label: string | number;
    active: boolean;
}

interface JobsProps {
    jobs: {
        data: Job[];
        links: Link;
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: Link[];
        };
    };
}

export default function CandidateJobsIndex({ jobs }: JobsProps) {
    return (
        <CandidateLayout breadcrumbs={breadcrumbs}>
            <Head title="Jobs" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                Jobs{' '}
                <Link href="/jobs?filter=applied" prefetch>
                    Applied Jobs
                </Link>
                <div className="mt-4 mb-4 grid grid-cols-1 gap-2">
                    {jobs.data.map((job) => (
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
                <Pagination>
                    <PaginationContent>
                        {jobs.meta.links.map((link: Link, index: number) => (
                            <PaginationItem key={index} disabled={!link.url}>
                                <PaginationLink
                                    href={link.url || '#'}
                                    aria-current={
                                        link.active ? 'page' : undefined
                                    }
                                    isActive={link.active}
                                >
                                    {link.label
                                        .toString()
                                        .replace(/&laquo;|&raquo;/g, '')}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </CandidateLayout>
    );
}
