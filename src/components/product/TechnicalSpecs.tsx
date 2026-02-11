"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────
export type SpecRow = {
    label: string;
    value: string;
    unit?: string;
    status?: "pass" | "warn" | "info";
};

export type TechnicalSpecsProps = {
    productKey: string;
    locale: string;
    sanitySpecs?: Record<string, string>;
    certifications?: string[];
};

// ─── Full static specs per product ───────────────────────
const PRODUCT_SPECS: Record<
    string,
    {
        type: "natural" | "alkalized" | "n/a";
        specs: { key: string; fr: string; en: string; value: string; unit?: string }[];
        microbiology: { key: string; fr: string; en: string; value: string }[];
    }
> = {
    liquor: {
        type: "natural",
        specs: [
            { key: "fat", fr: "Teneur en matière grasse", en: "Fat content", value: "50-55", unit: "%" },
            { key: "moisture", fr: "Humidité", en: "Moisture", value: "< 2", unit: "%" },
            { key: "pH", fr: "pH", en: "pH", value: "5.0-5.8" },
            { key: "fineness", fr: "Finesse", en: "Fineness", value: "99.5", unit: "%" },
            { key: "ash", fr: "Cendres", en: "Ash", value: "< 3.5", unit: "%" },
            { key: "shell", fr: "Taux de coque", en: "Shell content", value: "< 1.75", unit: "%" },
            { key: "ffa", fr: "Acides gras libres (AGL)", en: "Free Fatty Acids (FFA)", value: "< 1.75", unit: "%" },
        ],
        microbiology: [
            { key: "tpc", fr: "Flore mésophile totale", en: "Total Plate Count (TPC)", value: "< 10 000 CFU/g" },
            { key: "ecoli", fr: "E. coli", en: "E. coli", value: "Absent /g" },
            { key: "salmonella", fr: "Salmonelle", en: "Salmonella", value: "Absent /25g" },
            { key: "yeast", fr: "Levures & moisissures", en: "Yeasts & Moulds", value: "< 50 CFU/g" },
        ],
    },
    butter: {
        type: "n/a",
        specs: [
            { key: "fat", fr: "Teneur en matière grasse", en: "Fat content", value: "≥ 99.5", unit: "%" },
            { key: "moisture", fr: "Humidité", en: "Moisture", value: "< 0.5", unit: "%" },
            { key: "ffa", fr: "Acides gras libres (AGL)", en: "Free Fatty Acids (FFA)", value: "< 1.75", unit: "%" },
            { key: "iodine", fr: "Indice d'iode", en: "Iodine value", value: "33-42" },
            { key: "saponification", fr: "Indice de saponification", en: "Saponification value", value: "188-198" },
            { key: "melting", fr: "Point de fusion", en: "Melting point", value: "31-35", unit: "°C" },
            { key: "color", fr: "Couleur Lovibond", en: "Lovibond colour", value: "≤ 3.5 R" },
        ],
        microbiology: [
            { key: "tpc", fr: "Flore mésophile totale", en: "Total Plate Count (TPC)", value: "< 5 000 CFU/g" },
            { key: "ecoli", fr: "E. coli", en: "E. coli", value: "Absent /g" },
            { key: "salmonella", fr: "Salmonelle", en: "Salmonella", value: "Absent /25g" },
        ],
    },
    powder: {
        type: "natural",
        specs: [
            { key: "fat", fr: "Teneur en matière grasse", en: "Fat content", value: "10-12", unit: "%" },
            { key: "moisture", fr: "Humidité", en: "Moisture", value: "< 5", unit: "%" },
            { key: "pH", fr: "pH", en: "pH", value: "5.2-6.0" },
            { key: "fineness", fr: "Finesse (200 mesh)", en: "Fineness (200 mesh)", value: "≥ 99.0", unit: "%" },
            { key: "ash", fr: "Cendres", en: "Ash", value: "< 8", unit: "%" },
            { key: "shell", fr: "Taux de coque", en: "Shell content", value: "< 1.75", unit: "%" },
            { key: "color", fr: "Couleur", en: "Colour", value: "Brun rougeâtre / Reddish brown" },
        ],
        microbiology: [
            { key: "tpc", fr: "Flore mésophile totale", en: "Total Plate Count (TPC)", value: "< 10 000 CFU/g" },
            { key: "ecoli", fr: "E. coli", en: "E. coli", value: "Absent /g" },
            { key: "salmonella", fr: "Salmonelle", en: "Salmonella", value: "Absent /25g" },
            { key: "yeast", fr: "Levures & moisissures", en: "Yeasts & Moulds", value: "< 100 CFU/g" },
        ],
    },
    cake: {
        type: "n/a",
        specs: [
            { key: "fat", fr: "Teneur en matière grasse", en: "Fat content", value: "10-12", unit: "%" },
            { key: "moisture", fr: "Humidité", en: "Moisture", value: "< 5", unit: "%" },
            { key: "pH", fr: "pH", en: "pH", value: "5.0-5.8" },
            { key: "ash", fr: "Cendres", en: "Ash", value: "< 8", unit: "%" },
            { key: "shell", fr: "Taux de coque", en: "Shell content", value: "< 1.75", unit: "%" },
        ],
        microbiology: [
            { key: "tpc", fr: "Flore mésophile totale", en: "Total Plate Count (TPC)", value: "< 10 000 CFU/g" },
            { key: "salmonella", fr: "Salmonelle", en: "Salmonella", value: "Absent /25g" },
        ],
    },
    nibs: {
        type: "n/a",
        specs: [
            { key: "fat", fr: "Teneur en matière grasse", en: "Fat content", value: "50-55", unit: "%" },
            { key: "moisture", fr: "Humidité", en: "Moisture", value: "< 3", unit: "%" },
            { key: "shell", fr: "Taux de coque résiduelle", en: "Residual shell content", value: "< 2", unit: "%" },
            { key: "size", fr: "Granulométrie", en: "Particle size", value: "2-8", unit: "mm" },
            { key: "ash", fr: "Cendres", en: "Ash", value: "< 4", unit: "%" },
        ],
        microbiology: [
            { key: "tpc", fr: "Flore mésophile totale", en: "Total Plate Count (TPC)", value: "< 10 000 CFU/g" },
            { key: "ecoli", fr: "E. coli", en: "E. coli", value: "Absent /g" },
            { key: "salmonella", fr: "Salmonelle", en: "Salmonella", value: "Absent /25g" },
        ],
    },
};

