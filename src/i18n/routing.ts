import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // Supported locales
    locales: ["fr", "en"],

    // Default locale (French for a Cameroonian company)
    defaultLocale: "fr",

    // URL prefix strategy
    localePrefix: "always",

    // Path names for localized routes
    pathnames: {
        "/": "/",
        "/transformation": {
            fr: "/transformation-cacao",
            en: "/cocoa-processing",
        },
        "/produits-cacao": {
            fr: "/produits-cacao",
            en: "/cocoa-products",
        },
        "/produits-cacao/[slug]": {
            fr: "/produits-cacao/[slug]",
            en: "/cocoa-products/[slug]",
        },
        "/qualite-laboratoire": {
            fr: "/qualite-laboratoire",
            en: "/quality",
        },
        "/tracabilite-conformite": {
            fr: "/tracabilite-conformite",
            en: "/traceability-compliance",
        },
        "/durabilite": {
            fr: "/durabilite",
            en: "/sustainability",
        },
        "/kakaora": "/kakaora",
        "/cafe": {
            fr: "/cafe",
            en: "/coffee",
        },
        "/transit": "/transit",
        "/services": "/services",
        "/insights": "/insights",
        "/insights/[slug]": "/insights/[slug]",
        "/a-propos": {
            fr: "/a-propos",
            en: "/about",
        },
        "/contact": "/contact",
        "/merci": {
            fr: "/merci",
            en: "/thank-you",
        },
        "/mentions-legales": {
            fr: "/mentions-legales",
            en: "/legal-notice",
        },
        "/confidentialite": {
            fr: "/confidentialite",
            en: "/privacy",
        },
        "/code-conduite": {
            fr: "/code-conduite",
            en: "/code-of-conduct",
        },
    },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

// Static pathnames without dynamic segments (for navigation links)
export type StaticPathnames = Exclude<Pathnames, "/produits-cacao/[slug]" | "/insights/[slug]">;

