# SEPACAM - Documentation Projet

## 📋 Résumé du Projet

**SEPACAM** est un site web B2B corporate pour une entreprise camerounaise de transformation et d'export de cacao. Le site est multilingue (français/anglais) et vise la génération de leads qualifiés pour des clients internationaux.

### Objectifs Principaux
- **Lead Generation** : Formulaires de contact pour demandes de devis et échantillons
- **Image Premium** : Design moderne et professionnel pour crédibilité internationale
- **Catalogue Produits** : Présentation des produits cacao transformés (liqueur, beurre, poudre, tourteau, grué)
- **SEO International** : Optimisation pour visibilité globale

---

## 🛠️ Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 16.1.6 | Framework React avec App Router |
| **React** | 19.2.3 | UI Library |
| **TypeScript** | ^5 | Typage statique |
| **Tailwind CSS** | ^4 | Styling utility-first |
| **next-intl** | ^4.8.2 | Internationalisation (i18n) |
| **GSAP** | ^3.14.2 | Animations scroll-triggered |
| **Framer Motion** | ^12.33.0 | Animations React |
| **React Hook Form** | ^7.71.1 | Gestion formulaires |
| **Zod** | ^4.3.6 | Validation de schéma |
| **Sanity** | ^3.74.0 | CMS Headless (activé) |
| **Resend** | ^4.1.2 | Envoi d'emails (activé) |
| **Mapbox GL** | ^3.9.4 | Cartes interactives (activé) |
| **Google Analytics 4** | via @next/third-parties | Tracking (activé) |

### Polices
- **Outfit** : Titres (`--font-outfit`)
- **Inter** : Corps de texte (`--font-inter`)

---

## 📁 Structure du Projet

```
sepacamV3/
├── src/
│   ├── app/                      # App Router Next.js
│   │   ├── [locale]/             # Routes internationalisées
│   │   │   ├── layout.tsx        # Layout principal (avec Analytics)
│   │   │   ├── page.tsx          # Page d'accueil
│   │   │   ├── ...               # Autres pages
│   │   ├── studio/               # Route Sanity Studio (/studio)
│   │   ├── api/                  # Routes API Next.js
│   │   │   ├── contact/          # Endpoint formulaire contact
│   │   │   └── revalidate/       # Webhook revalidation ISR
│   │   ├── globals.css           # Styles globaux
│   │   └── favicon.ico
│   ├── components/
│   │   ├── forms/                # Formulaires
│   │   ├── home/                 # Sections page d'accueil
│   │   ├── layout/               # Header, Footer, etc.
│   │   └── ui/                   # Composants réutilisables
│   │       ├── Analytics.tsx     # GA4 + Plausible wrapper
│   │       ├── Map.tsx           # Composant Mapbox
│   │       └── ...
│   ├── hooks/                    # Custom Hooks
│   ├── i18n/                     # Configuration i18n
│   ├── lib/
│   │   ├── sanity.ts             # Client configuration & fetcher
│   │   ├── sanity.queries.ts     # Requêtes GROQ
│   │   ├── sanity.schemas.ts     # Définitions de schémas (deprecated, moved to studio folder)
│   │   ├── sanity.types.ts       # Types TypeScript générés
│   │   ├── resend.ts             # Client email
│   │   └── utils.ts              # Utilitaires
│   └── middleware.ts             # Middleware i18n
├── sanity/                       # Configuration Sanity Studio
│   └── schemas/                  # Définition des schémas de contenu
│       ├── product.ts            # Schéma Produit
│       ├── article.ts            # Schéma Article
│       ├── page.ts               # Schéma Page
│       └── ...
├── messages/                     # Traductions JSON (fr/en)
├── public/                       # Assets statiques
├── sanity.config.ts              # Config Sanity Studio
├── sanity.cli.ts                 # Config Sanity CLI
├── next-sitemap.config.js        # Config Sitemap generator
├── next.config.ts                # Configuration Next.js
├── tailwind.config.ts            # Configuration Tailwind
└── package.json                  # Dépendances
```

---

## 🌐 Internationalisation (i18n)

### Locales Supportées
- **Français (`fr`)** : Langue par défaut
- **Anglais (`en`)**

### Configuration

**Fichier `src/i18n/routing.ts`** - Définit les routes localisées :

