
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
        title: t("insights_page.title"),
        description: t("insights_page.description"),
    };
}

export default async function InsightsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("insights_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)] min-h-screen bg-neutral-50">
                <section className="section-spacing bg-white border-b border-neutral-100">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="accent" size="lg" className="mb-6">
                                News & Market
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section-spacing">
                    <div className="container-main">
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-6 text-neutral-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-h3 text-neutral-900 mb-2">
                                {t("no_posts")}
                            </h3>
                            <p className="text-body text-neutral-500 max-w-md">
                                Revenez bientôt pour découvrir nos dernières analyses et actualités sur le marché du cacao.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
