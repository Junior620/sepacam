"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { StaticPathnames } from "@/i18n/routing";

type NavItem = { href: StaticPathnames; label: string };

export function Header() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navItems: NavItem[] = [
        { href: "/transformation", label: t("processing") },
        { href: "/produits-cacao", label: t("products") },
        { href: "/qualite-laboratoire", label: t("quality") },
        { href: "/kakaora", label: t("kakaora") },
        { href: "/a-propos", label: t("about") },
    ];

    const secondaryNavItems: NavItem[] = [
        { href: "/cafe", label: t("coffee") },
        { href: "/transit", label: t("transit") },
        { href: "/services", label: t("services") },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-elevation-1"
                : "bg-transparent"
                }`}
        >
            <div className="container-main">
                <div className="flex items-center justify-between h-[var(--header-height-mobile)] lg:h-[var(--header-height)]">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src="/logo.png"
                            alt="SEPACAM Logo"
                            width={80}
                            height={80}
                            className="w-20 h-20 object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-small font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-neutral-600"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* More dropdown */}
                        <div className="relative group">
                            <button className="text-small font-medium text-neutral-600 hover:text-primary transition-colors flex items-center gap-1">
                                Plus
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-white rounded-xl shadow-elevation-3 border border-neutral-200 py-2 min-w-[160px]">
                                    {secondaryNavItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2 text-small text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <LocaleSwitcher />
                        <Link href="/contact">
                            <Button variant="primary" size="sm">
                                {t("contact")}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 -mr-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-neutral-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-200 shadow-elevation-3 transition-all duration-300 ${isMobileMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                    }`}
            >
                <nav className="container-main py-4 space-y-1">
                    {[...navItems, ...secondaryNavItems].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-3 rounded-lg text-body font-medium transition-colors ${pathname === item.href
                                ? "bg-primary/5 text-primary"
                                : "text-neutral-600 hover:bg-neutral-50"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between px-4">
                        <LocaleSwitcher />
                        <Link href="/contact">
                            <Button variant="primary" size="sm">
                                {t("contact")}
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
