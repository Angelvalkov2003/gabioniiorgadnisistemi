"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/gtag";

export default function LeadConversion() {
  useEffect(() => {
    // gtag се зарежда afterInteractive – изчакваме го
    let n = 0;
    const t = setInterval(() => {
      if (window.gtag || ++n > 20) {
        clearInterval(t);
        trackLead();
      }
    }, 250);
    return () => clearInterval(t);
  }, []);
  return null;
}
