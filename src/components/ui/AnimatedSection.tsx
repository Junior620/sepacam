"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export type AnimationType =
    | "fadeUp"
    | "fadeDown"
    | "fadeIn"
    | "fadeLeft"
    | "fadeRight"
    | "scale"
    | "stagger";

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    start?: string;
    stagger?: number;
    staggerSelector?: string;
    className?: string;
    as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main";
}

export function AnimatedSection({
    children,
    animation = "fadeUp",
    delay = 0,
    duration = 0.8,
    start = "top 85%",
    stagger = 0.15,
    staggerSelector,
    className = "",
    as: Component = "div",
}: AnimatedSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

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
                duration,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start,
                },
            };

            // Add animation-specific properties
            switch (animation) {
                case "fadeUp":
                    fromProps.y = 40;
                    toProps.y = 0;
                    break;
                case "fadeDown":
                    fromProps.y = -40;
                    toProps.y = 0;
                    break;
                case "fadeLeft":
                    fromProps.x = 40;
                    toProps.x = 0;
                    break;
                case "fadeRight":
                    fromProps.x = -40;
                    toProps.x = 0;
                    break;
                case "scale":
                    fromProps.scale = 0.9;
                    toProps.scale = 1;
                    break;
                case "stagger":
                    // Animate children instead of container
                    const children = element.querySelectorAll(
                        staggerSelector || ":scope > *"
                    );
                    if (children.length > 0) {
                        gsap.fromTo(
                            children,
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration,
                                stagger,
                                delay,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: element,
                                    start,
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

    return (
        <Component ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
            {children}
        </Component>
    );
}

/**
 * Grid with staggered animation on children
 */
interface AnimatedGridProps {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    start?: string;
}

export function AnimatedGrid({
    children,
    className = "",
    stagger = 0.1,
    delay = 0,
    start = "top 80%",
}: AnimatedGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!gridRef.current) return;

            const items = gsap.utils.toArray<HTMLElement>(
                gridRef.current.querySelectorAll(":scope > *")
            );

            gsap.from(items, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start,
                },
            });
        },
        { scope: gridRef }
    );

    return (
        <div ref={gridRef} className={className}>
            {children}
        </div>
    );
}

/**
 * Timeline animation component (for about page journey)
 */
interface AnimatedTimelineProps {
    children: ReactNode;
    className?: string;
}

export function AnimatedTimeline({
    children,
    className = "",
}: AnimatedTimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!timelineRef.current) return;

            const items = gsap.utils.toArray<HTMLElement>(
                timelineRef.current.querySelectorAll(":scope > *")
            );

            // Animate each timeline item
            items.forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    x: -30,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                });

                // Animate the dot
                const dot = item.querySelector(".timeline-dot");
                if (dot) {
                    gsap.from(dot, {
                        scale: 0,
                        duration: 0.4,
                        delay: 0.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        },
                    });
                }
            });
        },
        { scope: timelineRef }
    );

    return (
        <div ref={timelineRef} className={className}>
            {children}
        </div>
    );
}

/**
 * Parallax wrapper component
 */
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({
    children,
    speed = 0.5,
    className = "",
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                y: () => speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: ref }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

/**
 * Text reveal animation (word by word or line by line)
 */
interface TextRevealProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    splitBy?: "word" | "line" | "char";
}

export function TextReveal({
    children,
    className = "",
    as: Component = "span",
    splitBy = "word",
}: TextRevealProps) {
    const textRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!textRef.current) return;

            const elements = textRef.current.querySelectorAll(".text-reveal-item");

            gsap.from(elements, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: splitBy === "char" ? 0.02 : 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                },
            });
        },
        { scope: textRef }
    );

    const splitContent = () => {
        if (splitBy === "word") {
            return children.split(" ").map((word, i) => (
                <span key={i} className="text-reveal-item inline-block mr-[0.25em]">
                    {word}
                </span>
            ));
        }
        if (splitBy === "char") {
            return children.split("").map((char, i) => (
                <span key={i} className="text-reveal-item inline-block">
                    {char === " " ? "\u00A0" : char}
                </span>
            ));
        }
        return <span className="text-reveal-item">{children}</span>;
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Component ref={textRef as any} className={className}>
            {splitContent()}
        </Component>
    );
}
