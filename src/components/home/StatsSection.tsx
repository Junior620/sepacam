"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
    const t = useTranslations("stats");
    const sectionRef = useRef<HTMLDivElement>(null);

    const stats = [
        {
            key: "producers",
            value: 500,
            suffix: "+",
            label: t("producers.label"),
            note: t("producers.note"),
        },
        {
            key: "capacity",
            value: 2000,
            suffix: " T",
            label: t("capacity.label"),
            note: t("capacity.note"),
        },
        {
            key: "regions",
            value: 5,
            suffix: "",
            label: t("regions.label"),
        },
        {
            key: "experience",
            value: 4,
            suffix: "+",
            label: t("experience.label"),
        },
    ];

    useGSAP(
        () => {
            const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");

            counters.forEach((counter) => {
                const target = parseInt(counter.dataset.value || "0");

                gsap.fromTo(
                    counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-spacing bg-gradient-to-br from-primary to-primary-dark text-white"
        >
            <div className="container-main">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="font-heading text-h2-sm lg:text-h2 mb-4">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat) => (
                        <div key={stat.key} className="text-center">
                            <div className="flex items-baseline justify-center gap-1 mb-2">
                                <span
                                    className="stat-counter font-heading text-display-sm lg:text-display"
                                    data-value={stat.value}
                                >
                                    0
                                </span>
                                <span className="font-heading text-h2 text-accent">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="text-body text-white/80">{stat.label}</p>
                            {stat.note && (
                                <p className="text-xs text-white/50 mt-1">({stat.note})</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
