import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sepacam.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/studio/"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
