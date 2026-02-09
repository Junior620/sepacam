import { defineType, defineField } from "sanity";

export const article = defineType({
    name: "article",
    title: "Article / Insight",
    type: "document",
    groups: [
        { name: "content", title: "Contenu", default: true },
        { name: "meta", title: "Métadonnées" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Extrait",
            type: "text",
            group: "content",
            rows: 3,
            description: "Court résumé de l'article (affiché dans les listes)",
        }),
        defineField({
            name: "content",
            title: "Contenu",
            type: "blockContent",
            group: "content",
        }),
        defineField({
            name: "featuredImage",
            title: "Image principale",
            type: "image",
            group: "content",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte alternatif",
                    type: "string",
                },
            ],
        }),
        // Metadata
        defineField({
            name: "author",
            title: "Auteur",
            type: "reference",
            group: "meta",
            to: [{ type: "author" }],
        }),
        defineField({
            name: "publishedAt",
            title: "Date de publication",
            type: "datetime",
            group: "meta",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "categories",
            title: "Catégories",
            type: "array",
            group: "meta",
            of: [{ type: "reference", to: [{ type: "category" }] }],
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            group: "meta",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        }),
        defineField({
            name: "readingTime",
            title: "Temps de lecture (minutes)",
            type: "number",
            group: "meta",
        }),
        // SEO
        defineField({
            name: "seoTitle",
            title: "Titre SEO",
            type: "string",
            group: "seo",
        }),
        defineField({
            name: "seoDescription",
            title: "Description SEO",
            type: "text",
            group: "seo",
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: "title",
            author: "author.name",
            date: "publishedAt",
            media: "featuredImage",
        },
        prepare({ title, author, date, media }) {
            return {
                title,
                subtitle: `${author || "Anonyme"} - ${date ? new Date(date).toLocaleDateString("fr-FR") : "Non publié"}`,
                media,
            };
        },
    },
    orderings: [
        {
            title: "Date de publication",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
});
