import { setRequestLocale } from "next-intl/server";
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
        title: isFr ? "Café Camerounais | Robusta & Arabica Premium" : "Cameroon Coffee | Premium Robusta & Arabica",
        description: isFr
            ? "Exportateur de café vert du Cameroun. Robusta (Grade 1 & 2) du bassin du Moungo et Arabica des hauts plateaux volcaniques."
            : "Green coffee exporter from Cameroon. Robusta (Grade 1 & 2) from the Moungo basin and Arabica from volcanic highlands.",
        path: "/cafe",
        pathFr: "/cafe",
        pathEn: "/coffee",
        keywords: isFr
            ? ["café cameroun", "robusta cameroun", "arabica cameroun", "export café vert", "café origine"]
            : ["cameroon coffee", "cameroon robusta", "cameroon arabica", "green coffee export", "origin coffee"],
    });
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const COFFEE_TYPES = [
    {
        key: "robusta",
        emoji: "☕",
        accentColor: "amber",
        fr: {
            title: "Robusta du Cameroun",
            subtitle: "La puissance aromatique",
            origin: "Bassin du Moungo, Littoral",
            altitude: "200 – 800 m",
            desc: "Cultivé dans les plaines fertiles du Moungo, notre Robusta est reconnu pour sa richesse en caféine et son corps puissant. Un café idéal pour les mélanges espresso industriels et les cafés solubles.",
            grades: ["Grade 1 (G1)", "Grade 2 (G2)", "Boulange"],
            process: "Voie sèche (Natural)",
            flavor: ["Corps puissant", "Boisé", "Chocolat noir", "Faible acidité"],
            packaging: "Sacs jute 60 kg",
        },
        en: {
            title: "Cameroon Robusta",
            subtitle: "Aromatic power",
            origin: "Moungo Basin, Littoral",
            altitude: "200 – 800 m",
            desc: "Grown in the fertile plains of the Moungo basin, our Robusta is renowned for its high caffeine content and full body. An ideal coffee for industrial espresso blends and instant coffee.",
            grades: ["Grade 1 (G1)", "Grade 2 (G2)", "Boulange"],
            process: "Dry process (Natural)",
            flavor: ["Full body", "Woody", "Dark chocolate", "Low acidity"],
            packaging: "60 kg jute bags",
        },
        specs: { caffeine: "2.2 – 2.8%", moisture: "≤ 12.5%", defects: "≤ 150 (G1)" },
    },
    {
        key: "arabica",
        emoji: "🌿",
        accentColor: "emerald",
        fr: {
            title: "Arabica des Hauts Plateaux",
            subtitle: "Finesse et complexité",
            origin: "Ouest & Nord-Ouest (volcanique)",
            altitude: "1 200 – 1 800 m",
            desc: "Provenant des régions volcaniques de l'Ouest et du Nord-Ouest camerounais. Un café lavé d'altitude aux notes florales et citronnées, apprécié des torréfacteurs spécialisés.",
            grades: ["A (screen 18+)", "B (screen 15-17)", "C", "Triage"],
            process: "Voie humide (Washed) & Java",
            flavor: ["Notes florales", "Agrumes", "Miel", "Acidité vive"],
            packaging: "Sacs jute 60 kg / GrainPro",
        },
        en: {
            title: "Highland Arabica",
            subtitle: "Finesse and complexity",
            origin: "West & North-West (volcanic)",
            altitude: "1,200 – 1,800 m",
            desc: "Sourced from the volcanic highlands of western Cameroon. A high-altitude washed coffee with floral and citrus notes, prized by specialty roasters.",
            grades: ["A (screen 18+)", "B (screen 15-17)", "C", "Triages"],
            process: "Wet process (Washed) & Java",
            flavor: ["Floral notes", "Citrus", "Honey", "Bright acidity"],
            packaging: "60 kg jute bags / GrainPro",
        },
        specs: { caffeine: "1.0 – 1.5%", moisture: "≤ 11.5%", defects: "≤ 8 (Grade A)" },
    },
];

const HERO_STATS = [
    { value: "2", fr: "Variétés exportées", en: "Varieties exported" },
    { value: "FOB", fr: "Douala • Incoterms", en: "Douala • Incoterms" },
    { value: "60kg", fr: "Conditionnement jute", en: "Jute bag packaging" },
    { value: "100%", fr: "Traçabilité origine", en: "Origin traceability" },
];

// ═══════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

