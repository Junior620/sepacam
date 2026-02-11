import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch, urlFor, getOptimizedImageUrl } from "@/lib/sanity";
import {
    productBySlugQuery,
    productsQuery,
} from "@/lib/sanity.queries";

// ─── Types ───────────────────────────────────────────────
type SanityProductDetail = {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    productType: string;
    description: string;
    longDescription?: string;
    applications?: string[];
    technicalSpecs?: Record<string, string>;
    certifications?: string[];
    packaging?: string[];
    moq?: string;
    incoterms?: string;
    heroImage?: unknown;
    gallery?: unknown[];
    documents?: { title: string; documentType: string; url: string }[];
    seoTitle?: string;
    seoDescription?: string;
};

type SanityProductSlug = {
    _id: string;
    slug: { current: string };
};

// ─── Static fallback data ────────────────────────────────
const staticProducts: Record<
    string,
    {
        key: string;
        badge: string | null;
        fatContent: string;
        moisture: string;
        fineness: string;
        packaging: string[];
        minOrder: number;
        leadTime: string;
    }
> = {
    "liqueur-cacao": {
        key: "liquor",
        badge: "Best Seller",
        fatContent: "50-55%",
        moisture: "< 2%",
        fineness: "99.5%",
        packaging: ["10kg", "25kg"],
        minOrder: 1,
        leadTime: "2-4 weeks",
    },
    "beurre-cacao": {
        key: "butter",
        badge: null,
        fatContent: "100%",
        moisture: "< 0.5%",
        fineness: "N/A",
        packaging: ["15kg", "25kg"],
        minOrder: 1,
        leadTime: "2-4 weeks",
    },
    "poudre-cacao": {
        key: "powder",
        badge: null,
        fatContent: "10-12%",
        moisture: "< 5%",
        fineness: "200 mesh",
        packaging: ["10kg", "25kg"],
        minOrder: 1,
        leadTime: "2-4 weeks",
    },
    "tourteau-cacao": {
        key: "cake",
        badge: null,
        fatContent: "10-12%",
        moisture: "< 5%",
        fineness: "N/A",
        packaging: ["25kg", "50kg"],
        minOrder: 5,
        leadTime: "1-2 weeks",
    },
    "grues-cacao": {
        key: "nibs",
        badge: null,
        fatContent: "50-55%",
        moisture: "< 3%",
        fineness: "N/A",
        packaging: ["5kg", "10kg", "25kg"],
        minOrder: 0.5,
        leadTime: "1-2 weeks",
    },
};

const staticNames: Record<string, Record<string, string>> = {
    fr: {
        liquor: "Liqueur de cacao",
        butter: "Beurre de cacao",
        powder: "Poudre de cacao",
        cake: "Tourteau de cacao",
        nibs: "Grué de cacao",
    },
    en: {
        liquor: "Cocoa Liquor",
        butter: "Cocoa Butter",
        powder: "Cocoa Powder",
        cake: "Cocoa Cake",
        nibs: "Cocoa Nibs",
    },
};

const staticDescriptions: Record<string, Record<string, string>> = {
    fr: {
        liquor: "Masse de cacao pur à 100%, obtenue par le broyage des fèves torréfiées. Base fondamentale pour la production de chocolat, confiseries et applications alimentaires haut de gamme.",
        butter: "Matière grasse naturelle extraite par pression de la masse de cacao. Utilisée en chocolaterie fine, cosmétique et industrie pharmaceutique.",
        powder: "Poudre dégraissée obtenue après extraction du beurre. Idéale pour boissons chocolatées, pâtisserie et produits alimentaires.",
        cake: "Résidu solide après extraction du beurre de cacao. Utilisé pour la production de poudre de cacao.",
        nibs: "Éclats de fèves de cacao torréfiées, décortiquées et concassées. Texture croquante et goût intense pour applications culinaires.",
    },
    en: {
        liquor: "Pure 100% cocoa mass, obtained by grinding roasted beans. Fundamental base for chocolate production, confectionery and premium food applications.",
        butter: "Natural fat extracted by pressing cocoa mass. Used in fine chocolate making, cosmetics and pharmaceutical industry.",
        powder: "Defatted powder obtained after butter extraction. Ideal for chocolate drinks, pastry and food products.",
        cake: "Solid residue after cocoa butter extraction. Used for cocoa powder production.",
        nibs: "Roasted, shelled and crushed cocoa bean fragments. Crunchy texture and intense taste for culinary applications.",
    },
};

