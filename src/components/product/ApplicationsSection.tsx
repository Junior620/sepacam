"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────
export type ApplicationsProps = {
    productKey: string;
    locale: string;
    sanityApplications?: string[];
};

type ApplicationCategory = "all" | "food" | "cosmetic" | "pharma" | "industrial";

type UseCase = {
    id: string;
    category: ApplicationCategory;
    icon: string;
    fr: { title: string; description: string };
    en: { title: string; description: string };
};

// ─── Application data per product ────────────────────────
const PRODUCT_APPLICATIONS: Record<string, UseCase[]> = {
    liquor: [
        {
            id: "chocolate",
            category: "food",
            icon: "🍫",
            fr: { title: "Chocolaterie", description: "Base pour tablettes, bonbons, ganaches et couvertures." },
            en: { title: "Chocolate Making", description: "Base for bars, bonbons, ganaches and couvertures." },
        },
        {
            id: "confectionery",
            category: "food",
            icon: "🍬",
            fr: { title: "Confiserie", description: "Enrobage, praliné et fourrages pour confiseries haut de gamme." },
            en: { title: "Confectionery", description: "Coating, pralines and fillings for premium confectionery." },
        },
        {
            id: "bakery",
            category: "food",
            icon: "🥐",
            fr: { title: "Pâtisserie & Boulangerie", description: "Viennoiseries, gâteaux, mousses et crèmes." },
            en: { title: "Pastry & Bakery", description: "Pastries, cakes, mousses and creams." },
        },
        {
            id: "icecream",
            category: "food",
            icon: "🍦",
            fr: { title: "Glaces & Sorbets", description: "Arôme chocolat intense pour crèmes glacées artisanales." },
            en: { title: "Ice Cream & Sorbet", description: "Intense chocolate flavour for artisanal ice creams." },
        },
        {
            id: "beverage",
            category: "food",
            icon: "☕",
            fr: { title: "Boissons chocolatées", description: "Base pour chocolats chauds haut de gamme et boissons." },
            en: { title: "Hot Chocolate Drinks", description: "Base for premium hot chocolate and beverages." },
        },
    ],
    butter: [
        {
            id: "chocolate",
            category: "food",
            icon: "🍫",
            fr: { title: "Chocolaterie fine", description: "Texture fondante et brillance pour chocolats premium." },
            en: { title: "Fine Chocolate", description: "Melt-in-mouth texture and gloss for premium chocolate." },
        },
        {
            id: "cosmetics",
            category: "cosmetic",
            icon: "🧴",
            fr: { title: "Cosmétique naturelle", description: "Crèmes, baumes, savons et soins pour la peau." },
            en: { title: "Natural Cosmetics", description: "Creams, balms, soaps and skincare products." },
        },
        {
            id: "pharma",
            category: "pharma",
            icon: "💊",
            fr: { title: "Pharmaceutique", description: "Excipient pour suppositoires et enrobages de comprimés." },
            en: { title: "Pharmaceutical", description: "Excipient for suppositories and tablet coatings." },
        },
        {
            id: "confectionery",
            category: "food",
            icon: "🍬",
            fr: { title: "Confiserie", description: "Agent de texture et de brillance pour enrobages." },
            en: { title: "Confectionery", description: "Texture and gloss agent for coatings." },
        },
        {
            id: "bodycare",
            category: "cosmetic",
            icon: "🛁",
            fr: { title: "Soins corporels", description: "Beurres corporels, lip balms et produits capillaires." },
            en: { title: "Body Care", description: "Body butters, lip balms and hair products." },
        },
    ],
    powder: [
        {
            id: "beverages",
            category: "food",
            icon: "☕",
            fr: { title: "Boissons chocolatées", description: "Poudre instantanée, cacao chaud et mélanges protéinés." },
            en: { title: "Chocolate Beverages", description: "Instant powder, hot cocoa and protein blends." },
        },
        {
            id: "bakery",
            category: "food",
            icon: "🥐",
            fr: { title: "Pâtisserie", description: "Gâteaux, brownies, cookies et desserts chocolatés." },
            en: { title: "Pastry", description: "Cakes, brownies, cookies and chocolate desserts." },
        },
        {
            id: "dairy",
            category: "food",
            icon: "🥛",
            fr: { title: "Produits laitiers", description: "Yaourts, crèmes dessert et laits aromatisés." },
            en: { title: "Dairy Products", description: "Yoghurts, dessert creams and flavoured milks." },
        },
        {
            id: "icecream",
            category: "food",
            icon: "🍦",
            fr: { title: "Glaces", description: "Saveur cacao pour glaces industrielles et artisanales." },
            en: { title: "Ice Cream", description: "Cocoa flavour for industrial and artisanal ice cream." },
        },
        {
            id: "cereal",
            category: "food",
            icon: "🥣",
            fr: { title: "Céréales & Snacks", description: "Enrobage et aromatisation de barres et céréales." },
            en: { title: "Cereals & Snacks", description: "Coating and flavouring for bars and cereals." },
        },
        {
            id: "cosmetics",
            category: "cosmetic",
            icon: "🧴",
            fr: { title: "Cosmétique", description: "Masques, gommages et soins à base de cacao." },
            en: { title: "Cosmetics", description: "Masks, scrubs and cocoa-based skincare." },
        },
    ],
    cake: [
        {
            id: "powder_production",
            category: "industrial",
            icon: "🏭",
            fr: { title: "Production de poudre", description: "Matière première pour la fabrication de poudre de cacao." },
            en: { title: "Powder Production", description: "Raw material for cocoa powder manufacturing." },
        },
        {
            id: "animal_feed",
            category: "industrial",
            icon: "🐄",
            fr: { title: "Alimentation animale", description: "Complément riche en fibres et protéines pour le bétail." },
            en: { title: "Animal Feed", description: "Fibre and protein-rich supplement for livestock." },
        },
        {
            id: "fertilizer",
            category: "industrial",
            icon: "🌱",
            fr: { title: "Engrais organique", description: "Amendement riche en azote pour l'agriculture durable." },
            en: { title: "Organic Fertilizer", description: "Nitrogen-rich amendment for sustainable agriculture." },
        },
    ],
    nibs: [
        {
            id: "chocolate",
            category: "food",
            icon: "🍫",
            fr: { title: "Chocolaterie artisanale", description: "Inclusion croquante pour tablettes bean-to-bar." },
            en: { title: "Craft Chocolate", description: "Crunchy inclusion for bean-to-bar tablets." },
        },
        {
            id: "bakery",
            category: "food",
            icon: "🥐",
            fr: { title: "Pâtisserie", description: "Topping pour gâteaux, muffins et granolas." },
            en: { title: "Pastry", description: "Topping for cakes, muffins and granolas." },
        },
        {
            id: "superfood",
            category: "food",
            icon: "🥗",
            fr: { title: "Super-aliment", description: "Snack santé riche en antioxydants et magnésium." },
            en: { title: "Superfood", description: "Healthy snack rich in antioxidants and magnesium." },
        },
        {
            id: "brewing",
            category: "food",
            icon: "🍺",
            fr: { title: "Brasserie artisanale", description: "Infusion cacao pour bières stout et porter." },
            en: { title: "Craft Brewing", description: "Cocoa infusion for stout and porter beers." },
        },
        {
            id: "cosmetics",
            category: "cosmetic",
            icon: "🧴",
            fr: { title: "Cosmétique", description: "Gommages exfoliants et soins texturés." },
            en: { title: "Cosmetics", description: "Exfoliating scrubs and textured skincare." },
        },
    ],
};

