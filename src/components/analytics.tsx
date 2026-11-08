"use client";

import * as React from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || "";
const KEY = "techsquare:site";

export default function Analytics() {
  React.useEffect(() => {
    if (!ENDPOINT) return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;

    try {
      if (localStorage.getItem(KEY) === host) return;
      localStorage.setItem(KEY, host);
    } catch {
      /* private mode */
    }

    const body = new Blob([JSON.stringify({ host })], { type: "text/plain" });
    navigator.sendBeacon?.(ENDPOINT, body);
  }, []);

  return null;
}
