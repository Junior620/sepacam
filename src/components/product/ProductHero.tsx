"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin();

// ─── Types ───────────────────────────────────────────────
export type ProductHeroProps = {
    name: string;
    description: string;
    longDescription?: string;
    heroImageUrl?: string | null;
    applications?: string[];
    badge?: string | null;
    certifications?: string[];
    specs: { label: string; value: string }[];
    moq?: string;
    leadTime?: string;
    packaging?: string[];
    locale: string;
};

export function ProductHero({
    name,
    description,
    longDescription,
    heroImageUrl,
    applications,
    badge,
    certifications,
    specs,
    moq,
    leadTime,
    packaging,
    locale,
}: ProductHeroProps) {
    const isFr = locale === "fr";
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(imageRef.current, {
                opacity: 0,
                x: -30,
                duration: 0.8,
            }).from(
                infoRef.current!.children,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.08,
                },
                "-=0.4"
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} data-product-hero className="py-12 lg:py-20 bg-white">
            <div className="container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* ── Image Side ── */}
                    <div ref={imageRef} className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-primary/5 to-accent/5 relative shadow-elevation-2">
                            {heroImageUrl ? (
                                <Image
                                    src={heroImageUrl}
                                    alt={name}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    quality={90}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <svg
                                            className="w-24 h-24 text-primary/20 mx-auto mb-4"
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
                                        <p className="text-neutral-400 text-sm font-medium">
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Floating spec badge */}
                        {specs.length > 0 && (
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-elevation-3 p-4 border border-neutral-100 hidden lg:block">
                                <p className="text-xs text-neutral-500 mb-1">
                                    {specs[0].label}
                                </p>
                                <p className="font-heading font-bold text-lg text-primary">
                                    {specs[0].value}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ── Info Side ── */}
                    <div ref={infoRef}>
                        {/* Badge */}
                        {badge && (
                            <Badge variant="accent" size="lg" className="mb-4">
                                {badge}
                            </Badge>
                        )}

                        {/* Product Name */}
                        <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-4">
                            {name}
                        </h1>

                        {/* Short Description */}
                        <p className="text-body lg:text-lg text-neutral-600 mb-4 leading-relaxed">
                            {description}
                        </p>

                        {/* Long Description */}
                        {longDescription && (
                            <p className="text-body text-neutral-500 mb-6 leading-relaxed">
                                {longDescription}
                            </p>
                        )}

                        {/* Primary Application chips */}
                        {applications && applications.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                                    {isFr ? "Applications" : "Applications"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {applications.map((app) => (
                                        <span
                                            key={app}
                                            className="inline-flex items-center px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                                        >
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Specs Card */}
                        <div className="bg-neutral-50 rounded-2xl p-6 mb-8 border border-neutral-100">
                            <h3 className="font-heading font-semibold text-neutral-900 mb-4 flex items-center gap-2">
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
                                {isFr
                                    ? "Spécifications techniques"
                                    : "Technical specifications"}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="border-l-2 border-primary/20 pl-3"
                                    >
                                        <p className="text-xs text-neutral-500 mb-0.5">
                                            {spec.label}
                                        </p>
                                        <p className="font-semibold text-neutral-900">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2">
                                    {certifications.map((cert) => (
                                        <Badge key={cert} variant="outline">
                                            ✓ {cert}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Order Meta */}
                        <div className="flex flex-wrap items-center gap-5 mb-8 py-4 border-y border-neutral-100">
                            {moq && (
                                <div className="flex items-center gap-2 text-small text-neutral-600">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-primary"
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
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">MOQ</p>
                                        <p className="font-medium text-neutral-800">{moq}</p>
                                    </div>
                                </div>
                            )}
                            {leadTime && (
                                <div className="flex items-center gap-2 text-small text-neutral-600">
                                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-accent"
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
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">
                                            {isFr ? "Délai" : "Lead time"}
                                        </p>
                                        <p className="font-medium text-neutral-800">
                                            {leadTime}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {packaging && packaging.length > 0 && (
                                <div className="flex items-center gap-2 text-small text-neutral-600">
                                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-neutral-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">
                                            {isFr ? "Conditionnement" : "Packaging"}
                                        </p>
                                        <p className="font-medium text-neutral-800">
                                            {packaging.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3">
                            <Link href="/contact">
                                <Button variant="primary" size="lg">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    {isFr ? "Demander un devis" : "Request a quote"}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="secondary" size="lg">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    {isFr
                                        ? "Demander un échantillon"
                                        : "Request a sample"}
                                </Button>
                            </Link>
                            <Link
                                href={{
                                    pathname: "/contact",
                                    query: { subject: "technical" },
                                }}
                            >
                                <Button variant="outline" size="lg">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    {isFr
                                        ? "Fiche technique"
                                        : "Download spec"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
