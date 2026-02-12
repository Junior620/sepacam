"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = {
    [key: string]: string | number | boolean;
};

// Extend window interface for Plausible
declare global {
    interface Window {
        plausible?: (eventName: string, options?: { props?: EventParams }) => void;
    }
}

export const trackEvent = (eventName: string, params?: EventParams) => {
    // Google Analytics 4
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA4_ID) {
        sendGAEvent("event", eventName, params || {});
    }

    // Plausible Analytics
    if (typeof window !== "undefined" && window.plausible) {
        window.plausible(eventName, { props: params });
    }

    // Dev Logging
    if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Tracked event: ${eventName}`, params);
    }
};

export const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent("form_submission", {
        form_name: formName,
        success: success,
    });
};

export const trackLeadGen = (method: "email" | "phone" | "form") => {
    trackEvent("generate_lead", {
        method: method,
    });
};
