import { setRequestLocale } from "next-intl/server";
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
            ? "À Propos de SEPACAM | Notre Histoire & Mission"
            : "About SEPACAM | Our History & Mission",
        description: isFr
            ? "Découvrez SEPACAM : entreprise camerounaise de transformation de cacao, négoce de café, transit et services. Notre histoire, mission, équipe et valeurs."
            : "Discover SEPACAM: Cameroonian cocoa processing, coffee trading, transit, and services company. Our history, mission, team, and values.",
        keywords: isFr
            ? ["SEPACAM", "à propos", "cacao cameroun", "entreprise Douala", "transformation cacao"]
            : ["SEPACAM", "about", "cameroon cocoa", "Douala company", "cocoa processing"],
    };
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const VALUES = [
    {
        icon: "🎯",
        color: "bg-red-50 border-red-100",
        iconBg: "bg-red-100",
        fr: { title: "Qualité", desc: "Contrôle rigoureux à chaque étape : de la réception des fèves à l'embarquement du conteneur." },
        en: { title: "Quality", desc: "Rigorous control at every stage: from bean reception to container loading." },
    },
    {
        icon: "📍",
        color: "bg-blue-50 border-blue-100",
        iconBg: "bg-blue-100",
        fr: { title: "Traçabilité", desc: "Suivi digital complet du producteur au client final, lot par lot." },
        en: { title: "Traceability", desc: "Complete digital tracking from farmer to end customer, lot by lot." },
    },
    {
        icon: "🌱",
        color: "bg-green-50 border-green-100",
        iconBg: "bg-green-100",
        fr: { title: "Durabilité", desc: "Respect de l'environnement, rémunération équitable des producteurs et impact social positif." },
        en: { title: "Sustainability", desc: "Environmental respect, fair producer compensation, and positive social impact." },
    },
    {
        icon: "🤝",
        color: "bg-amber-50 border-amber-100",
        iconBg: "bg-amber-100",
        fr: { title: "Partenariat", desc: "Relations de long terme basées sur la confiance, la transparence et l'engagement mutuel." },
        en: { title: "Partnership", desc: "Long-term relationships built on trust, transparency, and mutual commitment." },
    },
];

const TIMELINE = [
    {
        year: "2020",
        fr: { title: "Création de SEPACAM", desc: "Fondation de la société à Douala. Début des activités de négoce de cacao et café." },
        en: { title: "SEPACAM Founded", desc: "Company established in Douala. Start of cocoa and coffee trading activities." },
    },
    {
        year: "2021",
        fr: { title: "Première exportation", desc: "Premier conteneur de cacao transformé exporté vers l'Europe." },
        en: { title: "First Export", desc: "First container of processed cocoa exported to Europe." },
    },
    {
        year: "2022",
        fr: { title: "Extension industrielle", desc: "Agrandissement de l'usine de transformation. Ajout de lignes de concassage et de broyage." },
        en: { title: "Industrial Expansion", desc: "Processing plant expansion. Addition of crushing and grinding lines." },
    },
    {
        year: "2023",
        fr: { title: "Laboratoire QC", desc: "Installation du laboratoire de contrôle qualité interne. Début de l'analyse systématique des lots." },
        en: { title: "QC Laboratory", desc: "Internal quality control laboratory installed. Start of systematic lot analysis." },
    },
    {
        year: "2024",
        fr: { title: "Certification & Diversification", desc: "Lancement ISO 22000. Ouverture des branches Transit et Services aux entreprises." },
        en: { title: "Certification & Diversification", desc: "ISO 22000 process launched. Opening of Transit and Business Services branches." },
    },
];

