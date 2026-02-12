
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

// Fully static — no ISR revalidation needed
export const revalidate = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: t("legal_pages.conduct.title"),
    };
}

export default async function CodeConduitePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("legal_pages.conduct");

    return (
        <>
            <Header />
            <main id="main-content" className="pt-[var(--header-height)] min-h-screen bg-neutral-50">
                <section className="section-spacing bg-white">
                    <div className="container-main max-w-4xl">
                        <h1 className="font-heading text-h2 text-neutral-900 mb-8">
                            {t("title")}
                        </h1>
                        <div className="prose prose-neutral max-w-none">
                            <p>{t("content")}</p>
                            {/* Placeholder for future detailed content */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
