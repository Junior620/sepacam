
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
        title: t("coffee_page.title"),
        description: t("coffee_page.description"),
    };
}

export default async function CoffeePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("coffee_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                <section className="section-spacing bg-neutral-50 relative overflow-hidden">
                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                {t("title")}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {t("subtitle")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600 mb-8">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
                </section>

                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="bg-neutral-100 rounded-2xl aspect-video relative overflow-hidden">
                                {/* Placeholder for Coffee Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                                    <span className="text-lg font-medium">Image Café</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-heading text-h2 text-neutral-900 mb-6">
                                    {t("varieties")}
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold text-neutral-900">Robusta</h3>
                                            <p className="text-neutral-600">Cameroun Robusta</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold text-neutral-900">Arabica</h3>
                                            <p className="text-neutral-600">Cameroun Arabica</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
