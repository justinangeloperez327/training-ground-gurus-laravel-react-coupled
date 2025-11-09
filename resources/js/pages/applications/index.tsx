import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
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
import { index, show } from '@/routes/applications';
import { Application, type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Applications',
        href: index().url,
    },
];

interface Link {
    url: string | null;
    label: string | number;
    active: boolean;
}

interface ApplicationsProps {
    applications: {
        data: Application[];
        links: Link;
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: Link[];
        };
    };
}

export default function ApplicationsIndex({ applications }: ApplicationsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Applications" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
                            <TableHead>Applicant</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.data.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell>{application.id}</TableCell>
                                <TableCell>
                                    {application.applicant.name}
                                </TableCell>
                                <TableCell>
                                    {application.jobListing.title}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" asChild>
                                        <Link href={show(application.id).url}>
                                            View
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination>
                <PaginationContent>
                    {applications.meta.links.map(
                        (link: Link, index: number) => (
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
                        ),
                    )}
                </PaginationContent>
            </Pagination>
        </AppLayout>
    );
}
