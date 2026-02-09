import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { StaticPathnames } from "@/i18n/routing";

type FooterLink = { href: StaticPathnames; label: string };

export function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");

    const quickLinks: FooterLink[] = [
        { href: "/transformation", label: tNav("processing") },
        { href: "/qualite-laboratoire", label: tNav("quality") },
        { href: "/a-propos", label: tNav("about") },
        { href: "/contact", label: tNav("contact") },
    ];

    const productLinks: FooterLink[] = [
        { href: "/produits-cacao", label: tNav("products") },
        { href: "/kakaora", label: tNav("kakaora") },
        { href: "/cafe", label: tNav("coffee") },
    ];

    const legalLinks: FooterLink[] = [
        { href: "/mentions-legales", label: t("legal_links.mentions") },
        { href: "/confidentialite", label: t("legal_links.privacy") },
        { href: "/code-conduite", label: t("legal_links.conduct") },
    ];

    return (
        <footer className="bg-neutral-900 text-neutral-300">
            {/* Main Footer */}
            <div className="container-main py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center mb-4"
                        >
                            <Image
                                src="/logo.png"
                                alt="SEPACAM Logo"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-contain"
                            />
                        </Link>
                        <p className="text-small text-neutral-400 mb-6">
                            {t("description")}
                        </p>
                        {/* Social Media */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">
                            {t("quick_links")}
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-small text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">
                            {t("products_title")}
                        </h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-small text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">
                            {t("contact_us")}
                        </h3>
                        <ul className="space-y-3 text-small text-neutral-400">
                            <li className="flex items-start gap-2">
                                <svg
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                                <span>Douala, Cameroun</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                                <a
                                    href="mailto:contact@sepacam.com"
                                    className="hover:text-white transition-colors"
                                >
                                    contact@sepacam.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                                <a
                                    href="tel:+237600000000"
                                    className="hover:text-white transition-colors"
                                >
                                    +237 6 00 00 00 00
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">{t("copyright")}</p>
                    <div className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
