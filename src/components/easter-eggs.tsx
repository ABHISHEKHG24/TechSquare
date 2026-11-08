"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import { useEffect } from "react";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();

  useEffect(() => {
    if (!isDevToolsOpen || typeof console === "undefined") return;

    console.clear();
    console.log(
      "%c✦ TECHSQUARE ✦\n" +
        "%cHigh-Performance Software • AI Automation • Cinematic Video • Performance Media\n\n" +
        "%cInterested in collaborating or joining our collective? Visit https://techsquare.io or contact us directly.",
      "color: #06b6d4; font-size: 20px; font-weight: bold; font-family: sans-serif;",
      "color: #a1a1aa; font-size: 13px; font-weight: 500; font-family: sans-serif;",
      "color: #3b82f6; font-size: 12px; font-family: sans-serif;"
    );
  }, [isDevToolsOpen]);

  return null;
};

export default EasterEggs;
