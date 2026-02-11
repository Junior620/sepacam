"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────
export type DocumentItem = {
    title: string;
    documentType: string;
    url: string;
    fileSize?: string;
    updatedAt?: string;
};

export type DownloadableDocumentsProps = {
    productName: string;
    productKey: string;
    locale: string;
    sanityDocuments?: DocumentItem[];
};

// ─── Document type config ────────────────────────────────
const DOC_TYPE_CONFIG: Record<
    string,
    { icon: ReactNode; color: string; bgColor: string }
> = {
    tds: {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        ),
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    coa: {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        ),
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
    },
    msds: {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
        ),
        color: "text-amber-600",
        bgColor: "bg-amber-50",
    },
    certificate: {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
        ),
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
    default: {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
        ),
        color: "text-neutral-600",
        bgColor: "bg-neutral-100",
    },
};

// ─── Static fallback documents ───────────────────────────
const STATIC_DOCUMENTS: Record<
    string,
    { key: string; fr: string; en: string; type: string; availability: string }[]
> = {
    liquor: [
        { key: "tds", fr: "Fiche technique (TDS)", en: "Technical Data Sheet (TDS)", type: "tds", availability: "download" },
        { key: "coa", fr: "Certificat d'analyse (COA)", en: "Certificate of Analysis (COA)", type: "coa", availability: "per_batch" },
        { key: "msds", fr: "Fiche de sécurité (MSDS)", en: "Material Safety Data Sheet (MSDS)", type: "msds", availability: "download" },
        { key: "cert", fr: "Certificats export", en: "Export Certificates", type: "certificate", availability: "on_request" },
    ],
    butter: [
        { key: "tds", fr: "Fiche technique (TDS)", en: "Technical Data Sheet (TDS)", type: "tds", availability: "download" },
        { key: "coa", fr: "Certificat d'analyse (COA)", en: "Certificate of Analysis (COA)", type: "coa", availability: "per_batch" },
        { key: "msds", fr: "Fiche de sécurité (MSDS)", en: "Material Safety Data Sheet (MSDS)", type: "msds", availability: "download" },
        { key: "cert", fr: "Certificats export", en: "Export Certificates", type: "certificate", availability: "on_request" },
    ],
    powder: [
        { key: "tds", fr: "Fiche technique (TDS)", en: "Technical Data Sheet (TDS)", type: "tds", availability: "download" },
        { key: "coa", fr: "Certificat d'analyse (COA)", en: "Certificate of Analysis (COA)", type: "coa", availability: "per_batch" },
        { key: "msds", fr: "Fiche de sécurité (MSDS)", en: "Material Safety Data Sheet (MSDS)", type: "msds", availability: "download" },
        { key: "cert", fr: "Certificats export", en: "Export Certificates", type: "certificate", availability: "on_request" },
    ],
    cake: [
        { key: "tds", fr: "Fiche technique (TDS)", en: "Technical Data Sheet (TDS)", type: "tds", availability: "download" },
        { key: "coa", fr: "Certificat d'analyse (COA)", en: "Certificate of Analysis (COA)", type: "coa", availability: "per_batch" },
        { key: "cert", fr: "Certificats export", en: "Export Certificates", type: "certificate", availability: "on_request" },
    ],
    nibs: [
        { key: "tds", fr: "Fiche technique (TDS)", en: "Technical Data Sheet (TDS)", type: "tds", availability: "download" },
        { key: "coa", fr: "Certificat d'analyse (COA)", en: "Certificate of Analysis (COA)", type: "coa", availability: "per_batch" },
        { key: "msds", fr: "Fiche de sécurité (MSDS)", en: "Material Safety Data Sheet (MSDS)", type: "msds", availability: "download" },
    ],
};

// ── Helpers ──
function getDocConfig(type: string) {
    const normalized = type.toLowerCase().replace(/\s+/g, "_");
    if (normalized.includes("tds") || normalized.includes("technical")) return DOC_TYPE_CONFIG.tds;
    if (normalized.includes("coa") || normalized.includes("analysis")) return DOC_TYPE_CONFIG.coa;
    if (normalized.includes("msds") || normalized.includes("safety")) return DOC_TYPE_CONFIG.msds;
    if (normalized.includes("cert") || normalized.includes("export")) return DOC_TYPE_CONFIG.certificate;
    return DOC_TYPE_CONFIG.default;
}

function getAvailabilityLabel(availability: string, isFr: boolean) {
    switch (availability) {
        case "download":
            return isFr ? "Téléchargeable" : "Downloadable";
        case "per_batch":
            return isFr ? "Fourni par lot" : "Provided per batch";
        case "on_request":
            return isFr ? "Sur demande" : "On request";
        default:
            return "";
    }
}

function getAvailabilityColor(availability: string) {
    switch (availability) {
        case "download":
            return "text-emerald-600 bg-emerald-50";
        case "per_batch":
            return "text-blue-600 bg-blue-50";
        case "on_request":
            return "text-amber-600 bg-amber-50";
        default:
            return "text-neutral-500 bg-neutral-50";
    }
}

