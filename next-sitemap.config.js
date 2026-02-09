/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sepacam.com',
    generateRobotsTxt: true,
    exclude: ['/studio', '/admin', '/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio', '/admin', '/api/*'],
            },
        ],
    },
    // Generate a sitemap for each locale
    alternateRefs: [
        {
            href: 'https://sepacam.com/fr',
            hreflang: 'fr',
        },
        {
            href: 'https://sepacam.com/en',
            hreflang: 'en',
        },
    ],
}
