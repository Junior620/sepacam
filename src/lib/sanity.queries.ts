// GROQ Queries

// Products
export const productsQuery = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  slug,
  category,
  productType,
  description,
  heroImage
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  category,
  productType,
  description,
  longDescription,
  applications,
  technicalSpecs,
  certifications,
  packaging,
  moq,
  incoterms,
  heroImage,
  gallery,
  "documents": documents[]{
    title,
    documentType,
    "url": asset->url
  },
  seoTitle,
  seoDescription
}`;

export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(name asc) {
  _id,
  name,
  slug,
  productType,
  description,
  heroImage
}`;

// Articles
export const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featuredImage,
  "author": author->name,
  "categories": categories[]->title
}`;

export const latestArticlesQuery = `*[_type == "article"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featuredImage
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  publishedAt,
  featuredImage,
  "author": author->{name, image, bio},
  "categories": categories[]->title,
  tags,
  readingTime,
  seoTitle,
  seoDescription
}`;

// Pages
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  pageType,
  heroImage,
  content,
  sections,
  seoTitle,
  seoDescription
}`;

// Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  url,
  ogImage,
  contactInfo,
  socialLinks
}`;
