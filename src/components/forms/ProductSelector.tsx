"use client";

import { useState } from "react";
import {
    type FieldError,
    type UseFormRegisterReturn,
    type UseFormSetValue,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_OPTIONS } from "@/lib/schemas";

// ─── Types ───────────────────────────────────────────────
export type ProductSelectorProps = {
    register: UseFormRegisterReturn;
    setValue: UseFormSetValue<any>;
    error?: FieldError;
    locale: string;
    required?: boolean;
    selectedValue?: string;
    label?: string;
    className?: string;
};

// ─── Product icons ───────────────────────────────────────
const PRODUCT_ICONS: Record<string, string> = {
    liqueur: "🫕",
    beurre: "🧈",
    poudre: "🟤",
    tourteau: "🟫",
    nibs: "🌰",
    masse: "🍫",
    other: "📦",
};

export function ProductSelector({
    register,
    setValue,
    error,
    locale,
    required = false,
    selectedValue,
    label,
    className = "",
}: ProductSelectorProps) {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";
    const [isOpen, setIsOpen] = useState(false);

    const selectedProduct = PRODUCT_OPTIONS.find(
        (p) => p.value === selectedValue
    );

    const handleSelect = (value: string) => {
        setValue("product", value, { shouldValidate: true });
        setIsOpen(false);
    };

    const hasError = !!error;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                {label || (isFr ? "Produit" : "Product")}
                {required && <span className="text-red-400">*</span>}
            </label>

            {/* Hidden native select for form registration */}
            <select {...register} className="sr-only" tabIndex={-1}>
                <option value="" />
                {PRODUCT_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                        {p[lang]}
                    </option>
                ))}
            </select>

            {/* Custom selector */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-sm bg-neutral-50 border rounded-xl
                        transition-all duration-200 text-left
                        focus:outline-none focus:ring-2
                        ${hasError
                            ? "border-red-300 focus:ring-red-200"
                            : "border-neutral-200 focus:ring-primary/20 focus:border-primary"
                        }
                    `}
                >
                    {selectedProduct ? (
                        <>
                            <span className="text-lg">
                                {PRODUCT_ICONS[selectedProduct.value] || "📦"}
                            </span>
                            <span className="text-neutral-900">
                                {selectedProduct[lang]}
                            </span>
                        </>
                    ) : (
                        <span className="text-neutral-400">
                            {isFr
                                ? "Sélectionnez un produit"
                                : "Select a product"}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 text-neutral-400 ml-auto transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsOpen(false)}
                            />
                            {/* Dropdown */}
                            <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-elevation-2 z-20 overflow-hidden"
                            >
                                {PRODUCT_OPTIONS.map((product) => {
                                    const isSelected =
                                        product.value === selectedValue;
                                    return (
                                        <button
                                            key={product.value}
                                            type="button"
                                            onClick={() =>
                                                handleSelect(product.value)
                                            }
                                            className={`
                                                w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                                                ${isSelected
                                                    ? "bg-primary/5 text-primary font-medium"
                                                    : "hover:bg-neutral-50 text-neutral-700"
                                                }
                                            `}
                                        >
                                            <span className="text-lg">
                                                {PRODUCT_ICONS[product.value] ||
                                                    "📦"}
                                            </span>
                                            <span>{product[lang]}</span>
                                            {isSelected && (
                                                <svg
                                                    className="w-4 h-4 text-primary ml-auto"
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
                                            )}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
                {hasError && (
                    <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-red-500 flex items-center gap-1"
                    >
                        <svg
                            className="w-3 h-3 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
