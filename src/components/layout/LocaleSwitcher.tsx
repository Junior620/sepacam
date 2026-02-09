"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleLocaleChange = (newLocale: string) => {
        // Type assertion needed because usePathname can return dynamic routes
        router.replace(pathname as "/", { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 bg-neutral-100 rounded-full p-1">
            {routing.locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase transition-all ${locale === loc
                        ? "bg-white text-primary shadow-sm"
                        : "text-neutral-500 hover:text-neutral-700"
                        }`}
                >
                    {loc}
                </button>
            ))}
        </div>
    );
}