const CATEGORY_LABELS: Record<
    ApplicationCategory,
    { fr: string; en: string }
> = {
    all: { fr: "Tous", en: "All" },
    food: { fr: "Alimentaire", en: "Food" },
    cosmetic: { fr: "Cosmétique", en: "Cosmetic" },
    pharma: { fr: "Pharmaceutique", en: "Pharmaceutical" },
    industrial: { fr: "Industriel", en: "Industrial" },
};

const CATEGORY_COLORS: Record<ApplicationCategory, string> = {
    all: "bg-neutral-100 text-neutral-700",
    food: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cosmetic: "bg-pink-50 text-pink-700 border-pink-200",
    pharma: "bg-blue-50 text-blue-700 border-blue-200",
    industrial: "bg-amber-50 text-amber-700 border-amber-200",
};

export function ApplicationsSection({
    productKey,
    locale,
    sanityApplications,
}: ApplicationsProps) {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<ApplicationCategory>("all");

    const useCases = PRODUCT_APPLICATIONS[productKey];

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            gsap.from(sectionRef.current.querySelectorAll("[data-animate]"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    once: true,
                },
                y: 24,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
            });
        },
        { scope: sectionRef }
    );

    if (!useCases || useCases.length === 0) return null;

    // Determine available categories
    const availableCategories: ApplicationCategory[] = [
        "all",
        ...Array.from(new Set(useCases.map((uc) => uc.category))),
    ];

    const filteredCases =
        activeFilter === "all"
            ? useCases
            : useCases.filter((uc) => uc.category === activeFilter);

    return (
        <section
            ref={sectionRef}
            className="py-12 lg:py-20 bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100"
        >
            <div className="container-main">
                {/* Section Header */}
                <div data-animate className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-accent"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                />
                            </svg>
                        </div>
                        <h2 className="font-heading text-h3 lg:text-h2 text-neutral-900">
                            {isFr
                                ? "Applications & Cas d'usage"
                                : "Applications & Use Cases"}
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-2xl">
                        {isFr
                            ? "Découvrez comment nos clients utilisent ce produit dans différents secteurs industriels."
                            : "Discover how our customers use this product across different industry sectors."}
                    </p>
                </div>

                {/* Sanity-based additional applications */}
                {sanityApplications && sanityApplications.length > 0 && (
                    <div data-animate className="mb-8">
                        <div className="flex flex-wrap gap-2">
                            {sanityApplications.map((app) => (
                                <span
                                    key={app}
                                    className="inline-flex items-center px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                                >
                                    {app}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                {availableCategories.length > 2 && (
                    <div data-animate className="mb-8">
                        <div className="flex flex-wrap gap-2">
                            {availableCategories.map((cat) => {
                                const isActive = activeFilter === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`
                                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                            ${isActive
                                                ? `${CATEGORY_COLORS[cat]} shadow-sm scale-105`
                                                : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-700"
                                            }
                                        `}
                                    >
                                        {CATEGORY_LABELS[cat][lang]}
                                        {cat !== "all" && (
                                            <span className="ml-1.5 text-xs opacity-60">
                                                (
                                                {
                                                    useCases.filter(
                                                        (uc) =>
                                                            uc.category === cat
                                                    ).length
                                                }
                                                )
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Use Case Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {filteredCases.map((useCase) => {
                        const data = useCase[lang];
                        const catColor =
                            CATEGORY_COLORS[useCase.category] ||
                            CATEGORY_COLORS.all;

                        return (
                            <div
                                key={useCase.id}
                                data-animate
                                className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:border-primary/20 hover:shadow-elevation-2 transition-all duration-300"
                            >
                                {/* Icon + Category */}
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                        {useCase.icon}
                                    </span>
                                    <span
                                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md border ${catColor}`}
                                    >
                                        {CATEGORY_LABELS[useCase.category][lang]}
                                    </span>
                                </div>

                                {/* Title & Description */}
                                <h3 className="font-heading font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                                    {data.title}
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {data.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div data-animate className="mt-10 text-center">
                    <p className="text-sm text-neutral-400 mb-3">
                        {isFr
                            ? "Vous avez un cas d'usage spécifique ?"
                            : "Have a specific use case?"}
                    </p>
                    <a
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        {isFr
                            ? "Discuter avec un expert"
                            : "Talk to an expert"}
                    </a>
                </div>
            </div>
        </section>
    );
}
