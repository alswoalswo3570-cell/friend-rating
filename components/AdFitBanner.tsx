"use client";

import { useEffect, useRef } from "react";

const CLIENT_ID = "DAN-XYTYSzDJJGamhNbU";

export default function AdFitBanner() {
  const ins = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ins.current) return;
    try {
      // @ts-expect-error kakao adfit global
      (window.adfit = window.adfit || []).push({});
    } catch {}
  }, []);

  return (
    <div className="flex justify-center py-3">
      <ins
        ref={ins}
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={CLIENT_ID}
        data-ad-width="320"
        data-ad-height="50"
      />
    </div>
  );
}
