import type { Metadata } from "next";

// ═══════════════════════════════════════════════════════════
// SHARED SEO METADATA HELPER
// ═══════════════════════════════════════════════════════════

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sepacam.com";
const SITE_NAME = "SEPACAM";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg"; // 1200×630

interface SeoParams {
    /** Current locale */
    locale: string;
    /** Page title (will be wrapped by the layout template "%s | SEPACAM") */
    title: string;
    /** Meta description ≤ 160 chars */
    description: string;
    /** Canonical path WITHOUT locale prefix, e.g. "/contact" or "/cafe" */
    path: string;
    /** Localized path for FR, e.g. "/cafe". Falls back to `path` */
    pathFr?: string;
    /** Localized path for EN, e.g. "/coffee". Falls back to `path` */
    pathEn?: string;
    /** Keywords for meta keywords tag */
    keywords?: string[];
    /** Custom OG image path (relative to public). Falls back to default */
    ogImage?: string;
    /** OG type. Defaults to "website" */
    ogType?: "website" | "article";
}

/**
 * Generate consistent Metadata for any page including:
 * - Title, description, keywords
 * - Open Graph (title, description, url, image, siteName, locale, type)
 * - Twitter Card (large image summary)
 * - Canonical URL + hreflang alternates
 */
export function generateSeoMetadata({
    locale,
    title,
    description,
    path,
    pathFr,
    pathEn,
    keywords,
    ogImage,
    ogType = "website",
}: SeoParams): Metadata {
    const isFr = locale === "fr";
    const localePath = isFr ? (pathFr || path) : (pathEn || path);
    const canonicalUrl = `${SITE_URL}/${locale}${localePath}`;

    const frUrl = `${SITE_URL}/fr${pathFr || path}`;
    const enUrl = `${SITE_URL}/en${pathEn || path}`;

    const imageUrl = ogImage || DEFAULT_OG_IMAGE;
    const absoluteImageUrl = imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            locale: isFr ? "fr_FR" : "en_US",
            type: ogType,
            images: [
                {
                    url: absoluteImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteImageUrl],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                fr: frUrl,
                en: enUrl,
            },
        },
    };
}
