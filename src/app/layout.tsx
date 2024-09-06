import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Micro Attendance system",
    description: "Simple small system for tracking attendance",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" suppressHydrationWarning>
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable} antialiased`,
                    "min-w-dvw light min-h-dvw max-w-[100dvw]"
                )}
            >
                {children}
            </body>
        </html>
    );
}
