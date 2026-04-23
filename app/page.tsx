"use client";

import Image from "next/image";
import Link from "next/link";
import Emoji from "@/components/Emoji";
import RichText, { tPlain } from "@/components/RichText";
import { t } from "@/lib/strings";
import { useLocale } from "@/lib/locale";

export default function Landing() {
  const locale = useLocale();
  return (
    <main className="relative pb-16">
      {/* 히어로 일러스트 */}
      <section className="relative aspect-[9/10] w-full overflow-hidden bg-gradient-to-b from-[#CFE7F5] via-[#F6DCE6] to-cream">
        <Image
          src="/landing-hero.png"
          alt={tPlain("landing.hero.alt", undefined, locale)}
          fill
          priority
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover object-top select-none pointer-events-none"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" />

        <div className="absolute left-1/2 top-5 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-ink shadow-poplg border-2 border-ink/10 backdrop-blur-sm">
            <Emoji name="sparkles" size={14} />
            {t("common.badge.exrating", undefined, locale)}
            <Emoji name="strawberry" size={14} />
          </span>
        </div>
      </section>

      <div className="relative px-5 -mt-4">
        <span
          className="deco"
          style={{ top: -36, right: 22, ["--r" as string]: "-14deg" }}
        >
          <Emoji name="sparkling-heart" size={28} />
        </span>
        <span
          className="deco delay-2"
          style={{ top: -20, left: 16, ["--r" as string]: "16deg" }}
        >
          <Emoji name="ribbon" size={22} />
        </span>

        <header className="text-center mb-7">
          <h1 className="text-[26px] font-extrabold leading-[1.2] tracking-tight text-ink">
            <RichText
              k="landing.headline.full"
              vars={{
                highlight: (
                  <span className="relative text-coral">
                    {t("landing.headline.highlight", undefined, locale)}
                    <span className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-bubble/70 -z-10" />
                  </span>
                ),
              }}
            />{" "}
            <Emoji name="face-with-peeking-eye" size={26} />
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
            <RichText k="landing.sub" boldClassName="font-extrabold text-coral" />
          </p>
        </header>

        {/* 2개의 CTA 카드 */}
        <div className="space-y-4">
          <Link
            href="/lookup"
            className="group relative block rounded-[24px] bg-gradient-to-br from-coral to-bubble p-5 border-2 border-ink/10 shadow-poplg active:translate-y-1 active:shadow-pop transition"
          >
            <span className="absolute -top-2 -right-2 rotate-6 rounded-full bg-butter px-2 py-0.5 text-[10px] font-extrabold text-ink border-2 border-ink/10 shadow-pop">
              {t("landing.cta.host.sticker", undefined, locale)}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 border-2 border-ink/10 shadow-pop">
                <Emoji name="glowing-star" size={32} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold tracking-widest text-white/70">
                  {t("landing.cta.host.label", undefined, locale)}
                </p>
                <p className="mt-0.5 text-[18px] font-extrabold text-white leading-tight">
                  {t("landing.cta.host.title", undefined, locale)}
                </p>
                <p className="mt-1 text-[12px] text-white/80 leading-snug">
                  {t("landing.cta.host.sub", undefined, locale)}
                </p>
              </div>
              <span className="text-white/90 text-xl font-extrabold">→</span>
            </div>
          </Link>

          <Link
            href="/rate"
            className="group relative block rounded-[24px] bg-white p-5 border-2 border-ink/10 shadow-poplg active:translate-y-1 active:shadow-pop transition"
          >
            <span className="absolute -top-2 -right-2 -rotate-6 rounded-full bg-mint px-2 py-0.5 text-[10px] font-extrabold text-ink border-2 border-ink/10 shadow-pop">
              {t("landing.cta.guest.sticker", undefined, locale)}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bubble/40 border-2 border-ink/10 shadow-pop">
                <Emoji name="love-letter" size={32} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold tracking-widest text-ink/40">
                  {t("landing.cta.guest.label", undefined, locale)}
                </p>
                <p className="mt-0.5 text-[18px] font-extrabold text-ink leading-tight">
                  {t("landing.cta.guest.title", undefined, locale)}
                </p>
                <p className="mt-1 text-[12px] text-ink/60 leading-snug">
                  {t("landing.cta.guest.sub", undefined, locale)}
                </p>
              </div>
              <span className="text-ink/40 text-xl font-extrabold">→</span>
            </div>
          </Link>
        </div>

        {/* 안내 카드 */}
        <section className="mt-8 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 border-2 border-ink/10 p-3">
            <Emoji name="sparkles" size={22} />
            <p className="text-[12.5px] leading-relaxed text-ink/70">
              <RichText k="landing.info.noSignup" />
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 border-2 border-ink/10 p-3">
            <Emoji name="love-letter" size={22} />
            <p className="text-[12.5px] leading-relaxed text-ink/70">
              <RichText k="landing.info.anonymous" />
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 border-2 border-ink/10 p-3">
            <Emoji name="camera-with-flash" size={22} />
            <p className="text-[12.5px] leading-relaxed text-ink/70">
              <RichText k="landing.info.sharing" />
            </p>
          </div>
        </section>

        <p className="mt-8 flex items-center justify-center gap-1 text-center text-[11px] text-ink/40">
          <Emoji name="custard" size={14} />
          {t("common.preview.footer", undefined, locale)}
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-ink/35">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink/60 transition">
            개인정보처리방침
          </Link>
          <span>·</span>
          <Link href="/terms" className="underline underline-offset-2 hover:text-ink/60 transition">
            이용약관
          </Link>
        </div>
      </div>
    </main>
  );
}
