import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PolesSection } from "@/components/home/PolesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ProductsSection, type SanityProduct } from "@/components/home/ProductsSection";
import { QualitySection } from "@/components/home/QualitySection";
import { TraceabilitySection } from "@/components/home/TraceabilitySection";
import { OriginsMap } from "@/components/home/OriginsMap";
import { CTABanner } from "@/components/home/CTABanner";
import { sanityFetch } from "@/lib/sanity";
import { latestProductsQuery } from "@/lib/sanity.queries";

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
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
