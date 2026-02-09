"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const poleIcons = {
    agro: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
        </svg>
    ),
    transit: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
        </svg>
    ),
    services: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    ),
};

const poleLinks = {
    agro: "/produits-cacao",
    transit: "/transit",
    services: "/services",
};

export function PolesSection() {
    const t = useTranslations("poles");
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const poles = ["agro", "transit", "services"] as const;

    useGSAP(
        () => {
            // Animate header
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

            // Animate cards with stagger
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
        <section ref={sectionRef} className="section-spacing bg-white">
            <div className="container-main">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-12 lg:mb-16">
                    <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {poles.map((pole) => (
                        <Card key={pole} href={poleLinks[pole]} className="group pole-card">
                            <CardBody className="p-8">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    {poleIcons[pole]}
                                </div>

                                {/* Content */}
                                <h3 className="font-heading text-h4 text-neutral-900 mb-3">
                                    {t(`${pole}.title`)}
                                </h3>
                                <p className="text-body text-neutral-600 mb-6">
                                    {t(`${pole}.description`)}
                                </p>

                                {/* Link */}
                                <div className="flex items-center gap-2 text-primary font-medium text-small group-hover:gap-3 transition-all">
                                    <span>En savoir plus</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