```typescript
export const routing = defineRouting({
    locales: ["fr", "en"],
    defaultLocale: "fr",
    localePrefix: "always",  // URL toujours préfixée (/fr/, /en/)
    pathnames: {
        "/": "/",
        "/produits-cacao": { fr: "/produits-cacao", en: "/cocoa-products" },
        "/a-propos": { fr: "/a-propos", en: "/about" },
        "/transformation": { fr: "/transformation", en: "/processing" },
        // ...
    }
});
```

### Utilisation dans les Composants

**Composants Client :**
```tsx
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
    const t = useTranslations("namespace");
    return <p>{t("key")}</p>;
}
```

**Composants Serveur :**
```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations("namespace");
    return <p>{t("key")}</p>;
}
```

### Navigation Localisée

```tsx
import { Link } from "@/i18n/navigation";

<Link href="/produits-cacao">Produits</Link>
// → /fr/produits-cacao ou /en/cocoa-products selon la locale
```

---


---

## 🗄️ Gestion de Contenu (CMS)

Le projet utilise **Sanity CMS** pour la gestion de contenu dynamique.

### Accès au Studio
Le studio est intégré directement dans l'application à la route : `/studio` (localement `http://localhost:3002/studio`).

### Modélisation du Contenu (Schémas)

Les schémas sont définis dans `sanity/schemas/` et exportés via `src/app/studio/schemas`.

| Type Document | Description | Champs Clés |
|---------------|-------------|-------------|
| **Product** | Produits Cacao | `name`, `slug`, `technicalSpecs`, `applications`, `certifications`, `packaging` |
| **Article** | Blog/Insights | `title`, `slug`, `content` (PortableText), `author`, `categories` |
| **Page** | Pages statiques | `title`, `slug`, `sections` (Flexible Content), `seo` |
| **SiteSettings** | Global | `contactInfo`, `socialLinks`, `seoDefault` |
| **Author** | Auteurs | `name`, `bio`, `image` |
| **Category** | Catégories | `title`, `slug` |

### Intégration Technique (`src/lib/sanity.*`)

1.  **Client (`sanity.ts`)** : Configuration du client avec `next-sanity`.
2.  **Queries (`sanity.queries.ts`)** : Requêtes GROQ optimisées.
3.  **Types (`sanity.types.ts`)** : Interfaces TypeScript synchronisées avec les schémas.

---

## 🎨 Système de Design

### Couleurs (définies dans `tailwind.config.ts` et `globals.css`)

| Nom | Hex | Usage |
|-----|-----|-------|
| **primary** | `#1B5E3B` | Vert forêt - Couleur principale |
| **primary-light** | `#2E7D52` | Hover states |
| **primary-dark** | `#0D3D24` | Active states |
| **accent** | `#D4A853` | Or - Accent/CTA secondaire |
| **neutral-50** | `#FAFAFA` | Background clair |
| **neutral-600** | `#525252` | Texte body |
| **neutral-900** | `#171717` | Titres |

### Typographie

```css
/* Titres */
font-heading: Outfit, system-ui, sans-serif;

/* Corps */
font-body: Inter, system-ui, sans-serif;
```

### Tailles de Texte (`tailwind.config.ts`)

| Classe | Taille | Usage |
|--------|--------|-------|
| `text-display` | 4rem | Titres héro desktop |
| `text-display-sm` | 3rem | Titres héro mobile |
| `text-h1` | 3rem | H1 |
| `text-h2` | 2.25rem | H2 |
| `text-h3` | 1.5rem | H3 |
| `text-body` | 1rem | Paragraphes |
| `text-small` | 0.875rem | Labels, notes |

### Utilitaires CSS Personnalisés (`globals.css`)

```css
.container-main     /* Container responsive avec max-width 1400px */
.section-spacing    /* Padding vertical sections */
.gradient-hero      /* Fond gradient subtil */
.card-hover         /* Animation hover cartes */
.link-underline     /* Animation underline links */
```

---

## 🧩 Composants Principaux

### Button (`src/components/ui/Button.tsx`)

Bouton avec variants utilisant **class-variance-authority (CVA)** :

```tsx
<Button variant="primary" size="lg">Demander un devis</Button>
<Button variant="secondary" size="md">En savoir plus</Button>
<Button variant="ghost" size="sm">Annuler</Button>
```

**Variants disponibles :** `primary`, `secondary`, `accent`, `ghost`, `outline`, `link`
**Tailles :** `sm`, `md`, `lg`, `icon`
**Props additionnelles :** `isLoading`, `leftIcon`, `rightIcon`, `fullWidth`

