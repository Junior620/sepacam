import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title:
            locale === "fr"
                ? "Transformation du Cacao - SEPACAM"
                : "Cocoa Processing - SEPACAM",
        description: t("products.description"),
    };
}

const processSteps = [
    {
        key: "reception",
        icon: "📦",
        number: "01",
    },
    {
        key: "quality",
        icon: "🔬",
        number: "02",
    },
    {
        key: "cleaning",
        icon: "✨",
        number: "03",
    },
    {
        key: "roasting",
        icon: "🔥",
        number: "04",
    },
    {
        key: "grinding",
        icon: "⚙️",
        number: "05",
    },
    {
        key: "pressing",
        icon: "🎯",
        number: "06",
    },
];

export default async function TransformationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const isFr = locale === "fr";

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="section-spacing gradient-hero">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                {isFr ? "Agro-Industrie" : "Agro-Industry"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {isFr
                                    ? "Transformation du cacao camerounais"
                                    : "Cameroonian cocoa processing"}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600 mb-8">
                                {isFr
                                    ? "De la fève au produit fini, SEPACAM maîtrise chaque étape de la transformation pour garantir qualité et traçabilité."
                                    : "From bean to finished product, SEPACAM masters every step of processing to ensure quality and traceability."}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/produits-cacao">
                                    <Button variant="primary" size="lg">
                                        {isFr ? "Voir nos produits" : "View our products"}
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="secondary" size="lg">
                                        {isFr ? "Demander un devis" : "Request a quote"}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Steps */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre processus de transformation" : "Our processing workflow"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "6 étapes clés pour transformer le cacao brut en produits semi-finis de qualité export."
                                    : "6 key steps to transform raw cocoa into export-quality semi-finished products."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {processSteps.map((step) => (
                                <div
                                    key={step.key}
                                    className="relative p-6 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                                            {step.icon}
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs font-semibold text-primary mb-1 block">
                                                {isFr ? "Étape" : "Step"} {step.number}
                                            </span>
                                            <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                                                {isFr
                                                    ? {
                                                        reception: "Réception & Stockage",
                                                        quality: "Contrôle qualité",
                                                        cleaning: "Nettoyage & Tri",
                                                        roasting: "Torréfaction",
                                                        grinding: "Broyage",
                                                        pressing: "Pressage",
                                                    }[step.key]
                                                    : {
                                                        reception: "Reception & Storage",
                                                        quality: "Quality Control",
                                                        cleaning: "Cleaning & Sorting",
                                                        roasting: "Roasting",
                                                        grinding: "Grinding",
                                                        pressing: "Pressing",
                                                    }[step.key]}
                                            </h3>
                                            <p className="text-small text-neutral-600">
                                                {isFr
                                                    ? {
                                                        reception:
                                                            "Réception des fèves, pesée et stockage en conditions contrôlées.",
                                                        quality:
                                                            "Analyse humidité, grainage et test organoleptique.",
                                                        cleaning:
                                                            "Élimination des impuretés et tri par qualité.",
                                                        roasting:
                                                            "Torréfaction contrôlée pour développer les arômes.",
                                                        grinding:
                                                            "Broyage des graines pour obtenir la masse de cacao.",
                                                        pressing:
                                                            "Séparation du beurre et du tourteau de cacao.",
                                                    }[step.key]
                                                    : {
                                                        reception:
                                                            "Bean reception, weighing and controlled storage.",
                                                        quality:
                                                            "Moisture analysis, grading and organoleptic testing.",
                                                        cleaning:
                                                            "Impurity removal and quality-based sorting.",
                                                        roasting:
                                                            "Controlled roasting to develop aromas.",
                                                        grinding:
                                                            "Grinding beans to obtain cocoa mass.",
                                                        pressing:
                                                            "Separation of butter and cocoa cake.",
                                                    }[step.key]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Equipment Section */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                    {isFr ? "Équipements modernes" : "Modern equipment"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-6">
                                    {isFr
                                        ? "Notre usine est équipée de machines de dernière génération pour assurer une transformation optimale du cacao."
                                        : "Our plant is equipped with state-of-the-art machines to ensure optimal cocoa processing."}
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        isFr ? "Ligne de torréfaction automatisée" : "Automated roasting line",
                                        isFr ? "Broyeurs à cylindres industriels" : "Industrial roller grinders",
                                        isFr ? "Presse hydraulique haute performance" : "High-performance hydraulic press",
                                        isFr ? "Laboratoire de contrôle qualité" : "Quality control laboratory",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <svg
                                                className="w-5 h-5 text-primary flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-body text-neutral-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center border border-neutral-200">
                                <p className="text-neutral-500 text-small">
                                    {isFr ? "Image: Usine SEPACAM" : "Image: SEPACAM Factory"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 lg:py-24 bg-primary">
                    <div className="container-main text-center">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                            {isFr
                                ? "Besoin de produits transformés ?"
                                : "Need processed cocoa products?"}
                        </h2>
                        <p className="text-body text-white/80 mb-8 max-w-xl mx-auto">
                            {isFr
                                ? "Contactez notre équipe commerciale pour discuter de vos besoins en cacao transformé."
                                : "Contact our sales team to discuss your processed cocoa needs."}
                        </p>
                        <Link href="/contact">
                            <Button variant="accent" size="lg">
                                {isFr ? "Nous contacter" : "Contact us"}
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
