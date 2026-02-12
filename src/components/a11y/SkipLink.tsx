"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
    const t = useTranslations("a11y");

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:font-medium focus:shadow-lg focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
        >
            {t("skip_to_content")}
        </a>
    );
}
