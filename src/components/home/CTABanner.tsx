"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
    const t = useTranslations("cta_banner");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Animate content
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            // Animate form elements
            gsap.from(".cta-form", {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: sectionRef }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSuccess(true);
        setIsSubmitting(false);
        setEmail("");

        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800">
            <div className="container-main">
                <div ref={contentRef} className="max-w-2xl mx-auto text-center">
                    <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-body text-neutral-400 mb-8">{t("subtitle")}</p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="cta-form flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("placeholder")}
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            required
                        />
                        <Button
                            type="submit"
                            variant="accent"
                            size="md"
                            isLoading={isSubmitting}
                            disabled={isSuccess}
                        >
                            {isSuccess ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                t("button")
                            )}
                        </Button>
                    </form>

                    {/* Success message */}
                    {isSuccess && (
                        <p className="mt-4 text-small text-accent animate-fade-in">
                            Merci ! Nous vous contacterons bientôt.
                        </p>
                    )}

                    {/* Privacy note */}
                    <p className="mt-6 text-xs text-neutral-500">
                        En soumettant ce formulaire, vous acceptez notre politique de
                        confidentialité.
                    </p>
                </div>
            </div>
        </section>
    );
}

