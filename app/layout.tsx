import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/lib/footer";
import AuthHeader from "./components/ui/lib/auth-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "뉴트리핏",
    description: "뉴트리핏 쇼핑몰",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthHeader/>
                {children}
                <Footer />
            </body>
        </html>
    );
}
