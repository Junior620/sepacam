import { defineType, defineField } from "sanity";

export const author = defineType({
    name: "author",
    title: "Auteur",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Nom",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
        }),
        defineField({
            name: "image",
            title: "Photo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "bio",
            title: "Biographie",
            type: "text",
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
});
