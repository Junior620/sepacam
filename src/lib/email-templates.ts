/**
 * HTML email templates for SEPACAM form submissions.
 *
 * These are inlined HTML emails (no external CSS) for maximum
 * compatibility across email clients (Gmail, Outlook, Apple Mail, etc.).
 */

// ─── Brand colors ────────────────────────────────────────
const BRAND = {
    primary: "#1B5E3B",
    primaryLight: "#e8f5e9",
    accent: "#D4A843",
    text: "#1a1a1a",
    muted: "#666666",
    border: "#e5e5e5",
    bg: "#f8f8f8",
    white: "#ffffff",
};

// ─── Form type labels ────────────────────────────────────
const FORM_LABELS: Record<string, { fr: string; en: string }> = {
    quote: { fr: "Demande de devis", en: "Quote Request" },
    sample: { fr: "Demande d'échantillon", en: "Sample Request" },
    specs: { fr: "Spécifications sur mesure", en: "Custom Specifications" },
    partnership: { fr: "Partenariat commercial", en: "Commercial Partnership" },
    transit: { fr: "Transit & Logistique", en: "Transit & Logistics" },
    contact: { fr: "Contact général", en: "General Contact" },
    qc: { fr: "Question qualité", en: "Quality Inquiry" },
};

// ─── Field labels for display ────────────────────────────
const FIELD_LABELS: Record<string, { fr: string; en: string }> = {
    firstName: { fr: "Prénom", en: "First name" },
    lastName: { fr: "Nom", en: "Last name" },
    email: { fr: "Email", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    company: { fr: "Société", en: "Company" },
    country: { fr: "Pays", en: "Country" },
    product: { fr: "Produit", en: "Product" },
    quantity: { fr: "Quantité", en: "Quantity" },
    incoterm: { fr: "Incoterm", en: "Incoterm" },
    purpose: { fr: "Usage prévu", en: "Intended purpose" },
    shippingAddress: { fr: "Adresse de livraison", en: "Shipping address" },
    application: { fr: "Application", en: "Application" },
    certifications: { fr: "Certifications", en: "Certifications" },
    partnershipType: { fr: "Type de partenariat", en: "Partnership type" },
    annualVolume: { fr: "Volume annuel", en: "Annual volume" },
    commodity: { fr: "Marchandise", en: "Commodity" },
    origin: { fr: "Origine", en: "Origin" },
    destination: { fr: "Destination", en: "Destination" },
    volume: { fr: "Volume", en: "Volume" },
    subject: { fr: "Sujet", en: "Subject" },
    topic: { fr: "Sujet", en: "Topic" },
    message: { fr: "Message", en: "Message" },
};

// ─── Skipped fields (not shown in email) ─────────────────
const SKIP_FIELDS = new Set([
    "formType",
    "recaptchaToken",
    "submittedAt",
    "locale",
    "_hp",
]);

// ─── Shared layout wrapper ───────────────────────────────
function emailWrapper(content: string): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEPACAM</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};">
        <tr>
            <td align="center" style="padding:24px 16px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:${BRAND.white}; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color:${BRAND.primary}; padding:24px 32px; text-align:center;">
                            <h1 style="margin:0; color:${BRAND.white}; font-size:22px; font-weight:700; letter-spacing:1px;">
                                SEPACAM
                            </h1>
                            <p style="margin:4px 0 0; color:${BRAND.accent}; font-size:11px; letter-spacing:2px; text-transform:uppercase;">
                                Cacao Transformé du Cameroun
                            </p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding:32px;">
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px 32px; border-top:1px solid ${BRAND.border}; text-align:center;">
                            <p style="margin:0; color:${BRAND.muted}; font-size:11px; line-height:1.6;">
                                SEPACAM S.A. — Zone Industrielle de Bonabéri, Douala, Cameroun<br>
                                <a href="https://sepacam.com" style="color:${BRAND.primary}; text-decoration:none;">sepacam.com</a>
                                &nbsp;•&nbsp;
                                <a href="mailto:commercial@sepacam.com" style="color:${BRAND.primary}; text-decoration:none;">commercial@sepacam.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// ─── Build data table rows ───────────────────────────────
function buildDataRows(
    data: Record<string, unknown>,
    lang: "fr" | "en" = "fr"
): string {
    return Object.entries(data)
        .filter(([key]) => !SKIP_FIELDS.has(key))
        .filter(([, val]) => val !== undefined && val !== null && val !== "")
        .map(([key, val]) => {
            const label =
                FIELD_LABELS[key]?.[lang] ||
                key.charAt(0).toUpperCase() + key.slice(1);
            const value = String(val);
            return `
                <tr>
                    <td style="padding:8px 12px; border-bottom:1px solid ${BRAND.border}; color:${BRAND.muted}; font-size:13px; width:140px; vertical-align:top; font-weight:600;">
                        ${label}
                    </td>
                    <td style="padding:8px 12px; border-bottom:1px solid ${BRAND.border}; color:${BRAND.text}; font-size:13px; vertical-align:top;">
                        ${value.replace(/\n/g, "<br>")}
                    </td>
                </tr>`;
        })
        .join("");
}

