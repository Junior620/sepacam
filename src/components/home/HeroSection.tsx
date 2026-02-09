"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HeroSection() {
    const t = useTranslations("hero");
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.from(".hero-title", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    ".hero-subtitle",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
                .from(
                    ".hero-cta",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center pt-[var(--header-height)] gradient-hero overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container-main relative z-10">
                <div className="max-w-4xl mx-auto text-center py-16 lg:py-24">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-small font-medium text-primary">
                            Cameroun • Cacao Transformé • Export B2B
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-title font-heading text-display-sm lg:text-display text-neutral-900 mb-6">
                        {t("title")}
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-body lg:text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
                        {t("subtitle")}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="hero-cta w-full sm:w-auto">
                            <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                                {t("cta_primary")}
                            </Button>
                        </Link>
                        <Link href="/contact" className="hero-cta w-full sm:w-auto">
                            <Button variant="secondary" size="lg" fullWidth className="sm:w-auto">
                                {t("cta_secondary")}
                            </Button>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 pt-8 border-t border-neutral-200">
                        <p className="text-small text-neutral-500 mb-4">
                            Conforme aux standards internationaux
                        </p>
                        <div className="flex items-center justify-center gap-8 flex-wrap">
                            <div className="flex items-center gap-2 text-neutral-400">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-small">Traçabilité lot</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-small">COA disponibles</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-small">Export FOB/CIF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
