"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardImage, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

gsap.registerPlugin(ScrollTrigger);

// Fallback products for development or if Sanity is empty
const fallbackProducts = [
    {
        key: "liquor",
        slug: "liqueur-cacao",
        name: "Liqueur de Cacao",
        description: "Liqueur de cacao pure et riche",
        image: "/images/products/liquor.jpg",
        color: "bg-[#3E2723]",
        badge: "Best Seller",
        isFallback: true
    },
    {
        key: "butter",
        slug: "beurre-cacao",
        name: "Beurre de Cacao",
        description: "Beurre de cacao naturel pressé",
        image: null,
        color: "bg-[#F5DEB3]",
        badge: "Premium",
        isFallback: true
    },
    {
        key: "powder",
        slug: "poudre-cacao",
        name: "Poudre de Cacao",
        description: "Poudre de cacao fine",
        image: null,
        color: "bg-[#795548]",
        isFallback: true
    },
    {
        key: "cake",
        slug: "tourteau-cacao",
        name: "Tourteau de Cacao",
        description: "Tourteau de cacao riche",
        image: null,
        color: "bg-[#4E342E]",
        isFallback: true
    },
    {
        key: "nibs",
        slug: "grues-cacao",
        name: "Grués de Cacao",
        description: "Éclats de fèves torréfiées",
        image: null,
        color: "bg-[#5D4037]",
        isFallback: true
    },
];

export type SanityProduct = {
    _id: string;
    name: string;
    slug: { current: string };
    description: string;
    heroImage: any;
    productType?: string;
};

type Props = {
    products?: SanityProduct[];
};

export function ProductsSection({ products: sanityProducts }: Props) {
    const t = useTranslations("products");
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Helper to get fallback assets based on slug
    const getFallbackAssets = (slug: string) => {
        if (slug.includes('liqueur')) return { image: "/images/products/liquor.jpg", color: "bg-[#3E2723]" };
        if (slug.includes('beurre')) return { image: null, color: "bg-[#F5DEB3]" };
        if (slug.includes('poudre')) return { image: null, color: "bg-[#795548]" };
        if (slug.includes('tourteau')) return { image: null, color: "bg-[#4E342E]" };
        if (slug.includes('gru')) return { image: null, color: "bg-[#5D4037]" };
        return { image: null, color: "bg-neutral-200" };
    };

    // Prepare display products
    const displayProducts = (sanityProducts && sanityProducts.length > 0)
        ? sanityProducts.map(p => {
            const fallback = getFallbackAssets(p.slug.current);
            return {
                key: p._id,
                slug: p.slug.current,
                name: p.name,
                description: p.description,
                image: p.heroImage ? urlFor(p.heroImage).width(600).height(750).url() : fallback.image,
                color: fallback.color,
                badge: null,
                isFallback: false
            };
        })
        : fallbackProducts;

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

            // Animate product cards with stagger
            const cards = gsap.utils.toArray<HTMLElement>(".product-card");
            gsap.from(cards, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
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
                <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-body text-neutral-600 max-w-xl">
                            {t("subtitle")}
                        </p>
                    </div>
                    <Link href="/produits-cacao" className="shrink-0">
                        <Button variant="secondary" size="md">
                            {t("view_all")}
                        </Button>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {displayProducts.map((product) => (
                        <Card
                            key={product.key}
                            href={`/produits-cacao/${product.slug}`}
                            className="group product-card h-full"
                        >
                            <CardImage aspectRatio="aspect-[4/5]" className={product.color}>
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.isFallback ? t(`items.${product.key}.name`) : product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className={`absolute inset-0 ${product.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                                        <span className="text-white/20 text-6xl font-display font-bold rotate-12 select-none">
                                            {(product.isFallback ? product.key : product.name).charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <Badge variant="accent" size="sm" className="shadow-md">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                )}
                            </CardImage>

                            <CardBody className="p-5 flex flex-col h-full justify-between">
                                <div>
                                    <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                                        {product.isFallback ? t(`items.${product.key}.name`) : product.name}
                                    </h3>
                                    <p className="text-small text-neutral-500 line-clamp-3 mb-4">
                                        {product.isFallback ? t(`items.${product.key}.description`) : product.description}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <span className="text-xs font-medium text-primary uppercase tracking-wider group-hover:underline decoration-primary underline-offset-4">
                                        Découvrir &rarr;
                                    </span>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
