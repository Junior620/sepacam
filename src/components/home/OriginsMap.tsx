"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Cameroon cocoa origin regions with coordinates
const COCOA_ORIGINS = [
    {
        id: "centre",
        lng: 11.5,
        lat: 4.0,
        production: "35%",
        region: "Centre",
    },
    {
        id: "sud",
        lng: 10.1,
        lat: 2.9,
        production: "25%",
        region: "Sud",
    },
    {
        id: "sud_ouest",
        lng: 9.2,
        lat: 5.0,
        production: "20%",
        region: "Sud-Ouest",
    },
    {
        id: "littoral",
        lng: 9.7,
        lat: 4.6,
        production: "10%",
        region: "Littoral",
    },
    {
        id: "est",
        lng: 14.0,
        lat: 4.0,
        production: "5%",
        region: "Est",
    },
    {
        id: "nord_ouest",
        lng: 10.1,
        lat: 5.9,
        production: "5%",
        region: "Nord-Ouest",
    },
];

// Logistics hubs
const LOGISTICS_HUBS = [
    {
        id: "douala_port",
        lng: 9.69,
        lat: 4.05,
        type: "port" as const,
        name: "Port de Douala",
    },
    {
        id: "usine_sepacam",
        lng: 9.72,
        lat: 4.07,
        type: "factory" as const,
        name: "Usine SEPACAM",
    },
];