// ─── ISR: revalidate every 60 seconds ────────────────────
export const revalidate = 60;

// ─── Generate static params from Sanity ──────────────────
export async function generateStaticParams() {
    const locales = ["fr", "en"];

    try {
        const sanityProducts = await sanityFetch<SanityProductSlug[]>({
            query: productsQuery,
            tags: ["product"],
            revalidate: 3600,
        });

        if (sanityProducts && sanityProducts.length > 0) {
            return locales.flatMap((locale) =>
                sanityProducts.map((p) => ({
                    locale,
                    slug: p.slug.current,
                }))
            );
        }
    } catch (e) {
        console.warn("Failed to fetch Sanity products for static params, using fallback:", e);
    }

    // Fallback to static slugs
    const staticSlugs = Object.keys(staticProducts);
    return locales.flatMap((locale) =>
        staticSlugs.map((slug) => ({
            locale,
            slug,
        }))
    );
}

// ─── Metadata ────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;

    // Try Sanity first
    try {
        const sanityProduct = await sanityFetch<SanityProductDetail | null>({
            query: productBySlugQuery,
            params: { slug },
            tags: ["product"],
            revalidate: 60,
        });

        if (sanityProduct) {
            return {
                title: sanityProduct.seoTitle || `${sanityProduct.name} - SEPACAM`,
                description: sanityProduct.seoDescription || sanityProduct.description?.slice(0, 160),
            };
        }
    } catch {
        // Fall through to static
    }

    // Static fallback
    const staticProduct = staticProducts[slug];
    if (!staticProduct) return { title: "Product Not Found" };

    const lang = locale as "fr" | "en";
    const name = staticNames[lang]?.[staticProduct.key] || staticProduct.key;

    return {
        title: `${name} - SEPACAM`,
        description: staticDescriptions[lang]?.[staticProduct.key]?.slice(0, 160),
    };
}

