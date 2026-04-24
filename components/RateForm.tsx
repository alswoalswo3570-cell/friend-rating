"use client";

import Link from "next/link";
import { useState } from "react";
import Emoji, { type EmojiName } from "@/components/Emoji";
import RichText from "@/components/RichText";
import { t, type StringKey } from "@/lib/strings";
import { useLocale } from "@/lib/locale";

type AxisKey = "humor" | "loyalty" | "texting" | "vibes" | "secrets";

const AXIS_KEYS: AxisKey[] = ["humor", "loyalty", "texting", "vibes", "secrets"];

const axisStringKeys = (a: AxisKey) => ({
  label: `rateForm.axis.${a}.label` as StringKey,
  sub: `rateForm.axis.${a}.sub` as StringKey,
  low: `rateForm.axis.${a}.low` as StringKey,
  high: `rateForm.axis.${a}.high` as StringKey,
});

type Scores = Record<AxisKey, number>;

const initialScores: Scores = {
  humor: 3,
  loyalty: 3,
  texting: 3,
  vibes: 3,
  secrets: 3,
};

const scoreEmojiName = (v: number): EmojiName =>
  v >= 5
    ? "smiling-face-with-heart-eyes"
    : v >= 4
    ? "smiling-face-with-hearts"
    : v >= 3
    ? "slightly-smiling-face"
    : v >= 2
    ? "crying-face"
    : "loudly-crying-face";

const MAX_COMMENT = 120;

type Props = {
  instaId: string;
};

