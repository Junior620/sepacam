"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    { name: "ISO 22000", status: "certifiée" },
    { name: "HACCP", status: "certifiée" },
    { name: "EUDR", status: "conforme" },
];

const metrics = [
    { id: "humidity", label: "Taux Humidité", value: "< 7%", icon: "droplet" },
    { id: "ffa", label: "Taux Acidité", value: "< 1.75%", icon: "activity" },
    { id: "purity", label: "Pureté", value: "99.9%", icon: "shield" },
];

export function QualitySection() {
    const t = useTranslations("quality");
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Specific animations
            tl.from(contentRef.current, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(visualRef.current, {
                    opacity: 0,
                    x: 30,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.6")
                .from(".metric-card", {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                }, "-=0.4");
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-spacing bg-white overflow-hidden">
            <div className="container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Content Side */}
                    <div ref={contentRef} className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                            Laboratoire Interne Dédié
                        </div>

                        <h2 className="font-heading text-h2 text-neutral-900 mb-6">
                            {t("title")}
                        </h2>

                        <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                            {t("subtitle")}
                        </p>

                        {/* Certifications Badges */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {certifications.map((cert) => (
                                <div key={cert.name} className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    <div>
                                        <span className="block text-xs font-bold text-neutral-900">{cert.name}</span>
                                        <span className="block text-[10px] text-neutral-500 uppercase">{cert.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {metrics.map((metric) => (
                                <div key={metric.id} className="metric-card bg-neutral-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-primary/10">
                                    <p className="font-heading text-xl font-bold text-primary mb-1">
                                        {metric.value}
                                    </p>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wide">
                                        {metric.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/qualite-laboratoire">
                                <Button variant="primary" size="lg">
                                    {t("cta")}
                                </Button>
                            </Link>
                            <Link href={{ pathname: "/contact", query: { subject: "technical" } }}>
                                <Button variant="outline" size="lg">
                                    Demander une fiche technique
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div ref={visualRef} className="order-1 lg:order-2 relative">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                            <Image
                                src="/images/quality-lab.jpg"
                                alt="Laboratoire de contrôle qualité SEPACAM"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                quality={90}
                            />

                            {/* Overlay info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-heading font-semibold text-lg">Contrôle 100% des lots</p>
                                        <p className="text-sm text-neutral-300">Analyses physico-chimiques systématiques</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating decorative element */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-dots-pattern opacity-20 -z-10" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
