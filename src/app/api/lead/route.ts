import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, productType, description, recaptchaToken } = body;

        // Basic server-side validation
        if (!email || !productType || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA v3 token (if configured)
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
        if (recaptchaSecret && recaptchaToken) {
            const recaptchaRes = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
                }
            );

            const recaptchaData = await recaptchaRes.json();

            if (!recaptchaData.success || recaptchaData.score < 0.5) {
                return NextResponse.json(
                    { error: "reCAPTCHA verification failed" },
                    { status: 403 }
                );
            }
        }

        // TODO: Send email via Resend or store in Sanity/DB
        // For now, log the lead
        console.log("📩 New lead received:", {
            email,
            productType,
            description,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { success: true, message: "Lead received successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Lead form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
