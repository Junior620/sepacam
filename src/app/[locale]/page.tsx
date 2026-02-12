import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// Static imports for above-fold content
import { HeroSection } from "@/components/home/HeroSection";
import { PolesSection } from "@/components/home/PolesSection";
import { CTABanner } from "@/components/home/CTABanner";
import { KeyFigures } from "@/components/home/KeyFigures";

// Dynamic imports for below-fold content
import { latestProductsQuery } from "@/lib/sanity.queries";
import { sanityFetch } from "@/lib/sanity";
import type { SanityProduct } from "@/components/home/ProductsSection";
import dynamic from "next/dynamic";

const ProcessTimeline = dynamic(
    () => import("@/components/home/ProcessTimeline").then((m) => m.ProcessTimeline),
    { loading: () => <div className="h-96 animate-pulse bg-neutral-100" /> }
);

const StatsSection = dynamic(
    () => import("@/components/home/StatsSection").then((m) => m.StatsSection),
    { loading: () => <div className="h-64 animate-pulse bg-neutral-900" /> }
);

const ProductsSection = dynamic(
    () => import("@/components/home/ProductsSection").then((m) => m.ProductsSection),
    { loading: () => <div className="h-[600px] animate-pulse bg-neutral-50" /> }
);

const QualitySection = dynamic(
    () => import("@/components/home/QualitySection").then((m) => m.QualitySection),
    { loading: () => <div className="h-[500px] animate-pulse bg-white" /> }
);

const TraceabilitySection = dynamic(
    () => import("@/components/home/TraceabilitySection").then((m) => m.TraceabilitySection),
    { loading: () => <div className="h-[600px] animate-pulse bg-neutral-900" /> }
);

const OriginsMap = dynamic(
    () => import("@/components/home/OriginsMap").then((m) => m.OriginsMap),
    { loading: () => <div className="h-[500px] animate-pulse bg-neutral-100" /> }
);

const BottomLeadForm = dynamic(
    () => import("@/components/home/BottomLeadForm").then((m) => m.BottomLeadForm),
    { loading: () => <div className="h-96 animate-pulse bg-neutral-100" /> }
);

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const products = await sanityFetch<SanityProduct[]>({
        query: latestProductsQuery,
        tags: ["product"],
    });

    return (
        <>
            <Header />
            <main id="main-content">
                <HeroSection />
                <PolesSection />
                <StatsSection />
                <ProcessTimeline />
                <ProductsSection products={products} />
                <QualitySection />
                <TraceabilitySection />
                <OriginsMap />
                <KeyFigures />
                <BottomLeadForm />
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
