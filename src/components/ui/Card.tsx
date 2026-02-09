import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, href, hover = true, ...props }, ref) => {
        const cardClasses = cn(
            "bg-white rounded-2xl border border-neutral-200 overflow-hidden",
            hover && "card-hover",
            className
        );

        if (href) {
            return (
                <NextLink href={href} className="block">
                    <div ref={ref} className={cardClasses} {...props}>
                        {children}
                    </div>
                </NextLink>
            );
        }

        return (
            <div ref={ref} className={cardClasses} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("p-6 border-b border-neutral-100", className)}
        {...props}
    />
));

CardHeader.displayName = "CardHeader";

const CardBody = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
));

CardBody.displayName = "CardBody";

const CardFooter = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("p-6 bg-neutral-50 border-t border-neutral-100", className)}
        {...props}
    />
));

CardFooter.displayName = "CardFooter";

const CardImage = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: string }
>(({ className, aspectRatio = "aspect-video", ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative bg-neutral-100 overflow-hidden",
            aspectRatio,
            className
        )}
        {...props}
    />
));

CardImage.displayName = "CardImage";

export { Card, CardHeader, CardBody, CardFooter, CardImage };
