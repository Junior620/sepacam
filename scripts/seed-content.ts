/**
 * Initial Content Structure for SEPACAM Sanity CMS
 * 
 * This file contains the seed data structure for initial content.
 * Run this script to populate your Sanity dataset with initial content.
 * 
 * Usage: npx tsx scripts/seed-content.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

// ============================================
// Site Settings
// ============================================
const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "SEPACAM - Société d'Exploitation des Produits Agricoles du Cameroun",
    description: "Leader de la transformation et de l'exportation de produits cacaotiers au Cameroun. Fournisseur B2B de liqueur, beurre et poudre de cacao de qualité premium.",
    url: "https://sepacam.com",
    contactInfo: {
        email: "commercial@sepacam.com",
        phone: "+237 233 42 XX XX",
        address: "Zone Industrielle de Douala, BP XXX, Douala, Cameroun",
        googleMapsUrl: "https://maps.google.com/?q=Douala,Cameroun",
    },
    socialLinks: {
        linkedin: "https://linkedin.com/company/sepacam",
    },
};

// ============================================
// Product Categories Data
// ============================================
const products = [
    {
        _type: "product",
        name: "Liqueur de Cacao",
        slug: { _type: "slug", current: "liqueur-cacao" },
        category: "cocoa",
        productType: "liquor",
        description: "Masse de cacao 100% pure, pressée à partir de fèves camerounaises sélectionnées. Idéale pour la fabrication de chocolat premium.",
        applications: ["chocolate", "confectionery", "beverages"],
        technicalSpecs: {
            fatContent: "52-56%",
            ph: "5.2-6.0",
            moisture: "<2%",
        },
        certifications: ["haccp", "iso22000"],
        moq: "20 tonnes (1 conteneur)",
        incoterms: ["FOB", "CIF", "CFR"],
    },
    {
        _type: "product",
        name: "Beurre de Cacao",
        slug: { _type: "slug", current: "beurre-cacao" },
        category: "cocoa",
        productType: "butter",
        description: "Beurre de cacao désodorisé de première qualité. Texture onctueuse et fondant parfait pour chocolaterie et cosmétique.",
        applications: ["chocolate", "cosmetics", "pharmaceutical"],
        technicalSpecs: {
            fatContent: "99.5% min",
            moisture: "<0.1%",
        },
        certifications: ["haccp", "iso22000"],
        moq: "10 tonnes",
        incoterms: ["FOB", "CIF"],
    },
    {
        _type: "product",
        name: "Poudre de Cacao Naturelle",
        slug: { _type: "slug", current: "poudre-cacao-naturelle" },
        category: "cocoa",
        productType: "powder",
        description: "Poudre de cacao non alcalinisée, couleur brun-rouge naturel. Saveur intense pour applications alimentaires.",
        applications: ["beverages", "biscuits", "confectionery"],
        technicalSpecs: {
            fatContent: "10-12%",
            ph: "5.0-5.8",
            mesh: "200",
            alkalized: false,
        },
        certifications: ["haccp"],
        moq: "5 tonnes",
        incoterms: ["FOB", "CIF", "EXW"],
    },
    {
        _type: "product",
        name: "Poudre de Cacao Alcalinisée",
        slug: { _type: "slug", current: "poudre-cacao-alcalinisee" },
        category: "cocoa",
        productType: "powder",
        description: "Poudre de cacao Dutch process, couleur foncée homogène. Goût doux pour chocolat chaud et pâtisserie.",
        applications: ["beverages", "biscuits", "confectionery"],
        technicalSpecs: {
            fatContent: "10-12%",
            ph: "7.0-7.8",
            mesh: "200",
            alkalized: true,
        },
        certifications: ["haccp", "iso22000"],
        moq: "5 tonnes",
        incoterms: ["FOB", "CIF"],
    },
    {
        _type: "product",
        name: "Tourteau de Cacao",
        slug: { _type: "slug", current: "tourteau-cacao" },
        category: "cocoa",
        productType: "cake",
        description: "Résidu du pressage de la liqueur de cacao. Matière première pour la production de poudre de cacao.",
        applications: ["beverages"],
        technicalSpecs: {
            fatContent: "10-24%",
            moisture: "<5%",
        },
        moq: "20 tonnes",
        incoterms: ["FOB"],
    },
    {
        _type: "product",
        name: "Nibs de Cacao",
        slug: { _type: "slug", current: "nibs-cacao" },
        category: "cocoa",
        productType: "nibs",
        description: "Éclats de fèves de cacao torréfiées et décortiquées. Ingrédient croustillant pour chocolaterie artisanale.",
        applications: ["chocolate", "confectionery"],
        technicalSpecs: {
            moisture: "<3%",
        },
        certifications: ["organic"],
        moq: "1 tonne",
        incoterms: ["FOB", "CIF", "DAP"],
    },
];

// ============================================
// Categories for Articles
// ============================================
const categories = [
    {
        _type: "category",
        title: "Marché du Cacao",
        slug: { _type: "slug", current: "marche-cacao" },
        description: "Analyses et tendances du marché mondial du cacao",
    },
    {
        _type: "category",
        title: "Actualités SEPACAM",
        slug: { _type: "slug", current: "actualites-sepacam" },
        description: "Nouvelles et annonces de l'entreprise",
    },
    {
        _type: "category",
        title: "Durabilité",
        slug: { _type: "slug", current: "durabilite" },
        description: "Nos initiatives en matière de développement durable",
    },
    {
        _type: "category",
        title: "Qualité",
        slug: { _type: "slug", current: "qualite" },
        description: "Standards de qualité et certifications",
    },
];

// ============================================
// Authors
// ============================================
const authors = [
    {
        _type: "author",
        name: "Équipe SEPACAM",
        slug: { _type: "slug", current: "equipe-sepacam" },
        bio: "L'équipe de communication et marketing de SEPACAM.",
    },
];

// ============================================
// Seed Function
// ============================================
async function seedContent() {
    console.log("🌱 Starting content seed...");

    try {
        // Create Site Settings
        console.log("📝 Creating site settings...");
        await client.createOrReplace(siteSettings);

        // Create Categories
        console.log("📂 Creating categories...");
        for (const category of categories) {
            await client.create(category);
        }

        // Create Authors
        console.log("✍️ Creating authors...");
        for (const author of authors) {
            await client.create(author);
        }

        // Create Products
        console.log("📦 Creating products...");
        for (const product of products) {
            await client.create(product);
        }

        console.log("✅ Content seed completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding content:", error);
        throw error;
    }
}

// Run if executed directly
seedContent();
