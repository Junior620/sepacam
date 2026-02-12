import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/lib/sanity";
import { productsQuery, articlesQuery } from "@/lib/sanity.queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sepacam.com";

// Type definition for Sanity documents
interface SanitySlug {
    current: string;
}

interface SanityDoc {
    _updatedAt?: string;
    slug: SanitySlug;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = Object.keys(routing.pathnames).filter(
        (path) => !path.includes("[slug]")
    );

    // Fetch dynamic content
    const products = await sanityFetch<SanityDoc[]>({
        query: productsQuery,
        tags: ["product"],
    });

    const articles = await sanityFetch<SanityDoc[]>({
        query: articlesQuery,
        tags: ["article"],
    });

    // Generate static entries for each locale
    const staticEntries = staticRoutes.flatMap((route) => {
        return routing.locales.map((locale) => {
            const path = route === "/" ? "" : route;
            // Resolve localized path if it's an object in routing.pathnames, otherwise use key
            // This is a simplification; ideally we'd map route key to localized path
            // For sitemap, we can simplify by just concatenating /locale/route_key if strictly necessary,
            // but Next-Intl routing usually expects the *localized* path segment.
            // However, sitemap should list the final URLs.

            // Let's rely on the routing config to get the localized path string if possible,
            // or for now, just append the keys (which might be English/Fr mix in keys? No, keys are abstract).
            // Looking at routing.ts, keys like "/transformation" map to "/transformation-cacao" (FR) and "/cocoa-processing" (EN).

            const routeConfig = routing.pathnames[route as keyof typeof routing.pathnames];
            let localizedPath = path;

            if (typeof routeConfig === 'object' && routeConfig !== null) {
                localizedPath = (routeConfig as any)[locale] || path;
            } else if (typeof routeConfig === 'string') {
                localizedPath = routeConfig;
            }

            return {
                url: `${SITE_URL}/${locale}${localizedPath === "/" ? "" : localizedPath}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: route === "/" ? 1 : 0.8,
            };
        });
    });

    // Generate product entries
    const productEntries = products.flatMap((product) => {
        return routing.locales.map((locale) => {
            const baseUrl = locale === "fr" ? "/produits-cacao" : "/cocoa-products";
            return {
                url: `${SITE_URL}/${locale}${baseUrl}/${product.slug.current}`,
                lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.9,
            };
        });
    });

    // Generate article entries
    const articleEntries = articles.flatMap((article) => {
        return routing.locales.map((locale) => {
            // Assuming /insights is the base for both
            const baseUrl = "/insights";
            return {
                url: `${SITE_URL}/${locale}${baseUrl}/${article.slug.current}`,
                lastModified: article._updatedAt ? new Date(article._updatedAt) : new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            };
        });
    });

    return [...staticEntries, ...productEntries, ...articleEntries];
}
