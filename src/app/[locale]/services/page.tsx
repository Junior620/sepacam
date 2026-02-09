
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
        title: t("services_page.title"),
        description: t("services_page.description"),
    };
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("services_page");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)] bg-neutral-50 relative min-h-screen">
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="max-w-3xl mb-12">
                            <Badge variant="primary" size="lg" className="mb-6">
                                Business Services
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {t("title")}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-50 pb-20">
                    <div className="container-main">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {["0", "1", "2", "3"].map((idx) => (
                                <div key={idx} className="p-8 bg-white rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-shadow flex items-start gap-6">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-secondary">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-h4 text-neutral-900 mb-2">
                                            {t(`offerings.${idx}`)}
                                        </h3>
                                        <p className="text-body text-neutral-500">
                                            Services professionnels adaptés à vos besoins.
                                        </p>
                                    </div>
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
