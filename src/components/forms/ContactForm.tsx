"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// Zod schema for form validation
const contactFormSchema = z.object({
    firstName: z.string().min(2, { message: "Minimum 2 caractères" }),
    lastName: z.string().min(2, { message: "Minimum 2 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    company: z.string().min(2, { message: "Minimum 2 caractères" }),
    phone: z.string().optional(),
    subject: z.string().min(1, { message: "Sélectionnez un sujet" }),
    message: z.string().min(10, { message: "Minimum 10 caractères" }),
    consent: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter les conditions",
    }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Animation variants
const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
};

const messageVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
};

export function ContactForm() {
    const t = useTranslations("contact.form");
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
        null
    );

    const searchParams = useSearchParams();
    const subjectParam = searchParams.get("subject");

    // Map URL params to valid form subjects
    const getInitialSubject = () => {
        if (!subjectParam) return "";
        if (["specs", "quality"].includes(subjectParam)) return "technical";
        return subjectParam; // quote, sample, etc.
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            phone: "",
            subject: getInitialSubject(),
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus(null);

        try {
            // TODO: Implement actual form submission with API route
            console.log("Form data:", data);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitStatus("success");
            reset();
        } catch {
            setSubmitStatus("error");
        }
    };

    const inputClasses = (hasError: boolean) =>
        `w-full px-4 py-3 rounded-xl border transition-all outline-none text-body ${hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
        }`;

    const labelClasses = "block text-small font-medium text-neutral-700 mb-2";

    const subjects = [
        { value: "", label: t("subject_options.select") },
        { value: "quote", label: t("subject_options.quote") },
        { value: "sample", label: t("subject_options.sample") },
        { value: "partnership", label: t("subject_options.partnership") },
        { value: "technical", label: t("subject_options.technical") },
        { value: "other", label: t("subject_options.other") },
    ];

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fieldVariants}>
                    <label htmlFor="firstName" className={labelClasses}>
                        {t("first_name")} *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        className={inputClasses(!!errors.firstName)}
                    />
                    <AnimatePresence mode="wait">
                        {errors.firstName && (
                            <motion.p
                                className="mt-1 text-xs text-red-500"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {errors.firstName.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                <motion.div variants={fieldVariants}>
                    <label htmlFor="lastName" className={labelClasses}>
                        {t("last_name")} *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        className={inputClasses(!!errors.lastName)}
                    />
                    <AnimatePresence mode="wait">
                        {errors.lastName && (
                            <motion.p
                                className="mt-1 text-xs text-red-500"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {errors.lastName.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={fieldVariants}>
                <label htmlFor="email" className={labelClasses}>
                    {t("email")} *
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={inputClasses(!!errors.email)}
                />
                <AnimatePresence mode="wait">
                    {errors.email && (
                        <motion.p
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Company */}
            <motion.div variants={fieldVariants}>
                <label htmlFor="company" className={labelClasses}>
                    {t("company")} *
                </label>
                <input
                    type="text"
                    id="company"
                    {...register("company")}
                    className={inputClasses(!!errors.company)}
                />
                <AnimatePresence mode="wait">
                    {errors.company && (
                        <motion.p
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {errors.company.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fieldVariants}>
                <label htmlFor="phone" className={labelClasses}>
                    {t("phone")}
                </label>
                <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={inputClasses(false)}
                />
            </motion.div>

            {/* Subject */}
            <motion.div variants={fieldVariants}>
                <label htmlFor="subject" className={labelClasses}>
                    {t("subject")} *
                </label>
                <select
                    id="subject"
                    {...register("subject")}
                    className={inputClasses(!!errors.subject)}
                >
                    {subjects.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <AnimatePresence mode="wait">
                    {errors.subject && (
                        <motion.p
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {errors.subject.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Message */}
            <motion.div variants={fieldVariants}>
                <label htmlFor="message" className={labelClasses}>
                    {t("message")} *
                </label>
                <textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    className={`${inputClasses(!!errors.message)} resize-none`}
                />
                <AnimatePresence mode="wait">
                    {errors.message && (
                        <motion.p
                            className="mt-1 text-xs text-red-500"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {errors.message.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Consent checkbox */}
            <motion.div variants={fieldVariants} className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="consent"
                    {...register("consent")}
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary accent-primary"
                />
                <div>
                    <label htmlFor="consent" className="text-small text-neutral-600">
                        {t("consent")}
                    </label>
                    <AnimatePresence mode="wait">
                        {errors.consent && (
                            <motion.p
                                className="mt-1 text-xs text-red-500"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {errors.consent.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={fieldVariants}>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                >
                    {t("submit")}
                </Button>
            </motion.div>

            {/* Status messages */}
            <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                    <motion.div
                        className="p-4 bg-green-50 rounded-xl text-green-700 text-small text-center border border-green-200"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {t("success_message")}
                    </motion.div>
                )}
                {submitStatus === "error" && (
                    <motion.div
                        className="p-4 bg-red-50 rounded-xl text-red-700 text-small text-center border border-red-200"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {t("error_message")}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
}
