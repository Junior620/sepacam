import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PolesSection } from "@/components/home/PolesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ProductsSection } from "@/components/home/ProductsSection";
import { QualitySection } from "@/components/home/QualitySection";
import { CTABanner } from "@/components/home/CTABanner";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <PolesSection />
                <StatsSection />
                <ProcessTimeline />
                <ProductsSection />
                <QualitySection />
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
