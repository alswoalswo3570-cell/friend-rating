"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Emoji from "@/components/Emoji";
import RichText from "@/components/RichText";
import { showToast } from "@/components/Toast";
import { t } from "@/lib/strings";
import { useLocale } from "@/lib/locale";

export default function HostLookupForm() {
  const router = useRouter();
  const locale = useLocale();
  const [instaId, setInstaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyTarget, setEmptyTarget] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const idClean = instaId.replace(/^@/, "").trim();
  const idValid = /^[a-zA-Z0-9._]{2,30}$/.test(idClean);
  const canSubmit = !loading && idValid;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setErr(null);
    setEmptyTarget(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/profile?id=${encodeURIComponent(idClean)}`,
        { cache: "no-store" },
      );
      if (res.status === 404) {
        setEmptyTarget(idClean);
        return;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        setErr(t("lookup.error.queryFailed", { msg: txt || String(res.status) }, locale));
        return;
      }
      router.push(`/dashboard?id=${encodeURIComponent(idClean)}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("common.error.network", undefined, locale));
    } finally {
      setLoading(false);
    }
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
          <Emoji name="glowing-star" size={14} />
          {t("lookup.nav.badge", undefined, locale)}
        </span>
      </div>

      <span className="deco" style={{ top: 4, right: 22, ["--r" as string]: "-14deg" }}>
        <Emoji name="sparkling-heart" size={28} />
      </span>
      <span className="deco delay-1" style={{ top: 56, left: 16, ["--r" as string]: "12deg" }}>
        <Emoji name="glowing-star" size={22} />
      </span>

      <header className="mb-5 text-center">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-ink">
          <RichText
            k="lookup.headline"
            vars={{
              highlight: (
                <span className="relative text-coral">
                  {t("lookup.headline.highlight", undefined, locale)}
                  <span className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-bubble/70 -z-10" />
                </span>
              ),
            }}
          />
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
          <RichText k="lookup.sub" />
        </p>
      </header>

      <form
        onSubmit={submit}
        className="rounded-[28px] bg-white border-2 border-ink/10 p-5 shadow-poplg"
      >
        <label className="block text-[12px] font-extrabold text-ink/80">
          {t("lookup.field.instaId.label", undefined, locale)}
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
            placeholder={t("lookup.field.instaId.placeholder", undefined, locale)}
            className="flex-1 bg-transparent py-3 pr-4 text-[15px] font-bold text-ink placeholder:text-ink/30 outline-none"
          />
        </div>

        {err && (
          <p className="mt-4 rounded-2xl bg-bubble/40 border-2 border-ink/10 px-3 py-2 text-[12px] leading-relaxed text-ink/80">
            {err}
          </p>
        )}

        {emptyTarget && (
          <div className="mt-4 rounded-2xl bg-cream border-2 border-ink/10 p-3.5">
            <p className="flex items-center gap-1.5 text-[13px] font-extrabold text-ink">
              <Emoji name="thinking-face" size={18} />
              {t("common.empty.title", undefined, locale)}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink/60">
              <RichText k="common.empty.body" vars={{ id: emptyTarget }} />
            </p>
            <button
              type="button"
              onClick={async () => {
                const url = `${location.origin}/rate/${encodeURIComponent(emptyTarget)}`;
                try {
                  await navigator.clipboard.writeText(url);
                  showToast(t("common.toast.link.copied", undefined, locale), "sparkles");
                } catch {
                  showToast(t("common.toast.link.copyFailed", undefined, locale), "crying-face");
                }
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-coral/90 py-2.5 text-[12.5px] font-extrabold text-white border-2 border-ink/10 shadow-pop active:translate-y-0.5 transition"
            >
              <Emoji name="link" size={16} />
              {t("common.empty.cta.copyLink", undefined, locale)}
            </button>
            <p className="mt-2 text-center text-[10.5px] text-ink/45">
              {t("common.empty.footer.onePublic", undefined, locale)}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 w-full rounded-full bg-coral py-4 text-[15px] font-extrabold text-white shadow-poplg border-2 border-ink/10 active:translate-y-1 active:shadow-pop transition disabled:opacity-40 disabled:shadow-pop disabled:active:translate-y-0"
        >
          <span className="inline-flex items-center gap-2">
            <Emoji name="glowing-star" size={18} />
            {loading ? t("lookup.submit.loading", undefined, locale) : t("lookup.submit.idle", undefined, locale)}
          </span>
        </button>
      </form>
    </main>
  );
}