### Card (`src/components/ui/Card.tsx`)

```tsx
<Card href="/produits-cacao/liqueur">
    <CardImage aspectRatio="aspect-[4/3]">
        <img src="..." alt="..." />
    </CardImage>
    <CardBody>
        <h3>Liqueur de cacao</h3>
        <p>Description...</p>
    </CardBody>
</Card>
```

### Badge (`src/components/ui/Badge.tsx`)

```tsx
<Badge variant="primary" size="md">Best Seller</Badge>
<Badge variant="accent">Export</Badge>
```

### ContactForm (`src/components/forms/ContactForm.tsx`)

Formulaire complet avec :
- Champs : prénom, nom, email, entreprise, téléphone, sujet, message
- Validation native HTML5
- États : normal, loading, success, error
- Consentement RGPD

---

## 🎬 Animations GSAP

### Configuration

GSAP et ScrollTrigger sont installés et configurés :
- `gsap: ^3.14.2`
- `@gsap/react: ^2.1.2` (hook `useGSAP`)

### Animations par Composant

| Composant | Type d'animation |
|-----------|------------------|
| **HeroSection** | Timeline staggered (titre, sous-titre, CTAs) |
| **StatsSection** | Counter animation + ScrollTrigger |
| **ProductsSection** | Header fadeUp + Cards stagger |
| **QualitySection** | Left/right slide + floating cards pop-in |
| **PolesSection** | Header fadeUp + Cards stagger |
| **CTABanner** | Content fadeUp + form slide-in |

### Hook `useScrollAnimation`

Hook réutilisable pour animations au scroll (`src/hooks/useScrollAnimation.ts`) :

```tsx
import { useScrollAnimation } from "@/hooks";

export function MyComponent() {
    const ref = useScrollAnimation({
        animation: "fadeUp",  // fadeUp, fadeIn, fadeLeft, fadeRight, scale, stagger
        duration: 0.8,
        delay: 0,
        start: "top 85%",    // Position ScrollTrigger
        stagger: 0.15,        // Pour animation: "stagger"
    });

    return <div ref={ref}>Contenu animé</div>;
}
```

### Composants d'Animation (`src/components/ui/AnimatedSection.tsx`)

**AnimatedSection** - Wrapper avec animation :
```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";

<AnimatedSection animation="fadeUp" delay={0.2}>
    <h2>Titre animé</h2>
</AnimatedSection>
```

**AnimatedGrid** - Grille avec stagger sur enfants :
```tsx
import { AnimatedGrid } from "@/components/ui/AnimatedSection";

<AnimatedGrid className="grid grid-cols-3 gap-4" stagger={0.1}>
    <Card />
    <Card />
    <Card />
</AnimatedGrid>
```

**AnimatedTimeline** - Animation timeline (page À propos) :
```tsx
<AnimatedTimeline className="space-y-8">
    <div className="relative">
        <div className="timeline-dot" />  {/* Dot animé */}
        <p>Événement 1</p>
    </div>
</AnimatedTimeline>
```

**Parallax** - Effet parallax au scroll :
```tsx
<Parallax speed={0.5}>
    <img src="..." />
</Parallax>
```

**TextReveal** - Révélation mot par mot :
```tsx
<TextReveal as="h1" splitBy="word">
    Titre qui apparaît mot par mot
</TextReveal>
```

