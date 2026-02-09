import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center justify-center font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-neutral-100 text-neutral-600",
                primary: "bg-primary/10 text-primary",
                accent: "bg-accent/20 text-accent-dark",
                success: "bg-success-light text-success",
                error: "bg-error-light text-error",
                certification: "bg-accent text-neutral-900",
                outline: "bg-transparent border border-current",
            },
            size: {
                sm: "px-2 py-0.5 text-xs rounded",
                md: "px-3 py-1 text-xs rounded-full",
                lg: "px-4 py-1.5 text-small rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
}

export function Badge({
    className,
    variant,
    size,
    icon,
    children,
    ...props
}: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </span>
    );
}
