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
            ? "Café Camerounais | Robusta & Arabica - SEPACAM"
            : "Cameroon Coffee | Robusta & Arabica - SEPACAM",
        description: isFr
            ? "Exportateur de café vert du Cameroun. Robusta (Grade 1 & 2) et Arabica des hautes terres. Qualité contrôlée et traçabilité."
            : "Green coffee exporter from Cameroon. Robusta (Grade 1 & 2) and Highland Arabica. Controlled quality and traceability.",
        keywords: isFr
            ? ["café cameroun", "robusta", "arabica", "export café", "café vert"]
            : ["cameroon coffee", "robusta", "arabica", "coffee export", "green coffee"],
    };
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const COFFEE_TYPES = [
    {
        key: "robusta",
        fr: {
            title: "Robusta du Cameroun",
            subtitle: "La puissance aromatique",
            desc: "Cultivé dans le bassin du Moungo, notre Robusta est reconnu pour sa richesse en caféine et son corps puissant. Idéal pour les mélanges espresso.",
            grades: ["Grade 1 (G1)", "Grade 2 (G2)", "Boulange"],
            process: "Voie sèche (Natural)"
        },
        en: {
            title: "Cameroon Robusta",
            subtitle: "Aromatic power",
            desc: "Grown in the Moungo basin, our Robusta is renowned for its high caffeine content and full body. Ideal for espresso blends.",
            grades: ["Grade 1 (G1)", "Grade 2 (G2)", "Boulange"],
            process: "Dry process (Natural)"
        },
        color: "bg-amber-900"
    },
    {
        key: "arabica",
        fr: {
            title: "Arabica des Hautes Terres",
            subtitle: "Finesse et acidité",
            desc: "Provenant des régions volcaniques de l'Ouest et du Nord-Ouest. Un café lavé aux notes florales et citronnées.",
            grades: ["A", "B", "C", "Triage"],
            process: "Voie humide (Washed) & Java"
        },
        en: {
            title: "Highland Arabica",
            subtitle: "Finesse and acidity",
            desc: "Sourced from the volcanic regions of the West and North-West. A washed coffee with floral and citrus notes.",
            grades: ["A", "B", "C", "Triages"],
            process: "Wet process (Washed) & Java"
        },
        color: "bg-emerald-900"
    },
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

                {/* HERO */}
                <section className="relative py-20 lg:py-32 bg-amber-950 text-white overflow-hidden">
                    {/* Coffee bean pattern opacity */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="20" cy="20" r="15" fill="currentColor" />
                            <circle cx="80" cy="80" r="20" fill="currentColor" />
                            <path d="M20 20 Q 20 30 25 25" stroke="black" fill="none" />
                        </svg>
                    </div>

                    <div className="container-main relative z-10">
                        <div className="max-w-3xl">
                            <Badge variant="outline" className="mb-6 border-amber-500 text-amber-200">
                                {isFr ? "Négoce & Export" : "Trading & Export"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 mb-6">
                                {isFr ? "L'Excellence du Café Camerounais" : "The Excellence of Cameroonian Coffee"}
                            </h1>
                            <p className="text-xl text-amber-100 mb-8 max-w-2xl">
                                {isFr
                                    ? "SEPACAM sélectionne, prépare et exporte les meilleures fèves de Robusta et d'Arabica des terroirs camerounais."
                                    : "SEPACAM selects, prepares, and exports the finest Robusta and Arabica beans from Cameroonian terroirs."}
                            </p>
                            <Link href={{ pathname: "/contact", query: { subject: "quote", product: "coffee" } }}>
                                <Button variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-700 border-none text-white">
                                    {isFr ? "Demander une offre" : "Request a quote"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* OFFERINGS */}
                <section className="section-spacing bg-neutral-50">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {COFFEE_TYPES.map((coffee) => (
                                <div key={coffee.key} className="bg-white rounded-2xl overflow-hidden shadow-elevation-2 border border-neutral-100 flex flex-col">
                                    <div className={`h-48 ${coffee.color} relative p-8 flex items-end`}>
                                        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern-dots.svg')]"></div>
                                        <div className="relative z-10">
                                            <h2 className="font-heading text-3xl font-bold text-white mb-2">{coffee[lang].title}</h2>
                                            <p className="text-white/80 font-medium">{coffee[lang].subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <p className="text-body text-neutral-600 mb-6 flex-grow">
                                            {coffee[lang].desc}
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                                    {isFr ? "Grades Disponibles" : "Available Grades"}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {coffee[lang].grades.map(g => (
                                                        <span key={g} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-md text-sm font-medium">
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                                    {isFr ? "Traitement" : "Processing"}
                                                </div>
                                                <span className="text-neutral-900 font-medium border-b-2 border-primary/20">
                                                    {coffee[lang].process}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SIMPLE CTA */}
                <section className="py-20 bg-white border-t border-neutral-100">
                    <div className="container-main text-center">
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-6">
                            {isFr ? "Besoin d'un échantillon ou d'une cotation ?" : "Need a sample or a quote?"}
                        </h2>
                        <div className="max-w-xl mx-auto mb-8">
                            <p className="text-body text-neutral-600">
                                {isFr
                                    ? "Nos équipes commerciales sont à votre disposition pour vous fournir les fiches techniques et organiser l'envoi d'échantillons."
                                    : "Our sales teams are available to provide technical sheets and arrange sample shipments."}
                            </p>
                        </div>
                        <Link href={{ pathname: "/contact", query: { subject: "sample" } }}>
                            <Button variant="outline" size="lg">
                                {isFr ? "Contactez-nous" : "Contact us"}
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
