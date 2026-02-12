import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardImage, CardBody } from "@/components/ui/Card";
import type { Metadata } from "next";

// ISR: revalidate every 1 hour (CMS-driven)
export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("products.title"),
        description: t("products.description"),
    };
}

const products = [
    {
        key: "liquor",
        slug: "liqueur-cacao",
        badge: "Best Seller",
        applications: ["chocolate", "confectionery", "bakery"],
    },
    {
        key: "butter",
        slug: "beurre-cacao",
        badge: null,
        applications: ["chocolate", "cosmetics", "pharmaceuticals"],
    },
    {
        key: "powder",
        slug: "poudre-cacao",
        badge: null,
        applications: ["beverages", "bakery", "food_industry"],
    },
    {
        key: "cake",
        slug: "tourteau-cacao",
        badge: null,
        applications: ["powder_production", "animal_feed"],
    },
    {
        key: "nibs",
        slug: "grues-cacao",
        badge: null,
        applications: ["snacking", "bakery", "chocolate"],
    },
];

export default async function ProductsCatalogPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("products");

    const isFr = locale === "fr";

    return (
        <>
            <Header />
            <main id="main-content" className="pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="section-spacing gradient-hero">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                {isFr ? "Produits Export" : "Export Products"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <Card
                                    key={product.key}
                                    href={`/produits-cacao/${product.slug}`}
                                    className="group"
                                >
                                    <CardImage aspectRatio="aspect-[4/3]">
                                        {/* Placeholder image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                            <svg
                                                className="w-16 h-16 text-primary/30"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1}
                                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                />
                                            </svg>
                                        </div>
                                        {/* Badge */}
                                        {product.badge && (
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="accent" size="md">
                                                    {product.badge}
                                                </Badge>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                                    </CardImage>
                                    <CardBody className="p-6">
                                        <h3 className="font-heading text-h3 text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                                            {t(`items.${product.key}.name`)}
                                        </h3>
                                        <p className="text-body text-neutral-600 mb-4">
                                            {t(`items.${product.key}.description`)}
                                        </p>

                                        {/* Applications */}
                                        <div className="flex flex-wrap gap-2">
                                            {product.applications.slice(0, 3).map((app) => (
                                                <span
                                                    key={app}
                                                    className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-600"
                                                >
                                                    {isFr
                                                        ? {
                                                            chocolate: "Chocolaterie",
                                                            confectionery: "Confiserie",
                                                            bakery: "Pâtisserie",
                                                            cosmetics: "Cosmétique",
                                                            pharmaceuticals: "Pharma",
                                                            beverages: "Boissons",
                                                            food_industry: "Agro-alimentaire",
                                                            powder_production: "Poudre",
                                                            animal_feed: "Alimentation animale",
                                                            snacking: "Snacking",
                                                        }[app]
                                                        : {
                                                            chocolate: "Chocolate",
                                                            confectionery: "Confectionery",
                                                            bakery: "Bakery",
                                                            cosmetics: "Cosmetics",
                                                            pharmaceuticals: "Pharma",
                                                            beverages: "Beverages",
                                                            food_industry: "Food Industry",
                                                            powder_production: "Powder",
                                                            animal_feed: "Animal Feed",
                                                            snacking: "Snacking",
                                                        }[app]}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex items-center gap-2 text-primary mt-4 font-medium text-small group-hover:gap-3 transition-all">
                                            <span>{isFr ? "Voir le produit" : "View product"}</span>
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quality Guarantee */}
                <section className="py-12 lg:py-16 bg-neutral-50 border-y border-neutral-200">
                    <div className="container-main">
                        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
                            <div className="flex items-center gap-3">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <span className="text-body font-medium text-neutral-700">
                                    {isFr ? "Traçabilité garantie" : "Guaranteed traceability"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span className="text-body font-medium text-neutral-700">
                                    {isFr ? "COA sur demande" : "COA on request"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    />
                                </svg>
                                <span className="text-body font-medium text-neutral-700">
                                    {isFr ? "Export FOB/CIF" : "FOB/CIF Export"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
