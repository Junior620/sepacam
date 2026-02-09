"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import type { StaticPathnames } from "@/i18n/routing";

type FooterLink = { href: StaticPathnames; label: string };

export function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubscribed(true);
        setIsSubmitting(false);
        setEmail("");
    };

    const productLinks: FooterLink[] = [
        { href: "/produits-cacao", label: tNav("products") },
        { href: "/transformation", label: tNav("processing") },
        { href: "/qualite-laboratoire", label: tNav("quality") },
        { href: "/kakaora", label: "KAKAORA" },
    ];

    const companyLinks: FooterLink[] = [
        { href: "/a-propos", label: tNav("about") },
        { href: "/cafe", label: tNav("coffee") },
        { href: "/transit", label: tNav("transit") },
        { href: "/services", label: tNav("services") },
    ];

    const resourceLinks: FooterLink[] = [
        { href: "/contact", label: tNav("contact") },
    ];

    const legalLinks: FooterLink[] = [
        { href: "/mentions-legales", label: t("legal_links.mentions") },
        { href: "/confidentialite", label: t("legal_links.privacy") },
        { href: "/code-conduite", label: t("legal_links.conduct") },
    ];

    // Certification badges
    const certifications = [
        { name: "HACCP", abbr: "HACCP" },
        { name: "ISO 22000", abbr: "ISO" },
        { name: "UTZ Certified", abbr: "UTZ" },
    ];

    return (
        <footer className="bg-neutral-900 text-neutral-300">
            {/* Newsletter Section */}
            <div className="border-b border-neutral-800">
                <div className="container-main py-10 lg:py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <h3 className="font-heading text-xl font-semibold text-white mb-2">
                                {t("newsletter.title")}
                            </h3>
                            <p className="text-small text-neutral-400">
                                {t("newsletter.description")}
                            </p>
                        </div>
                        {isSubscribed ? (
                            <div className="flex items-center gap-2 text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">{t("newsletter.success")}</span>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("newsletter.placeholder")}
                                    required
                                    className="px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[280px]"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="md"
                                    isLoading={isSubmitting}
                                >
                                    {t("newsletter.button")}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-main py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center mb-4">
                            <Image
                                src="/logo.png"
                                alt="SEPACAM Logo"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-contain"
                            />
                        </Link>
                        <p className="text-small text-neutral-400 mb-6 max-w-sm">
                            {t("description")}
                        </p>

                        {/* Certifications */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                                {t("certifications")}
                            </p>
                            <div className="flex items-center gap-3">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.name}
                                        className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700 hover:border-primary/50 transition-colors"
                                        title={cert.name}
                                    >
                                        <span className="text-xs font-bold text-neutral-300">{cert.abbr}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://linkedin.com/company/sepacam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                                aria-label="LinkedIn"
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
                                aria-label="YouTube"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Products Column */}
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

                    {/* Company Column */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">
                            {t("company_title")}
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
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

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4">
                            {t("contact_us")}
                        </h3>
                        <ul className="space-y-3 text-small text-neutral-400">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Zone Industrielle de Douala<br />BP XXX, Cameroun</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:commercial@sepacam.com" className="hover:text-white transition-colors">
                                    commercial@sepacam.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+237600000000" className="hover:text-white transition-colors">
                                    +237 6 XX XX XX XX
                                </a>
                            </li>
                        </ul>

                        {/* CTA Button */}
                        <Link href="/contact" className="mt-6 inline-block">
                            <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white">
                                {t("request_quote")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">
                        {t("copyright")}
                    </p>
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
