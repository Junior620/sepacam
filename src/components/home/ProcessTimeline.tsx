"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
    id: string;
    icon: string; // Emoji for now, can be replaced with SVG
    color: string;
};

export function ProcessTimeline() {
    const t = useTranslations("process_timeline");
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState<string | null>(null);

    const steps: ProcessStep[] = [
        { id: "beans", icon: "🫘", color: "bg-[#5D4037]" },
        { id: "liquor", icon: "🥃", color: "bg-[#3E2723]" },
        { id: "butter", icon: "🧈", color: "bg-[#F5DEB3]" },
        { id: "powder", icon: "🧂", color: "bg-[#795548]" },
        { id: "cake", icon: "🥮", color: "bg-[#4E342E]" },
    ];

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animate title
            tl.from(".process-title", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            // Animate steps
            tl.from(".process-step", {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.7)",
            }, "-=0.4");

            // Animate connecting lines
            tl.from(".process-line", {
                scaleX: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.inOut",
                transformOrigin: "left center",
            }, "-=1");

        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="section-spacing bg-neutral-50 overflow-hidden">
            <div className="container-main">
                <div className="text-center mb-16 process-title">
                    <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-neutral-200 -z-10">
                        <div className="h-full bg-primary/20 w-full origin-left process-line" />
                    </div>

                    {/* Connecting Line (Mobile) */}
                    <div className="block lg:hidden absolute top-0 bottom-0 left-12 w-1 bg-neutral-200 -z-10">
                        <div className="w-full bg-primary/20 h-full origin-top process-line" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="process-step group relative flex lg:flex-col items-center gap-6 lg:gap-4 p-4 rounded-xl hover:bg-white hover:shadow-elevation-2 transition-all duration-300 cursor-pointer"
                                onMouseEnter={() => setActiveStep(step.id)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Step Number Badge */}
                                <div className="absolute top-0 right-0 lg:-top-2 lg:-right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                                    {index + 1}
                                </div>

                                {/* Icon Circle */}
                                <div className={cn(
                                    "w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 z-10 shrink-0",
                                    step.color,
                                    activeStep === step.id ? "ring-4 ring-primary/20" : ""
                                )}>
                                    <span className="scale-100 group-hover:rotate-12 transition-transform duration-300">
                                        {step.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="text-left lg:text-center w-full">
                                    <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                                        {t(`steps.${step.id}.title`)}
                                    </h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {t(`steps.${step.id}.description`)}
                                    </p>
                                </div>

                                {/* Mobile Arrow (except last) */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden absolute left-12 bottom-[-2rem] w-1 h-8 bg-neutral-200 -z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
