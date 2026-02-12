"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

// Simple mapping for breadcrumb labels (could be replaced by translations)
const ROUTE_LABELS: Record<string, { fr: string; en: string }> = {
    "transformation-cacao": { fr: "Transformation", en: "Processing" },
    "cocoa-processing": { fr: "Turnover", en: "Processing" }, // mapping relies on segments
    "produits-cacao": { fr: "Produits", en: "Products" },
    "cocoa-products": { fr: "Produits", en: "Products" },
    "qualite-laboratoire": { fr: "Qualité", en: "Quality" },
    "quality": { fr: "Qualité", en: "Quality" },
    "tracabilite-conformite": { fr: "Traçabilité", en: "Traceability" },
    "traceability": { fr: "Traçabilité", en: "Traceability" },
    "durabilite": { fr: "Durabilité", en: "Sustainability" },
    "sustainability": { fr: "Durabilité", en: "Sustainability" },
    "kakaora": { fr: "KAKAORA", en: "KAKAORA" },
    "cafe": { fr: "Café", en: "Coffee" },
    "coffee": { fr: "Café", en: "Coffee" },
    "transit": { fr: "Transit", en: "Transit" },
    "services": { fr: "Services", en: "Services" },
    "a-propos": { fr: "À propos", en: "About" },
    "about": { fr: "À propos", en: "About" },
    "contact": { fr: "Contact", en: "Contact" },
};

export function BreadcrumbSchema() {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const locale = parts[0] as "fr" | "en";
    const segments = parts.slice(1);

    if (segments.length === 0) return null;

    const itemListElement = segments.map((segment, index) => {
        const path = `/${locale}/${segments.slice(0, index + 1).join("/")}`;
        // Try to get a nice label, fallback to capitalized segment
        const labelObj = ROUTE_LABELS[segment];
        const name = labelObj ? labelObj[locale] : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

        return {
            "@type": "ListItem" as const,
            position: index + 1,
            name: name,
            item: `https://sepacam.com${path}`,
        };
    });

    const data: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: locale === "fr" ? "Accueil" : "Home",
                item: `https://sepacam.com/${locale}`,
            },
            ...itemListElement.map(item => ({
                ...item,
                position: item.position + 1 // Shift positions by 1 since Home is #1
            }))
        ],
    };

    return <JsonLd<BreadcrumbList> data={data} />;
}
