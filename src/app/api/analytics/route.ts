import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation ──────────────────────────────────────────
const analyticsEventSchema = z.object({
    event: z.string().check(z.minLength(1), z.maxLength(100)),
    params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
    sessionId: z.string().check(z.maxLength(128)).optional(),
    locale: z.enum(["fr", "en"]).optional(),
    page: z.string().check(z.maxLength(500)).optional(),
});

type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

// ─── Rate limiting (in-memory, per IP) ───────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30; // max events per window
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

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

// ─── GA4 Measurement Protocol ────────────────────────────
async function sendToGA4(event: AnalyticsEvent, clientId: string) {
    const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
    const apiSecret = process.env.GA4_API_SECRET;

    if (!measurementId || !apiSecret) return;

    try {
        await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: clientId,
                    events: [
                        {
                            name: event.event,
                            params: {
                                ...event.params,
                                engagement_time_msec: "100",
                                session_id: event.sessionId,
                                page_location: event.page,
                                language: event.locale,
                            },
                        },
                    ],
                }),
            }
        );
    } catch (error) {
        console.error("[Analytics API] GA4 Measurement Protocol error:", error);
    }
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
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        // 2. Parse & validate body
        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const parseResult = analyticsEventSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parseResult.error.flatten() },
                { status: 422 }
            );
        }

        const event = parseResult.data;

        // 3. Generate client ID from session or IP
        const clientId = event.sessionId || ip.replace(/\./g, "");

        // 4. Log for observability
        if (process.env.NODE_ENV === "development") {
            console.log("[Analytics API]", event.event, event.params);
        }

        // 5. Forward to GA4 Measurement Protocol (non-blocking)
        sendToGA4(event, clientId);

        // 6. Return success immediately
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Analytics API] Unhandled error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
