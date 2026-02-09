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

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Helper to fetch data with error handling
export async function sanityFetch<T>({
    query,
    params = {},
    tags = [],
}: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
}): Promise<T> {
    return sanityClient.fetch<T>(query, params, {
        next: {
            revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
            tags,
        },
    });
}
