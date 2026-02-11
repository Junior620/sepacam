"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────
export type ProductCTABarProps = {
    productName: string;
    locale: string;
};

type ModalType = "quote" | "sample" | "qc" | null;

// ─── Component ───────────────────────────────────────────
export function ProductCTABar({ productName, locale }: ProductCTABarProps) {
    const isFr = locale === "fr";
    const [visible, setVisible] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const lastScrollY = useRef(0);
    const heroHeight = useRef(600);

    // Show bar after scrolling past hero, hide when scrolling up near top
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const pastHero = y > heroHeight.current;
            const scrollingDown = y > lastScrollY.current;
            lastScrollY.current = y;

            if (pastHero && scrollingDown) {
                setVisible(true);
            } else if (!pastHero) {
                setVisible(false);
            }
            // Keep visible when scrolling up but still past hero
            if (pastHero && !scrollingDown) {
                setVisible(true);
            }
        };

        // Get hero section height
        const hero = document.querySelector("[data-product-hero]");
        if (hero) heroHeight.current = hero.getBoundingClientRect().height;

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeModal = useCallback(() => setActiveModal(null), []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeModal]);

    return (
        <>
            {/* ── Sticky Bottom Bar ── */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border-t border-neutral-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
                            <div className="container-main py-3">
                                <div className="flex items-center justify-between gap-4">
                                    {/* Product name (desktop) */}
                                    <div className="hidden lg:flex items-center gap-3 min-w-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="font-heading font-semibold text-neutral-900 truncate text-sm">
                                            {productName}
                                        </p>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-center lg:justify-end">
                                        <button
                                            onClick={() => setActiveModal("quote")}
                                            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-primary text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                                        >
                                            <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {isFr ? "Devis" : "Quote"}
                                        </button>
                                        <button
                                            onClick={() => setActiveModal("sample")}
                                            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-neutral-800 rounded-full text-xs sm:text-sm font-semibold border border-neutral-300 hover:border-primary/40 hover:text-primary transition-colors"
                                        >
                                            <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            {isFr ? "Échantillon" : "Sample"}
                                        </button>
                                        <button
                                            onClick={() => setActiveModal("qc")}
                                            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-neutral-800 rounded-full text-xs sm:text-sm font-semibold border border-neutral-300 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            {isFr ? "QC" : "QC"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Modal Overlay ── */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors z-10"
                            >
                                <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {activeModal === "quote" && (
                                <QuoteForm
                                    productName={productName}
                                    isFr={isFr}
                                    locale={locale}
                                    onClose={closeModal}
                                />
                            )}
                            {activeModal === "sample" && (
                                <SampleForm
                                    productName={productName}
                                    isFr={isFr}
                                    locale={locale}
                                    onClose={closeModal}
                                />
                            )}
                            {activeModal === "qc" && (
                                <QCForm
                                    productName={productName}
                                    isFr={isFr}
                                    locale={locale}
                                    onClose={closeModal}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── Form Components ─────────────────────────────────────
type FormProps = {
    productName: string;
    isFr: boolean;
    locale: string;
    onClose: () => void;
};

function QuoteForm({ productName, isFr, onClose }: FormProps) {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.get("email"),
                    productType: productName,
                    description: `Quote request: ${data.get("quantity")} – ${data.get("message")}`,
                }),
            });
            setStatus("sent");
            setTimeout(onClose, 2000);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-lg text-neutral-900">
                        {isFr ? "Demander un devis" : "Request a Quote"}
                    </h3>
                    <p className="text-xs text-neutral-400">{productName}</p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mb-6">
                {isFr
                    ? "Nous vous répondrons sous 24h avec un devis personnalisé."
                    : "We'll respond within 24h with a personalized quote."}
            </p>

            {status === "sent" ? (
                <SuccessMessage isFr={isFr} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        name="email"
                        type="email"
                        label={isFr ? "Email professionnel" : "Business email"}
                        placeholder="nom@entreprise.com"
                        required
                    />
                    <InputField
                        name="company"
                        label={isFr ? "Société" : "Company"}
                        placeholder={isFr ? "Nom de votre société" : "Your company name"}
                        required
                    />
                    <InputField
                        name="quantity"
                        label={isFr ? "Quantité souhaitée" : "Desired quantity"}
                        placeholder={isFr ? "ex: 5 MT / mois" : "e.g. 5 MT / month"}
                        required
                    />
                    <TextareaField
                        name="message"
                        label={isFr ? "Détails supplémentaires" : "Additional details"}
                        placeholder={isFr ? "Incoterms préférés, conditionnement, destination..." : "Preferred incoterms, packaging, destination..."}
                    />
                    <SubmitButton
                        sending={status === "sending"}
                        error={status === "error"}
                        label={isFr ? "Envoyer la demande" : "Send request"}
                        isFr={isFr}
                    />
                </form>
            )}
        </div>
    );
}

