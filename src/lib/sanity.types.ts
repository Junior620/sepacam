import { PortableTextBlock } from "@portabletext/types";
import { type SanityImageSource } from "@sanity/image-url";

// Base Types
export interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
    caption?: string;
}

export interface Slug {
    _type: "slug";
    current: string;
}

// Product
export interface Product extends SanityBody {
    _type: "product";
    name: string;
    slug: Slug;
    category: "cocoa" | "coffee" | "other";
    productType: "liquor" | "butter" | "powder" | "cake" | "nibs" | "beans";
    description: string;
    longDescription: PortableTextBlock[];
    applications: string[];
    technicalSpecs: {
        fatContent?: string;
        ph?: string;
        mesh?: string;
        moisture?: string;
        microbiology?: string;
        alkalized?: boolean;
    };
    certifications: string[];
    packaging: {
        size: string;
        material: string;
    }[];
    moq: string;
    incoterms: string[];
    heroImage: Image;
    gallery: Image[];
    documents: {
        title: string;
        documentType: "spec_sheet" | "coa" | "certificate";
        asset: {
            url: string;
        };
    }[];
    seoTitle?: string;
    seoDescription?: string;
}

// Article
export interface Article extends SanityBody {
    _type: "article";
    title: string;
    slug: Slug;
    excerpt: string;
    content: PortableTextBlock[];
    featuredImage: Image;
    author: Author;
    publishedAt: string;
    categories: Category[];
    tags: string[];
    readingTime: number;
    seoTitle?: string;
    seoDescription?: string;
}

export interface Author extends SanityBody {
    _type: "author";
    name: string;
    slug: Slug;
    image: Image;
    bio: string;
}

export interface Category extends SanityBody {
    _type: "category";
    title: string;
    slug: Slug;
    description: string;
}

// Page
export interface Page extends SanityBody {
    _type: "page";
    title: string;
    slug: Slug;
    pageType: "about" | "contact" | "quality" | "traceability" | "sustainability" | "transit" | "services" | "other";
    heroImage: Image;
    content: PortableTextBlock[];
    sections: {
        title: string;
        content: PortableTextBlock[];
        image: Image;
        layout: "imageLeft" | "imageRight" | "fullWidth";
    }[];
    seoTitle?: string;
    seoDescription?: string;
}

// Site Settings
export interface SiteSettings extends SanityBody {
    _type: "siteSettings";
    title: string;
    description: string;
    url: string;
    ogImage: Image;
    contactInfo: {
        email: string;
        phone: string;
        address: string;
        googleMapsUrl: string;
    };
    socialLinks: {
        linkedin: string;
        twitter: string;
        youtube: string;
        facebook: string;
        instagram: string;
    };
}
