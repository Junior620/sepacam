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

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        key: "liquor",
        slug: "liqueur-cacao",
        image: "/images/products/liquor.jpg",
        badge: "Best Seller",
    },
    {
        key: "butter",
        slug: "beurre-cacao",
        image: "/images/products/butter.jpg",
    },
    {
        key: "powder",
        slug: "poudre-cacao",
        image: "/images/products/powder.jpg",
    },
    {
        key: "cake",
        slug: "tourteau-cacao",
        image: "/images/products/cake.jpg",
    },
    {
        key: "nibs",
        slug: "grues-cacao",
        image: "/images/products/nibs.jpg",
    },
];

export function ProductsSection() {
    const t = useTranslations("products");
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

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
        <section ref={sectionRef} className="section-spacing bg-neutral-50">
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
                    {products.map((product) => (
                        <Card
                            key={product.key}
                            href={`/produits-cacao/${product.slug}`}
                            className="group product-card"
                        >
                            <CardImage aspectRatio="aspect-square">
                                {/* Placeholder image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-neutral-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                </div>
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="accent" size="sm">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                )}
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                            </CardImage>
                            <CardBody className="p-4">
                                <h3 className="font-heading text-h4 text-neutral-900 mb-1 group-hover:text-primary transition-colors">
                                    {t(`items.${product.key}.name`)}
                                </h3>
                                <p className="text-small text-neutral-500 line-clamp-2">
                                    {t(`items.${product.key}.description`)}
                                </p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

