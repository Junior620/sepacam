import { ReactNode } from "react";

export const metadata = {
    title: "Sanity Studio",
    description: "Sanity Studio",
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