// ─── Page Component ──────────────────────────────────────
export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";

    // Fetch from Sanity with ISR (60s)
    let sanityProduct: SanityProductDetail | null = null;
    try {
        sanityProduct = await sanityFetch<SanityProductDetail | null>({
            query: productBySlugQuery,
            params: { slug },
            tags: ["product"],
            revalidate: 60,
        });
    } catch {
        // Fall through to static fallback
    }

    // Determine data source
    const staticData = staticProducts[slug];
    const hasSanity = !!sanityProduct;

    if (!hasSanity && !staticData) {
        notFound();
    }

    // Resolve display values
    const name = hasSanity
        ? sanityProduct!.name
        : staticNames[lang]?.[staticData!.key] || staticData!.key;

    const description = hasSanity
        ? sanityProduct!.description
        : staticDescriptions[lang]?.[staticData!.key] || "";

    const longDescription = sanityProduct?.longDescription;
    const applications = sanityProduct?.applications;
    const certifications = sanityProduct?.certifications;
    const heroImageUrl = sanityProduct?.heroImage
        ? getOptimizedImageUrl(sanityProduct.heroImage, { width: 800, height: 800 })
        : null;

    // Specs: prefer Sanity technicalSpecs, fallback to static
    const specs = sanityProduct?.technicalSpecs
        ? Object.entries(sanityProduct.technicalSpecs).map(([key, value]) => ({
            label: key,
            value,
        }))
        : staticData
            ? [
                { label: isFr ? "Teneur en matière grasse" : "Fat content", value: staticData.fatContent },
                { label: isFr ? "Humidité" : "Moisture", value: staticData.moisture },
                { label: isFr ? "Finesse" : "Fineness", value: staticData.fineness },
                { label: isFr ? "Conditionnement" : "Packaging", value: staticData.packaging.join(", ") },
            ]
            : [];

    const packaging = sanityProduct?.packaging || staticData?.packaging || [];
    const moq = sanityProduct?.moq || (staticData ? `${staticData.minOrder}T` : "");
    const leadTime = staticData?.leadTime || "2-4 weeks";
    const badge = staticData?.badge || null;
    const documents = sanityProduct?.documents || [];

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                {/* Breadcrumb */}
                <div className="bg-neutral-50 border-b border-neutral-200">
                    <div className="container-main py-4">
                        <nav className="flex items-center gap-2 text-small text-neutral-500">
                            <Link href="/" className="hover:text-primary transition-colors">
                                {isFr ? "Accueil" : "Home"}
                            </Link>
                            <span className="text-neutral-300">/</span>
                            <Link href="/produits-cacao" className="hover:text-primary transition-colors">
                                {isFr ? "Produits Cacao" : "Cocoa Products"}
                            </Link>
                            <span className="text-neutral-300">/</span>
                            <span className="text-neutral-900 font-medium">{name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Hero */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Image */}
                            <div className="aspect-square rounded-2xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-primary/5 to-accent/5 relative">
                                {heroImageUrl ? (
                                    <Image
                                        src={heroImageUrl}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        quality={90}
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <svg className="w-24 h-24 text-primary/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <p className="text-neutral-500 text-small">{name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div>
                                {badge && (
                                    <Badge variant="accent" size="lg" className="mb-4">
                                        {badge}
                                    </Badge>
                                )}

                                <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-4">
                                    {name}
                                </h1>

                                <p className="text-body lg:text-lg text-neutral-600 mb-6">
                                    {description}
                                </p>

                                {longDescription && (
                                    <p className="text-body text-neutral-500 mb-8">
                                        {longDescription}
                                    </p>
                                )}

                                {/* Applications */}
                                {applications && applications.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-3">
                                            {isFr ? "Applications" : "Applications"}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {applications.map((app) => (
                                                <Badge key={app} variant="secondary" size="sm">
                                                    {app}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Technical Specs */}
                                <div className="bg-neutral-50 rounded-2xl p-6 mb-8">
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-4">
                                        {isFr ? "Spécifications techniques" : "Technical specifications"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {specs.map((spec) => (
                                            <div key={spec.label}>
                                                <p className="text-xs text-neutral-500 mb-1">{spec.label}</p>
                                                <p className="font-medium text-neutral-900">{spec.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications */}
                                {certifications && certifications.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-3">
                                            {isFr ? "Certifications" : "Certifications"}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {certifications.map((cert) => (
                                                <Badge key={cert} variant="outline">
                                                    {cert}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Order info */}
                                <div className="flex flex-wrap items-center gap-6 mb-8 text-small text-neutral-600">
                                    {moq && (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span>MOQ: {moq}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{isFr ? "Délai" : "Lead time"}: {leadTime}</span>
                                    </div>
                                    {packaging.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                                            </svg>
                                            <span>{packaging.join(", ")}</span>
                                        </div>
                                    )}
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/contact">
                                        <Button variant="primary" size="lg">
                                            {isFr ? "Demander un devis" : "Request a quote"}
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="secondary" size="lg">
                                            {isFr ? "Demander un échantillon" : "Request a sample"}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documents */}
                <section className="py-12 lg:py-16 bg-neutral-50 border-t border-neutral-200">
                    <div className="container-main">
                        <h3 className="font-heading font-semibold text-neutral-900 mb-6">
                            {isFr ? "Documents disponibles" : "Available documents"}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Show Sanity documents if available */}
                            {documents.length > 0 ? (
                                documents.map((doc) => (
                                    <a
                                        key={doc.title}
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4 hover:border-primary/30 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900">{doc.title}</p>
                                            <p className="text-xs text-neutral-500">{doc.documentType}</p>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                /* Static document placeholders */
                                <>
                                    <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900">{isFr ? "Fiche technique" : "Technical sheet"}</p>
                                            <p className="text-xs text-neutral-500">{isFr ? "Sur demande" : "On request"}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900">COA</p>
                                            <p className="text-xs text-neutral-500">{isFr ? "Par lot" : "Per batch"}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900">{isFr ? "Certificats export" : "Export certificates"}</p>
                                            <p className="text-xs text-neutral-500">{isFr ? "Sur demande" : "On request"}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
