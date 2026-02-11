import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
    type LeadFormType,
    quoteFormSchema,
    sampleFormSchema,
    specsFormSchema,
    partnershipFormSchema,
    transitFormSchema,
    contactFormSchema,
    qcFormSchema,
} from "@/lib/schemas";
import { sendFormEmails } from "@/lib/mail";

// ─── Schema map ──────────────────────────────────────────
const SCHEMA_MAP: Record<string, z.ZodType> = {
    quote: quoteFormSchema,
    sample: sampleFormSchema,
    specs: specsFormSchema,
    partnership: partnershipFormSchema,
    transit: transitFormSchema,
    contact: contactFormSchema,
    qc: qcFormSchema,
};

// ─── Rate limiting (in-memory, per IP) ───────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max submissions
const RATE_LIMIT_WINDOW = 60_000; // per minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return false;
    }

    entry.count++;
    return true;
}

// ─── reCAPTCHA verification with retry ───────────────────
async function verifyRecaptcha(
    token: string,
    secret: string,
    retries = 2
): Promise<{ success: boolean; score: number; action: string }> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
                }
            );

            if (!res.ok) {
                if (attempt < retries) {
                    await new Promise((r) =>
                        setTimeout(r, 500 * (attempt + 1))
                    );
                    continue;
                }
                throw new Error(`reCAPTCHA API returned ${res.status}`);
            }

            const data = await res.json();
            return {
                success: data.success === true,
                score: data.score ?? 0,
                action: data.action ?? "",
            };
        } catch (err) {
            if (attempt < retries) {
                await new Promise((r) =>
                    setTimeout(r, 500 * (attempt + 1))
                );
                continue;
            }
            console.error("[reCAPTCHA] Verification failed after retries:", err);
            return { success: false, score: 0, action: "" };
        }
    }

    return { success: false, score: 0, action: "" };
}



// ─── POST handler ────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        // 1. Rate limiting
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    error: "Too many requests",
                    message: "Please wait before submitting again.",
                },
                { status: 429 }
            );
        }

        // 2. Parse body
        let body: Record<string, unknown>;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        // 3. Determine form type
        const formType = body.formType as string;
        if (!formType || !SCHEMA_MAP[formType]) {
            return NextResponse.json(
                {
                    error: "Invalid form type",
                    validTypes: Object.keys(SCHEMA_MAP),
                },
                { status: 400 }
            );
        }

        // 4. Validate with Zod
        const schema = SCHEMA_MAP[formType];
        const parseResult = schema.safeParse(body);

        if (!parseResult.success) {
            const fieldErrors: Record<string, string> = {};
            const issues = (parseResult as any).error?.issues || [];
            for (const issue of issues) {
                const path = issue.path?.join(".") || "unknown";
                fieldErrors[path] = issue.message;
            }

            return NextResponse.json(
                {
                    error: "Validation failed",
                    fields: fieldErrors,
                },
                { status: 422 }
            );
        }

        // 5. Verify reCAPTCHA
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaToken = body.recaptchaToken as string | undefined;

        if (recaptchaSecret) {
            if (!recaptchaToken) {
                return NextResponse.json(
                    { error: "reCAPTCHA token missing" },
                    { status: 403 }
                );
            }

            const captchaResult = await verifyRecaptcha(
                recaptchaToken,
                recaptchaSecret
            );

            if (!captchaResult.success) {
                return NextResponse.json(
                    { error: "reCAPTCHA verification failed" },
                    { status: 403 }
                );
            }

            if (captchaResult.score < 0.3) {
                console.warn(
                    `[reCAPTCHA] Low score (${captchaResult.score}) for ${ip} — blocking`
                );
                return NextResponse.json(
                    { error: "Request flagged as suspicious" },
                    { status: 403 }
                );
            }

            if (captchaResult.score < 0.5) {
                console.warn(
                    `[reCAPTCHA] Medium score (${captchaResult.score}) for ${ip} — allowing with warning`
                );
            }
        }

        // 6. Honeypot check (if client sends a hidden field)
        if (body._hp && String(body._hp).length > 0) {
            // Bot detected — silently accept but don't process
            console.warn(`[Honeypot] Bot detected from ${ip}`);
            return NextResponse.json(
                { success: true, message: "Form submitted successfully" },
                { status: 200 }
            );
        }

        // 7. Send emails (notification + confirmation)
        const locale = (body.locale as string) || "fr";
        const emailResults = await sendFormEmails(formType, body, ip, locale);

        // 8. Return success
        return NextResponse.json(
            {
                success: true,
                message: "Form submitted successfully",
                formType,
                emails: {
                    notification: emailResults.notification.success,
                    confirmation: emailResults.confirmation.success,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[Forms API] Unhandled error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
