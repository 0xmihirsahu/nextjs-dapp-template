import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          theme="dark"
          toastClassName="!bg-card !text-foreground !border !border-border !font-mono !text-sm"
        />
      </body>
    </html>
  );
}
