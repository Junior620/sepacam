'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from 'next/script';

// IDs from environment variables
const gaId = process.env.NEXT_PUBLIC_GA4_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'sepacam.com';

export function Analytics() {
    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && <GoogleAnalytics gaId={gaId} />}

            {/* Vercel Analytics */}
            <VercelAnalytics />

            {/* Plausible Analytics (Privacy-focused) */}
            <Script
                defer
                data-domain={plausibleDomain}
                src="https://plausible.io/js/script.js"
                strategy="afterInteractive"
            />
        </>
    );
}
