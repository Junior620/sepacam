"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    type LeadFormType,
    type QuoteFormData,
    type SampleFormData,
    type SpecsFormData,
    type PartnershipFormData,
    type TransitFormData,
    quoteFormSchema,
    sampleFormSchema,
    specsFormSchema,
    partnershipFormSchema,
    transitFormSchema,
    COUNTRY_OPTIONS,
    APPLICATION_OPTIONS,
    CERTIFICATION_OPTIONS,
} from "@/lib/schemas";
import { FormField, FormTextarea, FormSelect } from "@/components/forms/FormField";
import { ProductSelector } from "@/components/forms/ProductSelector";
import { IncotermSelector } from "@/components/forms/IncotermSelector";
import { useRecaptcha } from "@/hooks/useRecaptcha";

// ─── Types ───────────────────────────────────────────────
export type LeadFormProps = {
    locale: string;
    initialType?: LeadFormType;
    preselectedProduct?: string;
    className?: string;
    onSuccess?: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

// ─── Form type configuration ─────────────────────────────
const FORM_TYPE_CONFIG: Record<
    LeadFormType,
    {
        fr: string;
        en: string;
        icon: string;
        color: string;
        description: { fr: string; en: string };
    }
> = {
    quote: {
        fr: "Demande de devis",
        en: "Quote Request",
        icon: "📋",
        color: "bg-primary/10 text-primary",
        description: {
            fr: "Obtenez un devis personnalisé sous 24h",
            en: "Get a personalized quote within 24h",
        },
    },
    sample: {
        fr: "Demande d'échantillon",
        en: "Sample Request",
        icon: "📦",
        color: "bg-accent/10 text-accent",
        description: {
            fr: "Recevez un échantillon gratuit pour vos tests",
            en: "Receive a free sample for your testing",
        },
    },
    specs: {
        fr: "Spécifications sur mesure",
        en: "Custom Specifications",
        icon: "🔬",
        color: "bg-blue-50 text-blue-600",
        description: {
            fr: "Demandez des spécifications adaptées à votre application",
            en: "Request specifications tailored to your application",
        },
    },
    partnership: {
        fr: "Partenariat commercial",
        en: "Commercial Partnership",
        icon: "🤝",
        color: "bg-purple-50 text-purple-600",
        description: {
            fr: "Devenez distributeur, agent ou partenaire SEPACAM",
            en: "Become a SEPACAM distributor, agent or partner",
        },
    },
    transit: {
        fr: "Transit & Logistique",
        en: "Transit & Logistics",
        icon: "🚢",
        color: "bg-amber-50 text-amber-600",
        description: {
            fr: "Confiez votre logistique à nos experts du port de Douala",
            en: "Entrust your logistics to our Douala port experts",
        },
    },
};

// ─── Schema resolver map ─────────────────────────────────
const SCHEMA_MAP = {
    quote: quoteFormSchema,
    sample: sampleFormSchema,
    specs: specsFormSchema,
    partnership: partnershipFormSchema,
    transit: transitFormSchema,
};

// ─── Component ───────────────────────────────────────────
export function LeadForm({
    locale,
    initialType = "quote",
    preselectedProduct,
    className = "",
    onSuccess,
}: LeadFormProps) {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";

    const [formType, setFormType] = useState<LeadFormType>(initialType);
    const [status, setStatus] = useState<FormStatus>("idle");
    const { execute: executeRecaptcha } = useRecaptcha();

    const config = FORM_TYPE_CONFIG[formType];
    const currentSchema = SCHEMA_MAP[formType];

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(currentSchema as any),
        defaultValues: {
            product: preselectedProduct || "",
        },
    });

    const productValue = watch("product");
    const incotermValue = watch("incoterm");

    // Switch form type and reset
    const switchType = useCallback(
        (type: LeadFormType) => {
            setFormType(type);
            setStatus("idle");
            reset({ product: preselectedProduct || "" });
        },
        [reset, preselectedProduct]
    );

    // Submit handler
    const onSubmit = useCallback(
        async (data: any) => {
            setStatus("submitting");
            try {
                // Generate reCAPTCHA token
                const recaptchaToken = await executeRecaptcha(`lead_${formType}`);

                const res = await fetch("/api/forms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        formType,
                        ...data,
                        recaptchaToken,
                        locale,
                        submittedAt: new Date().toISOString(),
                    }),
                });
                if (!res.ok) throw new Error("Submission failed");
                setStatus("success");
                onSuccess?.();
            } catch {
                setStatus("error");
            }
        },
        [formType, locale, onSuccess, executeRecaptcha]
    );

    // ── Success screen ──
    if (status === "success") {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-center py-12 ${className}`}
            >
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-heading text-h3 text-neutral-900 mb-2">
                    {isFr ? "Demande envoyée !" : "Request sent!"}
                </h3>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                    {isFr
                        ? "Notre équipe vous contactera sous 24h ouvrables."
                        : "Our team will contact you within 24 business hours."}
                </p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        reset();
                    }}
                    className="text-sm text-primary hover:underline"
                >
                    {isFr ? "Envoyer une autre demande" : "Send another request"}
                </button>
            </motion.div>
        );
    }

    return (
        <div className={className}>
            {/* ── Form Type Tabs ── */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(FORM_TYPE_CONFIG) as LeadFormType[]).map(
                        (type) => {
                            const tc = FORM_TYPE_CONFIG[type];
                            const isActive = type === formType;
                            return (
                                <button
                                    key={type}
                                    onClick={() => switchType(type)}
                                    className={`
                                        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                        }
                                    `}
                                >
                                    <span>{tc.icon}</span>
                                    <span>{isFr ? tc.fr : tc.en}</span>
                                </button>
                            );
                        }
                    )}
                </div>
            </div>

            {/* ── Form Header ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={formType}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center text-lg`}
                        >
                            {config.icon}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-neutral-900">
                            {isFr ? config.fr : config.en}
                        </h3>
                    </div>
                    <p className="text-sm text-neutral-500 mb-6">
                        {isFr
                            ? config.description.fr
                            : config.description.en}
                    </p>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Common identity fields (all types) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                label={isFr ? "Prénom" : "First name"}
                                name="firstName"
                                register={register("firstName")}
                                error={errors.firstName as any}
                                placeholder="Jean"
                                required
                                autoComplete="given-name"
                            />
                            <FormField
                                label={isFr ? "Nom" : "Last name"}
                                name="lastName"
                                register={register("lastName")}
                                error={errors.lastName as any}
                                placeholder="Dupont"
                                required
                                autoComplete="family-name"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                register={register("email")}
                                error={errors.email as any}
                                placeholder="jean@entreprise.com"
                                required
                                autoComplete="email"
                                icon={
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                }
                            />
                            <FormField
                                label={isFr ? "Téléphone" : "Phone"}
                                name="phone"
                                type="tel"
                                register={register("phone")}
                                error={errors.phone as any}
                                placeholder="+33 6 12 34 56 78"
                                autoComplete="tel"
                                icon={
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                label={isFr ? "Société" : "Company"}
                                name="company"
                                register={register("company")}
                                error={errors.company as any}
                                placeholder={isFr ? "Nom de votre société" : "Company name"}
                                required
                                autoComplete="organization"
                            />
                            <FormSelect
                                label={isFr ? "Pays" : "Country"}
                                name="country"
                                register={register("country")}
                                error={errors.country as any}
                                placeholder={isFr ? "Sélectionnez un pays" : "Select a country"}
                                required
                                options={COUNTRY_OPTIONS.map((c) => ({
                                    value: c.value,
                                    label: c.label,
                                }))}
                            />
                        </div>

                        {/* ── Dynamic fields per form type ── */}

                        {/* Quote: Product + Quantity + Incoterm */}
                        {formType === "quote" && (
                            <>
                                <ProductSelector
                                    register={register("product")}
                                    setValue={setValue}
                                    error={errors.product as any}
                                    locale={locale}
                                    required
                                    selectedValue={productValue}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        label={isFr ? "Quantité souhaitée" : "Desired quantity"}
                                        name="quantity"
                                        register={register("quantity")}
                                        error={errors.quantity as any}
                                        placeholder={isFr ? "ex: 5 MT / mois" : "e.g. 5 MT / month"}
                                        required
                                    />
                                    <IncotermSelector
                                        register={register("incoterm")}
                                        setValue={setValue}
                                        error={errors.incoterm as any}
                                        locale={locale}
                                        selectedValue={incotermValue}
                                    />
                                </div>
                            </>
                        )}

                        {/* Sample: Product + Purpose + Shipping */}
                        {formType === "sample" && (
                            <>
                                <ProductSelector
                                    register={register("product")}
                                    setValue={setValue}
                                    error={errors.product as any}
                                    locale={locale}
                                    required
                                    selectedValue={productValue}
                                />
                                <FormField
                                    label={isFr ? "Usage prévu" : "Intended purpose"}
                                    name="purpose"
                                    register={register("purpose")}
                                    error={errors.purpose as any}
                                    placeholder={isFr ? "ex: R&D chocolaterie" : "e.g. R&D chocolate making"}
                                    required
                                />
                                <FormTextarea
                                    label={isFr ? "Adresse de livraison" : "Shipping address"}
                                    name="shippingAddress"
                                    register={register("shippingAddress")}
                                    error={errors.shippingAddress as any}
                                    placeholder={isFr ? "Adresse complète pour l'envoi de l'échantillon" : "Full shipping address for sample delivery"}
                                    required
                                    rows={2}
                                />
                            </>
                        )}

                        {/* Specs: Product + Application + Certifications */}
                        {formType === "specs" && (
                            <>
                                <ProductSelector
                                    register={register("product")}
                                    setValue={setValue}
                                    error={errors.product as any}
                                    locale={locale}
                                    required
                                    selectedValue={productValue}
                                />
                                <FormSelect
                                    label={isFr ? "Application" : "Application"}
                                    name="application"
                                    register={register("application")}
                                    error={errors.application as any}
                                    placeholder={isFr ? "Sélectionnez une application" : "Select an application"}
                                    required
                                    options={APPLICATION_OPTIONS.map((a) => ({
                                        value: a.value,
                                        label: isFr ? a.fr : a.en,
                                    }))}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        {isFr ? "Certifications requises" : "Required certifications"}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {CERTIFICATION_OPTIONS.map((cert) => {
                                            const currentVal = watch("certifications") || "";
                                            const selected = currentVal.includes(cert.value);
                                            return (
                                                <button
                                                    key={cert.value}
                                                    type="button"
                                                    onClick={() => {
                                                        const arr = currentVal
                                                            ? currentVal.split(",").filter(Boolean)
                                                            : [];
                                                        const next = selected
                                                            ? arr.filter((v: string) => v !== cert.value)
                                                            : [...arr, cert.value];
                                                        setValue("certifications", next.join(","));
                                                    }}
                                                    className={`
                                                        px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                                        ${selected
                                                            ? "bg-primary/10 border-primary/30 text-primary"
                                                            : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:border-neutral-300"
                                                        }
                                                    `}
                                                >
                                                    {selected && "✓ "}
                                                    {cert.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Partnership: Type + Annual volume */}
                        {formType === "partnership" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormSelect
                                    label={isFr ? "Type de partenariat" : "Partnership type"}
                                    name="partnershipType"
                                    register={register("partnershipType")}
                                    error={errors.partnershipType as any}
                                    placeholder={isFr ? "Sélectionnez un type" : "Select a type"}
                                    required
                                    options={[
                                        { value: "distributor", label: isFr ? "Distributeur" : "Distributor" },
                                        { value: "agent", label: isFr ? "Agent commercial" : "Sales Agent" },
                                        { value: "importer", label: isFr ? "Importateur" : "Importer" },
                                        { value: "private_label", label: isFr ? "Marque privée" : "Private Label" },
                                        { value: "other", label: isFr ? "Autre" : "Other" },
                                    ]}
                                />
                                <FormField
                                    label={isFr ? "Volume annuel estimé" : "Estimated annual volume"}
                                    name="annualVolume"
                                    register={register("annualVolume")}
                                    error={errors.annualVolume as any}
                                    placeholder={isFr ? "ex: 50 MT / an" : "e.g. 50 MT / year"}
                                    required
                                />
                            </div>
                        )}

                        {/* Transit: Commodity + Origin + Destination + Volume */}
                        {formType === "transit" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        label={isFr ? "Marchandise" : "Commodity"}
                                        name="commodity"
                                        register={register("commodity")}
                                        error={errors.commodity as any}
                                        placeholder={isFr ? "ex: Fèves de cacao" : "e.g. Cocoa beans"}
                                        required
                                    />
                                    <FormField
                                        label={isFr ? "Volume" : "Volume"}
                                        name="volume"
                                        register={register("volume")}
                                        error={errors.volume as any}
                                        placeholder={isFr ? "ex: 20 conteneurs / an" : "e.g. 20 containers / year"}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        label={isFr ? "Origine" : "Origin"}
                                        name="origin"
                                        register={register("origin")}
                                        error={errors.origin as any}
                                        placeholder={isFr ? "Ville / Port d'origine" : "City / Port of origin"}
                                        required
                                    />
                                    <FormField
                                        label="Destination"
                                        name="destination"
                                        register={register("destination")}
                                        error={errors.destination as any}
                                        placeholder={isFr ? "Ville / Port de destination" : "City / Destination port"}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Message (all types) */}
                        <FormTextarea
                            label={isFr ? "Message" : "Message"}
                            name="message"
                            register={register("message")}
                            error={errors.message as any}
                            placeholder={
                                formType === "partnership"
                                    ? isFr
                                        ? "Présentez votre société et votre marché..."
                                        : "Present your company and market..."
                                    : isFr
                                        ? "Précisez votre demande..."
                                        : "Describe your request..."
                            }
                            required={formType === "partnership"}
                            rows={4}
                        />

                        {/* Submit */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {isFr ? "Envoi en cours..." : "Sending..."}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {isFr ? "Envoyer la demande" : "Send request"}
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-neutral-400">
                                {isFr
                                    ? "Nous répondons sous 24h ouvrables."
                                    : "We respond within 24 business hours."}
                            </p>
                        </div>

                        {/* reCAPTCHA privacy notice (required when badge is hidden) */}
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            {isFr ? (
                                <>
                                    Ce site est protégé par reCAPTCHA et les{" "}
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
                                        Règles de confidentialité
                                    </a>{" "}
                                    et les{" "}
                                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
                                        Conditions d&apos;utilisation
                                    </a>{" "}
                                    de Google s&apos;appliquent.
                                </>
                            ) : (
                                <>
                                    This site is protected by reCAPTCHA and the Google{" "}
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
                                        Privacy Policy
                                    </a>{" "}
                                    and{" "}
                                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">
                                        Terms of Service
                                    </a>{" "}
                                    apply.
                                </>
                            )}
                        </p>

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100"
                            >
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <p className="text-sm text-red-600">
                                    {isFr
                                        ? "Erreur lors de l'envoi. Veuillez réessayer."
                                        : "Error sending. Please try again."}
                                </p>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
