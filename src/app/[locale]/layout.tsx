import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Analytics } from "@/components/ui/Analytics";
import Script from "next/script";

// Font configurations
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-outfit",
    weight: ["400", "500", "600", "700"],
});

// Generate static params for all locales
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sepacam.com";

    const metadata: Record<string, Metadata> = {
        fr: {
            title: {
                default: "SEPACAM - Cacao Transformé du Cameroun | Export B2B",
                template: "%s | SEPACAM",
            },
            description:
                "SEPACAM transforme le cacao camerounais en produits fiables, traçables et conformes export: liqueur, beurre, poudre, tourteau, grué. Demandez un devis B2B.",
            keywords: [
                "cacao cameroun",
                "exportateur cacao",
                "cacao transformé",
                "beurre de cacao",
                "poudre de cacao",
                "liqueur de cacao",
                "KAKAORA",
                "cacao B2B",
                "fournisseur cacao afrique",
            ],
            openGraph: {
                title: "SEPACAM - Cacao Transformé du Cameroun",
                description:
                    "Cacao camerounais transformé, traçable et conforme export. Liqueur, beurre, poudre, tourteau, grué.",
                url: `${siteUrl}/fr`,
                siteName: "SEPACAM",
                locale: "fr_FR",
                type: "website",
                images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "SEPACAM - Cacao Cameroun" }],
            },
            twitter: {
                card: "summary_large_image",
                title: "SEPACAM - Cacao Transformé du Cameroun",
                description: "Cacao camerounais transformé, traçable et conforme export.",
                images: [`${siteUrl}/images/og-default.jpg`],
            },
        },
        en: {
            title: {
                default: "SEPACAM - Processed Cameroon Cocoa | B2B Export",
                template: "%s | SEPACAM",
            },
            description:
                "SEPACAM processes Cameroonian cocoa into reliable, traceable, export-compliant products: liquor, butter, powder, cake, nibs. Request a B2B quote.",
            keywords: [
                "cameroon cocoa",
                "cocoa exporter",
                "processed cocoa",
                "cocoa butter",
                "cocoa powder",
                "cocoa liquor",
                "KAKAORA",
                "B2B cocoa",
                "african cocoa supplier",
            ],
            openGraph: {
                title: "SEPACAM - Processed Cameroon Cocoa",
                description:
                    "Cameroonian cocoa processed, traceable, and export-compliant. Liquor, butter, powder, cake, nibs.",
                url: `${siteUrl}/en`,
                siteName: "SEPACAM",
                locale: "en_US",
                type: "website",
                images: [{ url: `${siteUrl}/images/og-default.jpg`, width: 1200, height: 630, alt: "SEPACAM - Cameroon Cocoa" }],
            },
            twitter: {
                card: "summary_large_image",
                title: "SEPACAM - Processed Cameroon Cocoa",
                description: "Cameroonian cocoa processed, traceable, and export-compliant.",
                images: [`${siteUrl}/images/og-default.jpg`],
            },
        },
    };

    return {
        ...metadata[locale],
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                fr: "/fr",
                en: "/en",
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            google: "your-google-verification-code",
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as "fr" | "en")) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the locale
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
            <head>
                {/* Preconnect to external domains */}
                <link rel="preconnect" href="https://cdn.sanity.io" />
                <link rel="preconnect" href="https://api.mapbox.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.google.com" />
                <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Theme color */}
                <meta name="theme-color" content="#1B5E3B" />
            </head>
            <body className="font-body antialiased">
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Analytics />
                </NextIntlClientProvider>
                {/* reCAPTCHA v3 – loaded globally, consumed by useRecaptcha hook */}
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <Script
                        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                        strategy="afterInteractive"
                    />
                )}
            </body>
        </html>
    );
}
