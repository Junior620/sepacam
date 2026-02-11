import { Resend } from "resend";

// ─── Singleton Resend client ─────────────────────────────
let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return null;

    if (!resendClient) {
        resendClient = new Resend(apiKey);
    }
    return resendClient;
}

// ─── Configuration ───────────────────────────────────────
export const EMAIL_CONFIG = {
    /** Sender address (must be verified in Resend dashboard) */
    from: process.env.EMAIL_FROM || "SEPACAM <noreply@sepacam.com>",

    /** SEPACAM team notification recipients */
    notifyTo: (process.env.NOTIFICATION_EMAIL || "commercial@sepacam.com")
        .split(",")
        .map((e) => e.trim()),

    /** Reply-to for team notifications */
    replyTo: process.env.EMAIL_REPLY_TO || "commercial@sepacam.com",
} as const;
