"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADS_ID, CONSENT_KEY, trackCall } from "@/lib/gtag";

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export default function Analytics() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ADS_ID) return;
    if (!readConsent()) setShow(true);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="tel:"]');
      if (a) trackCall();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!ADS_ID) return null;

  const choose = (granted: boolean) => {
    const v = granted ? "granted" : "denied";
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {}
    window.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    setShow(false);
  };

  const init = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}
var v=c==='granted'?'granted':'denied';
gtag('consent','default',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('js',new Date());gtag('config','${ADS_ID}');
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';document.head.appendChild(s);`;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">{init}</Script>
      {show && (
        <div role="dialog" aria-label="Бисквитки" className="fixed inset-x-2 bottom-20 z-50 rounded-xl border border-line bg-white p-4 shadow-xl md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm">
          <p className="text-sm text-ink">
            Използваме бисквитки за измерване на рекламите. Можете да ги приемете или откажете.{" "}
            <Link href="/politika-za-poveritelnost" className="text-green underline">Научете повече</Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => choose(false)} className="rounded-lg border border-line py-2.5 text-sm font-semibold">
              Отказвам
            </button>
            <button type="button" onClick={() => choose(true)} className="rounded-lg bg-green py-2.5 text-sm font-semibold text-white">
              Приемам
            </button>
          </div>
        </div>
      )}
    </>
  );
}
