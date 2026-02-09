"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const features = ["eudr", "child_labor", "digital"] as const;

export function TraceabilitySection() {
    const t = useTranslations("traceability_section");
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(contentRef.current!.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-neutral-900 overflow-hidden text-white">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <Image
                    src="/images/traceability-map.jpg"
                    alt="Map of Cameroon Traceability"
                    fill
                    className="object-cover object-center"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />
            </div>

            <div className="container-main relative z-10">
                <div ref={contentRef} className="max-w-xl">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/10 backdrop-blur rounded-full border border-white/20">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-success-light">Blockchain Secured</span>
                    </div>

                    <h2 className="font-heading text-h2 mb-6">
                        {t("title")}
                    </h2>

                    <p className="text-body text-neutral-300 mb-12 text-lg leading-relaxed">
                        {t("subtitle")}
                    </p>

                    <div className="grid gap-8 mb-12">
                        {features.map(feature => (
                            <div key={feature} className="flex gap-5 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20 group-hover:border-primary/30">
                                    {/* Icons based on feature */}
                                    {feature === 'eudr' && <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    {feature === 'child_labor' && <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    {feature === 'digital' && <svg className="w-6 h-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-lg text-white mb-2 group-hover:text-primary-300 transition-colors">{t(`features.${feature}.title`)}</h3>
                                    <p className="text-neutral-400 text-sm">{t(`features.${feature}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/tracabilite-conformite">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto">
                            {t("cta")}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
