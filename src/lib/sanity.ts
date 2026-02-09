import { createClient } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

// Sanity configuration
export const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: process.env.NODE_ENV === "production",
};

// Create the Sanity client
export const sanityClient = createClient(config);

// Write client for mutations (server-side only)
export const sanityWriteClient = createClient({
    ...config,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// ============================================
// Image Optimization Pipeline
// ============================================

interface ImageOptions {
    width?: number;
    height?: number;
    quality?: number;
    blur?: number;
    format?: "webp" | "jpg" | "png";
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
}

/**
 * Generate optimized image URL with responsive sizing
 */
export function getOptimizedImageUrl(
    source: SanityImageSource,
    options: ImageOptions = {}
) {
    const {
        width,
        height,
        quality = 80,
        blur,
        format = "webp",
        fit = "max",
    } = options;

    let imageBuilder = builder.image(source).auto("format").fit(fit).quality(quality);

    if (width) imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    if (blur) imageBuilder = imageBuilder.blur(blur);
    if (format) imageBuilder = imageBuilder.format(format);

    return imageBuilder.url();
}

/**
 * Generate srcSet for responsive images
 */
export function getResponsiveSrcSet(
    source: SanityImageSource,
    widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920]
): string {
    return widths
        .map((w) => `${getOptimizedImageUrl(source, { width: w })} ${w}w`)
        .join(", ");
}

/**
 * Get placeholder blur data URL (low quality image placeholder)
 */
export function getBlurDataUrl(source: SanityImageSource): string {
    return builder
        .image(source)
        .width(20)
        .height(20)
        .blur(10)
        .quality(30)
        .format("webp")
        .url() || "";
}

// ============================================
// Document/File Handling
// ============================================

interface FileAsset {
    _type: "file";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

/**
 * Get the URL for a file asset (PDFs, documents, etc.)
 */
export function getFileUrl(file: FileAsset): string {
    if (!file?.asset?._ref) return "";

    const [, id, extension] = file.asset._ref.split("-");
    return `https://cdn.sanity.io/files/${config.projectId}/${config.dataset}/${id}.${extension}`;
}

/**
 * Get file metadata from reference
 */
export function getFileMetadata(ref: string) {
    const parts = ref.split("-");
    return {
        id: parts[1],
        extension: parts[2],
    };
}

// ============================================
// Data Fetching with ISR Support
// ============================================

/**
 * Helper to fetch data with error handling and ISR tags
 */
export async function sanityFetch<T>({
    query,
    params = {},
    tags = [],
    revalidate,
}: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
    revalidate?: number | false;
}): Promise<T> {
    const isDev = process.env.NODE_ENV === "development";

    return sanityClient.fetch<T>(query, params, {
        next: {
            revalidate: revalidate ?? (isDev ? 0 : 3600),
            tags,
        },
    });
}

/**
 * Revalidate specific tags (to be called from webhook handler)
 */
export const SANITY_REVALIDATE_TAGS = {
    products: "sanity:products",
    articles: "sanity:articles",
    pages: "sanity:pages",
    settings: "sanity:settings",
    authors: "sanity:authors",
    categories: "sanity:categories",
} as const;

/**
 * Get the appropriate tag for a document type
 */
export function getRevalidateTag(documentType: string): string {
    const tagMap: Record<string, string> = {
        product: SANITY_REVALIDATE_TAGS.products,
        article: SANITY_REVALIDATE_TAGS.articles,
        page: SANITY_REVALIDATE_TAGS.pages,
        siteSettings: SANITY_REVALIDATE_TAGS.settings,
        author: SANITY_REVALIDATE_TAGS.authors,
        category: SANITY_REVALIDATE_TAGS.categories,
    };
    return tagMap[documentType] || `sanity:${documentType}`;
}
