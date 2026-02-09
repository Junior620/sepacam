import { defineType, defineField } from "sanity";

export const product = defineType({
    name: "product",
    title: "Produit",
    type: "document",
    groups: [
        { name: "content", title: "Contenu", default: true },
        { name: "specs", title: "Spécifications" },
        { name: "media", title: "Médias" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "name",
            title: "Nom du produit",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: { source: "name", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Catégorie",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "Cacao", value: "cocoa" },
                    { title: "Café", value: "coffee" },
                    { title: "Autre", value: "other" },
                ],
            },
            initialValue: "cocoa",
        }),
        defineField({
            name: "productType",
            title: "Type de produit",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "Liqueur/Masse de cacao", value: "liquor" },
                    { title: "Beurre de cacao", value: "butter" },
                    { title: "Poudre de cacao", value: "powder" },
                    { title: "Tourteau de cacao", value: "cake" },
                    { title: "Nibs de cacao", value: "nibs" },
                    { title: "Fèves de cacao", value: "beans" },
                ],
            },
        }),
        defineField({
            name: "description",
            title: "Description courte",
            type: "text",
            group: "content",
            rows: 3,
        }),
        defineField({
            name: "longDescription",
            title: "Description détaillée",
            type: "blockContent",
            group: "content",
        }),
        defineField({
            name: "applications",
            title: "Applications",
            type: "array",
            group: "content",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Chocolaterie", value: "chocolate" },
                    { title: "Biscuiterie", value: "biscuits" },
                    { title: "Boissons", value: "beverages" },
                    { title: "Confiserie", value: "confectionery" },
                    { title: "Cosmétique", value: "cosmetics" },
                    { title: "Pharmaceutique", value: "pharmaceutical" },
                ],
            },
        }),
        // Technical Specifications
        defineField({
            name: "technicalSpecs",
            title: "Spécifications techniques",
            type: "object",
            group: "specs",
            fields: [
                { name: "fatContent", title: "Teneur en matière grasse (%)", type: "string" },
                { name: "ph", title: "pH", type: "string" },
                { name: "mesh", title: "Finesse (mesh)", type: "string" },
                { name: "moisture", title: "Humidité (%)", type: "string" },
                { name: "microbiology", title: "Microbiologie", type: "text" },
                { name: "alkalized", title: "Alcalinisé", type: "boolean" },
            ],
        }),
        defineField({
            name: "certifications",
            title: "Certifications",
            type: "array",
            group: "specs",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Bio / Organic", value: "organic" },
                    { title: "Rainforest Alliance", value: "rainforest" },
                    { title: "UTZ Certified", value: "utz" },
                    { title: "Fairtrade", value: "fairtrade" },
                    { title: "ISO 22000", value: "iso22000" },
                    { title: "HACCP", value: "haccp" },
                ],
            },
        }),
        defineField({
            name: "packaging",
            title: "Options de conditionnement",
            type: "array",
            group: "specs",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "size", title: "Taille", type: "string" },
                        { name: "material", title: "Matériau", type: "string" },
                    ],
                },
            ],
        }),
        defineField({
            name: "moq",
            title: "Quantité minimum de commande (MOQ)",
            type: "string",
            group: "specs",
        }),
        defineField({
            name: "incoterms",
            title: "Incoterms disponibles",
            type: "array",
            group: "specs",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "FOB", value: "FOB" },
                    { title: "CIF", value: "CIF" },
                    { title: "CFR", value: "CFR" },
                    { title: "EXW", value: "EXW" },
                    { title: "DAP", value: "DAP" },
                ],
            },
        }),
        // Media
        defineField({
            name: "heroImage",
            title: "Image principale",
            type: "image",
            group: "media",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte alternatif",
                    type: "string",
                },
            ],
        }),
        defineField({
            name: "gallery",
            title: "Galerie d'images",
            type: "array",
            group: "media",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Texte alternatif",
                            type: "string",
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "documents",
            title: "Documents techniques",
            type: "array",
            group: "media",
            of: [
                {
                    type: "file",
                    fields: [
                        { name: "title", title: "Titre", type: "string" },
                        {
                            name: "documentType", title: "Type", type: "string", options: {
                                list: [
                                    { title: "Fiche technique", value: "spec_sheet" },
                                    { title: "Certificat d'analyse", value: "coa" },
                                    { title: "Certificat", value: "certificate" },
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
    preview: {
        select: {
            title: "name",
            subtitle: "productType",
            media: "heroImage",
        },
    },
});
