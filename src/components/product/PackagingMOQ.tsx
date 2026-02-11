"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────
export type PackagingMOQProps = {
    productKey: string;
    locale: string;
    sanityPackaging?: string[];
    sanityMoq?: string;
    sanityIncoterms?: string;
};

type PackagingOption = {
    size: string;
    type: "bag" | "box" | "drum" | "bulk";
    fr: string;
    en: string;
    icon: string;
};

// ─── Packaging data per product ──────────────────────────
const PRODUCT_PACKAGING: Record<
    string,
    {
        options: PackagingOption[];
        moq: { value: number; unit: string };
        leadTime: string;
        shelfLife: string;
        palletization: string;
    }
> = {
    liquor: {
        options: [
            { size: "10 kg", type: "box", fr: "Carton doublé PE", en: "PE-lined carton", icon: "📦" },
            { size: "25 kg", type: "bag", fr: "Sac kraft multi-couches", en: "Multi-layer kraft bag", icon: "🛍️" },
            { size: "200 kg", type: "drum", fr: "Fût métallique", en: "Metal drum", icon: "🛢️" },
            { size: "Vrac", type: "bulk", fr: "Citerne (liquide chaud)", en: "Tanker (hot liquid)", icon: "🚛" },
        ],
        moq: { value: 1, unit: "MT" },
        leadTime: "2-4",
        shelfLife: "12",
        palletization: "40 × 25kg / palette",
    },
    butter: {
        options: [
            { size: "15 kg", type: "box", fr: "Carton doublé PE", en: "PE-lined carton", icon: "📦" },
            { size: "25 kg", type: "box", fr: "Carton doublé PE", en: "PE-lined carton", icon: "📦" },
            { size: "200 kg", type: "drum", fr: "Fût métallique", en: "Metal drum", icon: "🛢️" },
        ],
        moq: { value: 1, unit: "MT" },
        leadTime: "2-4",
        shelfLife: "18",
        palletization: "40 × 25kg / palette",
    },
    powder: {
        options: [
            { size: "10 kg", type: "bag", fr: "Sac papier kraft", en: "Kraft paper bag", icon: "🛍️" },
            { size: "25 kg", type: "bag", fr: "Sac kraft multi-couches", en: "Multi-layer kraft bag", icon: "🛍️" },
            { size: "500 kg", type: "bulk", fr: "Big bag (FIBC)", en: "Big bag (FIBC)", icon: "📐" },
            { size: "1 MT", type: "bulk", fr: "Big bag (FIBC)", en: "Big bag (FIBC)", icon: "📐" },
        ],
        moq: { value: 1, unit: "MT" },
        leadTime: "2-4",
        shelfLife: "24",
        palletization: "40 × 25kg / palette",
    },
    cake: {
        options: [
            { size: "25 kg", type: "bag", fr: "Sac kraft multi-couches", en: "Multi-layer kraft bag", icon: "🛍️" },
            { size: "50 kg", type: "bag", fr: "Sac polypropylène tissé", en: "Woven polypropylene bag", icon: "🛍️" },
            { size: "1 MT", type: "bulk", fr: "Big bag (FIBC)", en: "Big bag (FIBC)", icon: "📐" },
        ],
        moq: { value: 5, unit: "MT" },
        leadTime: "1-2",
        shelfLife: "12",
        palletization: "20 × 50kg / palette",
    },
    nibs: {
        options: [
            { size: "5 kg", type: "bag", fr: "Sac stand-up zip", en: "Stand-up zip bag", icon: "🛍️" },
            { size: "10 kg", type: "box", fr: "Carton doublé PE", en: "PE-lined carton", icon: "📦" },
            { size: "25 kg", type: "bag", fr: "Sac kraft multi-couches", en: "Multi-layer kraft bag", icon: "🛍️" },
        ],
        moq: { value: 0.5, unit: "MT" },
        leadTime: "1-2",
        shelfLife: "12",
        palletization: "60 × 10kg / palette",
    },
};

const INCOTERMS = [
    { code: "FOB", fr: "Franco à bord – Port de Douala", en: "Free on Board – Douala Port" },
    { code: "CIF", fr: "Coût, Assurance & Fret", en: "Cost, Insurance & Freight" },
    { code: "CFR", fr: "Coût & Fret", en: "Cost & Freight" },
    { code: "EXW", fr: "Départ usine – Douala", en: "Ex Works – Douala Factory" },
];

const TYPE_ICONS: Record<string, string> = {
    bag: "🛍️",
    box: "📦",
    drum: "🛢️",
    bulk: "🚛",
};

