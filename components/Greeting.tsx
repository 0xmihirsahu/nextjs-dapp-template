"use client";

import { useState, useRef, useEffect } from "react";
import { useGreeting } from "../hooks/useGreeting";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "sonner";

const Greeting = () => {
  const [newGreeting, setNewGreeting] = useState<string>("");
  const newGreetingInputRef = useRef<HTMLInputElement>(null);

  const onSetGreetingSuccess = () => {
    toast.success("greeting updated");
    setNewGreeting("");
    newGreetingInputRef.current?.blur();
  };

  const {
    address,
    greeting,
    getGreetingLoading,
    getGreetingError,
    setGreeting,
    setGreetingLoading,
    prepareSetGreetingError,
    setGreetingError,
  } = useGreeting({ newGreeting, onSetGreetingSuccess });

  useEffect(() => {
    if (!address) {
      setNewGreeting("");
    }
  }, [address]);

  const { openConnectModal } = useConnectModal();

  return (
    <div className="space-y-8">
      {/* Current Greeting Card */}
      <div className="p-6 border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            current greeting
          </span>
        </div>
        {getGreetingLoading ? (
          <div className="text-muted-foreground animate-pulse">loading...</div>
        ) : getGreetingError ? (
          <div className="text-destructive text-sm">
            failed to fetch greeting
          </div>
        ) : (
          <div className="text-2xl md:text-3xl font-medium text-foreground wrap-break-word">
            {greeting || <span className="text-muted-foreground">—</span>}
          </div>
        )}
      </div>

      {/* Set Greeting Card */}
      <div className="p-6 border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            update greeting
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <input
              className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              onChange={(e) => setNewGreeting(e.target.value)}
              placeholder={
                address ? "enter new greeting..." : "connect wallet first"
              }
              ref={newGreetingInputRef}
              disabled={!address}
              value={newGreeting}
            />
            {!address && openConnectModal && (
              <button
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                onClick={openConnectModal}
              >
                connect wallet to continue →
              </button>
            )}
          </div>

          <button
            className="w-full bg-primary text-black font-medium px-4 py-3 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary"
            onClick={setGreeting}
            disabled={
              !address ||
              !newGreeting ||
              setGreetingLoading ||
              prepareSetGreetingError
            }
          >
            {setGreetingLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                broadcasting transaction...
              </span>
            ) : (
              "submit"
            )}
          </button>

          {/* Error States */}
          {setGreetingError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              transaction failed
            </div>
          )}
          {newGreeting && prepareSetGreetingError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              only contract owner can set greeting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Greeting };
