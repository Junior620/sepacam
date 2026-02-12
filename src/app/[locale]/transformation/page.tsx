import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ProductCTABar } from "@/components/product/ProductCTABar";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import type { ReactNode } from "react";
import {
    Package, Microscope, Sparkles, Flame, Wind, Cog, Target, CircleDot,
    Factory, Bean, Globe, CheckCircle2, Thermometer, Crosshair,
    Beaker, Snowflake, Cylinder, Truck, Ship, ClipboardList,
    FileText, PackageCheck, ArrowRight, Eye, FlaskConical, Check
} from "lucide-react";

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
        title: isFr ? "Transformation du Cacao | Processus Industriel" : "Cocoa Processing | Industrial Process",
        description: isFr
            ? "Découvrez le processus industriel de transformation du cacao chez SEPACAM : de la fève aux produits semi-finis (liqueur, beurre, poudre, tourteau). Capacité 5 000 T/an."
            : "Discover SEPACAM's industrial cocoa processing: from beans to semi-finished products (liquor, butter, powder, cake). 5,000 MT/year capacity.",
        path: "/transformation",
        pathFr: "/transformation-cacao",
        pathEn: "/cocoa-processing",
        keywords: isFr
            ? ["transformation cacao", "processus industriel", "cacao cameroun", "usine cacao", "semi-fini cacao"]
            : ["cocoa processing", "industrial process", "cameroon cocoa", "cocoa plant", "semi-finished cocoa"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const PROCESS_STEPS = [
    {
        key: "reception",
        icon: <Package className="w-6 h-6 text-primary" />,
        number: "01",
        fr: { title: "Réception & Stockage", desc: "Les fèves de cacao arrivent à notre usine de Bonabéri (Douala). Chaque lot est pesé, identifié et stocké dans des conditions contrôlées (température, humidité) pour préserver la qualité.", detail: "Traçabilité du champ à l'usine" },
        en: { title: "Reception & Storage", desc: "Cocoa beans arrive at our Bonabéri plant (Douala). Each lot is weighed, identified and stored under controlled conditions (temperature, humidity) to preserve quality.", detail: "Farm-to-factory traceability" },
    },
    {
        key: "quality_control",
        icon: <Microscope className="w-6 h-6 text-primary" />,
        number: "02",
        fr: { title: "Contrôle Qualité Entrant", desc: "Notre laboratoire interne analyse chaque lot : taux d'humidité (max 8%), grainage, taux de moisissure, corps étrangers, et test organoleptique (cut test).", detail: "Rejet des lots non conformes" },
        en: { title: "Incoming Quality Control", desc: "Our in-house lab analyzes each lot: moisture content (max 8%), grading, mold rate, foreign matter, and organoleptic testing (cut test).", detail: "Non-conforming lots rejected" },
    },
    {
        key: "cleaning",
        icon: <Sparkles className="w-6 h-6 text-primary" />,
        number: "03",
        fr: { title: "Nettoyage & Tri", desc: "Passage en crible vibrant, dépierrage, tri magnétique et aspiration pour éliminer toutes impuretés. Les fèves sont calibrées par taille pour un traitement homogène.", detail: "Élimination des déchets & impuretés" },
        en: { title: "Cleaning & Sorting", desc: "Vibrating screen, destoning, magnetic sorting and aspiration to remove all impurities. Beans are calibrated by size for uniform processing.", detail: "Waste & impurity removal" },
    },
    {
        key: "roasting",
        icon: <Flame className="w-6 h-6 text-primary" />,
        number: "04",
        fr: { title: "Torréfaction", desc: "Torréfaction contrôlée entre 120°C et 150°C pendant 20-40 minutes. Cette étape développe les arômes, réduit l'humidité à 2-3% et facilite le décorticage.", detail: "Profils d'arômes personnalisables" },
        en: { title: "Roasting", desc: "Controlled roasting between 120°C and 150°C for 20-40 minutes. This step develops flavors, reduces moisture to 2-3% and facilitates winnowing.", detail: "Customizable flavor profiles" },
    },
    {
        key: "winnowing",
        icon: <Wind className="w-6 h-6 text-primary" />,
        number: "05",
        fr: { title: "Concassage & Vannage", desc: "Les fèves torréfiées sont concassées puis les coques sont séparées des nibs (grué de cacao) par aspiration. Le grué est le cœur pur de la fève.", detail: "Rendement grué > 82%" },
        en: { title: "Cracking & Winnowing", desc: "Roasted beans are cracked then shells are separated from nibs (cocoa nibs) by aspiration. The nibs are the pure heart of the bean.", detail: "Nib yield > 82%" },
    },
    {
        key: "grinding",
        icon: <Cog className="w-6 h-6 text-primary" />,
        number: "06",
        fr: { title: "Broyage & Affinage", desc: "Le grué passe dans des broyeurs à cylindres puis des raffineurs pour obtenir la liqueur de cacao (pâte fine, 50-55% de matière grasse). Finesse < 25 microns.", detail: "Liqueur = base de tous les produits" },
        en: { title: "Grinding & Refining", desc: "Nibs pass through roller mills then refiners to produce cocoa liquor (fine paste, 50-55% fat content). Fineness < 25 microns.", detail: "Liquor = base for all products" },
    },
    {
        key: "pressing",
        icon: <Target className="w-6 h-6 text-primary" />,
        number: "07",
        fr: { title: "Pressage Hydraulique", desc: "La liqueur est pressée à haute pression pour séparer le beurre de cacao (phase liquide dorée) du tourteau de cacao (galette sèche résiduelle).", detail: "Beurre naturel ou désodorisé" },
        en: { title: "Hydraulic Pressing", desc: "Liquor is pressed at high pressure to separate cocoa butter (golden liquid phase) from cocoa cake (dry residual cake).", detail: "Natural or deodorized butter" },
    },
    {
        key: "powder",
        icon: <CircleDot className="w-6 h-6 text-primary" />,
        number: "08",
        fr: { title: "Pulvérisation & Tamisage", desc: "Le tourteau est broyé et tamisé pour produire la poudre de cacao (10-12% ou 20-22% de matière grasse). Couleur, pH et granulométrie sont contrôlés.", detail: "Poudre naturelle ou alcalinisée" },
        en: { title: "Pulverizing & Sieving", desc: "Cake is ground and sieved to produce cocoa powder (10-12% or 20-22% fat). Color, pH and particle size are controlled.", detail: "Natural or alkalized powder" },
    },
];

const CAPACITY_STATS = [
    { key: "capacity", value: "5 000", unit: { fr: "tonnes / an", en: "MT / year" }, icon: <Factory className="w-6 h-6 text-white/80" /> },
    { key: "beans", value: "20 000", unit: { fr: "tonnes fèves traitées", en: "MT beans processed" }, icon: <Bean className="w-6 h-6 text-white/80" /> },
    { key: "products", value: "6", unit: { fr: "produits finis", en: "finished products" }, icon: <Package className="w-6 h-6 text-white/80" /> },
    { key: "lab", value: "24h", unit: { fr: "résultats d'analyse", en: "analysis results" }, icon: <Microscope className="w-6 h-6 text-white/80" /> },
    { key: "export", value: "30+", unit: { fr: "pays livrés", en: "countries served" }, icon: <Globe className="w-6 h-6 text-white/80" /> },
    { key: "certif", value: "100%", unit: { fr: "lots traçables", en: "traceable lots" }, icon: <CheckCircle2 className="w-6 h-6 text-white/80" /> },
];

const EQUIPMENT = [
    {
        fr: { name: "Ligne de torréfaction", detail: "Capacité 2T/h, contrôle PLC, profils programmables" },
        en: { name: "Roasting line", detail: "2T/h capacity, PLC control, programmable profiles" },
        icon: <Flame className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Broyeurs à cylindres", detail: "3 passes d'affinage, finesse < 25μm" },
        en: { name: "Roller mills", detail: "3 refining passes, fineness < 25μm" },
        icon: <Cog className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Presse hydraulique", detail: "Pression 400-600 bar, extraction optimale" },
        en: { name: "Hydraulic press", detail: "400-600 bar pressure, optimal extraction" },
        icon: <Target className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Atomiseur à poudre", detail: "Granulométrie contrôlée, tamisage 200 mesh" },
        en: { name: "Powder atomizer", detail: "Controlled granulometry, 200 mesh sieving" },
        icon: <CircleDot className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Laboratoire QC", detail: "Spectrophotomètre, humidimètre, pH-mètre" },
        en: { name: "QC Laboratory", detail: "Spectrophotometer, moisture meter, pH meter" },
        icon: <Microscope className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Stockage climatisé", detail: "Cuves inox, silos ventilés, température contrôlée" },
        en: { name: "Climate-controlled storage", detail: "Stainless steel tanks, ventilated silos, temperature control" },
        icon: <Snowflake className="w-5 h-5 text-primary" />,
    },
];

const QUALITY_STANDARDS = [
    {
        fr: { name: "HACCP", desc: "Analyse des dangers et points critiques de contrôle appliquée à toute la chaîne" },
        en: { name: "HACCP", desc: "Hazard analysis and critical control points applied throughout the chain" },
        color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
        fr: { name: "BPF / GMP", desc: "Bonnes pratiques de fabrication conformes aux standards internationaux" },
        en: { name: "GMP", desc: "Good Manufacturing Practices compliant with international standards" },
        color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
        fr: { name: "ISO 22000", desc: "Système de management de la sécurité alimentaire" },
        en: { name: "ISO 22000", desc: "Food safety management system" },
        color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
        fr: { name: "Traçabilité", desc: "Chaque lot est traçable de la zone de production à l'export final" },
        en: { name: "Traceability", desc: "Each lot is traceable from the production zone to final export" },
        color: "bg-amber-50 border-amber-200 text-amber-700",
    },
];

const PACKAGING_OPTIONS = [
    {
        fr: { name: "Fûts métalliques", detail: "200 kg net, doublure PE, cerclage", products: "Liqueur, Beurre" },
        en: { name: "Metal drums", detail: "200 kg net, PE liner, banding", products: "Liquor, Butter" },
        icon: <Cylinder className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Cartons / Kraft", detail: "25 kg net, sac PE intérieur, palettisé", products: "Poudre, Tourteau" },
        en: { name: "Cartons / Kraft", detail: "25 kg net, inner PE bag, palletized", products: "Powder, Cake" },
        icon: <Package className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Sacs Big Bag", detail: "500 kg – 1 MT, sur palette, filmé", products: "Tourteau, Grué" },
        en: { name: "Big Bags", detail: "500 kg – 1 MT, on pallet, wrapped", products: "Cake, Nibs" },
        icon: <Package className="w-5 h-5 text-primary" />,
    },
    {
        fr: { name: "Conteneur citerne", detail: "Flexitank 20T, pour beurre liquide", products: "Beurre (fondu)" },
        en: { name: "Tank container", detail: "20T Flexitank, for liquid butter", products: "Butter (melted)" },
        icon: <Truck className="w-5 h-5 text-primary" />,
    },
];

const LOGISTICS_STEPS = [
    {
        icon: <Factory className="w-5 h-5 text-primary" />,
        fr: { title: "Production", desc: "Transformation dans notre usine de Bonabéri (Douala)" },
        en: { title: "Production", desc: "Processing at our Bonabéri plant (Douala)" },
    },
    {
        icon: <ClipboardList className="w-5 h-5 text-primary" />,
        fr: { title: "Documentation", desc: "Certificats COA, phytosanitaire, EUR.1, certificat d'origine" },
        en: { title: "Documentation", desc: "COA certificates, phytosanitary, EUR.1, certificate of origin" },
    },
    {
        icon: <Truck className="w-5 h-5 text-primary" />,
        fr: { title: "Transport intérieur", desc: "Acheminement vers le port autonome de Douala" },
        en: { title: "Inland transport", desc: "Delivery to the autonomous port of Douala" },
    },
    {
        icon: <PackageCheck className="w-5 h-5 text-primary" />,
        fr: { title: "Empotage", desc: "Chargement en conteneur 20' ou 40' sous supervision" },
        en: { title: "Container stuffing", desc: "Loading in 20' or 40' containers under supervision" },
    },
    {
        icon: <Ship className="w-5 h-5 text-primary" />,
        fr: { title: "Expédition", desc: "Embarquement via les principales compagnies maritimes" },
        en: { title: "Shipping", desc: "Dispatched via major shipping lines" },
    },
    {
        icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
        fr: { title: "Livraison", desc: "Suivi en temps réel, incoterms FOB / CIF / CFR" },
        en: { title: "Delivery", desc: "Real-time tracking, FOB / CIF / CFR incoterms" },
    },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function TransformationPage({
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
                <section data-product-hero className="relative py-20 lg:py-32 overflow-hidden">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

                    <div className="container-main relative z-10">
                        <div className="max-w-4xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                <Factory className="w-4 h-4 inline mr-1" />
                                {isFr ? "Agro-Industrie" : "Agro-Industry"}
                            </Badge>

                            <h1 className="font-heading text-h1-sm lg:text-5xl xl:text-6xl text-neutral-900 mb-6 leading-tight">
                                {isFr
                                    ? "De la fève au produit fini"
                                    : "From bean to finished product"}
                                <span className="block text-primary mt-2">
                                    {isFr
                                        ? "8 étapes de transformation maîtrisées"
                                        : "8 mastered processing steps"}
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed">
                                {isFr
                                    ? "SEPACAM transforme le cacao camerounais en produits semi-finis de qualité export — liqueur, beurre, poudre, tourteau et grué — dans son usine de Bonabéri à Douala."
                                    : "SEPACAM transforms Cameroonian cocoa into export-quality semi-finished products — liquor, butter, powder, cake and nibs — at its Bonabéri plant in Douala."}
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

                {/* ════════════════════════════════════════════
                    CAPACITY STATS BAR
                    ════════════════════════════════════════════ */}
                <section className="py-8 bg-primary">
                    <div className="container-main">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {CAPACITY_STATS.map((stat) => (
                                <div key={stat.key} className="text-center">
                                    <div className="text-2xl mb-1">{stat.icon}</div>
                                    <div className="font-heading text-2xl lg:text-3xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-white/70 mt-1">
                                        {stat.unit[lang]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    INDUSTRIAL PROCESS DIAGRAM
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="primary" className="mb-4">
                                {isFr ? "Processus industriel" : "Industrial Process"}
                            </Badge>
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre chaîne de transformation" : "Our processing chain"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "8 étapes clés, de la réception des fèves brutes à la production de 6 produits semi-finis conformes aux standards internationaux."
                                    : "8 key steps, from raw bean reception to the production of 6 semi-finished products meeting international standards."}
                            </p>
                        </div>

                        {/* Process timeline */}
                        <div className="relative">
                            {/* Vertical line (desktop) */}
                            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 transform -translate-x-1/2" />

                            <div className="space-y-8 lg:space-y-0">
                                {PROCESS_STEPS.map((step, i) => {
                                    const isLeft = i % 2 === 0;
                                    const data = step[lang];
                                    return (
                                        <div key={step.key} className="relative lg:flex lg:items-center lg:min-h-[160px]">
                                            {/* Desktop: alternating left/right */}
                                            <div className={`lg:w-1/2 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:ml-auto"}`}>
                                                <div className={`p-6 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 ${isLeft ? "" : ""}`}>
                                                    <div className={`flex items-start gap-4 ${isLeft ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                                                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                                            {step.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold ${isLeft ? "lg:order-2" : ""}`}>
                                                                    {step.number}
                                                                </span>
                                                                <h3 className="font-heading font-semibold text-neutral-900">
                                                                    {data.title}
                                                                </h3>
                                                            </div>
                                                            <p className="text-sm text-neutral-600 mb-2 leading-relaxed">
                                                                {data.desc}
                                                            </p>
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                                                                <Check className="w-3 h-3 inline" /> {data.detail}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Center dot (desktop) */}
                                            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-sm z-10" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Flow diagram summary */}
                        <div className="mt-16 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                                {[
                                    { fr: "Fèves brutes", en: "Raw beans", icon: <Bean className="w-4 h-4 text-primary" /> },
                                    { fr: "Grué", en: "Nibs", icon: <CircleDot className="w-4 h-4 text-amber-700" /> },
                                    { fr: "Liqueur", en: "Liquor", icon: <FlaskConical className="w-4 h-4 text-amber-800" /> },
                                    { fr: "Beurre", en: "Butter", icon: <CircleDot className="w-4 h-4 text-amber-400" /> },
                                    { fr: "Tourteau", en: "Cake", icon: <CircleDot className="w-4 h-4 text-amber-900" /> },
                                    { fr: "Poudre", en: "Powder", icon: <CircleDot className="w-4 h-4 text-amber-600" /> },
                                ].map((item, i, arr) => (
                                    <span key={item.en} className="flex items-center gap-1">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-neutral-100 font-medium text-neutral-700">
                                            <span>{item.icon}</span>
                                            <span>{item[lang]}</span>
                                        </span>
                                        {i < arr.length - 1 && (
                                            <svg className="w-4 h-4 text-primary/40 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    EQUIPMENT & CAPACITY
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="primary" className="mb-4">
                                {isFr ? "Équipements" : "Equipment"}
                            </Badge>
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Équipements industriels modernes" : "Modern industrial equipment"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "Notre usine de Bonabéri dispose d'équipements de dernière génération pour une transformation optimale et constante."
                                    : "Our Bonabéri plant features state-of-the-art equipment for optimal and consistent processing."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {EQUIPMENT.map((eq, i) => {
                                const data = eq[lang];
                                return (
                                    <div
                                        key={i}
                                        className="group p-6 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                            {eq.icon}
                                        </div>
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                                            {data.name}
                                        </h3>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {data.detail}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    QUALITY STANDARDS
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge variant="primary" className="mb-4">
                                    {isFr ? "Qualité" : "Quality"}
                                </Badge>
                                <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                    {isFr ? "Standards de qualité internationaux" : "International quality standards"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                                    {isFr
                                        ? "Chaque lot sort de notre usine avec un certificat d'analyse (COA) complet. Notre système qualité est conçu pour répondre aux exigences les plus strictes de l'industrie alimentaire mondiale."
                                        : "Every lot leaves our plant with a complete Certificate of Analysis (COA). Our quality system is designed to meet the strictest requirements of the global food industry."}
                                </p>

                                <div className="space-y-4">
                                    {QUALITY_STANDARDS.map((qs, i) => {
                                        const data = qs[lang];
                                        return (
                                            <div
                                                key={i}
                                                className={`p-4 rounded-xl border ${qs.color}`}
                                            >
                                                <h4 className="font-semibold text-sm mb-1">{data.name}</h4>
                                                <p className="text-xs opacity-80">{data.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quality metrics visual */}
                            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-neutral-200">
                                <h3 className="font-heading font-semibold text-neutral-900 mb-6 text-center">
                                    {isFr ? "Paramètres analysés" : "Analyzed parameters"}
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { fr: "Taux d'humidité", en: "Moisture content", value: "< 5%", bar: 85 },
                                        { fr: "Teneur en MG", en: "Fat content", value: "50-55%", bar: 75 },
                                        { fr: "Finesse", en: "Fineness", value: "< 25μm", bar: 90 },
                                        { fr: "Acidité", en: "Acidity", value: "pH 5.0-6.0", bar: 70 },
                                        { fr: "Corps étrangers", en: "Foreign matter", value: "0%", bar: 100 },
                                        { fr: "Métaux lourds", en: "Heavy metals", value: isFr ? "Conforme EU" : "EU compliant", bar: 95 },
                                    ].map((param, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-neutral-700 font-medium">{param[lang]}</span>
                                                <span className="text-primary font-semibold">{param.value}</span>
                                            </div>
                                            <div className="h-2 bg-white rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                                                    style={{ width: `${param.bar}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    PACKAGING & MOQ
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="primary" className="mb-4">
                                {isFr ? "Conditionnement" : "Packaging"}
                            </Badge>
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Conditionnement & MOQ" : "Packaging & MOQ"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "Options d'emballage adaptées à chaque produit et volume. Quantité minimum de commande flexible."
                                    : "Packaging options tailored to each product and volume. Flexible minimum order quantity."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {PACKAGING_OPTIONS.map((pkg, i) => {
                                const data = pkg[lang];
                                return (
                                    <div
                                        key={i}
                                        className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-accent/30 hover:shadow-md transition-all"
                                    >
                                        <div className="text-3xl mb-3">{pkg.icon}</div>
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                                            {data.name}
                                        </h3>
                                        <p className="text-sm text-neutral-600 mb-3">{data.detail}</p>
                                        <div className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                            {data.products}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* MOQ table */}
                        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                            <div className="px-6 py-4 bg-primary/5 border-b border-neutral-200">
                                <h3 className="font-heading font-semibold text-neutral-900">
                                    {isFr ? "Quantités Minimum de Commande (MOQ)" : "Minimum Order Quantities (MOQ)"}
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-neutral-100">
                                            <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                                                {isFr ? "Produit" : "Product"}
                                            </th>
                                            <th className="text-left px-6 py-3 font-semibold text-neutral-700">MOQ</th>
                                            <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                                                {isFr ? "Emballage" : "Packaging"}
                                            </th>
                                            <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                                                {isFr ? "Délai" : "Lead time"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {[
                                            { product: { fr: "Liqueur de cacao", en: "Cocoa liquor" }, moq: "1 MT", pkg: { fr: "Fûts 200 kg", en: "200 kg drums" }, lead: { fr: "7-10 jours", en: "7-10 days" } },
                                            { product: { fr: "Beurre de cacao", en: "Cocoa butter" }, moq: "1 MT", pkg: { fr: "Fûts 200 kg / Flexitank", en: "200 kg drums / Flexitank" }, lead: { fr: "7-10 jours", en: "7-10 days" } },
                                            { product: { fr: "Poudre de cacao", en: "Cocoa powder" }, moq: "5 MT", pkg: { fr: "Sacs 25 kg", en: "25 kg bags" }, lead: { fr: "10-14 jours", en: "10-14 days" } },
                                            { product: { fr: "Tourteau de cacao", en: "Cocoa cake" }, moq: "5 MT", pkg: { fr: "Big Bags 500 kg", en: "500 kg Big Bags" }, lead: { fr: "7-10 jours", en: "7-10 days" } },
                                            { product: { fr: "Grué de cacao", en: "Cocoa nibs" }, moq: "1 MT", pkg: { fr: "Sacs 25 kg", en: "25 kg bags" }, lead: { fr: "5-7 jours", en: "5-7 days" } },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-3 font-medium text-neutral-900">{row.product[lang]}</td>
                                                <td className="px-6 py-3 text-primary font-semibold">{row.moq}</td>
                                                <td className="px-6 py-3 text-neutral-600">{row.pkg[lang]}</td>
                                                <td className="px-6 py-3 text-neutral-600">{row.lead[lang]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    EXPORT LOGISTICS
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="primary" className="mb-4">
                                {isFr ? "Export" : "Export"}
                            </Badge>
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Logistique d'export" : "Export logistics"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "De notre usine au port de Douala puis vers le monde : une chaîne logistique maîtrisée avec le soutien de notre division Transit."
                                    : "From our plant to the port of Douala and beyond: a controlled supply chain backed by our Transit division."}
                            </p>
                        </div>

                        {/* Horizontal steps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {LOGISTICS_STEPS.map((step, i) => {
                                const data = step[lang];
                                return (
                                    <div key={i} className="relative">
                                        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 text-center h-full hover:border-primary/30 hover:bg-white transition-all">
                                            <div className="text-2xl mb-2">{step.icon}</div>
                                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                                                {String(i + 1).padStart(2, "0")}
                                            </div>
                                            <h4 className="font-semibold text-sm text-neutral-900 mb-1">
                                                {data.title}
                                            </h4>
                                            <p className="text-xs text-neutral-500 leading-relaxed">
                                                {data.desc}
                                            </p>
                                        </div>
                                        {/* Arrow connector (desktop) */}
                                        {i < LOGISTICS_STEPS.length - 1 && (
                                            <div className="hidden lg:flex absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                                                <svg className="w-4 h-4 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Incoterms info */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { term: "FOB Douala", fr: "Franco à bord, port de Douala. SEPACAM gère tout jusqu'au chargement sur le navire.", en: "Free on board, Douala port. SEPACAM handles everything until loaded on vessel.", color: "bg-blue-50 border-blue-200" },
                                { term: "CIF", fr: "Coût, assurance et fret inclus jusqu'au port de destination. La solution tout-en-un.", en: "Cost, insurance and freight included to destination port. The all-in-one solution.", color: "bg-emerald-50 border-emerald-200" },
                                { term: "CFR", fr: "Coût et fret inclus. L'assurance reste à la charge de l'acheteur.", en: "Cost and freight included. Insurance remains buyer's responsibility.", color: "bg-indigo-50 border-indigo-200" },
                            ].map((inc) => (
                                <div key={inc.term} className={`p-5 rounded-xl border ${inc.color}`}>
                                    <h4 className="font-heading font-bold text-neutral-900 mb-2">{inc.term}</h4>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{inc[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════
                    BOTTOM CTA
                    ════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0djJoMTJ2LTJIMjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
                    <div className="container-main text-center relative z-10">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                                {isFr
                                    ? "Besoin de produits transformés ?"
                                    : "Need processed cocoa products?"}
                            </h2>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                {isFr
                                    ? "Contactez notre équipe commerciale pour un devis personnalisé. Nous répondons sous 24h."
                                    : "Contact our sales team for a custom quote. We respond within 24 hours."}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/contact">
                                    <Button variant="accent" size="lg">
                                        {isFr ? "Demander un devis" : "Request a quote"}
                                    </Button>
                                </Link>
                                <Link href="/produits-cacao">
                                    <Button variant="secondary" size="lg" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
                                        {isFr ? "Explorer nos produits" : "Explore our products"}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
            <ProductCTABar
                productName={isFr ? "Cacao transformé" : "Processed cocoa"}
                locale={locale}
            />
        </>
    );
}