### Pattern d'Animation Standard

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedComponent() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Animation header
            gsap.from(".section-header", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".section-header",
                    start: "top 85%",
                },
            });

            // Animation stagger sur éléments
            const items = gsap.utils.toArray<HTMLElement>(".card-item");
            gsap.from(items, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef}>
            <h2 className="section-header">Titre</h2>
            <div className="card-item">Card 1</div>
            <div className="card-item">Card 2</div>
        </section>
    );
}
```

### Easing Functions Recommandées

| Ease | Usage |
|------|-------|
| `power3.out` | Standard pour entrées |
| `power2.out` | Counters/nombres |
| `back.out(1.7)` | Pop-in éléments UI |
| `elastic.out(1, 0.3)` | Bounce subtil |

---

## 📄 Pages Principales

### Page d'Accueil (`/[locale]/page.tsx`)

Sections :
1. **HeroSection** - Titre principal, CTAs, badges de confiance
2. **PolesSection** - 3 pôles : Agro-Industrie, Transit, Services
3. **StatsSection** - Chiffres clés (producteurs, capacité, régions, expérience)
4. **ProductsSection** - Aperçu des 5 produits cacao
5. **QualitySection** - Qualité, traçabilité, conformité
6. **CTABanner** - Call-to-action email

### Catalogue Produits (`/[locale]/produits-cacao/page.tsx`)

- Liste des 5 produits avec cards
- Badges "Best Seller"
- Applications par produit
- Liens vers pages détaillées

### Produits Cacao

| Slug | Nom FR | Nom EN |
|------|--------|--------|
| `liqueur-cacao` | Liqueur de cacao | Cocoa Liquor |
| `beurre-cacao` | Beurre de cacao | Cocoa Butter |
| `poudre-cacao` | Poudre de cacao | Cocoa Powder |
| `tourteau-cacao` | Tourteau de cacao | Cocoa Cake |
| `grues-cacao` | Grué de cacao | Cocoa Nibs |

---

## 🔧 Configuration

### Scripts NPM (`package.json`)

```bash
npm run dev      # Développement (Webpack, pas Turbopack)
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # ESLint
```

> **Note :** `--webpack` est utilisé car Turbopack (par défaut en Next.js 16) a un bug avec les Google Fonts.

### Variables d'Environnement (`.env.example`)

```env
# Site
NEXT_PUBLIC_SITE_URL=https://sepacam.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx

# Email (Resend)
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@sepacam.com
EMAIL_TO_INTERNAL=commercial@sepacam.com

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=xxx

# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### Headers de Sécurité (`next.config.ts`)

- X-DNS-Prefetch-Control
- X-XSS-Protection
- X-Frame-Options (SAMEORIGIN)
- X-Content-Type-Options (nosniff)
- Referrer-Policy

---

## 📝 Fichiers de Traduction

Les traductions sont dans `/messages/fr.json` et `/messages/en.json`.

### Structure des Namespaces

```json
{
    "hero": { "title", "subtitle", "cta_primary", "cta_secondary" },
    "nav": { "home", "products", "about", "contact", ... },
    "poles": { "title", "agro", "transit", "services" },
    "stats": { "title", "producers", "capacity", "regions", "experience" },
    "products": { "title", "subtitle", "items": { "liquor", "butter", ... } },
    "quality": { "title", "subtitle", "points", "cta" },
    "contact": { "title", "subtitle", "form": { ... } },
    "footer": { "description", "links", "copyright" },
    "meta": { "home", "contact", "about", "products" },
    "common": { "learn_more", "loading", "error" }
}
```

---

## 🚀 Commandes de Développement

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm run start