export function OriginsMap() {
    const t = useTranslations("origins_map");
    const sectionRef = useRef<HTMLDivElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [activePopup, setActivePopup] = useState<string | null>(null);

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const hasToken = token && token !== "your_mapbox_token";

    // Initialize Mapbox
    useEffect(() => {
        if (!hasToken || !mapContainerRef.current || mapRef.current) return;

        let map: mapboxgl.Map;

        const initMap = async () => {
            const mapboxgl = (await import("mapbox-gl")).default;

            // Inject Mapbox CSS via link tag (avoids TS module errors)
            if (!document.getElementById("mapbox-gl-css")) {
                const link = document.createElement("link");
                link.id = "mapbox-gl-css";
                link.rel = "stylesheet";
                link.href = "https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css";
                document.head.appendChild(link);
            }

            mapboxgl.accessToken = token!;

            map = new mapboxgl.Map({
                container: mapContainerRef.current!,
                style: "mapbox://styles/mapbox/dark-v11",
                center: [11.5, 4.5], // Center of Cameroon
                zoom: 5.5,
                pitch: 10,
                interactive: true,
                attributionControl: false,
            });

            map.addControl(
                new mapboxgl.NavigationControl({ showCompass: false }),
                "top-right"
            );

            map.on("load", () => {
                setMapLoaded(true);
                mapRef.current = map;

                // Add cocoa origin markers
                COCOA_ORIGINS.forEach((origin) => {
                    // Create custom marker element
                    const el = document.createElement("div");
                    el.className = "origin-marker";
                    el.innerHTML = `
                        <div class="marker-pulse"></div>
                        <div class="marker-dot"></div>
                    `;
                    el.style.cssText = `
                        position: relative;
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                    `;

                    // Pulse animation
                    const pulse = el.querySelector(".marker-pulse") as HTMLElement;
                    if (pulse) {
                        pulse.style.cssText = `
                            position: absolute;
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background: rgba(74, 122, 44, 0.3);
                            animation: markerPulse 2s ease-out infinite;
                        `;
                    }

                    const dot = el.querySelector(".marker-dot") as HTMLElement;
                    if (dot) {
                        dot.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background: #4a7a2c;
                            border: 2px solid #fff;
                            box-shadow: 0 0 8px rgba(74, 122, 44, 0.5);
                        `;
                    }

                    // Create popup
                    const popup = new mapboxgl.Popup({
                        offset: 15,
                        closeButton: false,
                        className: "sepacam-popup",
                    }).setHTML(`
                        <div style="padding: 8px 4px; min-width: 160px;">
                            <p style="font-weight: 700; font-size: 14px; margin: 0 0 4px; color: #1a3009;">
                                ${origin.region}
                            </p>
                            <p style="font-size: 12px; color: #6b7280; margin: 0 0 6px;">
                                ${t("region_label")}
                            </p>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="width: 8px; height: 8px; border-radius: 50%; background: #4a7a2c;"></div>
                                <span style="font-weight: 600; font-size: 13px; color: #2d5016;">
                                    ${origin.production} ${t("production_label")}
                                </span>
                            </div>
                        </div>
                    `);

                    new mapboxgl.Marker(el)
                        .setLngLat([origin.lng, origin.lat])
                        .setPopup(popup)
                        .addTo(map);
                });

                // Add logistics hub markers
                LOGISTICS_HUBS.forEach((hub) => {
                    const el = document.createElement("div");
                    const isPort = hub.type === "port";
                    el.style.cssText = `
                        width: 32px;
                        height: 32px;
                        background: ${isPort ? "#d4af37" : "#2d5016"};
                        border: 3px solid #fff;
                        border-radius: ${isPort ? "4px" : "50%"};
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    `;
                    el.innerHTML = isPort
                        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M2 21h20M4 21V10l8-6 8 6v11"/></svg>`
                        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m-10-10h4m12 0h4"/></svg>`;

                    const popup = new mapboxgl.Popup({
                        offset: 20,
                        closeButton: false,
                        className: "sepacam-popup",
                    }).setHTML(`
                        <div style="padding: 8px 4px; min-width: 140px;">
                            <p style="font-weight: 700; font-size: 14px; margin: 0 0 4px; color: ${isPort ? "#b8941f" : "#1a3009"};">
                                ${hub.name}
                            </p>
                            <p style="font-size: 12px; color: #6b7280; margin: 0;">
                                ${isPort ? t("hub_port") : t("hub_factory")}
                            </p>
                        </div>
                    `);

                    new mapboxgl.Marker(el)
                        .setLngLat([hub.lng, hub.lat])
                        .setPopup(popup)
                        .addTo(map);
                });
            });
        };

        initMap();

        return () => {
            if (map) map.remove();
        };
    }, [hasToken, token, t]);

    // GSAP animation
    useGSAP(
        () => {
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-spacing bg-neutral-900 text-white overflow-hidden"
        >
            <div className="container-main">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-300 mb-6">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        {t("badge")}
                    </div>
                    <h2 className="font-heading text-h2-sm lg:text-h2 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-body text-neutral-400 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative rounded-2xl overflow-hidden border border-neutral-700/50 shadow-2xl">
                    {hasToken ? (
                        <>
                            <div
                                ref={mapContainerRef}
                                className="w-full h-[400px] sm:h-[500px] lg:h-[600px]"
                            />
                            {!mapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm text-neutral-400">
                                            {t("loading")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Fallback: static illustration */
                        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-neutral-800">
                            <Image
                                src="/images/traceability-map.jpg"
                                alt={t("title")}
                                fill
                                className="object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-8 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700 max-w-sm">
                                    <svg
                                        className="w-12 h-12 text-primary mx-auto mb-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                    <p className="text-neutral-300 text-sm">
                                        {t("fallback_text")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Legend overlay */}
                    <div className="absolute bottom-4 left-4 bg-neutral-900/90 backdrop-blur-md rounded-xl p-4 border border-neutral-700/50 hidden sm:block">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                            {t("legend")}
                        </p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-primary border border-white/50" />
                                <span className="text-xs text-neutral-300">
                                    {t("legend_origin")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded bg-accent border border-white/50" />
                                <span className="text-xs text-neutral-300">
                                    {t("legend_port")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-primary-dark border border-white/50" />
                                <span className="text-xs text-neutral-300">
                                    {t("legend_factory")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inject marker pulse animation */}
            <style jsx global>{`
                @keyframes markerPulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
                .mapboxgl-popup-content {
                    background: #fff !important;
                    border-radius: 12px !important;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2) !important;
                    padding: 8px 12px !important;
                }
                .mapboxgl-popup-tip {
                    border-top-color: #fff !important;
                }
            `}</style>
        </section>
    );
}
