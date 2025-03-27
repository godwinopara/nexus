import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "HSGB - Secure, Simple, Smart Banking",
    description:
        "Experience the future of banking with HSGB. Manage your finances, make payments, and grow your savings all in one place.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Toaster />
                <AppProvider>
                    <AdminProvider>{children}</AdminProvider>
                </AppProvider>
            </body>
        </html>
    );
}
