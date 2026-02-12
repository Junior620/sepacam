"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = {
    [key: string]: string | number | boolean;
};

export const trackEvent = (eventName: string, params?: EventParams) => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA4_ID) {
        sendGAEvent("event", eventName, params || {});
        // Also log to console in dev
        if (process.env.NODE_ENV === "development") {
            console.log(`[Analytics] Tracked event: ${eventName}`, params);
        }
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