export default async function CoffeePage({
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
                <section className="relative py-24 lg:py-36 bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 text-white overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                    <div className="container-main relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="outline" size="lg" className="mb-6 border-amber-500/60 text-amber-200">
                                    ☕ {isFr ? "Négoce & Export" : "Trading & Export"}
                                </Badge>
                                <h1 className="font-heading text-h1-sm lg:text-h1 mb-6 leading-tight">
                                    {isFr
                                        ? <>L&apos;Excellence du <span className="text-amber-400">Café</span> Camerounais</>
                                        : <>The Excellence of <span className="text-amber-400">Cameroonian Coffee</span></>}
                                </h1>
                                <p className="text-lg lg:text-xl text-amber-100/80 mb-10 max-w-xl leading-relaxed">
                                    {isFr
                                        ? "SEPACAM sélectionne, prépare et exporte les fèves de Robusta et d'Arabica des meilleurs terroirs camerounais vers l'Europe, l'Asie et l'Amérique."
                                        : "SEPACAM selects, prepares, and exports Robusta and Arabica beans from the finest Cameroonian terroirs to Europe, Asia, and the Americas."}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href={{ pathname: "/contact", query: { subject: "quote", product: "coffee" } }}>
                                        <Button variant="accent" size="lg">
                                            {isFr ? "Demander une cotation" : "Request a quote"}
                                        </Button>
                                    </Link>
                                    <Link href={{ pathname: "/contact", query: { subject: "sample" } }}>
                                        <Button variant="outline" size="lg" className="border-amber-400/40 text-amber-100 hover:bg-amber-800/40 hover:text-white hover:border-amber-400">
                                            {isFr ? "Recevoir un échantillon" : "Get a sample"}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right: visual card */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-3xl blur-xl" />
                                    <div className="relative bg-gradient-to-br from-amber-900/80 to-stone-900/80 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8 shadow-2xl">
                                        <div className="text-6xl mb-4">☕</div>
                                        <h3 className="font-heading text-2xl font-bold mb-2">{isFr ? "Café Vert d'Origine" : "Origin Green Coffee"}</h3>
                                        <p className="text-amber-200/70 text-sm mb-6">{isFr ? "Cameroun – Afrique Centrale" : "Cameroon – Central Africa"}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-amber-800/30 rounded-xl p-4 border border-amber-700/20">
                                                <div className="text-sm text-amber-300/60 mb-1">Robusta</div>
                                                <div className="font-bold text-lg">Grade 1 & 2</div>
                                            </div>
                                            <div className="bg-emerald-800/30 rounded-xl p-4 border border-emerald-700/20">
                                                <div className="text-sm text-emerald-300/60 mb-1">Arabica</div>
                                                <div className="font-bold text-lg">A / B / Java</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── STATS BAR ─── */}
                <section className="bg-amber-900 text-white py-8 border-t border-amber-800/50">
                    <div className="container-main">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            {HERO_STATS.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-2xl lg:text-3xl font-bold font-heading text-amber-200">{stat.value}</span>
                                    <span className="text-xs text-amber-400/70 uppercase tracking-wider mt-1">{stat[lang]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── TERROIR SECTION ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="text-center mb-16">
                            <Badge variant="accent" className="mb-4">
                                {isFr ? "Terroirs Camerounais" : "Cameroonian Terroirs"}
                            </Badge>
                            <h2 className="font-heading text-h2 text-neutral-900 mb-4">
                                {isFr ? "Deux origines, deux caractères" : "Two origins, two characters"}
                            </h2>
                            <p className="text-body text-neutral-500 max-w-2xl mx-auto">
                                {isFr
                                    ? "Le Cameroun offre une diversité géographique unique : des plaines tropicales du Littoral aux hauts plateaux volcaniques de l'Ouest."
                                    : "Cameroon offers unique geographic diversity: from the tropical Littoral plains to the volcanic highland plateaus of the West."}
                            </p>
                        </div>

                        {/* Origin cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {COFFEE_TYPES.map((coffee) => {
                                const isRobusta = coffee.key === "robusta";
                                const gradientFrom = isRobusta ? "from-amber-800" : "from-emerald-800";
                                const gradientTo = isRobusta ? "to-amber-950" : "to-emerald-950";
                                const accentBg = isRobusta ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800";
                                const tagBg = isRobusta ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200";

                                return (
                                    <div key={coffee.key} className="bg-white rounded-2xl overflow-hidden shadow-elevation-2 border border-neutral-100 flex flex-col group hover:shadow-xl transition-shadow duration-500">
                                        {/* Header */}
                                        <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} relative p-8 pb-10`}>
                                            <div className="absolute top-6 right-6 text-5xl opacity-30">{coffee.emoji}</div>
                                            <Badge variant="default" size="sm" className={`${accentBg} mb-4`}>
                                                {coffee[lang].origin}
                                            </Badge>
                                            <h3 className="font-heading text-3xl font-bold text-white mb-1">{coffee[lang].title}</h3>
                                            <p className="text-white/70 font-medium italic">{coffee[lang].subtitle}</p>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex-grow flex flex-col -mt-4">
                                            {/* Altitude chip */}
                                            <div className="flex items-center gap-2 mb-5">
                                                <span className="text-neutral-400">⛰️</span>
                                                <span className="text-sm font-semibold text-neutral-700">
                                                    {isFr ? "Altitude" : "Altitude"}: {coffee[lang].altitude}
                                                </span>
                                            </div>

                                            <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                                                {coffee[lang].desc}
                                            </p>

                                            {/* Flavor profile */}
                                            <div className="mb-6">
                                                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                                                    {isFr ? "Profil aromatique" : "Flavor Profile"}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {coffee[lang].flavor.map((f) => (
                                                        <span key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${tagBg}`}>
                                                            {f}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Grades */}
                                            <div className="mb-6">
                                                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                                                    {isFr ? "Grades disponibles" : "Available Grades"}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {coffee[lang].grades.map((g) => (
                                                        <span key={g} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-semibold">
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Process & Packaging */}
                                            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                                                <div>
                                                    <div className="text-xs text-neutral-400 mb-1">{isFr ? "Traitement" : "Processing"}</div>
                                                    <span className="text-sm font-semibold text-neutral-800">{coffee[lang].process}</span>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-400 mb-1">{isFr ? "Conditionnement" : "Packaging"}</div>
                                                    <span className="text-sm font-semibold text-neutral-800">{coffee[lang].packaging}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── TECHNICAL SPECS ─── */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                                {isFr ? "Spécifications techniques" : "Technical Specifications"}
                            </h2>
                            <p className="text-body text-neutral-500 max-w-xl mx-auto">
                                {isFr
                                    ? "Paramètres clés conformes aux standards d'exportation internationaux."
                                    : "Key parameters compliant with international export standards."}
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-neutral-900 text-white">
                                            <th className="px-6 py-4 text-sm font-semibold">{isFr ? "Paramètre" : "Parameter"}</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-amber-300">Robusta</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-emerald-300">Arabica</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-700">{isFr ? "Teneur en caféine" : "Caffeine content"}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[0].specs.caffeine}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[1].specs.caffeine}</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-700">{isFr ? "Humidité max." : "Max. moisture"}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[0].specs.moisture}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[1].specs.moisture}</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-700">{isFr ? "Défauts (meilleur grade)" : "Defects (best grade)"}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[0].specs.defects}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[1].specs.defects}</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-700">{isFr ? "Conditionnement" : "Packaging"}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[0][lang].packaging}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{COFFEE_TYPES[1][lang].packaging}</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-700">{isFr ? "Port d'embarquement" : "Loading port"}</td>
                                            <td className="px-6 py-4 text-sm text-neutral-600" colSpan={2}>Douala, Cameroun (FOB / CIF)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── WHY SEPACAM ─── */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-12 text-center">
                            {isFr ? "Pourquoi choisir SEPACAM ?" : "Why choose SEPACAM?"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "🔬",
                                    fr: { title: "Contrôle Qualité", desc: "Chaque lot est analysé avant export : taux d'humidité, nombre de défauts, et cup-test réalisés dans notre laboratoire." },
                                    en: { title: "Quality Control", desc: "Every lot is analyzed before export: moisture rate, defect count, and cup tests performed in our laboratory." },
                                },
                                {
                                    icon: "📍",
                                    fr: { title: "Traçabilité Complète", desc: "Du producteur au conteneur : nous garantissons la traçabilité de chaque sac grâce à notre système digital intégré." },
                                    en: { title: "Full Traceability", desc: "From farmer to container: we guarantee traceability of every bag through our integrated digital system." },
                                },
                                {
                                    icon: "🚢",
                                    fr: { title: "Logistique Fiable", desc: "Expédition depuis le port de Douala avec une documentation export complète et un suivi en temps réel." },
                                    en: { title: "Reliable Logistics", desc: "Shipment from the port of Douala with complete export documentation and real-time tracking." },
                                },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                                    <div className="text-4xl mb-5">{item.icon}</div>
                                    <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">{item[lang].title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{item[lang].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="relative py-24 bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] select-none pointer-events-none">☕</div>
                    </div>
                    <div className="container-main relative z-10 text-center">
                        <h2 className="font-heading text-h2 mb-6">
                            {isFr ? "Prêt à sourcer votre café camerounais ?" : "Ready to source your Cameroonian coffee?"}
                        </h2>
                        <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {isFr
                                ? "Échantillons, cotations FOB/CIF, fiches techniques — nos équipes commerciales répondent sous 48h."
                                : "Samples, FOB/CIF quotes, technical sheets — our sales teams respond within 48h."}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={{ pathname: "/contact", query: { subject: "quote", product: "coffee" } }}>
                                <Button variant="accent" size="lg">
                                    {isFr ? "Demander une cotation" : "Request a quote"}
                                </Button>
                            </Link>
                            <Link href={{ pathname: "/contact", query: { subject: "sample" } }}>
                                <Button variant="outline" size="lg" className="border-neutral-500 text-neutral-200 hover:bg-white/10 hover:border-white hover:text-white">
                                    {isFr ? "Recevoir un échantillon" : "Get a sample"}
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
