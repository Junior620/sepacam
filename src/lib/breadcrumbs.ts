import { Link } from "@/i18n/navigation";

// Shared route labels mapping
export const ROUTE_LABELS: Record<string, { fr: string; en: string }> = {
    "transformation-cacao": { fr: "Transformation", en: "Processing" },
    "cocoa-processing": { fr: "Processing", en: "Processing" },
    "produits-cacao": { fr: "Produits", en: "Products" },
    "cocoa-products": { fr: "Products", en: "Products" },
    "qualite-laboratoire": { fr: "Qualité", en: "Quality" },
    "quality": { fr: "Quality", en: "Quality" },
    "tracabilite-conformite": { fr: "Traçabilité", en: "Traceability" },
    "traceability": { fr: "Traceability", en: "Traceability" },
    "durabilite": { fr: "Durabilité", en: "Sustainability" },
    "sustainability": { fr: "Sustainability", en: "Sustainability" },
    "kakaora": { fr: "KAKAORA", en: "KAKAORA" },
    "cafe": { fr: "Café", en: "Coffee" },
    "coffee": { fr: "Coffee", en: "Coffee" },
    "transit": { fr: "Transit", en: "Transit" },
    "services": { fr: "Services", en: "Services" },
    "a-propos": { fr: "À propos", en: "About" },
    "about": { fr: "About", en: "About" },
    "contact": { fr: "Contact", en: "Contact" },
    "insights": { fr: "Actualités", en: "Insights" },
    "mentions-legales": { fr: "Mentions Légales", en: "Legal Notice" },
    "legal-notice": { fr: "Legal Notice", en: "Legal Notice" },
    "confidentialite": { fr: "Confidentialité", en: "Privacy" },
    "privacy": { fr: "Privacy", en: "Privacy" },
    "code-conduite": { fr: "Code de Conduite", en: "Code of Conduct" },
    "code-of-conduct": { fr: "Code of Conduct", en: "Code of Conduct" },
};

export type BreadcrumbItem = {
    label: string;
    href: string;
    isCurrent: boolean;
};

export function getBreadcrumbItems(pathname: string, locale: "fr" | "en"): BreadcrumbItem[] {
    const parts = pathname.split("/").filter(Boolean);
    // Remove locale if present at start (though typically passed pathname is full)
    const effectiveParts = parts[0] === locale ? parts.slice(1) : parts;

    // Always start with Home
    const items: BreadcrumbItem[] = [
        {
            label: locale === "fr" ? "Accueil" : "Home",
            href: "/",
            isCurrent: effectiveParts.length === 0,
        },
    ];

    effectiveParts.forEach((segment, index) => {
        const path = `/${effectiveParts.slice(0, index + 1).join("/")}`;
        const labelObj = ROUTE_LABELS[segment];

        // Use mapped label or formatted segment
        let label = labelObj ? labelObj[locale] : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

        // Handle dynamic product slugs if we can infer or pass context (simplified here)
        // Ideally, specific pages override the label for the last segment (e.g. product name)

        items.push({
            label,
            href: path,
            isCurrent: index === effectiveParts.length - 1,
        });
    });

    return items;
}
