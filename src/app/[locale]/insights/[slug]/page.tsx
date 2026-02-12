import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch, getOptimizedImageUrl } from "@/lib/sanity";
import { JsonLd } from "@/components/seo/JsonLd";
import { Article, WithContext } from "schema-dts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { articleBySlugQuery, articlesQuery } from "@/lib/sanity.queries";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

// ─── Types ───────────────────────────────────────────────
type SanityArticle = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    content: any; // Portable Text
    publishedAt: string;
    featuredImage: any;
    author: { name: string; image: any; bio: any };
    categories: string[] | null;
    tags: string[] | null;
    seoTitle?: string;
    seoDescription?: string;
};

type SanityArticleSlug = {
    slug: { current: string };
};

// ─── ISR ─────────────────────────────────────────────────
export const revalidate = 3600; // 1 hour

// ─── Generate Static Params ──────────────────────────────
export async function generateStaticParams() {
    const locales = ["fr", "en"];
    try {
        const articles = await sanityFetch<SanityArticleSlug[]>({
            query: articlesQuery,
            tags: ["article"],
        });

        return locales.flatMap((locale) =>
            articles.map((article) => ({
                locale,
                slug: article.slug.current,
            }))
        );
    } catch {
        return [];
    }
}

// ─── Metadata ────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;

    try {
        const article = await sanityFetch<SanityArticle>({
            query: articleBySlugQuery,
            params: { slug },
            tags: ["article"],
        });

        if (!article) return { title: "Article Not Found" };

        return generateSeoMetadata({
            locale,
            title: article.seoTitle || article.title,
            description: article.seoDescription || article.excerpt,
            path: `/insights/${slug}`,
            ogType: "article",
            ogImage: article.featuredImage ? getOptimizedImageUrl(article.featuredImage, { width: 1200, height: 630 }) : undefined,
        });
    } catch {
        return { title: "Article Error" };
    }
}

// ─── Page Component ──────────────────────────────────────
export default async function ArticlePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const article = await sanityFetch<SanityArticle>({
        query: articleBySlugQuery,
        params: { slug },
        tags: ["article"],
    });

    if (!article) notFound();

    const imageUrl = article.featuredImage
        ? getOptimizedImageUrl(article.featuredImage, { width: 1200, height: 675 })
        : null;

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)] pb-20">
                {/* Breadcrumb */}
                <div className="bg-neutral-50 border-b border-neutral-200 mb-8">
                    <div className="container-main py-4">
                        <Breadcrumbs
                            items={[
                                { label: locale === "fr" ? "Accueil" : "Home", href: "/", isCurrent: false },
                                { label: "Insights", href: "/insights", isCurrent: false },
                                { label: article.title, href: `/insights/${slug}`, isCurrent: true }
                            ]}
                        />
                    </div>
                </div>

                <article className="container-main max-w-4xl mx-auto mt-12">
                    <header className="mb-12 text-center">
                        <div className="text-sm text-neutral-500 mb-4 uppercase tracking-wider">
                            {new Date(article.publishedAt).toLocaleDateString(locale, { dateStyle: 'long' })}
                            {article.categories && ` • ${article.categories.join(", ")}`}
                        </div>
                        <h1 className="font-heading text-h2 lg:text-h1 mb-6 text-neutral-900">
                            {article.title}
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            {article.excerpt}
                        </p>
                    </header>

                    {imageUrl && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video relative bg-neutral-100">
                            {/* Image optimization handled by Next.js if using <Image>, 
                                 but here we just use the URL for simplicity or could use next/image */}
                            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="prose prose-lg mx-auto prose-neutral prose-headings:font-heading prose-a:text-primary">
                        {/* Placeholder for Portable Text rendering */}
                        <p className="text-center italic text-neutral-500">
                            [Content rendering would go here using PortableText component]
                        </p>
                    </div>
                </article>

                <JsonLd<Article>
                    data={{
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: article.title,
                        description: article.excerpt,
                        image: imageUrl ? [imageUrl] : [],
                        datePublished: article.publishedAt,
                        dateModified: article.publishedAt, // Or _updatedAt if available
                        author: {
                            "@type": "Person",
                            name: article.author?.name || "SEPACAM Team",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "SEPACAM",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://sepacam.com/logo.png"
                            }
                        }
                    }}
                />
            </main>
            <Footer />
        </>
    );
}
