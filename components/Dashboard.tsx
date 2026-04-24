"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScoreRadarChart, { ScoreAxis } from "@/components/ScoreRadarChart";
import Emoji, { type EmojiName } from "@/components/Emoji";
import RichText from "@/components/RichText";
import { showToast } from "@/components/Toast";
import { t } from "@/lib/strings";
import { useLocale } from "@/lib/locale";
import { drawShareCard } from "@/lib/drawShareCard";
import AdFitBanner from "@/components/AdFitBanner";

const scoreEmojiName = (v: number): EmojiName =>
  v >= 4.5
    ? "smiling-face-with-heart-eyes"
    : v >= 3.5
    ? "smiling-face-with-hearts"
    : v >= 2.5
    ? "slightly-smiling-face"
    : v >= 1.5
    ? "crying-face"
    : "loudly-crying-face";

const toneCycle = ["pink", "mint", "butter"] as const;
const toneMap = {
  pink: { bg: "#FFC2DD", tail: "#FFC2DD" },
  mint: { bg: "#C5EFDD", tail: "#C5EFDD" },
  butter: { bg: "#FFEC99", tail: "#FFEC99" },
} as const;
const bubbleEmojis: EmojiName[] = [
  "lollipop",
  "tulip",
  "teddy-bear",
  "custard",
  "sparkling-heart",
];

type ProfileResponse = {
  exists: true;
  instaId: string;
  count: number;
  avg: {
    humor: number;
    loyalty: number;
    texting: number;
    vibes: number;
    secrets: number;
  };
  overall: number;
  comments: { id: string; comment: string; createdAt: string }[];
};

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "missing" }
  | { status: "notfound" }
  | { status: "error"; message: string }
  | { status: "ok"; data: ProfileResponse };

export default function Dashboard() {
  const search = useSearchParams();
  const locale = useLocale();
  const id = search.get("id") ?? "";
  const birth = search.get("b") ?? "";

  const [state, setState] = useState<FetchState>({ status: "idle" });

  useEffect(() => {
    if (!id || !/^\d{6}$/.test(birth)) {
      setState({ status: "missing" });
      return;
    }
    setState({ status: "loading" });
    const ctrl = new AbortController();
    fetch(
      `/api/profile?id=${encodeURIComponent(id)}&birth=${encodeURIComponent(birth)}`,
      { signal: ctrl.signal, cache: "no-store" },
    )
      .then(async (res) => {
        if (res.status === 404) {
          setState({ status: "notfound" });
          return;
        }
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          setState({ status: "error", message: msg || `HTTP ${res.status}` });
          return;
        }
        const data: ProfileResponse = await res.json();
        setState({ status: "ok", data });
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        setState({
          status: "error",
          message: e instanceof Error ? e.message : t("common.error.unknown", undefined, locale),
        });
      });
    return () => ctrl.abort();
  }, [id, birth]);

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
          <Emoji name="sparkles" size={14} />
          {t("common.badge", undefined, locale)}
          <Emoji name="strawberry" size={14} />
        </span>
      </div>

      {state.status === "missing" && <MissingArgs />}
      {state.status === "loading" && <Loading />}
      {state.status === "notfound" && <NotFound instaId={id} />}
      {state.status === "error" && <ErrorBox message={state.message} />}
      {state.status === "ok" && <Content data={state.data} />}
    </main>
  );
}

function MissingArgs() {
  const locale = useLocale();
  return (
    <section className="rounded-[24px] bg-white border-2 border-ink/10 p-6 text-center shadow-pop">
      <Emoji name="locked" size={48} />
      <h2 className="mt-3 text-[18px] font-extrabold text-ink">
        {t("dashboard.state.missing.title", undefined, locale)}
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
        {t("dashboard.state.missing.sub", undefined, locale)}
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-full bg-coral px-5 py-3 text-[13px] font-extrabold text-white border-2 border-ink/10 shadow-pop"
      >
        {t("dashboard.state.missing.cta", undefined, locale)}
      </Link>
    </section>
  );
}

function Loading() {
  const locale = useLocale();
  return (
    <section className="relative rounded-[28px] bg-white border-2 border-ink/10 px-5 pt-6 pb-5 shadow-poplg">
      <span className="tape" aria-hidden />
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-butter/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-auto h-2.5 w-24 rounded-full bg-ink/5" />
      </div>
      <div className="animate-pulse space-y-4">
        <div className="mx-auto h-[220px] w-full max-w-[280px] rounded-full bg-gradient-to-br from-bubble/30 to-lavender/30" />
        <div className="dashed-rule" />
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 rounded-2xl bg-cream" />
          ))}
        </div>
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] font-bold text-ink/45">
        <Emoji name="sparkles" size={14} />
        {t("dashboard.state.loading", undefined, locale)}
      </p>
    </section>
  );
}

