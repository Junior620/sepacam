"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    { name: "ISO 22000", status: "En cours" },
    { name: "FSSC 22000", status: "En cours" },
    { name: "EUDR Ready", status: "Conforme" },
];

export function QualitySection() {
    const t = useTranslations("quality");
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    const points = ["lab", "coa", "traceability", "compliance"] as const;

    useGSAP(
        () => {
            // Animate content from left
            gsap.from(contentRef.current, {
                opacity: 0,
                x: -40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            // Animate visual from right
            gsap.from(visualRef.current, {
                opacity: 0,
                x: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            // Animate list items with stagger
            const listItems = gsap.utils.toArray<HTMLElement>(".quality-point");
            gsap.from(listItems, {
                opacity: 0,
                x: -20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 70%",
                },
            });

            // Animate floating cards
            gsap.from(".floating-card-1", {
                opacity: 0,
                y: 20,
                scale: 0.9,
                duration: 0.6,
                delay: 0.3,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: visualRef.current,
                    start: "top 70%",
                },
            });

            gsap.from(".floating-card-2", {
                opacity: 0,
                y: -20,
                scale: 0.9,
                duration: 0.6,
                delay: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: visualRef.current,
                    start: "top 70%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-spacing bg-white">
            <div className="container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <div ref={contentRef}>
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-body text-neutral-600 mb-8">
                            {t("subtitle")}
                        </p>

                        {/* Points */}
                        <ul className="space-y-4 mb-8">
                            {points.map((point) => (
                                <li key={point} className="quality-point flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                            className="w-4 h-4 text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-body text-neutral-700">
                                        {t(`points.${point}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {certifications.map((cert) => (
                                <Badge
                                    key={cert.name}
                                    variant={cert.status === "Conforme" ? "certification" : "outline"}
                                    size="lg"
                                >
                                    {cert.name}
                                </Badge>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link href="/qualite-laboratoire">
                            <Button variant="primary" size="md">
                                {t("cta")}
                            </Button>
                        </Link>
                    </div>

                    {/* Visual */}
                    <div ref={visualRef} className="relative">
                        {/* Main image placeholder */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl overflow-hidden flex items-center justify-center border border-neutral-200">
                            <div className="text-center p-8">
                                <svg
                                    className="w-16 h-16 text-primary/40 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <p className="text-neutral-500 text-small">
                                    Image: Laboratoire qualité SEPACAM
                                </p>
                            </div>
                        </div>

                        {/* Floating card */}
                        <div className="floating-card-1 absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-elevation-3 p-4 border border-neutral-100 max-w-[200px]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-success"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500">Taux humidité</p>
                                    <p className="font-heading font-semibold text-neutral-900">
                                        {"< 7%"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating card 2 */}
                        <div className="floating-card-2 absolute -top-4 -right-4 bg-white rounded-2xl shadow-elevation-3 p-4 border border-neutral-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-accent-dark"
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
                                    <p className="text-xs text-neutral-500">Documents</p>
                                    <p className="font-heading font-semibold text-neutral-900">
                                        COA + FT
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

