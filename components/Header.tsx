"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground">web3_starter</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="px-4 py-2 text-sm border border-primary text-primary hover:bg-primary hover:text-black transition-colors"
                      >
                        connect wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        className="px-4 py-2 text-sm border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors"
                      >
                        wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        onClick={openChainModal}
                        className="px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
                      >
                        {chain.name?.toLowerCase()}
                      </button>
                      <button
                        onClick={openAccountModal}
                        className="px-3 py-1.5 border border-primary/50 text-primary hover:border-primary transition-colors"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
};

export { Header };
