'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
    center?: [number, number]; // [lng, lat]
    zoom?: number;
    markers?: Array<{
        coordinates: [number, number];
        popupContent?: string;
        icon?: string;
    }>;
}

const DEFAULT_CENTER: [number, number] = [9.7085, 4.0511]; // Douala, Cameroon (Hub)
const DEFAULT_ZOOM = 6;

export function Map({
    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    markers = [],
    className = '',
    ...props
}: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;
        if (!mapboxgl.accessToken) {
            console.warn('Missing Mapbox token');
            setLoadError(true);
            return;
        }

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v11', // Clean professional style
                center: center,
                zoom: zoom,
                attributionControl: false,
            });

            // Add navigation controls
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

            // Add markers
            markers.forEach((marker) => {
                const el = document.createElement('div');
                el.className = 'w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform';

                // If using custom icons, you'd add background image here
                if (marker.icon) {
                    el.style.backgroundImage = `url(${marker.icon})`;
                    el.style.backgroundSize = 'cover';
                }

                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(marker.popupContent || '');

                new mapboxgl.Marker(el)
                    .setLngLat(marker.coordinates)
                    .setPopup(popup)
                    .addTo(map.current!);
            });

        } catch (e) {
            console.error('Mapbox initialization error:', e);
            setLoadError(true);
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loadError) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 rounded-lg p-8 text-neutral-500 ${className}`} {...props}>
                <p>Carte indisponible (Token manquant ou erreur)</p>
            </div>
        );
    }

    return (
        <div
            ref={mapContainer}
            className={`w-full h-full rounded-lg overflow-hidden shadow-lg border border-neutral-200 ${className}`}
            {...props}
        />
    );
}
