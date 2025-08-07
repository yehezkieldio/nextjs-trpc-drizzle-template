import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "#/app/theme-provider";
import { Toaster } from "#/app/toaster";
import { cn } from "#/lib/utils";
import { TRPCReactProvider } from "#/trpc/react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Next.js tRPC Template",
    description: "A template for building Next.js applications with tRPC",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
                <TRPCReactProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