# Lint
npm run lint
```

---

## 📌 Points d'Attention

### Bug Next.js 16 + Turbopack
Turbopack a un bug avec `next/font/google`. Solution : utiliser `--webpack` dans le script dev.

### Middleware Deprecation Warning
Next.js 16 indique que `middleware.ts` est deprecated. À migrer vers la nouvelle convention "proxy" dans le futur.

### Intégrations à Compléter
- [ ] API Route pour formulaire contact (`/api/contact`)
- [ ] Intégration Sanity CMS pour contenu dynamique
- [ ] Configuration Resend pour emails
- [ ] reCAPTCHA v3 sur les formulaires
- [ ] Analytics (GA4 ou Plausible)
- [ ] Carte Mapbox sur page contact

### SEO
- Metadata dynamiques par page/locale
- Alternates hreflang générés automatiquement
- Sitemap à générer

---

## 🎯 Contexte Business

**SEPACAM** (Société d'Exploitation des Produits Agricoles du Cameroun) est une entreprise multi-activités :

1. **Agro-Industrie** : Transformation du cacao camerounais
2. **Transit** : Services import/export au port de Douala
3. **Services** : Rénovation, nettoyage, désinsectisation

Le site cible des acheteurs B2B internationaux (chocolatiers, industriels, cosmétiques) recherchant du cacao transformé tracé et conforme aux normes export.

### Marque KAKAORA
Marque premium de SEPACAM pour les produits cacao haut de gamme.

---

## 📞 Support

Pour toute question sur le projet, consulter les fichiers source ou la documentation :
- [Next.js 16](https://nextjs.org/docs)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GSAP](https://gsap.com/docs/)

---

## ✅ État des Pages

| Route | Statut | Description |
|-------|--------|-------------|
| `/` | ✅ Complète | Page d'accueil avec toutes les sections |
| `/produits-cacao` | ✅ Complète | Catalogue des 5 produits cacao (Données CMS possible) |
| `/produits-cacao/[slug]` | ✅ Complète | Pages détaillées par produit (Données CMS possible) |
| `/a-propos` | ✅ Complète | Présentation entreprise, valeurs, timeline |
| `/contact` | ✅ Complète | Formulaire de contact + coordonnées |
| `/transformation` | ✅ Complète | Processus de transformation en 6 étapes |
| `/studio` | ✅ Complète | **Sanity Studio** pour gestion de contenu |
| `/qualite-laboratoire` | 🟡 À créer | CMS: Schéma `page` prêt |
| `/tracabilite-conformite` | 🟡 À créer | CMS: Schéma `page` prêt |
| `/durabilite` | 🟡 À créer | CMS: Schéma `page` prêt |
| `/kakaora` | 🟡 À créer | Marque premium (CMS: Schéma `page` prêt) |
| `/cafe` | 🟡 À créer | Activité café (CMS: Schéma `page` prêt) |
| `/transit` | 🟡 À créer | Services de transit (CMS: Schéma `page` prêt) |
| `/services` | 🟡 À créer | Prestations diverses (CMS: Schéma `page` prêt) |
| `/insights` | 🟡 À créer | Blog/Articles (CMS: Schéma `article` prêt) |
| `/insights/[slug]` | 🟡 À créer | Pages articles individuelles |
| `/merci` | ❌ À créer | Page de confirmation formulaire |
| `/mentions-legales` | ❌ À créer | Mentions légales |
| `/confidentialite` | ❌ À créer | Politique de confidentialité |
| `/code-conduite` | ❌ À créer | Code de conduite |

---

## 📋 TODO - Fonctionnalités à Implémenter

### Priorité Haute
- [ ] **API Route `/api/contact`** - Traitement du formulaire de contact avec Resend (Partiellement fait : helper `resend.ts` prêt)
- [ ] **reCAPTCHA v3** - Protection spam sur formulaire contact
- [ ] **Pages légales** - Mentions légales, confidentialité, cookies

### Priorité Moyenne
- [ ] **Pages manquantes** - Voir tableau ci-dessus
- [x] **Sanity CMS** - Intégration complète (Schémas, Studio, Types, Clients) ✅
- [x] **Sitemap.xml** - Génération automatique via `next-sitemap` ✅
- [ ] **robots.txt** - Configuration SEO (généré par next-sitemap)
- [ ] **Images réelles** - Remplacer les placeholders

### Priorité Basse
- [x] **Carte Mapbox** - Composant `Map.tsx` prêt ✅
- [x] **Analytics** - GA4 + Plausible configurés dans `layout.tsx` ✅
- [ ] **Page 404** - Design personnalisé
- [ ] **Page loading** - États de chargement
- [ ] **Dark mode** - Support thème sombre (préparé mais pas activé)

---

## 🔨 Guide de Création de Pages

### Étape 1 : Créer le fichier

```
src/app/[locale]/nouvelle-page/page.tsx
```

### Étape 2 : Structure de base

```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

// Metadata SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("nouvelle_page.title"),
        description: t("nouvelle_page.description"),
    };
}

