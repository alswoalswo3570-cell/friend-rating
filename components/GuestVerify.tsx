"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Emoji from "@/components/Emoji";
import RichText from "@/components/RichText";
import { t } from "@/lib/strings";

type Props = {
  instaId: string;
};

export default function GuestVerify({ instaId }: Props) {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [showHint, setShowHint] = useState(false);
  const canSubmit = /^\d{6}$/.test(birth);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    router.push(`/rate/${encodeURIComponent(instaId)}/write?b=${birth}`);
  };

  return (
    <main className="relative px-5 pt-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 border-2 border-ink/10 shadow-pop"
        >
          {t("common.nav.home")}
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-butter px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-ink shadow-pop">
          <Emoji name="love-letter" size={14} />
          {t("verify.nav.badge")}
        </span>
      </div>

      <span className="deco" style={{ top: 8, right: 18, ["--r" as string]: "-14deg" }}>
        <Emoji name="sparkling-heart" size={28} />
      </span>
      <span className="deco delay-1" style={{ top: 72, left: 14, ["--r" as string]: "12deg" }}>
        <Emoji name="glowing-star" size={22} />
      </span>

      <section className="relative rounded-[28px] bg-white border-2 border-ink/10 px-5 pt-7 pb-6 shadow-poplg">
        <span className="tape" aria-hidden />

        <p className="text-center text-[12px] font-extrabold tracking-widest text-ink/40">
          {t("verify.card.label")}
        </p>

        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-bubble/50 border-2 border-ink/10 shadow-pop">
            <Emoji name="face-with-peeking-eye" size={48} />
            <span className="absolute -bottom-1 -right-1 rotate-12 rounded-full bg-butter px-1.5 py-0.5 text-[10px] font-extrabold text-ink border-2 border-ink/10 shadow-pop">
              {t("verify.card.sticker")}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-ink/60">
            {t("verify.card.question")}
          </p>
          <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-ink">
            @{instaId}
          </h1>
        </div>

        <form onSubmit={submit} className="mt-6">
          <label className="block text-center text-[12px] font-extrabold text-ink/80">
            {t("verify.field.birth.label")}{" "}
            <span className="font-bold text-ink/40">
              {t("verify.field.birth.hint", { id: instaId })}
            </span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            value={birth}
            onChange={(e) => setBirth(e.target.value.replace(/\D/g, ""))}
            placeholder="······"
            autoFocus
            className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 text-center text-[24px] font-extrabold tracking-[0.4em] text-ink placeholder:text-ink/20 outline-none focus:border-coral/70 focus:bg-white transition tabular-nums"
          />

          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="mt-2 block w-full text-[11.5px] font-bold text-ink/50 underline decoration-dotted underline-offset-4"
          >
            {showHint
              ? t("verify.hint.toggle.open")
              : t("verify.hint.toggle.closed")}
          </button>

          {showHint && (
            <div className="mt-2 rounded-2xl bg-mint/40 border-2 border-ink/10 p-3 text-[11.5px] leading-relaxed text-ink/80">
              <p>
                <RichText k="verify.hint.1" />
              </p>
              <p className="mt-1.5">
                <RichText
                  k="verify.hint.2"
                  vars={{
                    separated: (
                      <b className="font-extrabold text-coral">
                        {t("verify.hint.2.separated")}
                      </b>
                    ),
                  }}
                />
              </p>
              <p className="mt-1.5">
                <RichText k="verify.hint.3" />
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-5 w-full rounded-full bg-coral py-4 text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition disabled:opacity-40 disabled:shadow-pop disabled:active:translate-y-0"
          >
            <span className="inline-flex items-center gap-2">
              <Emoji name="love-letter" size={18} />
              {t("verify.submit")}
            </span>
          </button>
        </form>
      </section>

      <p className="mt-6 flex items-center justify-center gap-1 text-center text-[11px] text-ink/40">
        <Emoji name="custard" size={14} />
        {t("verify.footer")}
      </p>
    </main>
  );
}