export function DownloadableDocuments({
    productName,
    productKey,
    locale,
    sanityDocuments,
}: DownloadableDocumentsProps) {
    const isFr = locale === "fr";
    const sectionRef = useRef<HTMLDivElement>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const staticDocs = STATIC_DOCUMENTS[productKey] || [];
    const hasSanityDocs = sanityDocuments && sanityDocuments.length > 0;

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

    // Track download
    const trackDownload = useCallback(
        async (docTitle: string, docType: string, url: string) => {
            try {
                await fetch("/api/track-download", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        product: productName,
                        document: docTitle,
                        documentType: docType,
                        timestamp: new Date().toISOString(),
                    }),
                });
            } catch {
                // Silently fail – don't block the download
            }
        },
        [productName]
    );

    const handleDownload = useCallback(
        async (docTitle: string, docType: string, url: string, id: string) => {
            setDownloadingId(id);
            await trackDownload(docTitle, docType, url);

            // Open in new tab (secure link)
            window.open(url, "_blank", "noopener,noreferrer");

            setTimeout(() => setDownloadingId(null), 2000);
        },
        [trackDownload]
    );

    return (
        <section
            ref={sectionRef}
            className="py-12 lg:py-20 bg-neutral-50 border-t border-neutral-200"
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
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="font-heading text-h3 lg:text-h2 text-neutral-900">
                            {isFr
                                ? "Documents téléchargeables"
                                : "Downloadable Documents"}
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-2xl">
                        {isFr
                            ? "Fiches techniques, certificats et documents réglementaires disponibles pour ce produit."
                            : "Technical sheets, certificates and regulatory documents available for this product."}
                    </p>
                </div>

                {/* ── Sanity Documents ── */}
                {hasSanityDocs && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {sanityDocuments!.map((doc, i) => {
                            const config = getDocConfig(doc.documentType);
                            const isDownloading = downloadingId === `sanity-${i}`;

                            return (
                                <button
                                    key={`sanity-${i}`}
                                    data-animate
                                    onClick={() =>
                                        handleDownload(
                                            doc.title,
                                            doc.documentType,
                                            doc.url,
                                            `sanity-${i}`
                                        )
                                    }
                                    className="group bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary/30 hover:shadow-elevation-2 transition-all duration-300 text-left w-full"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-11 h-11 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                        >
                                            <svg
                                                className={`w-5 h-5 ${config.color}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                {config.icon}
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-neutral-900 mb-1 group-hover:text-primary transition-colors truncate">
                                                {doc.title}
                                            </p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs text-neutral-400 uppercase tracking-wider">
                                                    {doc.documentType}
                                                </span>
                                                {doc.fileSize && (
                                                    <>
                                                        <span className="text-neutral-200">
                                                            •
                                                        </span>
                                                        <span className="text-xs text-neutral-400">
                                                            {doc.fileSize}
                                                        </span>
                                                    </>
                                                )}
                                                {doc.updatedAt && (
                                                    <>
                                                        <span className="text-neutral-200">
                                                            •
                                                        </span>
                                                        <span className="text-xs text-neutral-400">
                                                            {new Date(
                                                                doc.updatedAt
                                                            ).toLocaleDateString(
                                                                locale,
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                }
                                                            )}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="shrink-0 ml-2">
                                            {isDownloading ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50">
                                                    <svg
                                                        className="w-4 h-4 text-emerald-600"
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
                                            ) : (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-primary/10 transition-colors">
                                                    <svg
                                                        className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                        />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ── Static / Fallback Documents ── */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${hasSanityDocs ? "lg:grid-cols-2" : "lg:grid-cols-4"
                        } gap-4`}
                >
                    {staticDocs.map((doc) => {
                        const config = getDocConfig(doc.type);
                        const availLabel = getAvailabilityLabel(
                            doc.availability,
                            isFr
                        );
                        const availColor = getAvailabilityColor(
                            doc.availability
                        );

                        return (
                            <div
                                key={doc.key}
                                data-animate
                                className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary/10 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0`}
                                    >
                                        <svg
                                            className={`w-5 h-5 ${config.color}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {config.icon}
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-neutral-900 mb-1 text-sm">
                                            {isFr ? doc.fr : doc.en}
                                        </p>
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${availColor}`}
                                        >
                                            {availLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Request Documents CTA */}
                <div
                    data-animate
                    className="mt-8 bg-white rounded-2xl border border-neutral-200 p-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-heading font-semibold text-neutral-900 mb-1">
                                {isFr
                                    ? "Besoin d'un document spécifique ?"
                                    : "Need a specific document?"}
                            </h4>
                            <p className="text-sm text-neutral-500">
                                {isFr
                                    ? "COA personnalisé, certificats d'origine, documents douaniers — contactez notre équipe."
                                    : "Custom COA, certificates of origin, customs documents — contact our team."}
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
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            {isFr ? "Demander" : "Request"}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
