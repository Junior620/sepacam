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
        title: t("about.title"),
        description: t("about.description"),
    };
}

const values = [
    {
        key: "quality",
        icon: "🎯",
    },
    {
        key: "traceability",
        icon: "📍",
    },
    {
        key: "sustainability",
        icon: "🌱",
    },
    {
        key: "partnership",
        icon: "🤝",
    },
];

const timeline = [
    { year: "2020", key: "founding" },
    { year: "2021", key: "first_export" },
    { year: "2022", key: "expansion" },
    { year: "2023", key: "lab" },
    { year: "2024", key: "certification" },
];

export default async function AboutPage({
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
                            <Badge variant="accent" size="lg" className="mb-6">
                                {isFr ? "Notre entreprise" : "Our company"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {isFr
                                    ? "SEPACAM, acteur clé du cacao camerounais"
                                    : "SEPACAM, key player in Cameroonian cocoa"}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {isFr
                                    ? "Basée à Douala, SEPACAM est une entreprise camerounaise spécialisée dans la transformation et l'export de cacao. Nous proposons également des services de transit et des prestations diverses."
                                    : "Based in Douala, SEPACAM is a Cameroonian company specializing in cocoa processing and export. We also offer transit services and various other services."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                    {isFr ? "Notre mission" : "Our mission"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-6">
                                    {isFr
                                        ? "Transformer le cacao camerounais en produits semi-finis de qualité, traçables et conformes aux standards internationaux, tout en contribuant au développement des communautés productrices."
                                        : "Transform Cameroonian cocoa into quality semi-finished products that are traceable and compliant with international standards, while contributing to the development of producing communities."}
                                </p>
                                <p className="text-body text-neutral-600">
                                    {isFr
                                        ? "Notre ambition est de devenir un partenaire de référence pour les acheteurs B2B à la recherche de cacao camerounais transformé localement."
                                        : "Our ambition is to become a reference partner for B2B buyers looking for locally processed Cameroonian cocoa."}
                                </p>
                            </div>
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center border border-neutral-200">
                                <p className="text-neutral-500 text-small">
                                    {isFr ? "Image: Équipe SEPACAM" : "Image: SEPACAM Team"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Nos valeurs" : "Our values"}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <div
                                    key={value.key}
                                    className="bg-white p-6 rounded-2xl border border-neutral-200 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
                                        {value.icon}
                                    </div>
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                                        {isFr
                                            ? {
                                                quality: "Qualité",
                                                traceability: "Traçabilité",
                                                sustainability: "Durabilité",
                                                partnership: "Partenariat",
                                            }[value.key]
                                            : {
                                                quality: "Quality",
                                                traceability: "Traceability",
                                                sustainability: "Sustainability",
                                                partnership: "Partnership",
                                            }[value.key]}
                                    </h3>
                                    <p className="text-small text-neutral-600">
                                        {isFr
                                            ? {
                                                quality:
                                                    "Contrôle rigoureux à chaque étape de la transformation.",
                                                traceability:
                                                    "Suivi complet de la fève au produit fini.",
                                                sustainability:
                                                    "Respect de l'environnement et des producteurs.",
                                                partnership:
                                                    "Relations durables avec nos clients et fournisseurs.",
                                            }[value.key]
                                            : {
                                                quality:
                                                    "Rigorous control at every stage of processing.",
                                                traceability:
                                                    "Complete tracking from bean to finished product.",
                                                sustainability:
                                                    "Respect for the environment and producers.",
                                                partnership:
                                                    "Long-term relationships with our clients and suppliers.",
                                            }[value.key]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre parcours" : "Our journey"}
                            </h2>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="relative border-l-2 border-primary/20 pl-8 space-y-8">
                                {timeline.map((item, index) => (
                                    <div key={item.year} className="relative">
                                        <div className="absolute -left-[41px] w-5 h-5 bg-primary rounded-full border-4 border-white" />
                                        <span className="text-xs font-semibold text-primary mb-1 block">
                                            {item.year}
                                        </span>
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-1">
                                            {isFr
                                                ? {
                                                    founding: "Création de SEPACAM",
                                                    first_export: "Première exportation",
                                                    expansion: "Extension de l'usine",
                                                    lab: "Ouverture du laboratoire",
                                                    certification: "Démarrage certification ISO",
                                                }[item.key]
                                                : {
                                                    founding: "SEPACAM founded",
                                                    first_export: "First export shipment",
                                                    expansion: "Factory expansion",
                                                    lab: "Laboratory opening",
                                                    certification: "ISO certification started",
                                                }[item.key]}
                                        </h3>
                                        <p className="text-small text-neutral-600">
                                            {isFr
                                                ? {
                                                    founding:
                                                        "Fondation de l'entreprise à Douala, Cameroun.",
                                                    first_export:
                                                        "Premier conteneur de cacao transformé exporté.",
                                                    expansion:
                                                        "Augmentation de la capacité de production.",
                                                    lab: "Installation du laboratoire de contrôle qualité.",
                                                    certification:
                                                        "Lancement du processus de certification ISO 22000.",
                                                }[item.key]
                                                : {
                                                    founding:
                                                        "Company founded in Douala, Cameroon.",
                                                    first_export:
                                                        "First container of processed cocoa exported.",
                                                    expansion:
                                                        "Increased production capacity.",
                                                    lab: "Quality control laboratory installed.",
                                                    certification:
                                                        "ISO 22000 certification process initiated.",
                                                }[item.key]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 lg:py-24 bg-neutral-900">
                    <div className="container-main text-center">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                            {isFr ? "Travaillons ensemble" : "Let's work together"}
                        </h2>
                        <p className="text-body text-neutral-400 mb-8 max-w-xl mx-auto">
                            {isFr
                                ? "Vous cherchez un partenaire fiable pour votre approvisionnement en cacao transformé ?"
                                : "Looking for a reliable partner for your processed cocoa supply?"}
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
