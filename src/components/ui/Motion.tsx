"use client";

import { ReactNode } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

// ============================================
// FADE ANIMATIONS
// ============================================

interface FadeProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export function Fade({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 24,
    className,
    ...props
}: FadeProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// FADE IN VIEW (Scroll-triggered)
// ============================================

interface FadeInViewProps extends FadeProps {
    once?: boolean;
    amount?: number;
}

export function FadeInView({
    children,
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 40,
    once = true,
    amount = 0.3,
    className,
    ...props
}: FadeInViewProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, amount }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// STAGGER CONTAINER
// ============================================

interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    staggerChildren?: number;
    delayChildren?: number;
}

export function StaggerContainer({
    children,
    staggerChildren = 0.1,
    delayChildren = 0,
    className,
    ...props
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren,
                delayChildren,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// STAGGER ITEM
// ============================================

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
}

export function StaggerItem({
    children,
    direction = "up",
    className,
    ...props
}: StaggerItemProps) {
    const directions = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, ...directions[direction] },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className} {...props}>
            {children}
        </motion.div>
    );
}

// ============================================
// SCALE ON HOVER
// ============================================

interface ScaleOnHoverProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    scale?: number;
}

export function ScaleOnHover({
    children,
    scale = 1.02,
    className,
    ...props
}: ScaleOnHoverProps) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// SLIDE IN
// ============================================

interface SlideInProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    direction?: "left" | "right" | "up" | "down";
    distance?: number;
    delay?: number;
    duration?: number;
}

export function SlideIn({
    children,
    direction = "left",
    distance = 100,
    delay = 0,
    duration = 0.6,
    className,
    ...props
}: SlideInProps) {
    const directions = {
        left: { x: -distance, y: 0 },
        right: { x: distance, y: 0 },
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// REVEAL (with mask)
// ============================================

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.25, 0.4, 0.25, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// ============================================
// BOUNCE
// ============================================

interface BounceProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    delay?: number;
}

export function Bounce({
    children,
    delay = 0,
    className,
    ...props
}: BounceProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// FLOATING (continuous animation)
// ============================================

interface FloatingProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    amplitude?: number;
    duration?: number;
}

export function Floating({
    children,
    amplitude = 10,
    duration = 3,
    className,
    ...props
}: FloatingProps) {
    return (
        <motion.div
            animate={{
                y: [-amplitude, amplitude, -amplitude],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// PULSE (continuous animation)
// ============================================

interface PulseProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    scale?: number;
    duration?: number;
}

export function Pulse({
    children,
    scale = 1.05,
    duration = 2,
    className,
    ...props
}: PulseProps) {
    return (
        <motion.div
            animate={{
                scale: [1, scale, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// ROTATE ON HOVER
// ============================================

interface RotateOnHoverProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    degrees?: number;
}

export function RotateOnHover({
    children,
    degrees = 5,
    className,
    ...props
}: RotateOnHoverProps) {
    return (
        <motion.div
            whileHover={{ rotate: degrees }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// PAGE TRANSITION WRAPPER
// ============================================

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// DRAW LINE (SVG)
// ============================================

interface DrawLineProps {
    className?: string;
    delay?: number;
    duration?: number;
}

export function DrawLine({
    className = "",
    delay = 0,
    duration = 1,
}: DrawLineProps) {
    return (
        <motion.svg
            viewBox="0 0 100 2"
            className={className}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
        >
            <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration, delay, ease: "easeInOut" }}
            />
        </motion.svg>
    );
}

// ============================================
// COUNTER ANIMATION
// ============================================

interface CounterProps {
    from?: number;
    to: number;
    duration?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export function Counter({
    from = 0,
    to,
    duration = 2,
    className = "",
    suffix = "",
    prefix = "",
}: CounterProps) {
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {prefix}
                <motion.span
                // Using useMotionValue would be ideal but keeping it simple
                // This is a simplified version - for complex counters use useMotionValue
                >
                    {to}
                </motion.span>
                {suffix}
            </motion.span>
        </motion.span>
    );
}

// ============================================
// TYPE WRITER EFFECT
// ============================================

interface TypeWriterProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

export function TypeWriter({
    text,
    className = "",
    delay = 0,
    speed = 0.05,
}: TypeWriterProps) {
    const characters = text.split("");

    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    transition={{ delay: delay + index * speed }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