function SampleForm({ productName, isFr, onClose }: FormProps) {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.get("email"),
                    productType: productName,
                    description: `Sample request: ${data.get("purpose")} – Ship to: ${data.get("address")}`,
                }),
            });
            setStatus("sent");
            setTimeout(onClose, 2000);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-lg text-neutral-900">
                        {isFr ? "Demander un échantillon" : "Request a Sample"}
                    </h3>
                    <p className="text-xs text-neutral-400">{productName}</p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mb-6">
                {isFr
                    ? "Recevez un échantillon gratuit pour vos tests en laboratoire."
                    : "Receive a free sample for your laboratory testing."}
            </p>

            {status === "sent" ? (
                <SuccessMessage isFr={isFr} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        name="email"
                        type="email"
                        label={isFr ? "Email professionnel" : "Business email"}
                        placeholder="nom@entreprise.com"
                        required
                    />
                    <InputField
                        name="company"
                        label={isFr ? "Société" : "Company"}
                        placeholder={isFr ? "Nom de votre société" : "Your company name"}
                        required
                    />
                    <InputField
                        name="purpose"
                        label={isFr ? "Usage prévu" : "Intended purpose"}
                        placeholder={isFr ? "ex: R&D chocolaterie" : "e.g. R&D chocolate making"}
                        required
                    />
                    <TextareaField
                        name="address"
                        label={isFr ? "Adresse de livraison" : "Shipping address"}
                        placeholder={isFr ? "Adresse complète pour l'envoi" : "Full shipping address"}
                        required
                    />
                    <SubmitButton
                        sending={status === "sending"}
                        error={status === "error"}
                        label={isFr ? "Demander l'échantillon" : "Request sample"}
                        isFr={isFr}
                    />
                </form>
            )}
        </div>
    );
}

function QCForm({ productName, isFr, onClose }: FormProps) {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.get("email"),
                    productType: productName,
                    description: `QC inquiry: ${data.get("topic")} – ${data.get("message")}`,
                }),
            });
            setStatus("sent");
            setTimeout(onClose, 2000);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-lg text-neutral-900">
                        {isFr ? "Parler au QC" : "Talk to QC"}
                    </h3>
                    <p className="text-xs text-neutral-400">{productName}</p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mb-6">
                {isFr
                    ? "Contactez notre équipe Contrôle Qualité pour toute question technique."
                    : "Contact our Quality Control team for any technical question."}
            </p>

            {status === "sent" ? (
                <SuccessMessage isFr={isFr} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        name="email"
                        type="email"
                        label={isFr ? "Email professionnel" : "Business email"}
                        placeholder="nom@entreprise.com"
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                            {isFr ? "Sujet" : "Topic"}
                        </label>
                        <select
                            name="topic"
                            required
                            className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors appearance-none"
                        >
                            <option value="">{isFr ? "Sélectionnez un sujet" : "Select a topic"}</option>
                            <option value="specs">{isFr ? "Spécifications produit" : "Product specifications"}</option>
                            <option value="coa">{isFr ? "Certificat d'analyse (COA)" : "Certificate of Analysis (COA)"}</option>
                            <option value="compliance">{isFr ? "Conformité réglementaire" : "Regulatory compliance"}</option>
                            <option value="custom">{isFr ? "Spécifications sur mesure" : "Custom specifications"}</option>
                            <option value="other">{isFr ? "Autre" : "Other"}</option>
                        </select>
                    </div>
                    <TextareaField
                        name="message"
                        label={isFr ? "Votre question" : "Your question"}
                        placeholder={isFr ? "Décrivez votre question technique..." : "Describe your technical question..."}
                        required
                    />
                    <SubmitButton
                        sending={status === "sending"}
                        error={status === "error"}
                        label={isFr ? "Contacter le QC" : "Contact QC"}
                        isFr={isFr}
                    />
                </form>
            )}
        </div>
    );
}

// ─── Shared Sub-Components ───────────────────────────────
function InputField({
    name,
    type = "text",
    label,
    placeholder,
    required,
}: {
    name: string;
    type?: string;
    label: string;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <div>
            <label htmlFor={`cta-${name}`} className="block text-sm font-medium text-neutral-700 mb-1.5">
                {label}
            </label>
            <input
                id={`cta-${name}`}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-neutral-400"
            />
        </div>
    );
}

function TextareaField({
    name,
    label,
    placeholder,
    required,
}: {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <div>
            <label htmlFor={`cta-${name}`} className="block text-sm font-medium text-neutral-700 mb-1.5">
                {label}
            </label>
            <textarea
                id={`cta-${name}`}
                name={name}
                rows={3}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-neutral-400 resize-none"
            />
        </div>
    );
}

function SubmitButton({
    sending,
    error,
    label,
    isFr,
}: {
    sending: boolean;
    error: boolean;
    label: string;
    isFr: boolean;
}) {
    return (
        <div className="pt-2">
            <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
                {sending ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {isFr ? "Envoi..." : "Sending..."}
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {label}
                    </>
                )}
            </button>
            {error && (
                <p className="text-xs text-red-500 mt-2 text-center">
                    {isFr ? "Erreur, veuillez réessayer." : "Error, please try again."}
                </p>
            )}
        </div>
    );
}

function SuccessMessage({ isFr }: { isFr: boolean }) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
        >
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h4 className="font-heading font-bold text-neutral-900 mb-1">
                {isFr ? "Demande envoyée !" : "Request sent!"}
            </h4>
            <p className="text-sm text-neutral-500">
                {isFr
                    ? "Notre équipe vous répondra sous 24h."
                    : "Our team will respond within 24h."}
            </p>
        </motion.div>
    );
}
