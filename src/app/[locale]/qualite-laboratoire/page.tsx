
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
        title: t("quality_page.title"),
        description: t("quality_page.description"),
    };
}

export default async function QualityPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("quality_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                Quality
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {t("subtitle")}
                            </p>
                            <p className="mt-4 text-body text-neutral-600">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features / Lab Section */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 text-neutral-900 mb-8">
                            {t("lab_features.title")}
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {["0", "1", "2", "3"].map((idx) => (
                                <li key={idx} className="p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-neutral-700">
                                        {t(`lab_features.items.${idx}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
