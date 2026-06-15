"use client";

import { useEffect, useState } from "react";
import { useIntro } from "@/context/intro-context";
import { motion, AnimatePresence } from "framer-motion";

export function HydrationGuard() {
  const { introPlayed, isFirstMount } = useIntro();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // If intro already played in this session, hide immediately
    if (introPlayed) {
      setIsVisible(false);
      return;
    }

    // Normal delay for first-time intro to sync with IntroSequence
    const timer = setTimeout(() => {
      // We don't remove it yet, we just fade it out if needed
      // But typically IntroSequence covers it.
    }, 800);

    return () => clearTimeout(timer);
  }, [introPlayed]);

  // We use AnimatePresence to handle removal from DOM safely via React
  return (
    <AnimatePresence>
      {isVisible && !introPlayed && (
        <motion.div
          id="hydration-guard"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 bg-black z-[99998] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
