"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BreadcrumbSchemaInternal = dynamic(
    () => import("./BreadcrumbSchemaContent").then((mod) => mod.BreadcrumbSchemaContent),
    { ssr: false }
);

export function BreadcrumbSchema() {
    return (
        <Suspense fallback={null}>
            <BreadcrumbSchemaInternal />
        </Suspense>
    );
}
