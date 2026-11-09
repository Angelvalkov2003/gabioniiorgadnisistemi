export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || "";
const CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || "";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

function send(event: string, label: string) {
  if (!ADS_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event);
  if (label) window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
}

export const trackLead = () => send("generate_lead", LEAD_LABEL);
export const trackCall = () => send("phone_call_click", CALL_LABEL);

export const CONSENT_KEY = "cookie-consent";
