import { z } from "zod";

// ─── Common field schemas ────────────────────────────────
export const emailSchema = z.email("Email invalide");

export const phoneSchema = z
    .string()
    .regex(
        /^\+?[\d\s()-]{7,20}$/,
        "Numéro invalide"
    )
    .optional()
    .or(z.literal(""));

export const companySchema = z
    .string()
    .min(2, "Minimum 2 caractères")
    .max(100, "Maximum 100 caractères");

export const messageSchema = z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(1000, "Maximum 1000 caractères");

export const quantitySchema = z
    .string()
    .min(1, "Requis")
    .max(50, "Maximum 50 caractères");

// ─── Product options ─────────────────────────────────────
export const PRODUCT_OPTIONS = [
    { value: "liqueur", fr: "Liqueur de cacao", en: "Cocoa Liquor" },
    { value: "beurre", fr: "Beurre de cacao", en: "Cocoa Butter" },
    { value: "poudre", fr: "Poudre de cacao", en: "Cocoa Powder" },
    { value: "tourteau", fr: "Tourteau de cacao", en: "Cocoa Cake" },
    { value: "nibs", fr: "Grué de cacao", en: "Cocoa Nibs" },
    { value: "masse", fr: "Masse de cacao", en: "Cocoa Mass" },
    { value: "other", fr: "Autre", en: "Other" },
] as const;

export type ProductOption = (typeof PRODUCT_OPTIONS)[number]["value"];

export const productSchema = z.enum(
    PRODUCT_OPTIONS.map((p) => p.value) as [string, ...string[]],
    { message: "Sélectionnez un produit" }
);

// ─── Incoterm options ────────────────────────────────────
export const INCOTERM_OPTIONS = [
    { value: "FOB", label: "FOB – Free on Board" },
    { value: "CIF", label: "CIF – Cost, Insurance & Freight" },
    { value: "CFR", label: "CFR – Cost & Freight" },
    { value: "EXW", label: "EXW – Ex Works" },
    { value: "FCA", label: "FCA – Free Carrier" },
    { value: "other", label: "Autre / Other" },
] as const;

export type IncotermOption = (typeof INCOTERM_OPTIONS)[number]["value"];

export const incotermSchema = z.enum(
    INCOTERM_OPTIONS.map((i) => i.value) as [string, ...string[]],
    { message: "Sélectionnez un incoterm" }
);

// ─── Quote Form Schema ───────────────────────────────────
export const quoteFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    country: z.string().min(2, "Requis"),
    product: productSchema,
    quantity: quantitySchema,
    incoterm: incotermSchema.optional(),
    message: messageSchema.optional().or(z.literal("")),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// ─── Sample Request Schema ───────────────────────────────
export const sampleFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    country: z.string().min(2, "Requis"),
    product: productSchema,
    purpose: z.string().min(5, "Minimum 5 caractères").max(200, "Maximum 200 caractères"),
    shippingAddress: z.string().min(10, "Adresse complète requise").max(300, "Maximum 300 caractères"),
});

export type SampleFormData = z.infer<typeof sampleFormSchema>;

// ─── Contact / General Schema ────────────────────────────
export const contactFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    subject: z.string().min(3, "Minimum 3 caractères"),
    message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── QC Inquiry Schema ───────────────────────────────────
export const qcFormSchema = z.object({
    email: emailSchema,
    company: companySchema,
    product: productSchema,
    topic: z.enum(["specs", "coa", "compliance", "custom", "other"], {
        message: "Sélectionnez un sujet",
    }),
    message: messageSchema,
});

export type QCFormData = z.infer<typeof qcFormSchema>;

// ─── Specs Request Schema ────────────────────────────────
export const specsFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    country: z.string().min(2, "Requis"),
    product: productSchema,
    application: z.string().min(3, "Minimum 3 caractères").max(200, "Maximum 200 caractères"),
    certifications: z.string().optional().or(z.literal("")),
    message: messageSchema.optional().or(z.literal("")),
});

