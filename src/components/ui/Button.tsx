import { forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-white hover:bg-primary-light active:bg-primary-dark shadow-sm hover:shadow-md",
                secondary:
                    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
                accent:
                    "bg-accent text-neutral-900 hover:bg-accent-light active:bg-accent-dark shadow-sm hover:shadow-md",
                ghost:
                    "bg-transparent text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200",
                outline:
                    "bg-transparent text-neutral-600 border border-neutral-300 hover:border-primary hover:text-primary",
                link: "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
            },
            size: {
                sm: "h-9 px-4 text-small rounded-lg",
                md: "h-11 px-6 text-body rounded-xl",
                lg: "h-14 px-8 text-body font-semibold rounded-xl",
                icon: "h-10 w-10 rounded-lg",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                className={buttonVariants({ variant, size, fullWidth, className })}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
