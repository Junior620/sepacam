import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

// Product data
const productsData = {
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

const productNames = {
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

const productDescriptions = {
    fr: {
        liquor:
            "Masse de cacao pur à 100%, obtenue par le broyage des fèves torréfiées. Base fondamentale pour la production de chocolat, confiseries et applications alimentaires haut de gamme.",
        butter:
            "Matière grasse naturelle extraite par pression de la masse de cacao. Utilisée en chocolaterie fine, cosmétique et industrie pharmaceutique.",
        powder:
            "Poudre dégraissée obtenue après extraction du beurre. Idéale pour boissons chocolatées, pâtisserie et produits alimentaires.",
        cake:
            "Résidu solide après extraction du beurre de cacao. Utilisé pour la production de poudre de cacao.",
        nibs:
            "Éclats de fèves de cacao torréfiées, décortiquées et concassées. Texture croquante et goût intense pour applications culinaires.",
    },
    en: {
        liquor:
            "Pure 100% cocoa mass, obtained by grinding roasted beans. Fundamental base for chocolate production, confectionery and premium food applications.",
        butter:
            "Natural fat extracted by pressing cocoa mass. Used in fine chocolate making, cosmetics and pharmaceutical industry.",
        powder:
            "Defatted powder obtained after butter extraction. Ideal for chocolate drinks, pastry and food products.",
        cake:
            "Solid residue after cocoa butter extraction. Used for cocoa powder production.",
        nibs:
            "Roasted, shelled and crushed cocoa bean fragments. Crunchy texture and intense taste for culinary applications.",
    },
};

export async function generateStaticParams() {
    const slugs = Object.keys(productsData);
    const locales = ["fr", "en"];

    return locales.flatMap((locale) =>
        slugs.map((slug) => ({
            locale,
            slug,
        }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const product = productsData[slug as keyof typeof productsData];

    if (!product) {
        return { title: "Product Not Found" };
    }

    const name =
        productNames[locale as "fr" | "en"][
        product.key as keyof (typeof productNames)["fr"]
        ];

    return {
        title: `${name} - SEPACAM`,
        description: productDescriptions[locale as "fr" | "en"][
            product.key as keyof (typeof productDescriptions)["fr"]
        ].slice(0, 160),
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const product = productsData[slug as keyof typeof productsData];

    if (!product) {
        notFound();
    }

    const isFr = locale === "fr";
    const name =
        productNames[locale as "fr" | "en"][
        product.key as keyof (typeof productNames)["fr"]
        ];
    const description =
        productDescriptions[locale as "fr" | "en"][
        product.key as keyof (typeof productDescriptions)["fr"]
        ];

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                {/* Breadcrumb */}
                <div className="bg-neutral-50 border-b border-neutral-200">
                    <div className="container-main py-4">
                        <nav className="flex items-center gap-2 text-small text-neutral-500">
                            <Link href="/" className="hover:text-primary">
                                {isFr ? "Accueil" : "Home"}
                            </Link>
                            <span>/</span>
                            <Link href="/produits-cacao" className="hover:text-primary">
                                {isFr ? "Produits Cacao" : "Cocoa Products"}
                            </Link>
                            <span>/</span>
                            <span className="text-neutral-900">{name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Hero */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Image */}
                            <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center border border-neutral-200">
                                <div className="text-center p-8">
                                    <svg
                                        className="w-24 h-24 text-primary/30 mx-auto mb-4"
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
                                    <p className="text-neutral-500 text-small">{name}</p>
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                {product.badge && (
                                    <Badge variant="accent" size="lg" className="mb-4">
                                        {product.badge}
                                    </Badge>
                                )}

                                <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-4">
                                    {name}
                                </h1>

                                <p className="text-body lg:text-lg text-neutral-600 mb-8">
                                    {description}
                                </p>

                                {/* Specs */}
                                <div className="bg-neutral-50 rounded-2xl p-6 mb-8">
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-4">
                                        {isFr ? "Spécifications techniques" : "Technical specifications"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">
                                                {isFr ? "Teneur en matière grasse" : "Fat content"}
                                            </p>
                                            <p className="font-medium text-neutral-900">
                                                {product.fatContent}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">
                                                {isFr ? "Humidité" : "Moisture"}
                                            </p>
                                            <p className="font-medium text-neutral-900">
                                                {product.moisture}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">
                                                {isFr ? "Finesse" : "Fineness"}
                                            </p>
                                            <p className="font-medium text-neutral-900">
                                                {product.fineness}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">
                                                {isFr ? "Conditionnement" : "Packaging"}
                                            </p>
                                            <p className="font-medium text-neutral-900">
                                                {product.packaging.join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order info */}
                                <div className="flex flex-wrap items-center gap-6 mb-8 text-small text-neutral-600">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        <span>
                                            MOQ: {product.minOrder}T
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>
                                            {isFr ? "Délai" : "Lead time"}: {product.leadTime}
                                        </span>
                                    </div>
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
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-primary"
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
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900">
                                        {isFr ? "Fiche technique" : "Technical sheet"}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {isFr ? "Sur demande" : "On request"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-primary"
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
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900">COA</p>
                                    <p className="text-xs text-neutral-500">
                                        {isFr ? "Par lot" : "Per batch"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-primary"
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
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900">
                                        {isFr ? "Certificats export" : "Export certificates"}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {isFr ? "Sur demande" : "On request"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
