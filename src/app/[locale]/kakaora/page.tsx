
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
        title: t("kakaora_page.title"),
        description: t("kakaora_page.description"),
    };
}

export default async function KakaoraPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("kakaora_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                <section className="section-spacing bg-neutral-900 text-white">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="accent" size="lg" className="mb-6">
                                Premium Brand
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 text-primary">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-300 mb-8">
                                {t("subtitle")}
                            </p>
                            <p className="text-body text-neutral-400">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {["0", "1", "2", "3"].map((idx) => (
                                <div key={idx} className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-primary/20 transition-colors">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                                        {parseInt(idx) + 1}
                                    </div>
                                    <h3 className="font-heading text-h4 text-neutral-900 mb-2">
                                        {t(`features.${idx}`)}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
