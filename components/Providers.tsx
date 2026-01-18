"use client";

import { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  type Theme,
} from "@rainbow-me/rainbowkit";
import { ThemeProvider, useTheme } from "next-themes";
import { sepolia } from "wagmi/chains";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID || "";

const config = projectId
  ? getDefaultConfig({
      appName: "web3 starter",
      projectId,
      chains: [sepolia],
      ssr: true,
    })
  : createConfig({
      chains: [sepolia],
      transports: {
        [sepolia.id]: http(),
      },
      ssr: true,
    });

// Shared theme settings
const sharedThemeSettings = {
  fonts: {
    body: "var(--font-mono), ui-monospace, monospace",
  },
  radii: {
    actionButton: "0px",
    connectButton: "0px",
    menuButton: "0px",
    modal: "0px",
    modalMobile: "0px",
  },
  shadows: {
    connectButton: "none",
    dialog: "0 4px 32px rgba(0, 0, 0, 0.3)",
    profileDetailsAction: "none",
    selectedOption: "none",
    selectedWallet: "none",
    walletLogo: "none",
  },
};

// Custom dark theme
const customDarkTheme: Theme = {
  ...darkTheme(),
  ...sharedThemeSettings,
  colors: {
    ...darkTheme().colors,
    accentColor: "hsl(217, 91%, 60%)",
    accentColorForeground: "hsl(0, 0%, 0%)",
    actionButtonBorder: "hsl(0, 0%, 12%)",
    actionButtonBorderMobile: "hsl(0, 0%, 12%)",
    actionButtonSecondaryBackground: "hsl(0, 0%, 10%)",
    closeButton: "hsl(0, 0%, 45%)",
    closeButtonBackground: "hsl(0, 0%, 10%)",
    connectButtonBackground: "hsl(0, 0%, 4%)",
    connectButtonBackgroundError: "hsl(0, 72%, 51%)",
    connectButtonInnerBackground: "hsl(0, 0%, 2%)",
    connectButtonText: "hsl(0, 0%, 98%)",
    connectButtonTextError: "hsl(0, 0%, 98%)",
    connectionIndicator: "hsl(142, 71%, 45%)",
    downloadBottomCardBackground: "hsl(0, 0%, 4%)",
    downloadTopCardBackground: "hsl(0, 0%, 6%)",
    error: "hsl(0, 72%, 51%)",
    generalBorder: "hsl(0, 0%, 12%)",
    generalBorderDim: "hsl(0, 0%, 8%)",
    menuItemBackground: "hsl(0, 0%, 6%)",
    modalBackdrop: "rgba(0, 0, 0, 0.7)",
    modalBackground: "hsl(0, 0%, 4%)",
    modalBorder: "hsl(0, 0%, 12%)",
    modalText: "hsl(0, 0%, 98%)",
    modalTextDim: "hsl(0, 0%, 45%)",
    modalTextSecondary: "hsl(0, 0%, 65%)",
    profileAction: "hsl(0, 0%, 6%)",
    profileActionHover: "hsl(0, 0%, 8%)",
    profileForeground: "hsl(0, 0%, 4%)",
    selectedOptionBorder: "hsl(217, 91%, 60%)",
    standby: "hsl(217, 91%, 60%)",
  },
};

// Custom light theme
const customLightTheme: Theme = {
  ...lightTheme(),
  ...sharedThemeSettings,
  colors: {
    ...lightTheme().colors,
    accentColor: "hsl(217, 91%, 50%)",
    accentColorForeground: "hsl(0, 0%, 100%)",
    actionButtonBorder: "hsl(0, 0%, 88%)",
    actionButtonBorderMobile: "hsl(0, 0%, 88%)",
    actionButtonSecondaryBackground: "hsl(0, 0%, 94%)",
    closeButton: "hsl(0, 0%, 40%)",
    closeButtonBackground: "hsl(0, 0%, 94%)",
    connectButtonBackground: "hsl(0, 0%, 98%)",
    connectButtonBackgroundError: "hsl(0, 72%, 51%)",
    connectButtonInnerBackground: "hsl(0, 0%, 100%)",
    connectButtonText: "hsl(0, 0%, 4%)",
    connectButtonTextError: "hsl(0, 0%, 100%)",
    connectionIndicator: "hsl(142, 71%, 45%)",
    downloadBottomCardBackground: "hsl(0, 0%, 98%)",
    downloadTopCardBackground: "hsl(0, 0%, 96%)",
    error: "hsl(0, 72%, 51%)",
    generalBorder: "hsl(0, 0%, 88%)",
    generalBorderDim: "hsl(0, 0%, 92%)",
    menuItemBackground: "hsl(0, 0%, 96%)",
    modalBackdrop: "rgba(0, 0, 0, 0.3)",
    modalBackground: "hsl(0, 0%, 100%)",
    modalBorder: "hsl(0, 0%, 88%)",
    modalText: "hsl(0, 0%, 4%)",
    modalTextDim: "hsl(0, 0%, 40%)",
    modalTextSecondary: "hsl(0, 0%, 35%)",
    profileAction: "hsl(0, 0%, 96%)",
    profileActionHover: "hsl(0, 0%, 92%)",
    profileForeground: "hsl(0, 0%, 98%)",
    selectedOptionBorder: "hsl(217, 91%, 50%)",
    standby: "hsl(217, 91%, 50%)",
  },
};

// Inner provider that uses theme context
const RainbowKitWithTheme = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use dark theme as default during SSR to match defaultTheme="dark"
  const rainbowTheme = mounted && resolvedTheme === "light"
    ? customLightTheme
    : customDarkTheme;

  return (
    <RainbowKitProvider theme={rainbowTheme}>{children}</RainbowKitProvider>
  );
};

const Providers = ({ children }: { children: ReactNode }) => {
  if (!projectId) {
    console.warn(
      "Missing NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID. Get one at https://cloud.walletconnect.com/",
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {projectId ? (
            <RainbowKitWithTheme>{children}</RainbowKitWithTheme>
          ) : (
            children
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};

export { Providers };
