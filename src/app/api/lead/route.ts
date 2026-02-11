import { NextRequest, NextResponse } from "next/server";
import { POST as formsHandler } from "@/app/api/forms/route";

/**
 * Legacy /api/lead endpoint — forwards to /api/forms
 * for backward compatibility with BottomLeadForm and ProductCTABar.
 *
 * New forms should use /api/forms directly.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Map legacy fields to the new format
        const mappedBody = {
            formType: body.formType || "contact",
            firstName: body.firstName || body.name?.split(" ")[0] || "",
            lastName: body.lastName || body.name?.split(" ").slice(1).join(" ") || "",
            email: body.email || "",
            phone: body.phone || "",
            company: body.company || "",
            subject: body.productType || body.subject || "",
            message: body.description || body.message || body.details || "",
            recaptchaToken: body.recaptchaToken || "",
            ...body,
        };

        // Create a new request with the mapped body
        const newReq = new NextRequest(req.url.replace("/api/lead", "/api/forms"), {
            method: "POST",
            headers: req.headers,
            body: JSON.stringify(mappedBody),
        });

        return formsHandler(newReq);
    } catch (error) {
        console.error("[Lead API] Error forwarding to /api/forms:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