export type SpecsFormData = z.infer<typeof specsFormSchema>;

// ─── Partnership Schema ──────────────────────────────────
export const partnershipFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    country: z.string().min(2, "Requis"),
    partnershipType: z.enum(["distributor", "agent", "importer", "private_label", "other"], {
        message: "Sélectionnez un type",
    }),
    annualVolume: z.string().min(1, "Requis").max(50, "Maximum 50 caractères"),
    message: messageSchema,
});

export type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

// ─── Transit/Logistics Schema ────────────────────────────
export const transitFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères"),
    lastName: z.string().min(2, "Minimum 2 caractères"),
    email: emailSchema,
    phone: phoneSchema,
    company: companySchema,
    country: z.string().min(2, "Requis"),
    commodity: z.string().min(2, "Requis").max(100, "Maximum 100 caractères"),
    origin: z.string().min(2, "Requis").max(100, "Maximum 100 caractères"),
    destination: z.string().min(2, "Requis").max(100, "Maximum 100 caractères"),
    volume: z.string().min(1, "Requis").max(50, "Maximum 50 caractères"),
    message: messageSchema.optional().or(z.literal("")),
});

export type TransitFormData = z.infer<typeof transitFormSchema>;

// ─── Lead Form Type ──────────────────────────────────────
export const LEAD_FORM_TYPES = [
    "quote",
    "sample",
    "specs",
    "partnership",
    "transit",
] as const;

export type LeadFormType = (typeof LEAD_FORM_TYPES)[number];

// ─── Country options ─────────────────────────────────────
export const COUNTRY_OPTIONS = [
    { value: "CM", label: "Cameroun" },
    { value: "FR", label: "France" },
    { value: "BE", label: "Belgique" },
    { value: "NL", label: "Pays-Bas / Netherlands" },
    { value: "DE", label: "Allemagne / Germany" },
    { value: "IT", label: "Italie / Italy" },
    { value: "ES", label: "Espagne / Spain" },
    { value: "GB", label: "Royaume-Uni / UK" },
    { value: "US", label: "États-Unis / USA" },
    { value: "CN", label: "Chine / China" },
    { value: "IN", label: "Inde / India" },
    { value: "TR", label: "Turquie / Turkey" },
    { value: "NG", label: "Nigeria" },
    { value: "GH", label: "Ghana" },
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "MA", label: "Maroc / Morocco" },
    { value: "SN", label: "Sénégal" },
    { value: "OTHER", label: "Autre / Other" },
] as const;

// ─── Application options ─────────────────────────────────
export const APPLICATION_OPTIONS = [
    { value: "chocolate", fr: "Chocolaterie", en: "Chocolate making" },
    { value: "confectionery", fr: "Confiserie", en: "Confectionery" },
    { value: "bakery", fr: "Boulangerie-pâtisserie", en: "Bakery & pastry" },
    { value: "dairy", fr: "Produits laitiers", en: "Dairy products" },
    { value: "beverage", fr: "Boissons", en: "Beverages" },
    { value: "cosmetics", fr: "Cosmétique", en: "Cosmetics" },
    { value: "pharma", fr: "Pharmaceutique", en: "Pharmaceutical" },
    { value: "industrial", fr: "Industriel", en: "Industrial" },
    { value: "other", fr: "Autre", en: "Other" },
] as const;

// ─── Certification options ───────────────────────────────
export const CERTIFICATION_OPTIONS = [
    { value: "iso22000", label: "ISO 22000" },
    { value: "haccp", label: "HACCP" },
    { value: "organic", label: "Bio / Organic" },
    { value: "fairtrade", label: "Fair Trade" },
    { value: "rainforest", label: "Rainforest Alliance" },
    { value: "kosher", label: "Kosher" },
    { value: "halal", label: "Halal" },
    { value: "eudr", label: "EUDR" },
    { value: "none", label: "Aucune / None" },
] as const;
