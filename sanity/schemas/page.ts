import { defineType, defineField } from "sanity";

export const page = defineType({
    name: "page",
    title: "Page",
    type: "document",
    groups: [
        { name: "content", title: "Contenu" },
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
            name: "pageType",
            title: "Type de page",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "À propos", value: "about" },
                    { title: "Contact", value: "contact" },
                    { title: "Qualité", value: "quality" },
                    { title: "Traçabilité", value: "traceability" },
                    { title: "Durabilité", value: "sustainability" },
                    { title: "Service Transit", value: "transit" },
                    { title: "Services", value: "services" },
                    { title: "Autre", value: "other" },
                ],
            },
        }),
        defineField({
            name: "heroImage",
            title: "Image de couverture",
            type: "image",
            group: "content",
            options: { hotspot: true },
        }),
        defineField({
            name: "content",
            title: "Contenu principal",
            type: "blockContent",
            group: "content",
        }),
        defineField({
            name: "sections",
            title: "Sections personnalisées",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    title: "Section",
                    fields: [
                        { name: "title", title: "Titre", type: "string" },
                        { name: "content", title: "Contenu", type: "blockContent" },
                        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                        {
                            name: "layout", title: "Disposition", type: "string", options: {
                                list: [
                                    { title: "Image à gauche", value: "imageLeft" },
                                    { title: "Image à droite", value: "imageRight" },
                                    { title: "Pleine largeur", value: "fullWidth" },
                                ],
                            }
                        },
                    ],
                },
            ],
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
});
