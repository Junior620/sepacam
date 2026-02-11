import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("contact.title"),
        description: t("contact.description"),
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("contact");

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Left Column - Information */}
                            <div>
                                <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-4">
                                    {t("title")}
                                </h1>
                                <p className="text-body text-neutral-600 mb-8">
                                    {t("subtitle")}
                                </p>

                                {/* Contact Methods */}
                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-neutral-900 mb-1">
                                                Email
                                            </h3>
                                            <a
                                                href="mailto:contact@sepacam.com"
                                                className="text-body text-primary hover:underline"
                                            >
                                                contact@sepacam.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-neutral-900 mb-1">
                                                Téléphone
                                            </h3>
                                            <a
                                                href="tel:+237600000000"
                                                className="text-body text-neutral-600 hover:text-primary"
                                            >
                                                +237 6 00 00 00 00
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-6 h-6 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-neutral-900 mb-1">
                                                Adresse
                                            </h3>
                                            <p className="text-body text-neutral-600">
                                                Douala, Cameroun
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                                    <div className="flex items-center gap-3">
                                        <svg
                                            className="w-5 h-5 text-accent-dark"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-small text-neutral-700">
                                            <span className="font-medium">Délai de réponse :</span>{" "}
                                            Nous répondons généralement sous 24-48h ouvrées
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-neutral-200 shadow-elevation-2">
                                <Suspense fallback={<div>Loading form...</div>}>
                                    <ContactForm />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
