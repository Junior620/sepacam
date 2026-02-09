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

export function HeroSection() {
    const t = useTranslations("hero");
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // Initial reveal animation
            tl.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });

            // Parallax effect for background
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Parallax effect for content (slower than bg)
            gsap.to(".hero-content", {
                yPercent: 10,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "50% top",
                    scrub: true
                }
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center overflow-hidden"
        >
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0 hero-bg scale-110">
                <Image
                    src="/hero-bg.png"
                    alt="Cacao beans and powder"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
            </div>

            <div className="container-main relative z-10 hero-content">
                <div className="max-w-4xl mx-auto text-center py-20 lg:py-32">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-lg">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_theme(colors.primary.DEFAULT)]" />
                        <span className="text-small font-semibold text-white tracking-wide uppercase">
                            Cameroun • Cacao Transformé • Export B2B
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-heading text-display-sm md:text-display lg:text-[5rem] leading-[1.1] text-white mb-8 drop-shadow-2xl">
                        {t("title")}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
                        {t("subtitle")}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" fullWidth className="sm:min-w-[200px] shadow-xl hover:shadow-primary/20 shadow-primary/10 transition-shadow">
                                {t("cta_primary")}
                            </Button>
                        </Link>
                        <Link href={{ pathname: "/contact", query: { subject: "sample" } } as any} className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                className="sm:min-w-[200px] bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl"
                            >
                                {t("cta_secondary")}
                            </Button>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-display text-2xl text-white">100%</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Origine Cameroun</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-display text-2xl text-white">ISO</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Certifié 22000</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-display text-2xl text-white">FOB</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Livraison Douala</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-display text-2xl text-white">24h</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Support Client</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-20 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xs text-white/60 uppercase tracking-widest">Découvrir</span>
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
