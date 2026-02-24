"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FileText, Shield, Globe, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const t = useTranslations("hero");
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Badge reveal
            tl.from(".hero-badge", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            // Word-by-word title reveal
            tl.from(".hero-word", {
                y: '100%',
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power4.out",
            }, "-=0.3");

            // Subtitle + proof lines + CTAs stagger in
            tl.from(".hero-fade-in", {
                y: 25,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            }, "-=0.2");

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
                yPercent: 15,
                opacity: 0.15,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "20% top",
                    end: "80% top",
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
                <div className="absolute inset-0 bg-neutral-900/50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-90" />
            </div>

            <div className="container-main relative z-10 hero-content">
                <div className="max-w-4xl mx-auto text-center py-20 lg:py-32">



                    {/* Title — word-by-word animated */}
                    <h1
                        className="font-heading text-3xl md:text-4xl lg:text-[4rem] leading-[1.1] text-white mb-6"
                        style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.4)' }}
                    >
                        {t("title").split(' ').map((word, i, arr) => (
                            <span key={i} className="overflow-hidden inline-block">
                                <span className="hero-word inline-block">
                                    {word}{i < arr.length - 1 ? '\u00A0' : ''}
                                </span>
                            </span>
                        ))}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="hero-fade-in text-lg md:text-xl text-white max-w-2xl mx-auto mb-4 font-light leading-relaxed"
                        style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                    >
                        {t("subtitle")}
                    </p>

                    {/* Product proof line */}
                    <p
                        className="hero-fade-in text-sm md:text-base text-white/80 font-medium tracking-wide mb-3"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                    >
                        {t("product_proof")}
                    </p>

                    {/* Compliance proof line */}
                    <div className="hero-fade-in flex items-center justify-center gap-4 text-sm text-white/70 mb-10">
                        <span className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-accent" />
                            COA par lot
                        </span>
                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-accent" />
                            Traçabilité
                        </span>
                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-accent" />
                            Documentation export
                        </span>
                    </div>

                    {/* CTAs */}
                    <div className="hero-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
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

                    {/* 3rd CTA - Specs PDF link */}
                    <div className="hero-fade-in mt-5">
                        <Link
                            href={{ pathname: "/contact", query: { subject: "technical" } } as any}
                            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                        >
                            <FileText className="w-4 h-4 group-hover:text-accent transition-colors" />
                            <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white/60">
                                {t("cta_specs")}
                            </span>
                        </Link>
                    </div>

                    {/* Documents available - social proof */}
                    <div className="hero-fade-in mt-8 inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                        <FileText className="w-4 h-4 text-accent" />
                        <span className="text-xs text-white/60 font-medium tracking-wide">
                            {t("docs_available")}
                        </span>
                    </div>

                    {/* Trust indicators - Redesigned */}
                    <div className="hero-fade-in mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent mb-1" />
                            <span className="font-display text-xl text-white font-bold" style={{ color: '#ffffff' }}>Cameroun</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Origine 100%</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield className="w-5 h-5 text-accent mb-1" />
                            <span className="font-display text-xl text-white font-bold" style={{ color: '#ffffff' }}>COA</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Par lot</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Globe className="w-5 h-5 text-accent mb-1" />
                            <span className="font-display text-xl text-white font-bold" style={{ color: '#ffffff' }}>FOB</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Douala</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <svg className="w-5 h-5 text-accent mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-display text-xl text-white font-bold" style={{ color: '#ffffff' }}>&lt; 24h</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wider">Réponse garantie</span>
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