function NotFound({ instaId }: { instaId: string }) {
  const locale = useLocale();
  return (
    <section className="rounded-[24px] bg-white border-2 border-ink/10 p-6 text-center shadow-pop">
      <Emoji name="thinking-face" size={48} />
      <h2 className="mt-3 text-[18px] font-extrabold text-ink">
        {t("dashboard.state.notfound.title", undefined, locale)}
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
        {instaId ? (
          <RichText k="dashboard.state.notfound.body" vars={{ id: instaId }} />
        ) : (
          t("dashboard.state.notfound.bodyNoId", undefined, locale)
        )}
      </p>
      <div className="mt-5 space-y-2">
        {instaId && (
          <button
            type="button"
            onClick={async () => {
              const url = `${location.origin}/rate/${encodeURIComponent(instaId)}`;
              try {
                await navigator.clipboard.writeText(url);
                showToast(t("common.toast.link.copied", undefined, locale), "sparkles");
              } catch {
                showToast(t("common.toast.link.copyFailed", undefined, locale), "crying-face");
              }
            }}
            className="block w-full rounded-full bg-coral py-3 text-[13px] font-extrabold text-white border-2 border-ink/10 shadow-pop active:translate-y-0.5 transition"
          >
            <span className="inline-flex items-center gap-2">
              <Emoji name="link" size={16} />
              {t("common.empty.cta.copyLink", undefined, locale)}
            </span>
          </button>
        )}
        <Link
          href="/"
          className="block w-full rounded-full bg-white/80 py-3 text-[13px] font-bold text-ink/70 border-2 border-ink/10 active:translate-y-0.5 transition"
        >
          {t("dashboard.state.notfound.cta.home", undefined, locale)}
        </Link>
      </div>
    </section>
  );
}

function ErrorBox({ message }: { message: string }) {
  const locale = useLocale();
  return (
    <section className="rounded-[24px] bg-white border-2 border-ink/10 p-6 text-center shadow-pop">
      <Emoji name="crying-face" size={40} />
      <h2 className="mt-3 text-[16px] font-extrabold text-ink">
        {t("dashboard.state.error.title", undefined, locale)}
      </h2>
      <p className="mt-2 text-[12px] text-ink/50 break-all">{message}</p>
    </section>
  );
}

