import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

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

    return {
        title: isFr
            ? "Durabilité & Éthique | Impact Social et Environnemental - SEPACAM"
            : "Sustainability & Ethics | Social and Environmental Impact - SEPACAM",
        description: isFr
            ? "Au-delà de la conformité : notre engagement pour un cacao équitable, la protection des forêts et le développement des communautés locales."
            : "Beyond compliance: our commitment to fair cocoa, forest protection, and local community development.",
        keywords: isFr
            ? ["cacao durable", "RSE cameroun", "agroforesterie", "femmes cacao", "code de conduite"]
            : ["sustainable cocoa", "CSR cameroon", "agroforestry", "women in cocoa", "code of conduct"],
    };
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const PILLARS = [
    {
        key: "equity",
        icon: "⚖️",
        fr: { title: "Équité & Revenus", desc: "Nous payons des primes de qualité directement aux fermiers et préfinançons les campagnes pour éviter l'endettement abusif." },
        en: { title: "Equity & Income", desc: "We pay quality premiums directly to farmers and pre-finance campaigns to prevent predatory debt." },
    },
    {
        key: "women",
        icon: "👩‍🌾",
        fr: { title: "Autonomisation des Femmes", desc: "Soutien aux associations féminines via la distribution de plants et des formations à la gestion financière." },
        en: { title: "Women Empowerment", desc: "Support for women's associations through seedling distribution and financial management training." },
    },
    {
        key: "youth",
        icon: "🌱",
        fr: { title: "Jeunesse & Avenir", desc: "Programmes d'entrepreneuriat agricole pour rendre la cacao-culture attractive aux nouvelles générations." },
        en: { title: "Youth & Future", desc: "Agricultural entrepreneurship programs to make cocoa farming attractive to new generations." },
    },
];

const IMPACT_STATS = [
    { value: "1,200+", fr: "Producteurs partenaires", en: "Partner farmers" },
    { value: "45%", fr: "Femmes bénéficiaires", en: "Women beneficiaries" },
    { value: "100%", fr: "Traçabilité GPS", en: "GPS Traceability" },
    { value: "0", fr: "Déforestation", en: "Deforestation" },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function SustainabilityPage({
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

                {/* HERO */}
                <section className="relative py-20 lg:py-32 bg-emerald-900 text-white overflow-hidden">
                    {/* Organic pattern background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                            <path d="M0 100 C 50 0 80 0 100 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="default" size="lg" className="mb-6 bg-emerald-100 text-emerald-900 border-none">
                                {isFr ? "Impact Positif" : "Positive Impact"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6">
                                {isFr ? "Cultiver l'avenir, protéger la nature" : "Cultivating the future, protecting nature"}
                            </h1>
                            <p className="text-xl text-emerald-100 mb-8 max-w-2xl">
                                {isFr
                                    ? "La durabilité n'est pas une option, c'est notre modèle économique. Nous créons de la valeur partagée pour les communautés rurales."
                                    : "Sustainability is not an option, it's our business model. We create shared value for rural communities."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* STATS BAR */}
                <section className="bg-emerald-800 text-white py-12 border-t border-emerald-700">
                    <div className="container-main">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            {IMPACT_STATS.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl lg:text-4xl font-bold font-heading mb-1">{stat.value}</div>
                                    <div className="text-sm text-emerald-200 uppercase tracking-wide">{stat[lang]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SOCIAL PILLARS */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre engagement social" : "Our Social Commitment"}
                            </h2>
                            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                                {isFr
                                    ? "Nous construisons des relations durables basées sur la confiance et le respect mutuel."
                                    : "We build lasting relationships based on trust and mutual respect."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {PILLARS.map((pillar) => (
                                <div key={pillar.key} className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 text-center hover:bg-white hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-6">{pillar.icon}</div>
                                    <h3 className="font-heading font-semibold text-xl text-neutral-900 mb-4">
                                        {pillar[lang].title}
                                    </h3>
                                    <p className="text-body text-neutral-600">
                                        {pillar[lang].desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ENVIRONMENTAL */}
                <section className="section-spacing bg-emerald-50 relative overflow-hidden">
                    {/* Decorative leaf */}
                    <div className="absolute -bottom-20 -right-20 text-emerald-100 w-96 h-96 pointer-events-none">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                        </svg>
                    </div>

                    <div className="container-main relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="outline" className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">Environment</Badge>
                                <h2 className="font-heading text-h2 text-neutral-900 mb-6">
                                    {isFr ? "Agroforesterie & Climat" : "Agroforestry & Climate"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-6">
                                    {isFr
                                        ? "Nous encourageons la culture du cacao sous ombrage, préservant la biodiversité et les sols. Chaque hectare tracé est surveillé par satellite pour garantir zéro déforestation."
                                        : "We promote shade-grown cocoa, preserving biodiversity and soils. Every traced hectare is satellite-monitored to guarantee zero deforestation."}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        { fr: "Cartographie satellitaire des parcelles", en: "Satellite plot mapping" },
                                        { fr: "Distribution d'arbres d'ombrage", en: "Shade tree distribution" },
                                        { fr: "Formation aux bonnes pratiques agricoles (GAP)", en: "Good Agricultural Practices (GAP) training" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-neutral-700">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                            {item[lang]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="text-center p-8 border-2 border-dashed border-emerald-200 rounded-xl">
                                    <h3 className="font-heading text-lg font-bold text-emerald-900 mb-2">
                                        {isFr ? "Objectif 2030" : "2030 Goal"}
                                    </h3>
                                    <div className="text-5xl font-bold text-emerald-600 mb-2">100k</div>
                                    <p className="text-sm text-neutral-500">
                                        {isFr ? "Arbres plantés" : "Trees planted"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CODE OF CONDUCT / DOCS */}
                <section className="section-spacing bg-white">
                    <div className="container-main text-center">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-8">
                            {isFr ? "Documents & Politiques" : "Documents & Policies"}
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <Link href="/code-conduite" className="group">
                                <div className="p-6 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-md transition-all text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors">📄</div>
                                        <div>
                                            <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">Code of Conduct</h3>
                                            <p className="text-xs text-neutral-500">PDF • 2.4 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/code-conduite" className="group">
                                <div className="p-6 rounded-xl border border-neutral-200 hover:border-primary hover:shadow-md transition-all text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors">📜</div>
                                        <div>
                                            <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">Supplier Ethics</h3>
                                            <p className="text-xs text-neutral-500">PDF • 1.8 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-neutral-900 text-white text-center">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Rejoignez notre impact" : "Join our impact"}
                        </h2>
                        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                            {isFr
                                ? "Investissez dans une filière cacao qui respecte l'homme et la nature."
                                : "Invest in a cocoa supply chain that respects people and nature."}
                        </p>
                        <Link href={{ pathname: "/contact", query: { subject: "partnership" } }}>
                            <Button variant="primary" size="lg">
                                {isFr ? "Soutenir un projet communautaire" : "Support a community project"}
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