export default function RateForm({ instaId }: Props) {
  const locale = useLocale();
  const [scores, setScores] = useState<Scores>(initialScores);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const avg = (
    Object.values(scores).reduce((s, v) => s + v, 0) / 5
  ).toFixed(1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instaId,
          scoreHumor: scores.humor,
          scoreLoyalty: scores.loyalty,
          scoreTexting: scores.texting,
          scoreVibes: scores.vibes,
          scoreSecrets: scores.secrets,
          comment,
        }),
      });
      if (res.status === 429) {
        setErr(t("rateForm.error.rateLimit", undefined, locale));
        return;
      }
      if (!res.ok) {
        const body = await res
          .json()
          .catch(() => ({}) as Record<string, unknown>);
        setErr(
          t("rateForm.error.submitFailed", {
            err:
              typeof body.error === "string" ? body.error : String(res.status),
          }, locale),
        );
        return;
      }
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("common.error.network", undefined, locale));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <Success instaId={instaId} avg={avg} />;
  }

  return (
    <main className="relative px-5 pt-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/rate/${encodeURIComponent(instaId)}`}
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 border-2 border-ink/10 shadow-pop"
        >
          {t("common.nav.back", undefined, locale)}
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-butter px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-ink shadow-pop">
          <Emoji name="love-letter" size={14} />
          {t("rateForm.nav.badge", undefined, locale)}
        </span>
      </div>

      {/* 대상 미니 카드 */}
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/80 border-2 border-ink/10 px-4 py-3 shadow-pop">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bubble/60 border-2 border-ink/10">
          <Emoji name="face-with-peeking-eye" size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-extrabold text-ink/40">
            {t("rateForm.target.label", undefined, locale)}
          </p>
          <p className="truncate text-[15px] font-extrabold text-ink">@{instaId}</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {AXIS_KEYS.map((a) => {
          const keys = axisStringKeys(a);
          const v = scores[a];
          const fill = ((v - 1) / 4) * 100;
          return (
            <section
              key={a}
              className="rounded-[22px] bg-white border-2 border-ink/10 px-4 pt-4 pb-5 shadow-pop"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-extrabold text-ink leading-tight">
                    {t(keys.label, undefined, locale)}
                  </h3>
                  <p className="text-[11.5px] text-ink/50 mt-0.5">
                    {t(keys.sub, undefined, locale)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1">
                  <Emoji name={scoreEmojiName(v)} size={22} />
                  <span className="text-[15px] font-extrabold text-coral tabular-nums">
                    {v}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={v}
                onChange={(e) =>
                  setScores((s) => ({ ...s, [a]: Number(e.target.value) }))
                }
                className="cute-slider mt-4"
                style={{ ["--fill" as string]: `${fill}%` }}
                aria-label={t(keys.label, undefined, locale)}
              />

              <div className="mt-1.5 flex justify-between text-[10.5px] font-bold text-ink/40">
                <span>{t(keys.low, undefined, locale)}</span>
                <span>{t(keys.high, undefined, locale)}</span>
              </div>
            </section>
          );
        })}

        {/* 주관식 */}
        <section className="rounded-[22px] bg-white border-2 border-ink/10 px-4 pt-4 pb-4 shadow-pop">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Emoji name="love-letter" size={20} />
              <h3 className="text-[15px] font-extrabold text-ink">
                {t("rateForm.comment.title", undefined, locale)}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-ink/40 tabular-nums">
              {t("rateForm.comment.counter", {
                len: comment.length,
                max: MAX_COMMENT,
              }, locale)}
            </span>
          </div>
          <p className="mt-0.5 text-[11.5px] text-ink/50">
            {t("rateForm.comment.sub", undefined, locale)}
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
            placeholder={t("rateForm.comment.placeholder", undefined, locale)}
            rows={4}
            className="mt-3 w-full rounded-2xl border-2 border-ink/10 bg-cream px-3.5 py-3 text-[13.5px] leading-relaxed text-ink placeholder:text-ink/30 outline-none focus:border-coral/70 focus:bg-white transition resize-none"
          />
        </section>

        {/* 평균 미리보기 */}
        <div className="flex items-center justify-between rounded-full bg-white/70 border-2 border-ink/10 px-4 py-2.5 text-[13px] font-bold text-ink/70 shadow-pop">
          <span>{t("rateForm.avgPreview.label", undefined, locale)}</span>
          <span className="flex items-center gap-1.5 font-extrabold text-ink">
            <Emoji name={scoreEmojiName(Number(avg))} size={18} />
            <span className="tabular-nums">{avg}</span>
            <span className="text-ink/40">{t("rateForm.avgPreview.unit", undefined, locale)}</span>
          </span>
        </div>

        {err && (
          <p className="rounded-2xl bg-bubble/40 border-2 border-ink/10 px-3 py-2.5 text-[12.5px] leading-relaxed text-ink/80">
            {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-coral py-4 text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition disabled:opacity-50 disabled:shadow-pop disabled:active:translate-y-0"
        >
          <span className="inline-flex items-center gap-2">
            <Emoji name="sparkling-heart" size={18} />
            {loading
              ? t("rateForm.submit.loading", undefined, locale)
              : t("rateForm.submit.idle", undefined, locale)}
          </span>
        </button>
        <p className="text-center text-[11px] text-ink/40">
          {t("rateForm.submit.warning", undefined, locale)}
        </p>
      </form>
    </main>
  );
}

function Success({
  instaId,
  avg,
}: {
  instaId: string;
  avg: string;
}) {
  const locale = useLocale();
  const [notified, setNotified] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const handleNotify = async () => {
    if (notifying) return;
    setNotifying(true);
    const url = `${location.origin}/dashboard?id=${encodeURIComponent(instaId)}`;
    const shareText = locale === "ko"
      ? `@${instaId}의 찐친 통지표가 올라왔어! 확인해봐 👀`
      : `@${instaId}'s friend report card is ready! Check it out 👀`;

    try {
      // 모바일 네이티브 공유 시트 (iOS/Android → 인스타 스토리 선택 가능)
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: shareText, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setNotified(true);
      setTimeout(() => setNotified(false), 3000);
    } catch (e) {
      // AbortError = 유저가 취소 → 조용히 무시
      if (e instanceof Error && e.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(url);
          setNotified(true);
          setTimeout(() => setNotified(false), 3000);
        } catch { /* noop */ }
      }
    } finally {
      setNotifying(false);
    }
  };

  return (
    <main className="relative px-5 pt-10 pb-16 text-center">
      <span className="deco" style={{ top: 16, right: 26, ["--r" as string]: "-14deg" }}>
        <Emoji name="sparkling-heart" size={28} />
      </span>
      <span className="deco delay-1" style={{ top: 70, left: 18, ["--r" as string]: "12deg" }}>
        <Emoji name="glowing-star" size={22} />
      </span>
      <span className="deco delay-2" style={{ top: 160, right: 14, ["--r" as string]: "18deg" }}>
        <Emoji name="ribbon" size={24} />
      </span>

      <div className="relative mx-auto mt-6 w-fit rounded-full bg-white border-2 border-ink/10 p-5 shadow-poplg">
        <Emoji name="love-letter" size={64} />
        <span className="absolute -top-2 -right-3 rotate-12 rounded-full bg-butter px-2 py-0.5 text-[11px] font-extrabold text-ink border-2 border-ink/10 shadow-pop">
          {t("rateForm.success.sticker", undefined, locale)}
        </span>
      </div>

      <h1 className="mt-6 text-[26px] font-extrabold leading-tight text-ink">
        {t("rateForm.success.title", undefined, locale)}{" "}
        <span className="inline-block">
          <Emoji name="sparkles" size={24} />
        </span>
      </h1>
      <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65">
        <RichText
          k="rateForm.success.msg"
          vars={{
            id: instaId,
            avgBold: (
              <b className="font-extrabold text-coral tabular-nums">
                {t("rateForm.success.msg.avg", { avg }, locale)}
              </b>
            ),
          }}
        />
        <br />
        {t("rateForm.success.shushing", undefined, locale)}{" "}
        <span className="inline-block align-middle">
          <Emoji name="shushing-face" size={16} />
        </span>
      </p>

      <div className="mt-8 space-y-3 text-left">
        {/* 🔑 핵심 CTA: 결과 친구한테 알려주기 */}
        <div className="relative overflow-hidden rounded-[22px] border-2 border-ink/10 shadow-poplg">
          {/* Instagram 그라디언트 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-90" />
          <button
            type="button"
            onClick={handleNotify}
            disabled={notifying}
            className="relative w-full px-5 py-4 text-center transition active:brightness-90 disabled:opacity-70"
          >
            {notified ? (
              <span className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-2 text-[15px] font-extrabold text-white animate-copy-success">
                  <Emoji name="sparkling-heart" size={18} />
                  {t("rateForm.success.cta.notify.done", undefined, locale)}
                </span>
              </span>
            ) : (
              <span className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-2 text-[15px] font-extrabold text-white">
                  <Emoji name="camera-with-flash" size={18} />
                  {t("rateForm.success.cta.notify", undefined, locale)}
                </span>
                <span className="text-[11px] text-white/70 font-medium">
                  {t("rateForm.success.cta.notify.sub", undefined, locale)}
                </span>
              </span>
            )}
          </button>
        </div>

        {/* 서브: 리포트 구경하기 */}
        <Link
          href={`/dashboard?id=${encodeURIComponent(instaId)}`}
          className="block w-full rounded-full bg-coral py-4 text-center text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition"
        >
          <span className="inline-flex items-center gap-2">
            <Emoji name="glowing-star" size={18} />
            {t("rateForm.success.cta.view", { id: instaId }, locale)}
          </span>
        </Link>

        <Link
          href="/"
          className="block w-full rounded-full bg-white/80 py-3 text-center text-[13px] font-bold text-ink/70 border-2 border-ink/10 active:translate-y-0.5 transition"
        >
          {t("rateForm.success.cta.home", undefined, locale)}
        </Link>
      </div>

      <p className="mt-8 flex items-center justify-center gap-1 text-[11px] text-ink/40">
        <Emoji name="custard" size={14} />
        {t("rateForm.success.footer", undefined, locale)}
      </p>
    </main>
  );
}
