import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQPage } from "schema-dts";

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
        title: isFr ? "Services aux Entreprises | Rénovation, Dératisation, Nettoyage" : "Business Services | Renovation, Pest Control, Cleaning",
        description: isFr
            ? "SEPACAM propose des services professionnels aux entreprises : rénovation de bâtiments, dératisation & désinsectisation, et nettoyage industriel au Cameroun."
            : "SEPACAM offers professional business services: building renovation, pest control, and industrial cleaning in Cameroon.",
        path: "/services",
        keywords: isFr
            ? ["services entreprises cameroun", "rénovation bâtiment", "dératisation", "nettoyage industriel", "SEPACAM services"]
            : ["business services cameroon", "building renovation", "pest control", "industrial cleaning", "SEPACAM services"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const SERVICES = [
    {
        key: "renovation",
        icon: "🏗️",
        color: "from-orange-500 to-amber-600",
        shadowColor: "shadow-orange-500/20",
        tagColor: "bg-orange-100 text-orange-700 border-orange-200",
        fr: {
            title: "Rénovation & Bâtiment",
            desc: "Travaux de rénovation, réhabilitation et aménagement de bâtiments industriels, commerciaux et résidentiels. Du diagnostic à la livraison clé en main.",
            features: [
                "Réhabilitation de bâtiments industriels",
                "Réfection de toitures et étanchéité",
                "Aménagement de bureaux et entrepôts",
                "Travaux de peinture et revêtements",
                "Installation électrique et plomberie",
            ],
        },
        en: {
            title: "Renovation & Building",
            desc: "Renovation, rehabilitation, and fit-out works for industrial, commercial, and residential buildings. From diagnosis to turnkey delivery.",
            features: [
                "Industrial building rehabilitation",
                "Roof repair and waterproofing",
                "Office and warehouse fit-out",
                "Painting and coating work",
                "Electrical and plumbing installation",
            ],
        },
    },
    {
        key: "pest",
        icon: "🛡️",
        color: "from-emerald-500 to-teal-600",
        shadowColor: "shadow-emerald-500/20",
        tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
        fr: {
            title: "Dératisation & Désinsectisation",
            desc: "Protection sanitaire de vos installations contre les nuisibles. Interventions curatives et programmes préventifs conformes aux normes HACCP.",
            features: [
                "Dératisation (rongeurs)",
                "Désinsectisation (cafards, termites, mouches)",
                "Traitement anti-serpents",
                "Programmes préventifs mensuels",
                "Rapport d'intervention & suivi",
            ],
        },
        en: {
            title: "Pest Control & Fumigation",
            desc: "Sanitary protection of your facilities against pests. Curative interventions and preventive programs compliant with HACCP standards.",
            features: [
                "Rodent control",
                "Insect control (roaches, termites, flies)",
                "Snake treatment",
                "Monthly preventive programs",
                "Intervention reports & follow-up",
            ],
        },
    },
    {
        key: "cleaning",
        icon: "✨",
        color: "from-blue-500 to-indigo-600",
        shadowColor: "shadow-blue-500/20",
        tagColor: "bg-blue-100 text-blue-700 border-blue-200",
        fr: {
            title: "Nettoyage Industriel",
            desc: "Entretien professionnel de vos locaux industriels, commerciaux et de vos espaces verts. Équipes formées et matériel professionnel.",
            features: [
                "Nettoyage d'usines et entrepôts",
                "Entretien de bureaux et espaces communs",
                "Nettoyage haute pression",
                "Entretien des espaces verts",
                "Contrats d'entretien régulier",
            ],
        },
        en: {
            title: "Industrial Cleaning",
            desc: "Professional maintenance of your industrial and commercial premises and green spaces. Trained teams and professional equipment.",
            features: [
                "Factory and warehouse cleaning",
                "Office and common area maintenance",
                "High-pressure cleaning",
                "Green space maintenance",
                "Regular maintenance contracts",
            ],
        },
    },
];

const ADVANTAGES = [
    {
        icon: "⚡",
        fr: { title: "Réactivité", desc: "Intervention sous 48h sur la zone Douala–Yaoundé" },
        en: { title: "Responsiveness", desc: "Intervention within 48h in the Douala–Yaoundé area" },
    },
    {
        icon: "📝",
        fr: { title: "Devis gratuit", desc: "Estimation détaillée sans engagement" },
        en: { title: "Free quote", desc: "Detailed estimate with no commitment" },
    },
    {
        icon: "🏭",
        fr: { title: "Expérience industrielle", desc: "Habitués aux exigences des sites agroalimentaires" },
        en: { title: "Industrial experience", desc: "Accustomed to food industry site requirements" },
    },
    {
        icon: "🔄",
        fr: { title: "Contrats flexibles", desc: "Ponctuel ou récurrent, adapté à votre budget" },
        en: { title: "Flexible contracts", desc: "One-off or recurring, adapted to your budget" },
    },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function ServicesPage({
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
                <section className="relative py-24 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="accent" size="lg" className="mb-6">
                                {isFr ? "Services aux Entreprises" : "Business Services"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 leading-tight">
                                {isFr
                                    ? <>Des services <span className="text-primary">professionnels</span> pour vos installations</>
                                    : <>Professional <span className="text-primary">services</span> for your facilities</>}
                            </h1>
                            <p className="text-lg lg:text-xl text-neutral-300 mb-10 max-w-xl leading-relaxed">
                                {isFr
                                    ? "Au-delà de l'agroalimentaire, SEPACAM met son expertise opérationnelle au service de la maintenance et de l'entretien de vos infrastructures."
                                    : "Beyond agribusiness, SEPACAM applies its operational expertise to the maintenance and upkeep of your infrastructure."}
                            </p>
                            <Link href={{ pathname: "/contact", query: { subject: "other" } }}>
                                <Button variant="primary" size="lg">
                                    {isFr ? "Demander un devis gratuit" : "Request a free quote"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ─── SERVICES ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Nos prestations" : "Our offerings"}
                            </h2>
                            <p className="text-body text-neutral-500 max-w-2xl mx-auto">
                                {isFr
                                    ? "Trois domaines d'expertise pour maintenir vos installations en parfait état de fonctionnement."
                                    : "Three areas of expertise to keep your facilities in perfect working order."}
                            </p>
                        </div>

                        <div className="space-y-12">
                            {SERVICES.map((service, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div key={service.key} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow duration-500">
                                        <div className={`grid grid-cols-1 lg:grid-cols-5 ${isEven ? "" : "lg:flex-row-reverse"}`}>
                                            {/* Visual header */}
                                            <div className={`lg:col-span-2 bg-gradient-to-br ${service.color} p-10 lg:p-12 flex flex-col justify-center items-center text-white text-center ${!isEven ? "lg:order-2" : ""}`}>
                                                <div className="text-6xl mb-4">{service.icon}</div>
                                                <h3 className="font-heading text-2xl lg:text-3xl font-bold">{service[lang].title}</h3>
                                            </div>

                                            {/* Content */}
                                            <div className={`lg:col-span-3 p-8 lg:p-12 ${!isEven ? "lg:order-1" : ""}`}>
                                                <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                                                    {service[lang].desc}
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {service[lang].features.map((feat, j) => (
                                                        <div key={j} className="flex items-center gap-3">
                                                            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-3 h-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm text-neutral-700">{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-8">
                                                    <Link href={{ pathname: "/contact", query: { subject: "other" } }}>
                                                        <Button variant="outline" size="sm">
                                                            {isFr ? "Demander un devis" : "Request a quote"} →
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── ADVANTAGES ─── */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-12 text-center">
                            {isFr ? "Pourquoi nous choisir" : "Why choose us"}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {ADVANTAGES.map((adv, i) => (
                                <div key={i} className="text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-3xl mb-4">{adv.icon}</div>
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">{adv[lang].title}</h3>
                                    <p className="text-sm text-neutral-500">{adv[lang].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white text-center">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Un besoin ? Parlons-en." : "Have a need? Let's talk."}
                        </h2>
                        <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
                            {isFr
                                ? "Décrivez votre projet et recevez une estimation personnalisée sous 48h."
                                : "Describe your project and receive a personalized estimate within 48h."}
                        </p>
                        <Link href={{ pathname: "/contact", query: { subject: "other" } }}>
                            <Button variant="accent" size="lg">
                                {isFr ? "Demander un devis gratuit" : "Request a free quote"}
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />

            <JsonLd<FAQPage>
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: isFr ? "Quels types de bâtiments rénovez-vous ?" : "What types of buildings do you renovate?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: isFr
                                    ? "Nous rénovons principalement des espaces industriels, entrepôts de cacao, bureaux administratifs et installations portuaires."
                                    : "We mainly renovate industrial spaces, cocoa warehouses, administrative offices, and port facilities."
                            }
                        },
                        {
                            "@type": "Question",
                            name: isFr ? "Vos produits de dératisation sont-ils sûrs ?" : "Are your pest control products safe?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: isFr
                                    ? "Oui, nous utilisons des produits certifiés conformes aux normes de l'industrie alimentaire, garantissant la sécurité des stocks de cacao."
                                    : "Yes, we use certified products compliant with food industry standards, guaranteeing the safety of cocoa stocks."
                            }
                        },
                        {
                            "@type": "Question",
                            name: isFr ? "Intervenez-vous le week-end ?" : "Do you work on weekends?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: isFr
                                    ? "Absolument. Nos équipes de nettoyage et maintenance peuvent intervenir 24/7 pour ne pas perturber vos opérations."
                                    : "Absolutely. Our cleaning and maintenance teams can operate 24/7 to avoid disrupting your operations."
                            }
                        }
                    ]
                }}
            />
        </>
    );
}
