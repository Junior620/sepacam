"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const figures = [
    {
        id: "capacity",
        value: 32000,
        suffix: " T",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        color: "from-primary to-primary-dark",
        highlight: "bg-primary/10 text-primary",
    },
    {
        id: "products",
        value: 5,
        suffix: "",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        color: "from-accent to-accent-dark",
        highlight: "bg-accent/10 text-accent",
    },
    {
        id: "export_countries",
        value: 15,
        suffix: "+",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "from-primary-light to-primary",
        highlight: "bg-primary-light/10 text-primary-light",
    },
    {
        id: "certifications",
        value: 3,
        suffix: "",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        color: "from-success to-success-dark",
        highlight: "bg-success/10 text-success",
    },
    {
        id: "employees",
        value: 120,
        suffix: "+",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        color: "from-neutral-600 to-neutral-800",
        highlight: "bg-neutral-500/10 text-neutral-500",
    },
    {
        id: "surface_area",
        value: 8000,
        suffix: " m²",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        color: "from-accent-dark to-accent",
        highlight: "bg-accent-dark/10 text-accent-dark",
    },
];

export function KeyFigures() {
    const t = useTranslations("key_figures");
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Count-up animation for each figure
            const counters = gsap.utils.toArray<HTMLElement>(".kf-counter");
            counters.forEach((counter) => {
                const target = parseFloat(counter.dataset.value || "0");
                gsap.fromTo(
                    counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2.5,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Card stagger animation
            gsap.from(".kf-card", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-spacing bg-neutral-50">
            <div className="container-main">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold uppercase tracking-wider text-primary mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {t("badge")}
                    </div>
                    <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-body text-neutral-500 max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {figures.map((fig) => (
                        <div
                            key={fig.id}
                            className="kf-card group relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-200/80 hover:border-primary/20 transition-all duration-300 hover:shadow-elevation-3 overflow-hidden"
                        >
                            {/* Gradient accent top bar */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${fig.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-xl ${fig.highlight} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                            >
                                {fig.icon}
                            </div>

                            {/* Number */}
                            <div className="flex items-baseline gap-1 mb-2">
                                <span
                                    className="kf-counter font-heading text-4xl lg:text-5xl font-bold text-neutral-900 tabular-nums"
                                    data-value={fig.value}
                                >
                                    0
                                </span>
                                <span className="font-heading text-xl lg:text-2xl font-semibold text-primary">
                                    {fig.suffix}
                                </span>
                            </div>

                            {/* Label */}
                            <p className="text-sm text-neutral-500 font-medium">
                                {t(`figures.${fig.id}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
