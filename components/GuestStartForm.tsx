"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Emoji from "@/components/Emoji";
import RichText from "@/components/RichText";
import { t } from "@/lib/strings";
import { useLocale } from "@/lib/locale";

export default function GuestStartForm() {
  const router = useRouter();
  const locale = useLocale();
  const [instaId, setInstaId] = useState("");

  const idClean = instaId.replace(/^@/, "").trim();
  const idValid = /^[a-zA-Z0-9._]{2,30}$/.test(idClean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idValid) return;
    router.push(`/rate/${encodeURIComponent(idClean)}`);
  };

  return (
    <main className="relative px-5 pt-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 border-2 border-ink/10 shadow-pop"
        >
          {t("common.nav.home", undefined, locale)}
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-butter px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-ink shadow-pop">
          <Emoji name="love-letter" size={14} />
          {t("rateStart.nav.badge", undefined, locale)}
        </span>
      </div>

      <span className="deco" style={{ top: 4, right: 22, ["--r" as string]: "-14deg" }}>
        <Emoji name="sparkling-heart" size={28} />
      </span>
      <span className="deco delay-2" style={{ top: 72, left: 16, ["--r" as string]: "12deg" }}>
        <Emoji name="ribbon" size={22} />
      </span>

      <header className="mb-5 text-center">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-ink">
          <RichText
            k="rateStart.headline"
            vars={{
              highlight: (
                <span className="relative text-coral">
                  {t("rateStart.headline.highlight", undefined, locale)}
                  <span className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-bubble/70 -z-10" />
                </span>
              ),
            }}
          />
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
          <RichText k="rateStart.sub" />
        </p>
      </header>

      <form
        onSubmit={submit}
        className="rounded-[28px] bg-white border-2 border-ink/10 p-5 shadow-poplg"
      >
        <label className="block text-[12px] font-extrabold text-ink/80">
          {t("rateStart.field.instaId.label", undefined, locale)}
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-2xl border-2 border-ink/10 bg-cream focus-within:border-coral/70 focus-within:bg-white transition">
          <span className="pl-4 text-ink/40 font-bold">@</span>
          <input
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            value={instaId}
            onChange={(e) => setInstaId(e.target.value)}
            placeholder={t("rateStart.field.instaId.placeholder", undefined, locale)}
            autoFocus
            className="flex-1 bg-transparent py-3 pr-4 text-[15px] font-bold text-ink placeholder:text-ink/30 outline-none"
          />
        </div>
        <p className="mt-1.5 text-[11px] text-ink/45">
          {t("rateStart.field.instaId.hint", undefined, locale)}
        </p>

        <button
          type="submit"
          disabled={!idValid}
          className="mt-6 w-full rounded-full bg-coral py-4 text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition disabled:opacity-40 disabled:shadow-pop disabled:active:translate-y-0"
        >
          <span className="inline-flex items-center gap-2">
            <Emoji name="love-letter" size={18} />
            {t("rateStart.submit", undefined, locale)}
          </span>
        </button>
      </form>
    </main>
  );
}
