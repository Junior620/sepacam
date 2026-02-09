
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: t("transit_page.title"),
        description: t("transit_page.description"),
    };
}

export default async function TransitPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("transit_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                <section className="section-spacing bg-neutral-900 text-white relative">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                Logistics
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 text-white">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-300">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section-spacing bg-white">
                    <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {["0", "1", "2", "3"].map((idx) => (
                            <div key={idx} className="p-8 bg-neutral-50 rounded-xl hover:shadow-elevation-2 transition-shadow">
                                <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="font-heading text-h4 text-neutral-900 mb-2">
                                    {t(`services.${idx}`)}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
