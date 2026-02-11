"use client";

import { useCallback, useEffect, useRef } from "react";

// ─── Global type augmentation ────────────────────────────
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

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

/**
 * Hook to execute reCAPTCHA v3 token generation.
 *
 * The reCAPTCHA script is loaded globally via the layout <Script> tag.
 * This hook provides a simple `execute(action)` function that returns
 * a token string (or null if unavailable).
 *
 * @example
 * ```tsx
 * const { execute } = useRecaptcha();
 *
 * const handleSubmit = async (data) => {
 *   const token = await execute("lead_form");
 *   await fetch("/api/lead", {
 *     body: JSON.stringify({ ...data, recaptchaToken: token }),
 *   });
 * };
 * ```
 */
export function useRecaptcha() {
    const ready = useRef(false);

    useEffect(() => {
        if (!SITE_KEY) return;

        const check = () => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    ready.current = true;
                });
            }
        };

        // Check immediately and also set a delayed check
        check();
        const timer = setTimeout(check, 2000);
        return () => clearTimeout(timer);
    }, []);

    const execute = useCallback(
        async (action: string = "submit"): Promise<string | null> => {
            if (!SITE_KEY || !window.grecaptcha) return null;

            try {
                return await new Promise<string>((resolve, reject) => {
                    window.grecaptcha!.ready(() => {
                        window.grecaptcha!
                            .execute(SITE_KEY, { action })
                            .then(resolve)
                            .catch(reject);
                    });
                });
            } catch (e) {
                console.warn("[reCAPTCHA] Token generation failed:", e);
                return null;
            }
        },
        []
    );

    return { execute, siteKey: SITE_KEY };
}
