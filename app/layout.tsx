import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "web3 starter",
  description: "ethereum dapp starter with solidity and next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`min-h-screen bg-background font-mono ${mono.variable}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
