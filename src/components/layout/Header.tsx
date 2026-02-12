"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Sparkles } from "lucide-react";
import type { StaticPathnames } from "@/i18n/routing";

type NavItem = {
    href: StaticPathnames;
    label: string;
    children?: { href: StaticPathnames; label: string }[];
};

export function Header() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        setActiveDropdown(null);
    }, [pathname]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    // Check if path is active (including sub-pages)
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    // CACAO-FIRST Navigation Structure
    const cocoaItems: NavItem[] = [
        { href: "/produits-cacao", label: t("products") },
        { href: "/transformation", label: t("processing") },
        { href: "/qualite-laboratoire", label: t("quality") },
        { href: "/kakaora", label: "KAKAORA" },
    ];

    const otherActivities: NavItem[] = [
        { href: "/cafe", label: t("coffee") },
        { href: "/transit", label: t("transit") },
        { href: "/services", label: t("services") },
    ];

    const aboutItems: NavItem[] = [
        { href: "/a-propos", label: t("about") },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-elevation-1"
                    : "bg-white"
                    }`}
            >
                <div className="container-main">
                    <div className="flex items-center justify-between h-[var(--header-height-mobile)] lg:h-[var(--header-height)]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logo.png"
                                alt="SEPACAM Logo"
                                width={80}
                                height={80}
                                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                            {/* Cacao Products - Primary CTA */}
                            <Link
                                href="/produits-cacao"
                                className={`px-4 py-2 rounded-lg text-small font-semibold transition-all ${isActive("/produits-cacao")
                                    ? "bg-primary text-white"
                                    : "text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {t("products")}
                            </Link>

                            {/* Cacao Dropdown */}
                            <div className="relative">
                                <button
                                    className={`px-4 py-2 rounded-lg text-small font-medium transition-all flex items-center gap-1 ${isActive("/transformation") || isActive("/qualite-laboratoire") || isActive("/kakaora")
                                        ? "text-primary bg-primary/5"
                                        : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                                        }`}
                                    onClick={() => setActiveDropdown(activeDropdown === "cacao" ? null : "cacao")}
                                    onMouseEnter={() => setActiveDropdown("cacao")}
                                >
                                    Cacao
                                    <svg
                                        className={`w-4 h-4 transition-transform ${activeDropdown === "cacao" ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${activeDropdown === "cacao"
                                        ? "opacity-100 visible translate-y-0"
                                        : "opacity-0 invisible -translate-y-2"
                                        }`}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="bg-white rounded-xl shadow-elevation-3 border border-neutral-200 py-2 min-w-[200px]">
                                        <Link
                                            href="/transformation"
                                            className={`block px-4 py-2.5 text-small transition-colors ${isActive("/transformation")
                                                ? "bg-primary/5 text-primary font-medium"
                                                : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                                                }`}
                                        >
                                            {t("processing")}
                                        </Link>
                                        <Link
                                            href="/qualite-laboratoire"
                                            className={`block px-4 py-2.5 text-small transition-colors ${isActive("/qualite-laboratoire")
                                                ? "bg-primary/5 text-primary font-medium"
                                                : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                                                }`}
                                        >
                                            {t("quality")}
                                        </Link>
                                        <Link
                                            href="/kakaora"
                                            className={`block px-4 py-2.5 text-small font-semibold transition-colors ${isActive("/kakaora")
                                                ? "bg-accent/10 text-accent"
                                                : "text-accent hover:bg-accent/5"
                                                }`}
                                        >
                                            KAKAORA <Sparkles className="w-3.5 h-3.5 inline-block ml-1 text-accent" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Other Activities Dropdown */}
                            <div className="relative">
                                <button
                                    className={`px-4 py-2 rounded-lg text-small font-medium transition-all flex items-center gap-1 ${isActive("/cafe") || isActive("/transit") || isActive("/services")
                                        ? "text-primary bg-primary/5"
                                        : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                                        }`}
                                    onClick={() => setActiveDropdown(activeDropdown === "activities" ? null : "activities")}
                                    onMouseEnter={() => setActiveDropdown("activities")}
                                >
                                    {t("other_activities") || "Autres Activités"}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${activeDropdown === "activities" ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${activeDropdown === "activities"
                                        ? "opacity-100 visible translate-y-0"
                                        : "opacity-0 invisible -translate-y-2"
                                        }`}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="bg-white rounded-xl shadow-elevation-3 border border-neutral-200 py-2 min-w-[180px]">
                                        {otherActivities.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`block px-4 py-2.5 text-small transition-colors ${isActive(item.href)
                                                    ? "bg-primary/5 text-primary font-medium"
                                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* About */}
                            <Link
                                href="/a-propos"
                                className={`px-4 py-2 rounded-lg text-small font-medium transition-all ${isActive("/a-propos")
                                    ? "text-primary bg-primary/5"
                                    : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                                    }`}
                            >
                                {t("about")}
                            </Link>
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
                            className="lg:hidden p-2 -mr-2 relative z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                                <span
                                    className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                        }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Slide-Out Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white z-40 lg:hidden transition-transform duration-300 ease-out shadow-elevation-3 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col pt-[calc(var(--header-height-mobile)+1rem)]">
                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        {/* Cacao Section */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-3">
                                {t("products")}
                            </p>
                            {cocoaItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-3 py-3 rounded-lg text-body font-medium transition-colors ${isActive(item.href)
                                        ? "bg-primary/5 text-primary"
                                        : "text-neutral-700 hover:bg-neutral-50"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Other Activities Section */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-3">
                                {t("other_activities") || "Autres Activités"}
                            </p>
                            {otherActivities.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-3 py-3 rounded-lg text-body font-medium transition-colors ${isActive(item.href)
                                        ? "bg-primary/5 text-primary"
                                        : "text-neutral-700 hover:bg-neutral-50"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* About Section */}
                        <div className="mb-6">
                            <Link
                                href="/a-propos"
                                className={`block px-3 py-3 rounded-lg text-body font-medium transition-colors ${isActive("/a-propos")
                                    ? "bg-primary/5 text-primary"
                                    : "text-neutral-700 hover:bg-neutral-50"
                                    }`}
                            >
                                {t("about")}
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Footer */}
                    <div className="border-t border-neutral-200 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <LocaleSwitcher />
                        </div>
                        <Link href="/contact" className="block">
                            <Button variant="primary" size="md" fullWidth>
                                {t("contact")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