// ═══════════════════════════════════════════════════════════
// NOTIFICATION EMAIL (to SEPACAM team)
// ═══════════════════════════════════════════════════════════

export function buildNotificationEmail(
    formType: string,
    data: Record<string, unknown>,
    ip: string
): { subject: string; html: string; text: string } {
    const label = FORM_LABELS[formType]?.fr || formType;
    const company = (data.company as string) || "N/A";
    const email = (data.email as string) || "N/A";
    const subject = `[SEPACAM] ${label} — ${company}`;

    const html = emailWrapper(`
        <div style="background:${BRAND.primaryLight}; border-radius:8px; padding:16px 20px; margin-bottom:24px;">
            <h2 style="margin:0 0 4px; color:${BRAND.primary}; font-size:18px;">
                📩 Nouvelle demande : ${label}
            </h2>
            <p style="margin:0; color:${BRAND.muted}; font-size:13px;">
                Reçu le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                — IP : ${ip}
            </p>
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">
            ${buildDataRows(data, "fr")}
        </table>

        <div style="margin-top:24px; text-align:center;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display:inline-block; background:${BRAND.primary}; color:${BRAND.white}; padding:12px 28px; border-radius:8px; text-decoration:none; font-size:14px; font-weight:600;">
                Répondre à ${email}
            </a>
        </div>
    `);

    // Plain text fallback
    const textLines = Object.entries(data)
        .filter(([key]) => !SKIP_FIELDS.has(key))
        .filter(([, val]) => val !== undefined && val !== null && val !== "")
        .map(([key, val]) => `${FIELD_LABELS[key]?.fr || key}: ${val}`)
        .join("\n");

    const text = `Nouvelle demande ${label}\n\nDe: ${company} (${email})\nIP: ${ip}\nDate: ${new Date().toISOString()}\n\n${textLines}`;

    return { subject, html, text };
}

// ═══════════════════════════════════════════════════════════
// CONFIRMATION EMAIL (to the user)
// ═══════════════════════════════════════════════════════════

export function buildConfirmationEmail(
    formType: string,
    data: Record<string, unknown>,
    locale: string = "fr"
): { subject: string; html: string; text: string } {
    const isFr = locale === "fr";
    const lang = locale as "fr" | "en";
    const label = FORM_LABELS[formType]?.[lang] || formType;
    const firstName = (data.firstName as string) || "";

    const subject = isFr
        ? `SEPACAM — Confirmation de votre ${label.toLowerCase()}`
        : `SEPACAM — Your ${label.toLowerCase()} confirmation`;

    const html = emailWrapper(`
        <h2 style="margin:0 0 16px; color:${BRAND.text}; font-size:20px;">
            ${isFr ? `Bonjour ${firstName},` : `Hello ${firstName},`}
        </h2>

        <p style="margin:0 0 16px; color:${BRAND.text}; font-size:14px; line-height:1.7;">
            ${isFr
            ? `Nous avons bien reçu votre <strong>${label.toLowerCase()}</strong>. Notre équipe commerciale l'examine actuellement et vous contactera dans un délai de <strong>24 heures ouvrables</strong>.`
            : `We have received your <strong>${label.toLowerCase()}</strong>. Our sales team is currently reviewing it and will contact you within <strong>24 business hours</strong>.`
        }
        </p>

        <div style="background:${BRAND.bg}; border-radius:8px; padding:20px; margin:24px 0;">
            <h3 style="margin:0 0 12px; color:${BRAND.primary}; font-size:15px;">
                ${isFr ? "📋 Récapitulatif de votre demande" : "📋 Your request summary"}
            </h3>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${buildDataRows(data, lang)}
            </table>
        </div>

        <p style="margin:0 0 12px; color:${BRAND.text}; font-size:14px; line-height:1.7;">
            ${isFr
            ? "En attendant, n'hésitez pas à consulter nos produits :"
            : "In the meantime, feel free to explore our products:"
        }
        </p>

        <div style="text-align:center; margin:24px 0;">
            <a href="https://sepacam.com/${locale}/produits-cacao"
               style="display:inline-block; background:${BRAND.primary}; color:${BRAND.white}; padding:12px 28px; border-radius:8px; text-decoration:none; font-size:14px; font-weight:600;">
                ${isFr ? "Voir nos produits" : "View our products"}
            </a>
        </div>

        <hr style="border:none; border-top:1px solid ${BRAND.border}; margin:24px 0;">

        <p style="margin:0; color:${BRAND.muted}; font-size:12px; line-height:1.6;">
            ${isFr
            ? "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email."
            : "If you did not make this request, you can safely ignore this email."
        }
        </p>
    `);

    const text = isFr
        ? `Bonjour ${firstName},\n\nNous avons bien reçu votre ${label.toLowerCase()}. Notre équipe vous contactera sous 24h ouvrables.\n\nCordialement,\nL'équipe SEPACAM`
        : `Hello ${firstName},\n\nWe have received your ${label.toLowerCase()}. Our team will contact you within 24 business hours.\n\nBest regards,\nThe SEPACAM team`;

    return { subject, html, text };
}