// Page Component
export default async function NouvellePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    
    const isFr = locale === "fr";

    return (
        <>
            <Header />
            <main className="pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="section-spacing gradient-hero">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <Badge variant="primary" size="lg" className="mb-6">
                                {isFr ? "Badge FR" : "Badge EN"}
                            </Badge>
                            <h1 className="font-heading text-h1-sm lg:text-h1 text-neutral-900 mb-6">
                                {isFr ? "Titre FR" : "Title EN"}
                            </h1>
                            <p className="text-body lg:text-lg text-neutral-600">
                                {isFr ? "Description FR" : "Description EN"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="section-spacing bg-white">
                    <div className="container-main">
                        {/* Contenu */}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
```

### Étape 3 : Ajouter les traductions

Dans `messages/fr.json` et `messages/en.json` :

```json
{
    "meta": {
        "nouvelle_page": {
            "title": "Titre Page - SEPACAM",
            "description": "Description SEO de la page."
        }
    }
}
```

### Étape 4 : Ajouter la route i18n (optionnel)

Si les URLs doivent être différentes par langue, dans `src/i18n/routing.ts` :

```typescript
pathnames: {
    "/nouvelle-page": {
        fr: "/nouvelle-page",
        en: "/new-page",
    },
}
```

---

## 📐 Conventions de Code

### Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `HeroSection.tsx` |
| Fichiers pages | `page.tsx` | `src/app/[locale]/contact/page.tsx` |
| Utilitaires | camelCase | `utils.ts`, `cn()` |
| CSS classes | kebab-case | `container-main`, `section-spacing` |
| Variables CSS | kebab-case | `--color-primary`, `--font-heading` |

### Structure des Composants

```tsx
"use client"; // Si client component

import { ... } from "..."; // Imports externes
import { ... } from "@/..."; // Imports internes

// Types
interface Props {
    // ...
}

// Component
export function MonComposant({ props }: Props) {
    // Hooks
    const t = useTranslations("namespace");
    
    // State
    const [state, setState] = useState();
    
    // Effects
    useEffect(() => {}, []);
    
    // Handlers
    const handleClick = () => {};
    
    // Render
    return (
        <div>...</div>
    );
}
```

### Patterns Utilisés

1. **Textes bilingues inline** :
```tsx
const isFr = locale === "fr";
<p>{isFr ? "Texte français" : "English text"}</p>
```

2. **Traductions dynamiques avec objets** :
```tsx
{isFr 
    ? { key1: "Valeur 1", key2: "Valeur 2" }[item.key]
    : { key1: "Value 1", key2: "Value 2" }[item.key]}
```

3. **Classes conditionnelles** :
```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class")} />
```

4. **Composants avec variants (CVA)** :
```tsx
const variants = cva("base", {
    variants: {
        size: { sm: "...", md: "..." },
        variant: { primary: "...", secondary: "..." }
    },
    defaultVariants: { size: "md", variant: "primary" }
});
```

---

## ⚠️ Problèmes Connus

### 1. Turbopack + Google Fonts (Résolu)
- **Problème** : Turbopack (default Next.js 16) ne charge pas correctement `next/font/google`
- **Solution** : Utiliser `--webpack` dans le script dev

### 2. Middleware Deprecation Warning
- **Message** : `The "middleware" file convention is deprecated. Please use "proxy" instead.`
- **Impact** : Fonctionnel, juste un warning
- **Action** : Migration vers nouveau pattern "proxy" à planifier

### 3. Placeholders Images
- Toutes les images sont des placeholders (divs avec gradient)
- À remplacer par des vraies images (Sanity ou `/public`)

### 4. Formulaire Contact
- Le formulaire simule un envoi (`setTimeout`)
- À connecter à une vraie API Route avec Resend

### 5. Données Hardcodées
- Chiffres stats (producteurs, capacité) : "À confirmer"
- Timeline : dates à valider avec le client
- Numéro de téléphone : placeholder

---

## 🗂️ Templates Utiles

### Template Section Standard

```tsx
<section className="section-spacing bg-white">
    <div className="container-main">
        <div className="text-center mb-12">
            <h2 className="font-heading text-h2-sm lg:text-h2 text-neutral-900 mb-4">
                Titre Section
            </h2>
            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
                Description de la section.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contenu en grille */}
        </div>
    </div>
</section>
```

### Template CTA Section

```tsx
<section className="py-16 lg:py-24 bg-primary">
    <div className="container-main text-center">
        <h2 className="font-heading text-h2-sm lg:text-h2 text-white mb-4">
            Titre CTA
        </h2>
        <p className="text-body text-white/80 mb-8 max-w-xl mx-auto">
            Description incitative.
        </p>
        <Link href="/contact">
            <Button variant="accent" size="lg">
                Action
            </Button>
        </Link>
    </div>
</section>
```

### Template Card Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {items.map((item) => (
        <div
            key={item.key}
            className="bg-white p-6 rounded-2xl border border-neutral-200"
        >
            <div className="w-16 h-16 mb-4 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
                {item.icon}
            </div>
            <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                {item.title}
            </h3>
            <p className="text-small text-neutral-600">
                {item.description}
            </p>
        </div>
    ))}
</div>
```

---

## 🚨 Règles Importantes

1. **Toujours utiliser `params: Promise<{ locale: string }>`** - Next.js 16 utilise des params asynchrones
2. **Appeler `setRequestLocale(locale)`** - Au début de chaque page pour le rendu statique
3. **Ne pas oublier Header et Footer** - Dans chaque page
4. **Ajouter `pt-[var(--header-height)]`** - Sur le `<main>` pour compenser le header fixe
5. **Tester les deux langues** - Vérifier `/fr/...` et `/en/...`
