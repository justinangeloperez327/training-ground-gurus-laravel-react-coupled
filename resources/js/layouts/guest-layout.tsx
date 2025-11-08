import AppLayoutTemplate from '@/layouts/app/guest-header-layout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>
);
