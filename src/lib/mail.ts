import { getResendClient, EMAIL_CONFIG } from "@/lib/resend";
import {
    buildNotificationEmail,
    buildConfirmationEmail,
} from "@/lib/email-templates";

// ─── Types ───────────────────────────────────────────────
export type SendResult = {
    success: boolean;
    messageId?: string;
    error?: string;
};

// ─── Retry helper ────────────────────────────────────────
async function withRetry<T>(
    fn: () => Promise<T>,
    retries: number = 2,
    delayMs: number = 500
): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (attempt < retries) {
                await new Promise((r) =>
                    setTimeout(r, delayMs * Math.pow(2, attempt))
                );
            }
        }
    }
    throw lastError;
}

// ─── Send notification to SEPACAM team ───────────────────
export async function sendTeamNotification(
    formType: string,
    data: Record<string, unknown>,
    ip: string
): Promise<SendResult> {
    const resend = getResendClient();

    // Always log regardless of email config
    console.log("📩 [Mail] Team notification:", {
        formType,
        company: data.company,
        email: data.email,
        ip,
    });

    if (!resend) {
        console.warn(
            "[Mail] RESEND_API_KEY not configured — skipping email delivery"
        );
        return { success: true, messageId: "console-only" };
    }

    const { subject, html, text } = buildNotificationEmail(
        formType,
        data,
        ip
    );

    try {
        const result = await withRetry(async () => {
            const res = await resend.emails.send({
                from: EMAIL_CONFIG.from,
                to: EMAIL_CONFIG.notifyTo,
                replyTo: (data.email as string) || EMAIL_CONFIG.replyTo,
                subject,
                html,
                text,
                tags: [
                    { name: "form_type", value: formType },
                    { name: "source", value: "website" },
                ],
            });

            if (res.error) {
                throw new Error(res.error.message || "Resend API error");
            }

            return res;
        });

        console.log(
            `✅ [Mail] Team notification sent: ${result.data?.id || "unknown"}`
        );
        return { success: true, messageId: result.data?.id || undefined };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Unknown email error";
        console.error(`❌ [Mail] Team notification failed: ${message}`);
        return { success: false, error: message };
    }
}

// ─── Send confirmation to user ───────────────────────────
export async function sendUserConfirmation(
    formType: string,
    data: Record<string, unknown>,
    locale: string = "fr"
): Promise<SendResult> {
    const resend = getResendClient();
    const userEmail = data.email as string;

    if (!userEmail) {
        return { success: false, error: "No user email provided" };
    }

    console.log("📨 [Mail] User confirmation:", {
        formType,
        to: userEmail,
    });

    if (!resend) {
        console.warn(
            "[Mail] RESEND_API_KEY not configured — skipping confirmation email"
        );
        return { success: true, messageId: "console-only" };
    }

    const { subject, html, text } = buildConfirmationEmail(
        formType,
        data,
        locale
    );

    try {
        const result = await withRetry(async () => {
            const res = await resend.emails.send({
                from: EMAIL_CONFIG.from,
                to: [userEmail],
                replyTo: EMAIL_CONFIG.replyTo,
                subject,
                html,
                text,
                tags: [
                    { name: "form_type", value: formType },
                    { name: "email_type", value: "confirmation" },
                ],
            });

            if (res.error) {
                throw new Error(res.error.message || "Resend API error");
            }

            return res;
        });

        console.log(
            `✅ [Mail] User confirmation sent to ${userEmail}: ${result.data?.id || "unknown"}`
        );
        return { success: true, messageId: result.data?.id || undefined };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Unknown email error";
        console.error(
            `❌ [Mail] User confirmation failed for ${userEmail}: ${message}`
        );
        return { success: false, error: message };
    }
}

// ─── Send both emails (convenience) ─────────────────────
export async function sendFormEmails(
    formType: string,
    data: Record<string, unknown>,
    ip: string,
    locale: string = "fr"
): Promise<{
    notification: SendResult;
    confirmation: SendResult;
}> {
    // Send both in parallel
    const [notification, confirmation] = await Promise.allSettled([
        sendTeamNotification(formType, data, ip),
        sendUserConfirmation(formType, data, locale),
    ]);

    return {
        notification:
            notification.status === "fulfilled"
                ? notification.value
                : { success: false, error: String(notification.reason) },
        confirmation:
            confirmation.status === "fulfilled"
                ? confirmation.value
                : { success: false, error: String(confirmation.reason) },
    };
}
