import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

// ═══════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isFr = locale === "fr";

    return generateSeoMetadata({
        locale,
        title: isFr ? "Qualité & Laboratoire | Certifications et Analyses" : "Quality & Laboratory | Certifications and Analysis",
        description: isFr
            ? "Découvrez notre laboratoire de contrôle qualité : méthodologie rigoureuse, analyses physico-chimiques, et traçabilité complète de chaque lot de cacao."
            : "Discover our quality control laboratory: rigorous methodology, physicochemical analysis, and complete traceability of every cocoa lot.",
        path: "/qualite-laboratoire",
        pathFr: "/qualite-laboratoire",
        pathEn: "/quality",
        keywords: isFr
            ? ["laboratoire cacao", "contrôle qualité", "analyse cacao", "coa cacao", "traçabilité cacao"]
            : ["cocoa laboratory", "quality control", "cocoa analysis", "cocoa coa", "cocoa traceability"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const QC_STEPS = [
    {
        key: "sampling",
        icon: "🧪",
        fr: { title: "Échantillonnage", desc: "Prélèvement représentatif selon la norme ISO 24333 sur 30% des sacs de chaque lot entrant." },
        en: { title: "Sampling", desc: "Representative sampling per ISO 24333 standard on 30% of bags in every incoming lot." },
    },
    {
        key: "physical",
        icon: "👁️",
        fr: { title: "Analyse Physique", desc: "Test de coupe (cut-test) sur 300 fèves : grainage, taux de moisissure, ardoisé, mité et germination." },
        en: { title: "Physical Analysis", desc: "Cut-test on 300 beans: bean count, mold rate, slaty, insect damaged and germination." },
    },
    {
        key: "chemical",
        icon: "⚗️",
        fr: { title: "Analyse Chimique", desc: "Mesure précise de l'humidité (humicap), du pH et de la teneur en matière grasse (Soxhlet)." },
        en: { title: "Chemical Analysis", desc: "Precise measurement of moisture (humicap), pH and fat content (Soxhlet)." },
    },
    {
        key: "sensory",
        icon: "👃",
        fr: { title: "Test Sensoriel", desc: "Évaluation organoleptique par notre panel d'experts pour détecter les faux-goûts (fumé, acide)." },
        en: { title: "Sensory Test", desc: "Organoleptic evaluation by our expert panel to detect off-flavors (smoky, acidic)." },
    },
    {
        key: "release",
        icon: "✅",
        fr: { title: "Libération du Lot", desc: "Émission du Bulletin d'Analyse (COA) et validation informatique pour l'export ou l'usine." },
        en: { title: "Lot Release", desc: "Issuance of Certificate of Analysis (COA) and digital validation for export or factory." },
    },
];

const COA_EXAMPLE = {
    header: { fr: "CERTIFICAT D'ANALYSE", en: "CERTIFICATE OF ANALYSIS" },
    product: { fr: "Fèves de Cacao Grade 1", en: "Cocoa Beans Grade 1" },
    lot: "CAM-2024-0892",
    date: "2024-02-12",
    params: [
        { name: { fr: "Grainage (fèves/100g)", en: "Bean Count (beans/100g)" }, value: "98", target: "≤ 100", status: "pass" },
        { name: { fr: "Taux d'humidité", en: "Moisture Content" }, value: "7.2%", target: "≤ 8.0%", status: "pass" },
        { name: { fr: "Moisissure", en: "Moldy Beans" }, value: "1.5%", target: "≤ 3.0%", status: "pass" },
        { name: { fr: "Ardoisé", en: "Slaty Beans" }, value: "2.0%", target: "≤ 3.0%", status: "pass" },
        { name: { fr: "Matières étrangères", en: "Foreign Matter" }, value: "0.2%", target: "≤ 1.0%", status: "pass" },
        { name: { fr: "Acides gras libres (FFA)", en: "Free Fatty Acids (FFA)" }, value: "1.1%", target: "≤ 1.75%", status: "pass" },
    ],
};

const TRACEABILITY_STEPS = [
    {
        step: "1",
        fr: { title: "Bord Champ", desc: "Enregistrement du producteur et géolocalisation de la parcelle." },
        en: { title: "Farm Gate", desc: "Farmer registration and plot geolocation." },
    },
    {
        step: "2",
        fr: { title: "Centre de Collecte", desc: "Attribution d'un code lot provisoire et premier contrôle qualité." },
        en: { title: "Collection Center", desc: "Provisional lot code assignment and first quality check." },
    },
    {
        step: "3",
        fr: { title: "Usine / Entrepôt", desc: "Nettoyage, séchage complémentaire et code lot définitif export." },
        en: { title: "Factory / Warehouse", desc: "Cleaning, additional drying and final export lot code." },
    },
    {
        step: "4",
        fr: { title: "Client Final", desc: "QR Code permettant de remonter jusqu'à la coopérative d'origine." },
        en: { title: "Final Customer", desc: "QR Code allowing traceability back to the origin cooperative." },
    },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function QualityPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">

                {/* ════════════════════════════════════════════
                    HERO SECTION
                    ════════════════════════════════════════════ */}
                <section className="relative py-20 lg:py-32 bg-neutral-900 text-white overflow-hidden">
                    {/* Abstract tech background */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="accent" size="lg" className="mb-6">
                                {isFr ? "Laboratoire & Qualité" : "Laboratory & Quality"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6">
                                {isFr
                                    ? "L'excellence par la rigueur scientifique"
                                    : "Excellence through scientific rigor"}
                            </h1>
                            <p className="text-lg lg:text-xl text-neutral-300 mb-8 max-w-2xl leading-relaxed">
                                {isFr
                                    ? "Notre laboratoire interne, équipé des technologies les plus récentes, garantit que chaque fève et chaque produit transformé répond aux standards internationaux les plus exigeants."
                                    : "Our in-house laboratory, equipped with the latest technologies, ensures that every bean and processed product meets the most demanding international standards."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    QC METHODOLOGY
                    ════════════════════════════════════════════ */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Méthodologie de contrôle" : "Control Methodology"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "Un processus systématique en 5 étapes appliqué à chaque entrée et sortie de marchandises."
                                    : "A systematic 5-step process applied to every incoming and outgoing shipment."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                            {QC_STEPS.map((step, i) => {
                                const data = step[lang];
                                return (
                                    <div key={step.key} className="relative group">
                                        <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100 h-full hover:border-primary/30 transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                                {step.icon}
                                            </div>
                                            <div className="absolute top-6 right-6 text-xs font-bold text-neutral-300">
                                                0{i + 1}
                                            </div>
                                            <h3 className="font-heading font-semibold text-neutral-900 mb-3">
                                                {data.title}
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed">
                                                {data.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    EXAMPLE COA (Visual)
                    ════════════════════════════════════════════ */}
                <section className="section-spacing bg-neutral-50 border-y border-neutral-200">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div>
                                <Badge variant="primary" className="mb-4">
                                    {isFr ? "Transparence Totale" : "Total Transparency"}
                                </Badge>
                                <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-6">
                                    {isFr ? "Certificat d'Analyse (COA)" : "Certificate of Analysis (COA)"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                                    {isFr
                                        ? "Pour chaque expédition, nous fournissons un bulletin d'analyse complet certifiant la conformité du lot. Ce document est votre garantie qualité, validée par notre Responsable Qualité."
                                        : "For every shipment, we provide a complete analysis report certifying lot compliance. This document is your quality guarantee, validated by our Quality Manager."}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        { fr: "Conformité ISO & FCC", en: "ISO & FCC Compliance" },
                                        { fr: "Analyses de contaminants", en: "Contaminant analysis" },
                                        { fr: "Traçabilité des tests", en: "Test traceability" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                                            <span className="font-medium text-neutral-700">{item[lang]}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={{ pathname: "/contact", query: { subject: "specs" } }}>
                                    <Button variant="outline" size="lg">
                                        {isFr ? "Recevoir un modèle de COA" : "Receive a COA template"}
                                    </Button>
                                </Link>
                            </div>

                            {/* COA Card Visual */}
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-6 -right-6 w-full h-full bg-primary/5 rounded-xl -z-10" />
                                <div className="absolute -bottom-6 -left-6 w-full h-full bg-accent/5 rounded-xl -z-10" />

                                <div className="bg-white rounded-xl shadow-elevation-2 border border-neutral-200 overflow-hidden">
                                    {/* COA Header */}
                                    <div className="bg-neutral-900 text-white p-6 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold text-white">S</div>
                                            <div>
                                                <div className="text-xs text-neutral-400">SEPACAM QUALITY LAB</div>
                                                <div className="font-bold">{COA_EXAMPLE.header[lang]}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-neutral-400">{isFr ? "Date" : "Date"}</div>
                                            <div className="font-mono text-sm">{COA_EXAMPLE.date}</div>
                                        </div>
                                    </div>

                                    {/* COA Body */}
                                    <div className="p-6">
                                        <div className="flex justify-between mb-6 pb-6 border-b border-neutral-100">
                                            <div>
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{isFr ? "Produit" : "Product"}</div>
                                                <div className="font-semibold text-neutral-900">{COA_EXAMPLE.product[lang]}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{isFr ? "N° Lot" : "Lot No."}</div>
                                                <div className="font-mono text-neutral-900 bg-neutral-100 px-2 py-1 rounded">{COA_EXAMPLE.lot}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {COA_EXAMPLE.params.map((param, i) => (
                                                <div key={i} className="flex items-center justify-between text-sm group">
                                                    <span className="text-neutral-600 group-hover:text-primary transition-colors">
                                                        {param.name[lang]}
                                                    </span>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-neutral-400 text-xs">{param.target}</span>
                                                        <span className="font-mono font-semibold text-neutral-900 w-16 text-right">{param.value}</span>
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Pass"></span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Signature area */}
                                        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between items-end">
                                            <div className="text-xs text-neutral-400 max-w-[200px]">
                                                {isFr
                                                    ? "Ce document est généré électroniquement et est valide sans signature."
                                                    : "This document is electronically generated and is valid without signature."}
                                            </div>
                                            <div className="text-center">
                                                <div className="font-handwriting text-2xl text-primary -rotate-6">Approved</div>
                                                <div className="border-t border-neutral-300 w-24 mt-1"></div>
                                                <div className="text-[10px] text-neutral-400 uppercase mt-1">QC Manager</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    TRACEABILITY SYSTEM
                    ════════════════════════════════════════════ */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Système de traçabilité" : "Traceability System"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "Du producteur jusqu'à la livraison finale, nous maintenons une chaîne d'information ininterrompue."
                                    : "From the farmer to final delivery, we maintain an unbroken chain of information."}
                            </p>
                        </div>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Connecting line */}
                            <div className="absolute top-0 bottom-0 left-[19px] lg:left-1/2 w-0.5 bg-neutral-200 lg:-translate-x-1/2 step-connector" />

                            <div className="space-y-12">
                                {TRACEABILITY_STEPS.map((step, i) => {
                                    const data = step[lang];
                                    const isRight = i % 2 === 0; // For desktop alternating

                                    return (
                                        <div key={i} className={`relative flex items-center lg:justify-between ${!isRight ? 'lg:flex-row-reverse' : ''}`}>
                                            {/* Number Bubble */}
                                            <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center z-10 shadow-md border-4 border-white">
                                                {step.step}
                                            </div>

                                            {/* Content Card */}
                                            <div className="ml-16 lg:ml-0 lg:w-[45%]">
                                                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 hover:shadow-md transition-shadow">
                                                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                                                        {data.title}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600">
                                                        {data.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Empty space for the other side on desktop */}
                                            <div className="hidden lg:block lg:w-[45%]" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    CTA SECTION
                    ════════════════════════════════════════════ */}
                <section className="py-20 bg-primary/5">
                    <div className="container-main text-center">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-6">
                            {isFr ? "Vous avez des exigences spécifiques ?" : "Have specific requirements?"}
                        </h2>
                        <p className="text-body text-neutral-600 mb-10 max-w-xl mx-auto">
                            {isFr
                                ? "Notre équipe qualité est à votre disposition pour examiner vos cahiers des charges et valider la faisabilité technique."
                                : "Our quality team is available to review your specifications and validate technical feasibility."}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={{ pathname: "/contact", query: { subject: "specs" } }}>
                                <Button variant="primary" size="lg">
                                    {isFr ? "Recevoir nos spécifications" : "Receive our specifications"}
                                </Button>
                            </Link>
                            <Link href={{ pathname: "/contact", query: { subject: "quality" } }}>
                                <Button variant="secondary" size="lg">
                                    {isFr ? "Parler au responsable Qualité" : "Talk to QC Manager"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
