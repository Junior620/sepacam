import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getRevalidateTag } from "@/lib/sanity";

// Sanity webhook secret for verification
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

interface SanityWebhookPayload {
    _id: string;
    _type: string;
    _rev?: string;
    slug?: { current: string };
}

/**
 * POST /api/revalidate
 * Webhook handler for Sanity content updates
 * Triggers ISR revalidation for affected pages
 */
export async function POST(request: NextRequest) {
    try {
        // Verify webhook secret
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (SANITY_WEBHOOK_SECRET && token !== SANITY_WEBHOOK_SECRET) {
            return NextResponse.json(
                { message: "Invalid secret" },
                { status: 401 }
            );
        }

        const body: SanityWebhookPayload = await request.json();
        const { _type, _id, slug } = body;

        if (!_type) {
            return NextResponse.json(
                { message: "Missing document type" },
                { status: 400 }
            );
        }

        // Get the tag for this document type
        const tag = getRevalidateTag(_type);

        // Revalidate the tag
        await revalidateTag(tag, "default");

        // Log for debugging
        console.log(`[Revalidate] Type: ${_type}, ID: ${_id}, Tag: ${tag}`);

        // Return success response
        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            type: _type,
            id: _id,
            slug: slug?.current,
            tag,
        });
    } catch (error) {
        console.error("[Revalidate Error]", error);
        return NextResponse.json(
            { message: "Error revalidating", error: String(error) },
            { status: 500 }
        );
    }
}

// Also allow GET for testing
export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "Sanity revalidation webhook endpoint",
        usage: "POST with Sanity webhook payload",
    });
}
