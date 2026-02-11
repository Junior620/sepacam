import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { product, document: docTitle, documentType, timestamp } = body;

        // Log for analytics (can be extended to store in Sanity, database, or analytics service)
        console.log("[Download Track]", {
            product,
            document: docTitle,
            documentType,
            timestamp,
            ip: req.headers.get("x-forwarded-for") || "unknown",
            userAgent: req.headers.get("user-agent")?.substring(0, 100) || "unknown",
        });

        // TODO: Store in Sanity or analytics service
        // Example: await sanityWriteClient.create({
        //     _type: 'downloadEvent',
        //     product,
        //     document: docTitle,
        //     documentType,
        //     downloadedAt: timestamp,
        // });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to track download" },
            { status: 500 }
        );
    }
}
