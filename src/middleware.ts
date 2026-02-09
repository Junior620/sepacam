import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for:
    // - API routes
    // - Static files (images, fonts, etc.)
    // - _next (Next.js internals)
    // - Favicon, robots, sitemap
    matcher: [
        "/((?!api|studio|_next|_vercel|.*\\..*).*)",
        "/",
        "/(fr|en)/:path*",
    ],
};
