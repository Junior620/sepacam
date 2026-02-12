import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { sanityFetch, getOptimizedImageUrl } from "@/lib/sanity";
import { JsonLd } from "@/components/seo/JsonLd";
import { Product, WithContext } from "schema-dts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductHero } from "@/components/product/ProductHero";
import { TechnicalSpecs } from "@/components/product/TechnicalSpecs";
import { ApplicationsSection } from "@/components/product/ApplicationsSection";
import { PackagingMOQ } from "@/components/product/PackagingMOQ";
import { DownloadableDocuments } from "@/components/product/DownloadableDocuments";
import { ProductCTABar } from "@/components/product/ProductCTABar";
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
            <main id="main-content" className="pt-[var(--header-height)]">
                {/* Breadcrumb */}
                <div className="bg-neutral-50 border-b border-neutral-200">
                    <div className="container-main py-4">
                        <Breadcrumbs
                            items={[
                                { label: isFr ? "Accueil" : "Home", href: "/", isCurrent: false },
                                { label: isFr ? "Produits Cacao" : "Cocoa Products", href: "/produits-cacao", isCurrent: false },
                                { label: name, href: `/produits-cacao/${slug}`, isCurrent: true }
                            ]}
                        />
                    </div>
                </div>

                {/* Product Hero */}
                <ProductHero
                    name={name}
                    description={description}
                    longDescription={longDescription}
                    heroImageUrl={heroImageUrl}
                    applications={applications}
                    badge={badge}
                    certifications={certifications}
                    specs={specs}
                    moq={moq}
                    leadTime={leadTime}
                    packaging={packaging}
                    locale={locale}
                />

                {/* Technical Specifications */}
                <TechnicalSpecs
                    productKey={staticData?.key || sanityProduct?.productType || ""}
                    locale={locale}
                    sanitySpecs={sanityProduct?.technicalSpecs}
                    certifications={certifications}
                />

                {/* Applications & Use Cases */}
                <ApplicationsSection
                    productKey={staticData?.key || sanityProduct?.productType || ""}
                    locale={locale}
                    sanityApplications={applications}
                />

                {/* Packaging & MOQ */}
                <PackagingMOQ
                    productKey={staticData?.key || sanityProduct?.productType || ""}
                    locale={locale}
                    sanityPackaging={sanityProduct?.packaging}
                    sanityMoq={sanityProduct?.moq}
                    sanityIncoterms={sanityProduct?.incoterms}
                />

                {/* Downloadable Documents */}
                <DownloadableDocuments
                    productName={name}
                    productKey={staticData?.key || sanityProduct?.productType || ""}
                    locale={locale}
                    sanityDocuments={documents}
                />
            </main>
            <Footer />
            <ProductCTABar productName={name} locale={locale} />

            <JsonLd<Product>
                data={{
                    "@context": "https://schema.org",
                    "@type": "Product",
                    name: name,
                    description: description,
                    image: heroImageUrl ? [heroImageUrl] : [],
                    brand: {
                        "@type": "Brand",
                        name: "SEPACAM"
                    },
                    offers: {
                        "@type": "Offer",
                        url: `https://sepacam.com/${locale}/produits-cacao/${slug}`,
                        priceCurrency: "EUR",
                        price: "0", // Request for quote
                        availability: "https://schema.org/InStock",
                        seller: {
                            "@type": "Organization",
                            name: "SEPACAM"
                        }
                    }
                }}
            />
        </>
    );
}
