import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PolesSection } from "@/components/home/PolesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductsSection, type SanityProduct } from "@/components/home/ProductsSection";
import { QualitySection } from "@/components/home/QualitySection";
import { TraceabilitySection } from "@/components/home/TraceabilitySection";
import { KeyFigures } from "@/components/home/KeyFigures";
import { CTABanner } from "@/components/home/CTABanner";
import { sanityFetch } from "@/lib/sanity";
import { latestProductsQuery } from "@/lib/sanity.queries";
import dynamic from "next/dynamic";

// Dynamic imports for heavy below-fold components (code splitting)
const ProcessTimeline = dynamic(
    () => import("@/components/home/ProcessTimeline").then((m) => m.ProcessTimeline),
    { loading: () => <div className="h-96 animate-pulse bg-neutral-100" /> }
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
            <main>
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
