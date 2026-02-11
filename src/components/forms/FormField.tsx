"use client";

import { type ReactNode } from "react";
import {
    type FieldError,
    type UseFormRegisterReturn,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────
export type FormFieldProps = {
    label: string;
    name: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    type?: "text" | "email" | "tel" | "number" | "url";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    hint?: string;
    icon?: ReactNode;
    className?: string;
    autoComplete?: string;
};

export type TextareaFieldProps = Omit<FormFieldProps, "type"> & {
    rows?: number;
};

export type SelectFieldProps = {
    label: string;
    name: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    hint?: string;
    icon?: ReactNode;
    className?: string;
    options: { value: string; label: string }[];
};

// ─── Error animation ─────────────────────────────────────
const errorVariants = {
    hidden: { opacity: 0, y: -4, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: -4, height: 0 },
};

// ─── FormField (Input) ───────────────────────────────────
export function FormField({
    label,
    name,
    register,
    error,
    type = "text",
    placeholder,
    required,
    disabled,
    hint,
    icon,
    className = "",
    autoComplete,
}: FormFieldProps) {
    const hasError = !!error;
    const inputId = `field-${name}`;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label
                htmlFor={inputId}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-700"
            >
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    className={`
                        w-full text-sm bg-neutral-50 border rounded-xl px-4 py-2.5
                        transition-all duration-200
                        placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:bg-white
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${icon ? "pl-10" : ""}
                        ${hasError
                            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                            : "border-neutral-200 focus:ring-primary/20 focus:border-primary"
                        }
                    `}
                    {...register}
                />
            </div>
            {hint && !hasError && (
                <p id={`${inputId}-hint`} className="text-xs text-neutral-400">
                    {hint}
                </p>
            )}
            <AnimatePresence mode="wait">
                {hasError && (
                    <motion.p
                        id={`${inputId}-error`}
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="text-xs text-red-500 flex items-center gap-1"
                    >
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── FormTextarea ────────────────────────────────────────
export function FormTextarea({
    label,
    name,
    register,
    error,
    placeholder,
    required,
    disabled,
    hint,
    rows = 3,
    className = "",
}: TextareaFieldProps) {
    const hasError = !!error;
    const inputId = `field-${name}`;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label
                htmlFor={inputId}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-700"
            >
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <textarea
                id={inputId}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                className={`
                    w-full text-sm bg-neutral-50 border rounded-xl px-4 py-2.5
                    transition-all duration-200 resize-none
                    placeholder:text-neutral-400
                    focus:outline-none focus:ring-2 focus:bg-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${hasError
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                        : "border-neutral-200 focus:ring-primary/20 focus:border-primary"
                    }
                `}
                {...register}
            />
            {hint && !hasError && (
                <p id={`${inputId}-hint`} className="text-xs text-neutral-400">
                    {hint}
                </p>
            )}
            <AnimatePresence mode="wait">
                {hasError && (
                    <motion.p
                        id={`${inputId}-error`}
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="text-xs text-red-500 flex items-center gap-1"
                    >
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── FormSelect ──────────────────────────────────────────
export function FormSelect({
    label,
    name,
    register,
    error,
    required,
    disabled,
    placeholder,
    hint,
    icon,
    className = "",
    options,
}: SelectFieldProps) {
    const hasError = !!error;
    const inputId = `field-${name}`;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label
                htmlFor={inputId}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-700"
            >
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        {icon}
                    </div>
                )}
                <select
                    id={inputId}
                    disabled={disabled}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    className={`
                        w-full text-sm bg-neutral-50 border rounded-xl px-4 py-2.5
                        transition-all duration-200 appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:bg-white
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${icon ? "pl-10" : ""}
                        ${hasError
                            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                            : "border-neutral-200 focus:ring-primary/20 focus:border-primary"
                        }
                    `}
                    {...register}
                >
                    {placeholder && (
                        <option value="">{placeholder}</option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {hint && !hasError && (
                <p id={`${inputId}-hint`} className="text-xs text-neutral-400">
                    {hint}
                </p>
            )}
            <AnimatePresence mode="wait">
                {hasError && (
                    <motion.p
                        id={`${inputId}-error`}
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="text-xs text-red-500 flex items-center gap-1"
                    >
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
