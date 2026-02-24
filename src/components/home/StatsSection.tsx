"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Weight, MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statIcons = [Users, Weight, MapPin, Calendar];

export function StatsSection() {
    const t = useTranslations("stats");
    const sectionRef = useRef<HTMLDivElement>(null);

    const stats = [
        {
            key: "producers",
            value: 2000,
            suffix: "+",
            label: t("producers.label"),
        },
        {
            key: "capacity",
            value: 2000,
            suffix: " T",
            label: t("capacity.label"),
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
            // Animate header
            gsap.from(".stats-header", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            // Animate stat cards with stagger
            gsap.from(".stat-card", {
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.6,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            // Count-up animation for numbers
            const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");
            counters.forEach((counter) => {
                const target = parseInt(counter.dataset.value || "0");

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
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-28 relative overflow-hidden"
        >
            {/* Gradient background with depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a1a] via-primary-dark to-[#0d2b0d]" />
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="container-main relative z-10">
                {/* Section Header */}
                <div className="stats-header text-center mb-14 lg:mb-18">
                    <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                    {stats.map((stat, index) => {
                        const Icon = statIcons[index];
                        return (
                            <div
                                key={stat.key}
                                className="stat-card text-center p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>

                                {/* Number */}
                                <div className="flex items-baseline justify-center gap-1 mb-3">
                                    <span
                                        className="stat-counter font-heading text-5xl lg:text-6xl font-bold text-white"
                                        data-value={stat.value}
                                    >
                                        0
                                    </span>
                                    <span className="font-heading text-2xl lg:text-3xl text-accent font-bold">
                                        {stat.suffix}
                                    </span>
                                </div>

                                {/* Label */}
                                <p className="text-sm text-white/60 font-medium tracking-wide uppercase">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
