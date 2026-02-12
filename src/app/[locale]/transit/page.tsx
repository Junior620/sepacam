import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import {
    ClipboardList, Ship, Package, ShieldCheck, Truck, BarChart3, Anchor
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// ISR: revalidate every 24 hours
export const revalidate = 86400;

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
        title: isFr ? "Transit & Logistique | Commissionnaire Agréé" : "Transit & Logistics | Licensed Freight Forwarder",
        description: isFr
            ? "Commissionnaire de transit agréé au Cameroun. Formalités douanières, embarquement, suivi de conteneurs et logistique portuaire à Douala."
            : "Licensed freight forwarder in Cameroon. Customs clearance, shipping, container tracking, and port logistics in Douala.",
        path: "/transit",
        keywords: isFr
            ? ["transit cameroun", "commissionnaire douane", "logistique Douala", "dédouanement", "fret maritime"]
            : ["cameroon transit", "customs broker", "Douala logistics", "customs clearance", "sea freight"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const SERVICES = [
    {
        icon: <ClipboardList className="w-6 h-6 text-blue-400" />,
        fr: { title: "Formalités douanières", desc: "Déclarations en douane import & export, régimes économiques, certificats d'origine et licences." },
        en: { title: "Customs Formalities", desc: "Import & export customs declarations, economic regimes, certificates of origin, and licenses." },
    },
    {
        icon: <Ship className="w-6 h-6 text-blue-400" />,
        fr: { title: "Fret maritime & aérien", desc: "Organisation du transport FCL/LCL, booking navire, suivi temps réel et coordination des escales." },
        en: { title: "Sea & Air Freight", desc: "FCL/LCL transport organization, vessel booking, real-time tracking, and port call coordination." },
    },
    {
        icon: <Package className="w-6 h-6 text-blue-400" />,
        fr: { title: "Magasinage & Empotage", desc: "Entrepôts sous douane, empotage conteneurs, contrôle pondéral et mise à quai." },
        en: { title: "Warehousing & Stuffing", desc: "Bonded warehouses, container stuffing, weight control, and quayside delivery." },
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
        fr: { title: "Assurance & Conformité", desc: "Couverture assurance fret, conformité documentaire CEMAC/OHADA et suivi réglementaire." },
        en: { title: "Insurance & Compliance", desc: "Cargo insurance coverage, CEMAC/OHADA documentary compliance, and regulatory monitoring." },
    },
    {
        icon: <Truck className="w-6 h-6 text-blue-400" />,
        fr: { title: "Transport terrestre", desc: "Acheminement des marchandises entre zones de production, usines et le corridor portuaire de Douala." },
        en: { title: "Inland Transport", desc: "Goods transport between production areas, factories, and the Douala port corridor." },
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
        fr: { title: "Conseil & Optimisation", desc: "Audit de coûts logistiques, optimisation des Incoterms et accompagnement stratégique pour vos flux." },
        en: { title: "Advisory & Optimization", desc: "Logistics cost audit, Incoterms optimization, and strategic support for your flows." },
    },
];

const PROCESS_STEPS = [
    {
        num: "01",
        fr: { title: "Demande de cotation", desc: "Transmettez-nous les détails de votre cargaison et la destination souhaitée." },
        en: { title: "Quote request", desc: "Send us your cargo details and desired destination." },
    },
    {
        num: "02",
        fr: { title: "Cotation & Planning", desc: "Nous vous proposons la meilleure option transport avec un planning détaillé." },
        en: { title: "Quote & Planning", desc: "We offer the best transport option with a detailed schedule." },
    },
    {
        num: "03",
        fr: { title: "Exécution & Dédouanement", desc: "Prise en charge intégrale : documents, douane, empotage et embarquement." },
        en: { title: "Execution & Clearance", desc: "Full handling: documents, customs, stuffing, and shipping." },
    },
    {
        num: "04",
        fr: { title: "Suivi & Livraison", desc: "Tracking en temps réel jusqu'à destination et remise des documents de transport." },
        en: { title: "Tracking & Delivery", desc: "Real-time tracking to destination and delivery of transport documents." },
    },
];

const STATS = [
    { value: "15+", fr: "Années d'expérience", en: "Years of experience" },
    { value: "500+", fr: "Opérations / an", en: "Operations / year" },
    { value: "24h", fr: "Réponse cotation", en: "Quote response" },
    { value: "100%", fr: "Suivi digital", en: "Digital tracking" },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function TransitPage({
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
            <main id="main-content" className="pt-[var(--header-height)]">

                {/* ─── HERO ─── */}
                <section className="relative py-24 lg:py-36 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

                    <div className="container-main relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="outline" size="lg" className="mb-6 border-blue-400/40 text-blue-300">
                                    <Anchor className="w-4 h-4 inline mr-1" />
                                    {isFr ? "Commissionnaire Agréé" : "Licensed Forwarder"}
                                </Badge>
                                <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 leading-tight">
                                    {isFr
                                        ? <>Transit <span className="text-blue-400">&</span> Logistique</>
                                        : <>Transit <span className="text-blue-400">&</span> Logistics</>}
                                </h1>
                                <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
                                    {isFr
                                        ? "SEPACAM est commissionnaire de transit agréé, facilitant vos opérations d'import-export au départ du port de Douala vers le monde entier."
                                        : "SEPACAM is a licensed freight forwarder, facilitating your import-export operations from the port of Douala to the entire world."}
                                </p>
                                <Link href={{ pathname: "/contact", query: { subject: "quote", product: "transit" } }}>
                                    <Button variant="primary" size="lg">
                                        {isFr ? "Demander une cotation fret" : "Request a freight quote"}
                                    </Button>
                                </Link>
                            </div>

                            {/* Right: visual card */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-3xl blur-xl" />
                                    <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-8 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{isFr ? "Opérations actives" : "Active operations"}</span>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { route: "Douala → Rotterdam", type: "FCL 20'", status: "active" },
                                                { route: "Douala → Le Havre", type: "FCL 40'", status: "pending" },
                                                { route: "Douala → Hamburg", type: "LCL", status: "active" },
                                            ].map((op, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">{op.route}</div>
                                                        <div className="text-xs text-slate-400">{op.type}</div>
                                                    </div>
                                                    <span className="text-sm">{op.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── STATS BAR ─── */}
                <section className="bg-blue-900 text-white py-8 border-t border-blue-800/50">
                    <div className="container-main">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            {STATS.map((stat, i) => (
                                <div key={i}>
                                    <span className="text-2xl lg:text-3xl font-bold font-heading text-blue-200">{stat.value}</span>
                                    <span className="block text-xs text-blue-300/60 uppercase tracking-wider mt-1">{stat[lang]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── SERVICES GRID ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="accent" className="mb-4">
                                {isFr ? "Nos Services" : "Our Services"}
                            </Badge>
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Une offre logistique complète" : "A complete logistics offering"}
                            </h2>
                            <p className="text-body text-neutral-500 max-w-2xl mx-auto">
                                {isFr
                                    ? "De la prise en charge à l'usine jusqu'à la livraison au port de destination, nous couvrons toute la chaîne."
                                    : "From factory pickup to delivery at the destination port, we cover the entire chain."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SERVICES.map((service, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                                    <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">{service[lang].title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{service[lang].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── PROCESS FLOW ─── */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Comment ça marche" : "How it works"}
                            </h2>
                            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {PROCESS_STEPS.map((step, i) => (
                                <div key={i} className="relative text-center">
                                    {/* Connector */}
                                    {i < PROCESS_STEPS.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-neutral-200" />
                                    )}
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-5 shadow-lg shadow-blue-600/20 rotate-3 hover:rotate-0 transition-transform">
                                            {step.num}
                                        </div>
                                        <h3 className="font-heading font-semibold text-neutral-900 mb-2">{step[lang].title}</h3>
                                        <p className="text-sm text-neutral-500">{step[lang].desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── SPECIALIZED INQUIRY ─── */}
                <section className="section-spacing bg-neutral-50 border-t border-neutral-100">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-6">
                                    {isFr ? "Demande de cotation transit" : "Transit quote request"}
                                </h2>
                                <p className="text-body text-neutral-600 mb-8 leading-relaxed">
                                    {isFr
                                        ? "Transmettez-nous les informations clés de votre opération et recevez une cotation détaillée sous 24 heures ouvrées."
                                        : "Send us the key details of your operation and receive a detailed quote within 24 business hours."}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        { fr: "Nature et poids de la marchandise", en: "Nature and weight of goods" },
                                        { fr: "Origine et destination", en: "Origin and destination" },
                                        { fr: "Incoterm souhaité (FOB, CIF, etc.)", en: "Desired Incoterm (FOB, CIF, etc.)" },
                                        { fr: "Délai souhaité", en: "Desired timeline" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-neutral-700 text-sm">{item[lang]}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={{ pathname: "/contact", query: { subject: "quote", product: "transit" } }}>
                                    <Button variant="primary" size="lg">
                                        {isFr ? "Envoyer ma demande" : "Send my request"}
                                    </Button>
                                </Link>
                            </div>

                            {/* Visual summary card */}
                            <div className="bg-white p-8 rounded-2xl shadow-elevation-2 border border-neutral-100">
                                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-6 text-center">
                                    {isFr ? "Nos couvertures" : "Our coverage"}
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: "🇪🇺", label: isFr ? "Europe" : "Europe", ports: "Rotterdam, Le Havre, Hamburg, Anvers" },
                                        { icon: "🇺🇸", label: isFr ? "Amérique" : "Americas", ports: "New York, Houston, Santos" },
                                        { icon: "🇨🇳", label: isFr ? "Asie" : "Asia", ports: "Shanghai, Kuala Lumpur, Istanbul" },
                                        { icon: "🇳🇬", label: isFr ? "Afrique" : "Africa", ports: "Lagos, Tema, Abidjan" },
                                    ].map((dest, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors">
                                            <span className="text-2xl">{dest.icon}</span>
                                            <div>
                                                <div className="font-semibold text-neutral-900 text-sm">{dest.label}</div>
                                                <div className="text-xs text-neutral-500">{dest.ports}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
                                    <p className="text-xs text-neutral-400">
                                        {isFr ? "Port d'embarquement : Douala, Cameroun" : "Loading port: Douala, Cameroon"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 text-white text-center">
                    <div className="container-main">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Simplifiez vos opérations logistiques" : "Simplify your logistics operations"}
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            {isFr
                                ? "Un interlocuteur unique pour toute votre chaîne logistique au Cameroun."
                                : "A single point of contact for your entire supply chain in Cameroon."}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={{ pathname: "/contact", query: { subject: "quote", product: "transit" } }}>
                                <Button variant="accent" size="lg">
                                    {isFr ? "Cotation en ligne" : "Online quote"}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="border-slate-500 text-slate-200 hover:bg-white/10 hover:border-white hover:text-white">
                                    {isFr ? "Nous appeler" : "Call us"}
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
