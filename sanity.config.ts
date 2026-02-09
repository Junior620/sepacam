import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { StudioLogo } from "./sanity/components/StudioLogo";

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";


export default defineConfig({
    name: "sepacam-studio",
    title: "SEPACAM CMS",

    projectId,
    dataset,

    basePath: "/studio",

    studio: {
        components: {
            logo: StudioLogo,
        },
    },

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title("Contenu SEPACAM")
                    .items([
                        // Singleton: Site Settings
                        S.listItem()
                            .title("Paramètres du site")
                            .id("siteSettings")
                            .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
                        S.divider(),
                        // Dynamic Content
                        S.documentTypeListItem("product").title("Produits"),
                        S.documentTypeListItem("article").title("Articles (Blog/Insights)"),
                        S.documentTypeListItem("page").title("Pages"),
                        S.divider(),
                        // Metadata & Helpers
                        S.documentTypeListItem("author").title("Auteurs"),
                        S.documentTypeListItem("category").title("Catégories"),
                    ]),
        }),
        visionTool({ defaultApiVersion: "2024-01-01" }),
    ],

    schema: {
        types: schemaTypes,
    },

    // Branding
    theme: {
        /* This is a simple theme configuration. 
           For full control, Sanity recommends creating a theme plugin.
           However, basic variable overrides work for simple color matching.
        */
        // Note: Sanity V3 styling is complex, but basic branding can be passed via studio components or theme plugins. 
        // For this setup, we rely on the title and structure. Adding a full theme requires @sanity/ui theming which is verbose.
    },
});
