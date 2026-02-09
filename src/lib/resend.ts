import { Resend } from 'resend';

// Configure Resend using API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not defined. Email sending will be mocked or fail.');
}

export const resend = new Resend(resendApiKey || 're_123'); // Default bogus key to prevent crash if missing

export async function sendEmail({
    to,
    subject,
    html,
    replyTo = 'contact@sepacam.com',
    from = 'SEPACAM <noreply@sepacam.com>'
}: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    from?: string;
}) {
    try {
        const data = await resend.emails.send({
            from,
            to,
            subject,
            html,
            replyTo: replyTo,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}
