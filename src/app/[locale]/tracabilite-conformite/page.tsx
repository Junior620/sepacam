import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";

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
        title: isFr ? "Traçabilité & Conformité | EUDR, Sécurité Alimentaire" : "Traceability & Compliance | EUDR, Food Safety",
        description: isFr
            ? "Engagement total pour une traçabilité du champ à l'usine. Conformité EUDR, absence de déforestation et respect des standards internationaux."
            : "Total commitment to farm-to-factory traceability. EUDR compliance, zero deforestation, and adherence to international standards.",
        path: "/tracabilite-conformite",
        pathFr: "/tracabilite-conformite",
        pathEn: "/traceability",
        keywords: isFr
            ? ["traçabilité cacao", "EUDR cameroun", "cacao durable", "conformité export", "géolocalisation parcelles"]
            : ["cocoa traceability", "EUDR cameroon", "sustainable cocoa", "export compliance", "plot geolocation"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const TIMELINE_STEPS = [
    {
        year: "1",
        fr: { title: "Identification & Cartographie", desc: "Chaque producteur partenaire est identifié et ses parcelles sont géolocalisées (polygones GPS) pour garantir l'absence de déforestation." },
        en: { title: "Identification & Mapping", desc: "Every partner farmer is identified and their plots are geolocated (GPS polygons) to guarantee zero deforestation." },
    },
    {
        year: "2",
        fr: { title: "Premier Kilomètre", desc: "Enregistrement digital de chaque achat bord-champ via notre application mobile dédiée, liant le volume au producteur." },
        en: { title: "First Mile", desc: "Digital recording of every farm-gate purchase via our dedicated mobile app, linking volume to the farmer." },
    },
    {
        year: "3",
        fr: { title: "Traitement & Lots", desc: "Ségrégation physique des lots durables à l'usine et attribution d'un code unique de traçabilité pour la production." },
        en: { title: "Processing & Lots", desc: "Physical segregation of sustainable lots at the factory and assignment of a unique traceability code for production." },
    },
    {
        year: "4",
        fr: { title: "Export & Data", desc: "Transmission des données de traçabilité et de conformité (Due Diligence Statement) au client avant l'arrivée du navire." },
        en: { title: "Export & Data", desc: "Transmission of traceability and compliance data (Due Diligence Statement) to the client before vessel arrival." },
    },
];

const COMPLIANCE_CARDS = [
    {
        key: "eudr",
        fr: { title: "Conformité EUDR", desc: "Prêt pour le Règlement Européen contre la Déforestation. Nous fournissons les coordonnées GPS et les preuves de légalité foncière pour chaque lot." },
        en: { title: "EUDR Compliance", desc: "Ready for the EU Deforestation Regulation. We provide GPS coordinates and proof of land legality for every shipment." },
        icon: "🌲",
    },
    {
        key: "fs",
        fr: { title: "Sécurité Alimentaire", desc: "Strict respect des limites de contaminants (HAP, Mosh/Moah, Pesticides) et métaux lourds selon les normes UE/USA." },
        en: { title: "Food Safety", desc: "Strict adherence to contaminant limits (PAH, Mosh/Moah, Pesticides) and heavy metals per EU/USA standards." },
        icon: "🛡️",
    },
    {
        key: "social",
        fr: { title: "Responsabilité Sociale", desc: "Audits réguliers pour garantir l'absence de travail des enfants et le respect des droits des travailleurs (CLMRS)." },
        en: { title: "Social Responsibility", desc: "Regular audits to ensure no child labor and respect for workers' rights (CLMRS)." },
        icon: "🤝",
    },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function TraceabilityPage({
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
                <section className="bg-neutral-900 text-white py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/map-dots.png')] opacity-10 bg-cover bg-center"></div>
                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="accent" size="lg" className="mb-6">
                                {isFr ? "Transparence & Données" : "Transparency & Data"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6">
                                {isFr ? "Traçabilité intégrale du champ au client" : "End-to-end traceability from farm to client"}
                            </h1>
                            <p className="text-xl text-neutral-300 mb-8 max-w-2xl">
                                {isFr
                                    ? "La technologie au service de la confiance. Nous connectons chaque fève à son origine pour garantir un cacao éthique et légal."
                                    : "Technology for trust. We connect every bean to its origin to guarantee ethical and legal cocoa."}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={{ pathname: "/contact", query: { subject: "partnership" } }}>
                                    <Button variant="primary" size="lg">
                                        {isFr ? "Devenir partenaire durable" : "Become a sustainable partner"}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TIMELINE */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Notre système de traçabilité" : "Our Traceability System"}
                            </h2>
                            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {TIMELINE_STEPS.map((step, i) => (
                                <div key={i} className="relative">
                                    {/* Connector Line (Desktop) */}
                                    {i < TIMELINE_STEPS.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-neutral-200 -z-10"></div>
                                    )}

                                    <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all text-center h-full">
                                        <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 border-4 border-white shadow-lg">
                                            {i + 1}
                                        </div>
                                        <h3 className="font-heading font-semibold text-lg mb-3 text-neutral-900">
                                            {step[lang].title}
                                        </h3>
                                        <p className="text-body text-neutral-600 text-sm">
                                            {step[lang].desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMPLIANCE */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-heading text-h2 text-neutral-900 mb-6">
                                    {isFr ? "Conformité & Réglementations" : "Compliance & Regulations"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                                    {isFr
                                        ? "Dans un environnement réglementaire en constante évolution (EUDR, CS3D), SEPACAM est votre partenaire de confiance. Nous anticipons les exigences légales pour sécuriser votre chaîne d'approvisionnement."
                                        : "In a constantly evolving regulatory environment (EUDR, CS3D), SEPACAM is your trusted partner. We anticipate legal requirements to secure your supply chain."}
                                </p>
                                <div className="space-y-6">
                                    {COMPLIANCE_CARDS.map((card) => (
                                        <div key={card.key} className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                                                {card.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-neutral-900 mb-1">{card[lang].title}</h4>
                                                <p className="text-sm text-neutral-600">{card[lang].desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-elevation-2 border border-neutral-100">
                                <h3 className="font-heading text-xl font-bold mb-6 text-center">
                                    {isFr ? "Documentation disponible" : "Available Documentation"}
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Due Diligence Statement (DDS)",
                                        "Geojson Polygon Files",
                                        "Deforestation-Free Certificate",
                                        "Child Labor Monitoring Report"
                                    ].map((doc, i) => (
                                        <li key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-100 hover:bg-primary/5 transition-colors group cursor-pointer">
                                            <span className="text-sm font-medium text-neutral-700 group-hover:text-primary transition-colors">{doc}</span>
                                            <span className="text-neutral-400 group-hover:text-primary">⬇️</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                                    <Link href={{ pathname: "/contact", query: { subject: "technical" } }}>
                                        <Button variant="outline" fullWidth>
                                            {isFr ? "Demander un accès aux documents" : "Request access to documents"}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA PARTNERSHIP */}
                <section className="py-24 bg-primary text-white text-center">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Construisons une filière durable ensemble" : "Let's build a sustainable supply chain together"}
                        </h2>
                        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                            {isFr
                                ? "Vous cherchez un fournisseur capable de garantir volumes et conformité ? Parlons-en."
                                : "Looking for a supplier capable of guaranteeing volumes and compliance? Let's talk."}
                        </p>
                        <Link href={{ pathname: "/contact", query: { subject: "partnership" } }}>
                            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-neutral-100 border-none">
                                {isFr ? "Démarrer un partenariat" : "Start a partnership"}
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
