"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leadFormSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    productType: z.string().min(1, { message: "Sélectionnez un produit" }),
    description: z
        .string()
        .min(10, { message: "Minimum 10 caractères" })
        .max(500, { message: "Maximum 500 caractères" }),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const productTypes = [
    "liqueur",
    "beurre",
    "poudre",
    "tourteau",
    "nibs",
    "masse",
    "autre",
];

declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    }
}

export function BottomLeadForm() {
    const t = useTranslations("lead_form");
    const [submitStatus, setSubmitStatus] = useState<
        "success" | "error" | null
    >(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            email: "",
            productType: "",
            description: "",
        },
    });

    const descriptionValue = watch("description", "");

    // GSAP scroll reveal
    useGSAP(
        () => {
            gsap.from(".lead-form-content", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: sectionRef }
    );

    // Execute reCAPTCHA v3
    const executeRecaptcha = async (): Promise<string | null> => {
        if (!recaptchaSiteKey || !window.grecaptcha) return null;

        return new Promise((resolve) => {
            window.grecaptcha!.ready(() => {
                window.grecaptcha!
                    .execute(recaptchaSiteKey, { action: "lead_form" })
                    .then(resolve)
                    .catch(() => resolve(null));
            });
        });
    };

    const onSubmit = async (data: LeadFormData) => {
        setSubmitStatus(null);

        try {
            const recaptchaToken = await executeRecaptcha();

            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    recaptchaToken,
                }),
            });

            if (!res.ok) throw new Error("Submission failed");

            setSubmitStatus("success");
            reset();
        } catch {
            setSubmitStatus("error");
        }
    };

    const inputClasses = (hasError: boolean) =>
        `w-full px-4 py-3 rounded-xl border transition-all outline-none text-body bg-white/5 text-white placeholder:text-white/40 ${hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20"
        }`;

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="container-main relative z-10">
                <div className="lead-form-content max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider text-accent mb-6 border border-white/10">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            {t("badge")}
                        </div>
                        <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-body text-white/60">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="lead-email"
                                className="block text-small font-medium text-white/80 mb-2"
                            >
                                {t("email")} *
                            </label>
                            <input
                                type="email"
                                id="lead-email"
                                {...register("email")}
                                placeholder={t("email_placeholder")}
                                className={inputClasses(!!errors.email)}
                            />
                            <AnimatePresence mode="wait">
                                {errors.email && (
                                    <motion.p
                                        className="mt-1 text-xs text-red-400"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Product Type */}
                        <div>
                            <label
                                htmlFor="lead-product"
                                className="block text-small font-medium text-white/80 mb-2"
                            >
                                {t("product_type")} *
                            </label>
                            <select
                                id="lead-product"
                                {...register("productType")}
                                className={`${inputClasses(!!errors.productType)} appearance-none cursor-pointer`}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 12px center",
                                    backgroundSize: "20px",
                                }}
                            >
                                <option value="" className="bg-neutral-900 text-neutral-400">
                                    {t("product_select")}
                                </option>
                                {productTypes.map((type) => (
                                    <option
                                        key={type}
                                        value={type}
                                        className="bg-neutral-900 text-white"
                                    >
                                        {t(`products.${type}`)}
                                    </option>
                                ))}
                            </select>
                            <AnimatePresence mode="wait">
                                {errors.productType && (
                                    <motion.p
                                        className="mt-1 text-xs text-red-400"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {errors.productType.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="lead-description"
                                className="block text-small font-medium text-white/80 mb-2"
                            >
                                {t("description")} *
                            </label>
                            <textarea
                                id="lead-description"
                                {...register("description")}
                                rows={4}
                                placeholder={t("description_placeholder")}
                                className={`${inputClasses(!!errors.description)} resize-none`}
                            />
                            <div className="flex justify-between mt-1">
                                <AnimatePresence mode="wait">
                                    {errors.description && (
                                        <motion.p
                                            className="text-xs text-red-400"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {errors.description.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                <span
                                    className={`text-xs ml-auto ${descriptionValue.length > 450
                                            ? "text-red-400"
                                            : "text-white/30"
                                        }`}
                                >
                                    {descriptionValue.length}/500
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="accent"
                            size="lg"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            {t("submit")}
                        </Button>

                        {/* Status Messages */}
                        <AnimatePresence mode="wait">
                            {submitStatus === "success" && (
                                <motion.div
                                    className="p-4 bg-green-500/10 rounded-xl text-green-300 text-small text-center border border-green-500/20"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {t("success")}
                                    </div>
                                </motion.div>
                            )}
                            {submitStatus === "error" && (
                                <motion.div
                                    className="p-4 bg-red-500/10 rounded-xl text-red-300 text-small text-center border border-red-500/20"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    {t("error")}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Privacy + reCAPTCHA note */}
                        <p className="text-xs text-white/30 text-center leading-relaxed">
                            {t("privacy_note")}
                        </p>
                    </motion.form>
                </div>
            </div>

            {/* Load reCAPTCHA v3 script */}
            {recaptchaSiteKey && (
                <script
                    src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
                    async
                    defer
                />
            )}
        </section>
    );
}
