"use client";

import { Map } from "@/components/ui/Map";

const SEPACAM_COORDS: [number, number] = [9.7085, 4.0511]; // Douala [lng, lat]

export function ContactMap() {
    return (
        <Map
            center={SEPACAM_COORDS}
            zoom={13}
            markers={[
                {
                    coordinates: SEPACAM_COORDS,
                    popupContent: `
                        <div style="padding:4px 0;">
                            <strong style="font-size:14px;">SEPACAM</strong><br/>
                            <span style="color:#666;font-size:12px;">Douala, Cameroun</span><br/>
                            <a href="mailto:contact@sepacam.com" style="color:#b45309;font-size:12px;">contact@sepacam.com</a>
                        </div>
                    `,
                },
            ]}
            className="w-full h-full"
        />
    );
}
