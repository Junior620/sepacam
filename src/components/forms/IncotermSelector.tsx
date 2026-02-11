"use client";

import { useState } from "react";
import {
    type FieldError,
    type UseFormRegisterReturn,
    type UseFormSetValue,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { INCOTERM_OPTIONS } from "@/lib/schemas";

// ─── Types ───────────────────────────────────────────────
export type IncotermSelectorProps = {
    register: UseFormRegisterReturn;
    setValue: UseFormSetValue<any>;
    error?: FieldError;
    locale: string;
    required?: boolean;
    selectedValue?: string;
    label?: string;
    className?: string;
};

// ─── Incoterm descriptions ───────────────────────────────
const INCOTERM_DETAILS: Record<
    string,
    { fr: string; en: string; color: string }
> = {
    FOB: {
        fr: "Livré à bord du navire, port de Douala",
        en: "Delivered on board the vessel, Douala port",
        color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    CIF: {
        fr: "Fret et assurance inclus jusqu'au port de destination",
        en: "Freight and insurance included to destination port",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    CFR: {
        fr: "Fret inclus, assurance à la charge de l'acheteur",
        en: "Freight included, insurance at buyer's expense",
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    EXW: {
        fr: "Retrait usine Douala, transport à la charge de l'acheteur",
        en: "Pickup from Douala factory, transport at buyer's expense",
        color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    FCA: {
        fr: "Remise au transporteur désigné par l'acheteur",
        en: "Delivered to buyer's designated carrier",
        color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    other: {
        fr: "Conditions personnalisées à convenir",
        en: "Custom terms to be agreed",
        color: "bg-neutral-50 text-neutral-700 border-neutral-200",
    },
};

export function IncotermSelector({
    register,
    setValue,
    error,
    locale,
    required = false,
    selectedValue,
    label,
    className = "",
}: IncotermSelectorProps) {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";
    const [isOpen, setIsOpen] = useState(false);

    const selectedIncoterm = INCOTERM_OPTIONS.find(
        (i) => i.value === selectedValue
    );

    const handleSelect = (value: string) => {
        setValue("incoterm", value, { shouldValidate: true });
        setIsOpen(false);
    };

    const hasError = !!error;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                {label || "Incoterm"}
                {required && <span className="text-red-400">*</span>}
            </label>

            {/* Hidden native select for form registration */}
            <select {...register} className="sr-only" tabIndex={-1}>
                <option value="" />
                {INCOTERM_OPTIONS.map((i) => (
                    <option key={i.value} value={i.value}>
                        {i.label}
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
                    {selectedIncoterm ? (
                        <>
                            <span
                                className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-md border ${INCOTERM_DETAILS[selectedIncoterm.value]
                                        ?.color || ""
                                    }`}
                            >
                                {selectedIncoterm.value}
                            </span>
                            <span className="text-neutral-900 truncate">
                                {selectedIncoterm.label.split(" – ")[1] || selectedIncoterm.label}
                            </span>
                        </>
                    ) : (
                        <span className="text-neutral-400">
                            {isFr
                                ? "Sélectionnez un incoterm"
                                : "Select an incoterm"}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 text-neutral-400 ml-auto transition-transform shrink-0 ${isOpen ? "rotate-180" : ""
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
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-elevation-2 z-20 overflow-hidden max-h-72 overflow-y-auto"
                            >
                                {INCOTERM_OPTIONS.map((incoterm) => {
                                    const isSelected =
                                        incoterm.value === selectedValue;
                                    const details =
                                        INCOTERM_DETAILS[incoterm.value];
                                    return (
                                        <button
                                            key={incoterm.value}
                                            type="button"
                                            onClick={() =>
                                                handleSelect(incoterm.value)
                                            }
                                            className={`
                                                w-full flex flex-col gap-1 px-4 py-3 text-left transition-colors border-b border-neutral-50 last:border-0
                                                ${isSelected
                                                    ? "bg-primary/5"
                                                    : "hover:bg-neutral-50"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-md border ${details?.color || ""
                                                        }`}
                                                >
                                                    {incoterm.value.toUpperCase()}
                                                </span>
                                                <span
                                                    className={`text-sm ${isSelected
                                                            ? "text-primary font-medium"
                                                            : "text-neutral-700"
                                                        }`}
                                                >
                                                    {incoterm.label.split(" – ")[1] || incoterm.label}
                                                </span>
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
                                            </div>
                                            {details && (
                                                <p className="text-[11px] text-neutral-400 pl-9">
                                                    {isFr
                                                        ? details.fr
                                                        : details.en}
                                                </p>
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
