import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SEPACAM - Cacao Camerounais Transformé",
        short_name: "SEPACAM",
        description: "Transformation de cacao, négoce de café et transit au Cameroun.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1B5E3B", // Primary green
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/icon-192.png", // Ensure these exist or use placeholders
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
