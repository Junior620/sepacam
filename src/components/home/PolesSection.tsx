"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Ship, Wrench, ArrowRight, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function PolesSection() {
    const t = useTranslations("poles");
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                },
            });

            const cards = gsap.utils.toArray<HTMLElement>(".pole-card");
            gsap.from(cards, {
                opacity: 0,
                y: 50,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="py-16 lg:py-20 bg-white">
            <div className="container-main">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-10 lg:mb-12">
                    <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-3">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
                    <p className="text-body text-neutral-500 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Cards Grid: 1 featured + 2 normal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                    {/* FEATURED — Transformation cacao (spans 2 cols on md) */}
                    <div className="pole-card md:col-span-2 relative group">
                        <div className="relative bg-gradient-to-br from-primary-50 to-white border-2 border-primary/20 rounded-2xl p-8 lg:p-10 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">

                            {/* Background Image on Hover */}
                            <div
                                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center"
                                style={{ backgroundImage: 'url("/images/poles/agro.jpg")' }}
                            >
                                <div className="absolute inset-0 bg-[#f8faf4]/30 backdrop-blur-[1px]" />
                            </div>

                            {/* Badge */}
                            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent-dark text-xs font-semibold rounded-full border border-accent/20">
                                    <Shield className="w-3 h-3" />
                                    {t("agro.badge")}
                                </span>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 relative z-10">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Package className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-heading text-h3 text-neutral-900 mb-2">
                                        {t("agro.title")}
                                    </h3>
                                    <p className="text-body text-neutral-800 font-medium mb-6 max-w-2xl">
                                        {t("agro.description")}
                                    </p>

                                    {/* Dual CTAs */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <Link href="/produits-cacao">
                                            <Button variant="primary" size="sm">
                                                {t("agro.cta_primary")}
                                            </Button>
                                        </Link>
                                        <Link
                                            href={{ pathname: "/contact", query: { subject: "sample" } } as any}
                                            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
                                        >
                                            {t("agro.cta_secondary")}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transit export */}
                    <div className="pole-card group">
                        <Link href="/transit" className="block h-full">
                            <div className="relative h-full bg-white border border-neutral-200 rounded-2xl p-8 hover:border-primary/30 hover:shadow-md transition-all duration-300 overflow-hidden">

                                {/* Background Image on Hover */}
                                <div
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center"
                                    style={{ backgroundImage: 'url("/images/poles/transit.jpg")' }}
                                >
                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
                                </div>

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Ship className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-heading text-h4 text-neutral-900 mb-2">
                                        {t("transit.title")}
                                    </h3>
                                    <p className="text-body text-neutral-800 font-medium mb-6">
                                        {t("transit.description")}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                        <span>{t("transit.cta")}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Services aux entreprises */}
                    <div className="pole-card group">
                        <Link href="/services" className="block h-full">
                            <div className="relative h-full bg-white border border-neutral-200 rounded-2xl p-8 hover:border-primary/30 hover:shadow-md transition-all duration-300 overflow-hidden">

                                {/* Background Image on Hover */}
                                <div
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center"
                                    style={{ backgroundImage: 'url("/images/poles/services.jpg")' }}
                                >
                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
                                </div>

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Wrench className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-heading text-h4 text-neutral-900 mb-2">
                                        {t("services.title")}
                                    </h3>
                                    <p className="text-body text-neutral-800 font-medium mb-6">
                                        {t("services.description")}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                        <span>{t("services.cta")}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