const TEAM = [
    {
        initials: "DG",
        fr: { name: "Direction Générale", role: "Stratégie & Développement", desc: "Pilotage de l'ensemble des activités du groupe." },
        en: { name: "General Management", role: "Strategy & Development", desc: "Oversight of all group activities." },
    },
    {
        initials: "DP",
        fr: { name: "Direction Production", role: "Transformation & Qualité", desc: "Gestion de l'usine, du laboratoire et des processus qualité." },
        en: { name: "Production Management", role: "Processing & Quality", desc: "Factory, laboratory, and quality process management." },
    },
    {
        initials: "DC",
        fr: { name: "Direction Commerciale", role: "Ventes & Export", desc: "Relations clients, négociation et coordination des expéditions." },
        en: { name: "Commercial Management", role: "Sales & Export", desc: "Client relations, negotiation, and shipment coordination." },
    },
    {
        initials: "DT",
        fr: { name: "Direction Transit", role: "Logistique & Douane", desc: "Opérations de transit, dédouanement et logistique portuaire." },
        en: { name: "Transit Management", role: "Logistics & Customs", desc: "Transit operations, customs clearance, and port logistics." },
    },
];

const ACTIVITY_PILLARS = [
    {
        icon: "🍫",
        fr: { title: "Transformation Cacao", desc: "Fèves → masse, beurre, poudre, tourteaux, nibs" },
        en: { title: "Cocoa Processing", desc: "Beans → mass, butter, powder, cake, nibs" },
    },
    {
        icon: "☕",
        fr: { title: "Négoce Café", desc: "Robusta & Arabica : sélection, préparation, export" },
        en: { title: "Coffee Trading", desc: "Robusta & Arabica: selection, preparation, export" },
    },
    {
        icon: "🚢",
        fr: { title: "Transit & Logistique", desc: "Commissionnaire agréé, fret et dédouanement" },
        en: { title: "Transit & Logistics", desc: "Licensed forwarder, freight, and clearance" },
    },
    {
        icon: "🏗️",
        fr: { title: "Services", desc: "Rénovation, dératisation, nettoyage industriel" },
        en: { title: "Services", desc: "Renovation, pest control, industrial cleaning" },
    },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function AboutPage({
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
                <section className="relative py-24 lg:py-36 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark text-white overflow-hidden">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none" />

                    <div className="container-main relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="accent" size="lg" className="mb-6">
                                    {isFr ? "Notre Entreprise" : "Our Company"}
                                </Badge>
                                <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 leading-tight">
                                    {isFr
                                        ? <>SEPACAM, acteur clé du <span className="text-accent">cacao camerounais</span></>
                                        : <>SEPACAM, key player in <span className="text-accent">Cameroonian cocoa</span></>}
                                </h1>
                                <p className="text-lg lg:text-xl text-neutral-300 max-w-xl leading-relaxed">
                                    {isFr
                                        ? "Basée à Douala, SEPACAM est une entreprise camerounaise multisectorielle : transformation de cacao, négoce de café, transit international et services aux entreprises."
                                        : "Based in Douala, SEPACAM is a multisector Cameroonian company: cocoa processing, coffee trading, international transit, and business services."}
                                </p>
                            </div>

                            {/* Activity pillars card */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 to-accent/10 rounded-3xl blur-xl" />
                                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-6">
                                            {isFr ? "Nos 4 pôles d'activité" : "Our 4 activity pillars"}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {ACTIVITY_PILLARS.map((pillar, i) => (
                                                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                                    <div className="text-2xl mb-2">{pillar.icon}</div>
                                                    <div className="text-sm font-semibold text-white">{pillar[lang].title}</div>
                                                    <div className="text-xs text-neutral-400 mt-1">{pillar[lang].desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── MISSION & VISION ─── */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Mission */}
                            <div className="bg-neutral-50 rounded-2xl p-8 lg:p-10 border border-neutral-100">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
                                <h2 className="font-heading text-h3 text-neutral-900 mb-4">
                                    {isFr ? "Notre Mission" : "Our Mission"}
                                </h2>
                                <p className="text-body text-neutral-600 leading-relaxed mb-4">
                                    {isFr
                                        ? "Transformer le cacao camerounais en produits semi-finis de qualité, traçables et conformes aux standards internationaux, tout en contribuant au développement des communautés productrices."
                                        : "Transform Cameroonian cocoa into quality semi-finished products that are traceable and compliant with international standards, while contributing to the development of producing communities."}
                                </p>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {isFr
                                        ? "Nous croyons que la transformation locale des matières premières est un levier fondamental de développement économique pour le Cameroun."
                                        : "We believe that local raw material processing is a fundamental lever for economic development in Cameroon."}
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-10 border border-primary/10">
                                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-3xl mb-6">🔭</div>
                                <h2 className="font-heading text-h3 text-neutral-900 mb-4">
                                    {isFr ? "Notre Vision" : "Our Vision"}
                                </h2>
                                <p className="text-body text-neutral-600 leading-relaxed mb-4">
                                    {isFr
                                        ? "Devenir le partenaire de référence pour les acheteurs B2B internationaux à la recherche de cacao et café camerounais, transformés localement avec les plus hauts standards de qualité."
                                        : "Become the reference partner for international B2B buyers seeking Cameroonian cocoa and coffee, locally processed with the highest quality standards."}
                                </p>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {isFr
                                        ? "À horizon 2030, nous visons le triplement de notre capacité industrielle et l'obtention des certifications majeures (ISO 22000, UTZ/Rainforest Alliance)."
                                        : "By 2030, we aim to triple our industrial capacity and obtain major certifications (ISO 22000, UTZ/Rainforest Alliance)."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── VALUES ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Nos Valeurs" : "Our Values"}
                            </h2>
                            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VALUES.map((value, i) => (
                                <div key={i} className={`p-6 rounded-2xl border text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${value.color}`}>
                                    <div className={`w-16 h-16 mx-auto mb-4 ${value.iconBg} rounded-2xl flex items-center justify-center text-3xl`}>
                                        {value.icon}
                                    </div>
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">{value[lang].title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{value[lang].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── TIMELINE ─── */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="primary" className="mb-4">
                                {isFr ? "Notre Parcours" : "Our Journey"}
                            </Badge>
                            <h2 className="font-heading text-h2 text-neutral-900">
                                {isFr ? "Les étapes clés" : "Key milestones"}
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

                                <div className="space-y-10">
                                    {TIMELINE.map((item, i) => (
                                        <div key={item.year} className="relative flex gap-8 group">
                                            {/* Dot */}
                                            <div className="relative z-10 flex-shrink-0">
                                                <div className="w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center font-bold text-primary text-xs shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                                    {item.year}
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="pb-2 pt-1.5">
                                                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-1">{item[lang].title}</h3>
                                                <p className="text-sm text-neutral-500 leading-relaxed">{item[lang].desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── TEAM ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre Équipe" : "Our Team"}
                            </h2>
                            <p className="text-body text-neutral-500 max-w-xl mx-auto">
                                {isFr
                                    ? "Une équipe de direction expérimentée, engagée au quotidien pour la qualité et la satisfaction client."
                                    : "An experienced management team, committed daily to quality and customer satisfaction."}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {TEAM.map((member, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                                        {member.initials}
                                    </div>
                                    <h3 className="font-heading font-semibold text-neutral-900 mb-1">{member[lang].name}</h3>
                                    <p className="text-xs text-primary font-semibold mb-3">{member[lang].role}</p>
                                    <p className="text-sm text-neutral-500">{member[lang].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white text-center">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Travaillons ensemble" : "Let's work together"}
                        </h2>
                        <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                            {isFr
                                ? "Vous cherchez un partenaire fiable pour votre approvisionnement en cacao, café, ou pour vos besoins logistiques au Cameroun ?"
                                : "Looking for a reliable partner for your cocoa, coffee supply, or logistics needs in Cameroon?"}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button variant="accent" size="lg">
                                    {isFr ? "Nous contacter" : "Contact us"}
                                </Button>
                            </Link>
                            <Link href={{ pathname: "/contact", query: { subject: "quote" } }}>
                                <Button variant="outline" size="lg" className="border-neutral-500 text-neutral-200 hover:bg-white/10 hover:border-white hover:text-white">
                                    {isFr ? "Demander une cotation" : "Request a quote"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
