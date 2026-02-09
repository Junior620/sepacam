import { urlFor, getOptimizedImageUrl, getResponsiveSrcSet, getBlurDataUrl } from "@/lib/sanity";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityImageProps {
    image: SanityImageSource & { alt?: string };
    alt?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
    quality?: number;
}

/**
 * Optimized Sanity Image component with blur placeholder
 * Uses Next.js Image with Sanity CDN optimization
 */
export function SanityImage({
    image,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className,
    quality = 80,
}: SanityImageProps) {
    if (!image) return null;

    const imageUrl = getOptimizedImageUrl(image, { width, height, quality });
    const blurDataURL = getBlurDataUrl(image);
    const altText = alt || (image as { alt?: string }).alt || "Image";

    if (fill) {
        return (
            <Image
                src={imageUrl}
                alt={altText}
                fill
                sizes={sizes}
                priority={priority}
                placeholder="blur"
                blurDataURL={blurDataURL}
                className={className}
            />
        );
    }

    return (
        <Image
            src={imageUrl}
            alt={altText}
            width={width || 800}
            height={height || 600}
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className={className}
        />
    );
}

/**
 * Background image component with overlay support
 */
export function SanityBackgroundImage({
    image,
    children,
    className = "",
    overlayOpacity = 0.5,
}: {
    image: SanityImageSource;
    children?: React.ReactNode;
    className?: string;
    overlayOpacity?: number;
}) {
    if (!image) return null;

    const imageUrl = getOptimizedImageUrl(image, { width: 1920, quality: 75 });

    return (
        <div
            className={`relative ${className}`}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
