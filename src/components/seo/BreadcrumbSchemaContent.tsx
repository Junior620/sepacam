"use client";

import { usePathname } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";
import { getBreadcrumbItems } from "@/lib/breadcrumbs";
import { useLocale } from "next-intl";

export function BreadcrumbSchemaContent() {
    const pathname = usePathname();
    const locale = useLocale() as "fr" | "en";

    if (!pathname) return null;

    const items = getBreadcrumbItems(pathname, locale);

    if (items.length <= 1) return null;

    const itemListElement = items.map((item, index) => ({
        "@type": "ListItem" as const,
        position: index + 1,
        name: item.label,
        item: `https://sepacam.com${item.href === "/" && locale !== "en" ? "/fr" : item.href}`
    })).map(item => ({
        ...item,
        item: item.item.startsWith("http") ? item.item : `https://sepacam.com${item.item}`
    }));

    const data: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemListElement as any
    };

    return <JsonLd<BreadcrumbList> data={data} />;
}
