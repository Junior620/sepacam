import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Paramètres du site",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titre du site",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description par défaut",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "url",
            title: "URL du site",
            type: "url",
        }),
        defineField({
            name: "ogImage",
            title: "Image par défaut (Open Graph)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "contactInfo",
            title: "Informations de contact",
            type: "object",
            fields: [
                { name: "email", title: "Email", type: "string" },
                { name: "phone", title: "Téléphone", type: "string" },
                { name: "address", title: "Adresse", type: "text" },
                { name: "googleMapsUrl", title: "Lien Google Maps", type: "url" },
            ],
        }),
        defineField({
            name: "socialLinks",
            title: "Réseaux sociaux",
            type: "object",
            fields: [
                { name: "linkedin", title: "LinkedIn", type: "url" },
                { name: "twitter", title: "Twitter", type: "url" },
                { name: "youtube", title: "YouTube", type: "url" },
                { name: "facebook", title: "Facebook", type: "url" },
                { name: "instagram", title: "Instagram", type: "url" },
            ],
        }),
    ],
});
