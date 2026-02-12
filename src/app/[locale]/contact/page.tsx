import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";
import { ContactMap } from "./ContactMap";
import { generateSeoMetadata } from "@/lib/seo";
import { Mail, Phone, MapPin } from "lucide-react";

// Dynamic import for ContactForm (heavy: framer-motion + react-hook-form + zod)
const ContactForm = dynamic(
    () => import("@/components/forms/ContactForm").then((m) => m.ContactForm),
    { loading: () => <div className="h-96 animate-pulse bg-neutral-100 rounded-2xl" /> }
);

// ═══════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isFr = locale === "fr";

    return generateSeoMetadata({
        locale,
        title: isFr ? "Contactez SEPACAM | Demande de Cotation" : "Contact SEPACAM | Quote Request",
        description: isFr
            ? "Contactez SEPACAM à Douala, Cameroun. Demande de cotation cacao, café, transit ou services. Réponse sous 24-48h."
            : "Contact SEPACAM in Douala, Cameroon. Request a quote for cocoa, coffee, transit, or services. Response within 24-48h.",
        path: "/contact",
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const CONTACT_METHODS = [
    {
        icon: <Mail className="w-5 h-5 text-primary" />,
        label: "Email",
        value: "contact@sepacam.com",
        href: "mailto:contact@sepacam.com",
    },
    {
        icon: <Phone className="w-5 h-5 text-primary" />,
        fr: { label: "Téléphone" },
        en: { label: "Phone" },
        label: "",
        value: "+237 6 00 00 00 00",
        href: "tel:+237600000000",
    },
    {
        icon: <MapPin className="w-5 h-5 text-primary" />,
        fr: { label: "Adresse" },
        en: { label: "Address" },
        label: "",
        value: "Douala, Cameroun",
        href: "https://maps.google.com/?q=4.0511,9.7085",
    },
];

const HOURS = [
    { fr: "Lundi – Vendredi", en: "Monday – Friday", time: "08:00 – 17:00" },
    { fr: "Samedi", en: "Saturday", time: "08:00 – 12:00" },
    { fr: "Dimanche", en: "Sunday", fr2: "Fermé", en2: "Closed" },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">

                {/* ─── HERO ─── */}
                <section className="relative py-16 lg:py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                    <div className="container-main relative z-10">
                        <Badge variant="accent" size="lg" className="mb-6">
                            {isFr ? "Contact" : "Contact"}
                        </Badge>
                        <h1 className="font-heading text-h1-sm lg:text-h1 mb-4">
                            {isFr ? "Parlons de votre projet" : "Let's talk about your project"}
                        </h1>
                        <p className="text-lg text-neutral-300 max-w-2xl">
                            {isFr
                                ? "Cotation cacao ou café, demande de transit, ou service aux entreprises — notre équipe vous répond sous 24-48h ouvrées."
                                : "Cocoa or coffee quote, transit request, or business services — our team responds within 24-48 business hours."}
                        </p>
                    </div>
                </section>

                {/* ─── MAIN CONTENT ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* LEFT COLUMN — Contact info + Map */}
                            <div className="lg:col-span-5 space-y-8">
                                {/* Contact Methods */}
                                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                                    <h2 className="font-heading text-lg font-semibold text-neutral-900 mb-6">
                                        {isFr ? "Nos coordonnées" : "Our contact details"}
                                    </h2>
                                    <div className="space-y-5">
                                        {CONTACT_METHODS.map((method, i) => {
                                            const label = method.label || (method as any)[lang]?.label || "";
                                            return (
                                                <a key={i} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group">
                                                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl group-hover:bg-primary/20 transition-colors">
                                                        {method.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{label}</div>
                                                        <div className="text-sm font-semibold text-neutral-900 group-hover:text-primary transition-colors">{method.value}</div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Opening Hours */}
                                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                                    <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-4">
                                        {isFr ? "Horaires d'ouverture" : "Opening hours"}
                                    </h3>
                                    <div className="space-y-3">
                                        {HOURS.map((h, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm">
                                                <span className="text-neutral-600">{h[lang]}</span>
                                                <span className="font-semibold text-neutral-900">{h.fr2 ? (isFr ? h.fr2 : h.en2) : h.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">⏱️</span>
                                        <p className="text-sm text-neutral-700">
                                            <span className="font-semibold">{isFr ? "Délai de réponse :" : "Response time:"}</span>{" "}
                                            {isFr ? "24-48h ouvrées" : "24-48 business hours"}
                                        </p>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
                                    <div className="h-[300px]">
                                        <Suspense fallback={<div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">{isFr ? "Chargement de la carte…" : "Loading map…"}</div>}>
                                            <ContactMap />
                                        </Suspense>
                                    </div>
                                    <div className="bg-white px-5 py-3 border-t border-neutral-100">
                                        <p className="text-xs text-neutral-500">
                                            <MapPin className="w-3.5 h-3.5 inline-block mr-1" /> SEPACAM — Douala, Cameroun
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN — Contact Form */}
                            <div className="lg:col-span-7">
                                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-neutral-200 shadow-sm sticky top-[calc(var(--header-height)+2rem)]">
                                    <h2 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                                        {isFr ? "Envoyez-nous un message" : "Send us a message"}
                                    </h2>
                                    <p className="text-sm text-neutral-500 mb-6">
                                        {isFr
                                            ? "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais."
                                            : "Fill out the form below and we'll get back to you as soon as possible."}
                                    </p>
                                    <Suspense fallback={<div className="py-12 text-center text-neutral-400">{isFr ? "Chargement du formulaire…" : "Loading form…"}</div>}>
                                        <ContactForm />
                                    </Suspense>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