const DEFAULT_CERTIFICATIONS = ["ISO 22000", "HACCP", "EUDR Compliant"];

export function TechnicalSpecs({
    productKey,
    locale,
    sanitySpecs,
    certifications,
}: TechnicalSpecsProps) {
    const isFr = locale === "fr";
    const sectionRef = useRef<HTMLDivElement>(null);

    const productSpecs = PRODUCT_SPECS[productKey];

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

    if (!productSpecs) return null;

    // If Sanity provides specs, merge/override
    const physicalSpecs = sanitySpecs
        ? productSpecs.specs.map((s) => ({
            ...s,
            value: sanitySpecs[s.key] || s.value,
        }))
        : productSpecs.specs;

    const certs = certifications || DEFAULT_CERTIFICATIONS;
    const productType = productSpecs.type;

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
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="font-heading text-h3 lg:text-h2 text-neutral-900">
                            {isFr
                                ? "Spécifications techniques"
                                : "Technical Specifications"}
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-2xl">
                        {isFr
                            ? "Données analytiques typiques. Les valeurs exactes sont disponibles sur le certificat d'analyse (COA) de chaque lot."
                            : "Typical analytical data. Exact values are available on the Certificate of Analysis (COA) for each batch."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── Left Column: Specs Table ── */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Alkalized / Natural Status */}
                        {productType !== "n/a" && (
                            <div data-animate className="flex items-center gap-3">
                                <span className="text-sm font-medium text-neutral-600">
                                    {isFr ? "Type :" : "Type:"}
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${productType === "alkalized"
                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${productType === "alkalized"
                                                ? "bg-amber-500"
                                                : "bg-emerald-500"
                                            }`}
                                    />
                                    {productType === "alkalized"
                                        ? isFr
                                            ? "Alcalinisé"
                                            : "Alkalized"
                                        : isFr
                                            ? "Naturel"
                                            : "Natural"}
                                </span>
                            </div>
                        )}

                        {/* Physical & Chemical Specs — Desktop Table */}
                        <div data-animate>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                {isFr
                                    ? "Caractéristiques physico-chimiques"
                                    : "Physical & Chemical Properties"}
                            </h3>

                            {/* Desktop table */}
                            <div className="hidden sm:block overflow-hidden rounded-xl border border-neutral-200">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-neutral-50">
                                            <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                                {isFr ? "Paramètre" : "Parameter"}
                                            </th>
                                            <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                                {isFr ? "Valeur typique" : "Typical Value"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {physicalSpecs.map((spec, i) => (
                                            <tr
                                                key={spec.key}
                                                className={`transition-colors hover:bg-primary/[0.02] ${i % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-neutral-50/50"
                                                    }`}
                                            >
                                                <td className="py-3.5 px-5 text-sm text-neutral-700 font-medium">
                                                    {isFr ? spec.fr : spec.en}
                                                </td>
                                                <td className="py-3.5 px-5 text-sm font-semibold text-neutral-900">
                                                    {spec.value}
                                                    {spec.unit && (
                                                        <span className="text-neutral-400 font-normal ml-0.5">
                                                            {spec.unit}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile stacked cards */}
                            <div className="sm:hidden space-y-2">
                                {physicalSpecs.map((spec) => (
                                    <div
                                        key={spec.key}
                                        className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                                    >
                                        <span className="text-sm text-neutral-600">
                                            {isFr ? spec.fr : spec.en}
                                        </span>
                                        <span className="text-sm font-bold text-neutral-900 ml-4 shrink-0">
                                            {spec.value}
                                            {spec.unit && (
                                                <span className="text-neutral-400 font-normal ml-0.5">
                                                    {spec.unit}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Microbiology Specs */}
                        {productSpecs.microbiology.length > 0 && (
                            <div data-animate>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                    {isFr
                                        ? "Critères microbiologiques"
                                        : "Microbiological Criteria"}
                                </h3>

                                {/* Desktop table */}
                                <div className="hidden sm:block overflow-hidden rounded-xl border border-neutral-200">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-neutral-50">
                                                <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                                    {isFr ? "Paramètre" : "Parameter"}
                                                </th>
                                                <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                                    {isFr ? "Limite" : "Limit"}
                                                </th>
                                                <th className="py-3 px-5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-500 w-20">
                                                    {isFr ? "Statut" : "Status"}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {productSpecs.microbiology.map(
                                                (spec, i) => (
                                                    <tr
                                                        key={spec.key}
                                                        className={`transition-colors hover:bg-primary/[0.02] ${i % 2 === 0
                                                                ? "bg-white"
                                                                : "bg-neutral-50/50"
                                                            }`}
                                                    >
                                                        <td className="py-3.5 px-5 text-sm text-neutral-700 font-medium">
                                                            {isFr
                                                                ? spec.fr
                                                                : spec.en}
                                                        </td>
                                                        <td className="py-3.5 px-5 text-sm font-semibold text-neutral-900">
                                                            {spec.value}
                                                        </td>
                                                        <td className="py-3.5 px-5 text-center">
                                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50">
                                                                <svg
                                                                    className="w-3.5 h-3.5 text-emerald-600"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={3}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile stacked */}
                                <div className="sm:hidden space-y-2">
                                    {productSpecs.microbiology.map((spec) => (
                                        <div
                                            key={spec.key}
                                            className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                                        >
                                            <div>
                                                <span className="text-sm text-neutral-600 block">
                                                    {isFr ? spec.fr : spec.en}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    {spec.value}
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 ml-3 shrink-0">
                                                <svg
                                                    className="w-3.5 h-3.5 text-emerald-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Right Column: Certifications & Info ── */}
                    <div className="space-y-6">
                        {/* Certifications */}
                        <div
                            data-animate
                            className="bg-gradient-to-br from-neutral-50 to-primary/[0.03] rounded-2xl p-6 border border-neutral-100"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                {isFr ? "Certifications" : "Certifications"}
                            </h3>
                            <div className="space-y-3">
                                {certs.map((cert) => (
                                    <div
                                        key={cert}
                                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                            <svg
                                                className="w-4 h-4 text-emerald-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-semibold text-neutral-800">
                                            {cert}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Storage Conditions */}
                        <div
                            data-animate
                            className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-2">
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
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                                {isFr
                                    ? "Conditions de stockage"
                                    : "Storage Conditions"}
                            </h3>
                            <ul className="text-sm text-amber-800 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {isFr
                                        ? "Température : 15-25°C"
                                        : "Temperature: 15-25°C"}
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {isFr
                                        ? "Humidité relative : < 65%"
                                        : "Relative humidity: < 65%"}
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {isFr
                                        ? "À l'abri de la lumière directe et des odeurs"
                                        : "Away from direct light and strong odours"}
                                </li>
                            </ul>
                        </div>

                        {/* COA Notice */}
                        <div
                            data-animate
                            className="bg-primary/5 rounded-2xl p-6 border border-primary/10"
                        >
                            <p className="text-sm text-primary/80 leading-relaxed">
                                <strong className="text-primary block mb-1">
                                    {isFr
                                        ? "Certificat d'Analyse (COA)"
                                        : "Certificate of Analysis (COA)"}
                                </strong>
                                {isFr
                                    ? "Un COA est fourni avec chaque lot expédié. Pour un COA type, contactez notre équipe commerciale."
                                    : "A COA is provided with every shipped batch. For a sample COA, contact our sales team."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
