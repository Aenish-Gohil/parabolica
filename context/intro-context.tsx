"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface IntroContextType {
  introPlayed: boolean;
  setIntroPlayed: (val: boolean) => void;
  isFirstMount: boolean;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introPlayed, setIntroPlayedState] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const played = sessionStorage.getItem("intro_played") === "true";
    if (played) {
      setIntroPlayedState(true);
    }
    setIsFirstMount(false);
  }, []);

  const value = React.useMemo(() => ({
    introPlayed,
    setIntroPlayed: (val: boolean) => {
      if (val) {
        sessionStorage.setItem("intro_played", "true");
      }
      setIntroPlayedState(val);
    },
    isFirstMount
  }), [introPlayed, isFirstMount]);

  return (
    <IntroContext.Provider value={value}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
