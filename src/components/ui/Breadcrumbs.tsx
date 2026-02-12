"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { getBreadcrumbItems, BreadcrumbItem } from "@/lib/breadcrumbs";
import { useLocale } from "next-intl";

type BreadcrumbsProps = {
    items?: BreadcrumbItem[];
    className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    const pathname = usePathname();
    const locale = useLocale() as "fr" | "en";

    // Use provided items or auto-generate
    const breadcrumbs = items || getBreadcrumbItems(pathname, locale);

    // If only home, don't show (optional per design, but usually better to hide 1-level)
    if (breadcrumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className={`text-small ${className}`}>
            <ol className="flex items-center flex-wrap gap-2 text-neutral-500">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            {index > 0 && (
                                <span className="text-neutral-300" aria-hidden="true">
                                    /
                                </span>
                            )}

                            {isLast ? (
                                <span className="font-medium text-neutral-900" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href as any}
                                    className="hover:text-primary transition-colors hover:underline"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