export function PackagingMOQ({
    productKey,
    locale,
    sanityPackaging,
    sanityMoq,
    sanityIncoterms,
}: PackagingMOQProps) {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";
    const sectionRef = useRef<HTMLDivElement>(null);

    const data = PRODUCT_PACKAGING[productKey];

    useGSAP(
        () => {
            if (!sectionRef.current) return;
            gsap.from(sectionRef.current.querySelectorAll("[data-animate]"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    once: true,
                },
                y: 24,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
            });
        },
        { scope: sectionRef }
    );

    if (!data) return null;

    const moqDisplay = sanityMoq || `${data.moq.value} ${data.moq.unit}`;

    return (
        <section
            ref={sectionRef}
            className="py-12 lg:py-20 bg-white border-t border-neutral-100"
        >
            <div className="container-main">
                {/* Section Header */}
                <div data-animate className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <h2 className="font-heading text-h3 lg:text-h2 text-neutral-900">
                            {isFr
                                ? "Conditionnement & Commande"
                                : "Packaging & Ordering"}
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-2xl">
                        {isFr
                            ? "Options de conditionnement disponibles et conditions commerciales pour ce produit."
                            : "Available packaging options and trade terms for this product."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── Left: Packaging Options ── */}
                    <div className="lg:col-span-2">
                        <h3
                            data-animate
                            className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-5"
                        >
                            {isFr
                                ? "Options de conditionnement"
                                : "Packaging Options"}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(sanityPackaging && sanityPackaging.length > 0
                                ? sanityPackaging.map((p, i) => ({
                                    size: p,
                                    type: "box" as const,
                                    fr: p,
                                    en: p,
                                    icon: TYPE_ICONS.box,
                                }))
                                : data.options
                            ).map((opt, i) => (
                                <div
                                    key={`${opt.size}-${i}`}
                                    data-animate
                                    className="group relative bg-neutral-50 rounded-2xl p-5 border border-neutral-200 hover:border-primary/30 hover:shadow-elevation-1 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                            {opt.icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-heading font-bold text-lg text-neutral-900 mb-0.5">
                                                {opt.size}
                                            </p>
                                            <p className="text-sm text-neutral-500">
                                                {isFr ? opt.fr : opt.en}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Palletization */}
                        <div
                            data-animate
                            className="mt-4 flex items-center gap-2 text-xs text-neutral-400"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                            <span>
                                {isFr ? "Palettisation" : "Palletization"}:{" "}
                                {data.palletization}
                            </span>
                        </div>

                        {/* Custom Packaging CTA */}
                        <div
                            data-animate
                            className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-1">
                                    <h4 className="font-heading font-semibold text-neutral-900 mb-1">
                                        {isFr
                                            ? "Conditionnement sur mesure ?"
                                            : "Custom packaging?"}
                                    </h4>
                                    <p className="text-sm text-neutral-500">
                                        {isFr
                                            ? "Nous proposons des solutions de conditionnement personnalisées pour les commandes ≥ 5 MT."
                                            : "We offer custom packaging solutions for orders ≥ 5 MT."}
                                    </p>
                                </div>
                                <a
                                    href={`/${locale}/contact`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm shrink-0"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    {isFr ? "Nous contacter" : "Contact us"}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: MOQ, Lead Time, Incoterms ── */}
                    <div className="space-y-6">
                        {/* MOQ Card */}
                        <div
                            data-animate
                            className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                {isFr
                                    ? "Quantité minimale (MOQ)"
                                    : "Minimum Order Qty (MOQ)"}
                            </h3>
                            <div className="text-center py-3">
                                <p className="font-heading text-4xl font-bold text-primary mb-1">
                                    {moqDisplay}
                                </p>
                                <p className="text-xs text-neutral-400">
                                    {isFr
                                        ? "Tonne(s) métrique(s)"
                                        : "Metric Ton(s)"}
                                </p>
                            </div>
                        </div>

                        {/* Lead Time & Shelf Life */}
                        <div data-animate className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 text-center">
                                <svg
                                    className="w-5 h-5 text-emerald-600 mx-auto mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="font-heading font-bold text-lg text-neutral-900">
                                    {data.leadTime}
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">
                                    {isFr ? "Semaines délai" : "Weeks lead time"}
                                </p>
                            </div>
                            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 text-center">
                                <svg
                                    className="w-5 h-5 text-blue-600 mx-auto mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="font-heading font-bold text-lg text-neutral-900">
                                    {data.shelfLife}
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">
                                    {isFr ? "Mois DLUO" : "Months shelf life"}
                                </p>
                            </div>
                        </div>

                        {/* Incoterms */}
                        <div
                            data-animate
                            className="bg-gradient-to-br from-neutral-50 to-primary/[0.03] rounded-2xl p-6 border border-neutral-100"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                Incoterms
                            </h3>
                            <div className="space-y-3">
                                {(sanityIncoterms
                                    ? sanityIncoterms
                                        .split(",")
                                        .map((i) => i.trim())
                                        .map((code) => ({
                                            code,
                                            fr: code,
                                            en: code,
                                        }))
                                    : INCOTERMS
                                ).map((term) => (
                                    <div
                                        key={term.code}
                                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-colors"
                                    >
                                        <span className="inline-flex items-center justify-center w-10 h-7 bg-primary/10 text-primary text-xs font-bold rounded-md shrink-0">
                                            {term.code}
                                        </span>
                                        <span className="text-sm text-neutral-600">
                                            {isFr ? term.fr : term.en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Port info */}
                        <div
                            data-animate
                            className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100"
                        >
                            <svg
                                className="w-5 h-5 text-amber-600 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <div>
                                <p className="text-xs font-semibold text-amber-700">
                                    {isFr
                                        ? "Port d'expédition"
                                        : "Shipping Port"}
                                </p>
                                <p className="text-sm text-amber-600">
                                    Douala, Cameroon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
