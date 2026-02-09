"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationOptions {
    // Animation type
    animation?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scale" | "stagger";
    // Delay before animation starts
    delay?: number;
    // Duration of animation
    duration?: number;
    // ScrollTrigger start position (e.g., "top 80%")
    start?: string;
    // Stagger delay for child elements
    stagger?: number;
    // Custom selector for staggered children
    staggerSelector?: string;
    // Ease function
    ease?: string;
    // Y offset for fadeUp
    y?: number;
    // X offset for fadeLeft/fadeRight
    x?: number;
    // Whether to reverse on scroll up
    toggleActions?: string;
}

const defaultOptions: ScrollAnimationOptions = {
    animation: "fadeUp",
    delay: 0,
    duration: 0.8,
    start: "top 85%",
    stagger: 0.15,
    ease: "power3.out",
    y: 40,
    x: 40,
    toggleActions: "play none none none",
};

/**
 * Custom hook for scroll-triggered GSAP animations
 * @param options Animation configuration options
 * @returns containerRef to attach to the animated container
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: ScrollAnimationOptions = {}
) {
    const containerRef = useRef<T>(null);
    const config = { ...defaultOptions, ...options };

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const element = containerRef.current;

            // Base animation properties
            const fromProps: gsap.TweenVars = {
                opacity: 0,
            };

            const toProps: gsap.TweenVars = {
                opacity: 1,
                duration: config.duration,
                delay: config.delay,
                ease: config.ease,
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: config.toggleActions,
                },
            };

            // Add animation-specific properties
            switch (config.animation) {
                case "fadeUp":
                    fromProps.y = config.y;
                    toProps.y = 0;
                    break;
                case "fadeLeft":
                    fromProps.x = config.x;
                    toProps.x = 0;
                    break;
                case "fadeRight":
                    fromProps.x = -(config.x || 40);
                    toProps.x = 0;
                    break;
                case "scale":
                    fromProps.scale = 0.9;
                    toProps.scale = 1;
                    break;
                case "stagger":
                    // Animate children instead of container
                    const children = element.querySelectorAll(
                        config.staggerSelector || ":scope > *"
                    );
                    if (children.length > 0) {
                        gsap.fromTo(
                            children,
                            { opacity: 0, y: config.y || 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: config.duration,
                                stagger: config.stagger,
                                ease: config.ease,
                                scrollTrigger: {
                                    trigger: element,
                                    start: config.start,
                                    toggleActions: config.toggleActions,
                                },
                            }
                        );
                    }
                    return;
                case "fadeIn":
                default:
                    // Just fade in, no transform
                    break;
            }

            gsap.fromTo(element, fromProps, toProps);
        },
        { scope: containerRef }
    );

    return containerRef;
}

/**
 * Pre-configured animation variants for common use cases
 */
export const scrollAnimations = {
    fadeUp: { animation: "fadeUp" as const },
    fadeIn: { animation: "fadeIn" as const },
    fadeLeft: { animation: "fadeLeft" as const },
    fadeRight: { animation: "fadeRight" as const },
    scale: { animation: "scale" as const },
    staggerCards: {
        animation: "stagger" as const,
        stagger: 0.1,
        y: 30,
    },
    staggerList: {
        animation: "stagger" as const,
        stagger: 0.08,
        y: 20,
    },
    heroContent: {
        animation: "fadeUp" as const,
        duration: 1,
        y: 50,
        ease: "power4.out",
    },
    sectionHeader: {
        animation: "fadeUp" as const,
        duration: 0.6,
        y: 30,
    },
};