function Content({ data }: { data: ProfileResponse }) {
  const locale = useLocale();
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      const blob = await drawShareCard({
        instaId: data.instaId,
        overall: data.overall,
        avg: data.avg,
        count: data.count,
      });
      const file = new File([blob], "ex-rating.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: `@${data.instaId} 통지표` });
          return;
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError") return;
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ex-rating.png";
      a.click();
      URL.revokeObjectURL(url);
      showToast("저장 완료! 인스타 스토리 → 갤러리에서 선택 📸", "camera-with-flash");
    } catch {
      showToast("이미지 생성에 실패했어요 😢", "crying-face");
    } finally {
      setSharing(false);
    }
  };

  const axes: ScoreAxis[] = [
    { axis: t("dashboard.axis.humor", undefined, locale), value: data.avg.humor },
    { axis: t("dashboard.axis.loyalty", undefined, locale), value: data.avg.loyalty },
    { axis: t("dashboard.axis.texting", undefined, locale), value: data.avg.texting },
    { axis: t("dashboard.axis.vibes", undefined, locale), value: data.avg.vibes },
    { axis: t("dashboard.axis.secrets", undefined, locale), value: data.avg.secrets },
  ];

  return (
    <>
      <span className="deco" style={{ top: 60, right: 22, ["--r" as string]: "-12deg" }}>
        <Emoji name="sparkling-heart" size={30} />
      </span>
      <span className="deco delay-1" style={{ top: 120, left: 16, ["--r" as string]: "10deg" }}>
        <Emoji name="glowing-star" size={22} />
      </span>
      <span className="deco delay-2" style={{ top: 210, right: 12, ["--r" as string]: "18deg" }}>
        <Emoji name="ribbon" size={24} />
      </span>

      <header className="mb-7">
        <h1 className="text-[26px] font-extrabold leading-[1.25] tracking-tight text-ink">
          <RichText
            k="dashboard.title"
            vars={{
              idChip: (
                <span className="inline-block rounded-lg bg-white/70 px-2 py-0.5 text-[22px] font-bold text-ink/90">
                  @{data.instaId}
                </span>
              ),
              highlight: (
                <span className="relative text-coral">
                  {t("dashboard.title.highlight", undefined, locale)}
                  <span className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-bubble/70 -z-10" />
                </span>
              ),
            }}
          />
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-[14px] font-bold text-ink/80">
          <RichText
            k="dashboard.stats"
            vars={{
              countBold: (
                <b className="font-extrabold text-coral">
                  {t("dashboard.stats.count", { count: data.count }, locale)}
                </b>
              ),
              avgBold: (
                <b className="font-extrabold text-ink tabular-nums">
                  {data.overall.toFixed(1)}
                </b>
              ),
            }}
          />{" "}
          <Emoji name={scoreEmojiName(data.overall)} size={18} />
        </p>
      </header>

      <section className="relative rounded-[28px] bg-white border-2 border-ink/10 px-5 pt-6 pb-5 shadow-poplg">
        <span className="tape" aria-hidden />
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-butter" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="ml-auto text-[10px] font-bold tracking-wider text-ink/40">
            {t("dashboard.card.label", undefined, locale)}
          </span>
        </div>

        <ScoreRadarChart data={axes} />

        <div className="dashed-rule my-4" />

        <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {axes.map((s) => {
            const chipBg =
              s.value >= 4 ? "bg-mint/50" : s.value >= 3 ? "bg-butter/60" : "bg-bubble/60";
            return (
              <li
                key={s.axis}
                className={`flex items-center justify-between rounded-2xl border-2 border-ink/8 px-3 py-2.5 ${chipBg}`}
              >
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-ink/75">
                  <Emoji name={scoreEmojiName(s.value)} size={17} />
                  {s.axis}
                </span>
                <span className="text-[17px] font-extrabold text-ink tabular-nums">
                  {s.value.toFixed(1)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <AdFitBanner />

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink mb-5">
          <Emoji name="love-letter" size={22} />
          {t("dashboard.comments.title", undefined, locale)}
          <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral px-1.5 text-[11px] font-extrabold text-white">
            {data.comments.length}
          </span>
        </h2>
        {data.comments.length === 0 ? (
          <div className="rounded-2xl bg-white/70 border-2 border-ink/10 p-5 text-center">
            <Emoji name="love-letter" size={36} />
            <p className="mt-2 text-[13px] font-bold text-ink/70">
              {t("dashboard.comments.empty.title", undefined, locale)}
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink/45">
              {t("dashboard.comments.empty.sub", undefined, locale)}
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {data.comments.map((c, i) => {
              const tone = toneCycle[i % toneCycle.length];
              const emoji = bubbleEmojis[i % bubbleEmojis.length];
              return (
                <li
                  key={c.id}
                  className="bubble-tail relative rounded-[22px] border-2 border-ink/10 px-4 py-3.5 pl-12 text-[13.5px] leading-relaxed text-ink shadow-pop"
                  style={{
                    background: toneMap[tone].bg,
                    ["--tail" as string]: toneMap[tone].tail,
                  }}
                >
                  <span className="absolute left-3 top-3">
                    <Emoji name={emoji} size={26} />
                  </span>
                  {c.comment}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="mt-12 space-y-3">
        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          className="group relative w-full rounded-full bg-coral py-4 text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition disabled:opacity-60"
        >
          <span className="absolute -top-2 -right-2 rotate-12 rounded-full bg-butter px-2 py-0.5 text-[10px] font-extrabold text-ink border-2 border-ink/10 shadow-pop">
            {t("dashboard.cta.share.sticker", undefined, locale)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Emoji name="camera-with-flash" size={20} />
            {sharing ? "이미지 생성 중..." : t("dashboard.cta.share.label", undefined, locale)}
          </span>
        </button>
        <button
          type="button"
          onClick={async () => {
            const url = `${location.origin}/rate/${encodeURIComponent(data.instaId)}`;
            try {
              await navigator.clipboard.writeText(url);
              showToast(t("common.toast.link.copied", undefined, locale), "sparkles");
            } catch {
              showToast(
                t("common.toast.link.copyFailedLong", undefined, locale),
                "crying-face",
              );
            }
          }}
          className="w-full rounded-full bg-white/80 py-3 text-[13px] font-bold text-ink/70 border-2 border-ink/10 active:translate-y-0.5 transition"
        >
          {t("dashboard.cta.copy", undefined, locale)}
        </button>
      </div>
    </>
  );
}
