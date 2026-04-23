"use client";

import React from "react";
import { strings, type StringKey, type Locale } from "@/lib/strings";
import { useLocale } from "@/lib/locale";

type Vars = Record<string, React.ReactNode>;

function tokenize(
  template: string,
  vars: Vars | undefined,
  boldClassName: string,
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let key = 0;
  const lines = template.split(/\r?\n/);
  lines.forEach((line, li) => {
    if (li > 0) nodes.push(<br key={`br-${key++}`} />);
    const re = /\*\*([^*]+?)\*\*|\{(\w+)\}/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) nodes.push(line.slice(last, m.index));
      if (m[1] !== undefined) {
        nodes.push(
          <b key={`b-${key++}`} className={boldClassName}>
            {m[1]}
          </b>,
        );
      } else if (m[2] !== undefined) {
        const name = m[2];
        const v = vars?.[name];
        nodes.push(
          <React.Fragment key={`s-${key++}`}>
            {v !== undefined ? v : `{${name}}`}
          </React.Fragment>,
        );
      }
      last = re.lastIndex;
    }
    if (last < line.length) nodes.push(line.slice(last));
  });
  return nodes;
}

/**
 * 카탈로그의 문자열을 JSX로 렌더.
 * - `**bold**` → <b className={boldClassName}>
 * - `{slot}` → vars[slot] (string | ReactNode)
 * - `\n` → <br />
 */
export default function RichText({
  k,
  vars,
  boldClassName = "font-extrabold text-ink",
  locale: localeProp,
}: {
  k: StringKey;
  vars?: Vars;
  boldClassName?: string;
  locale?: Locale;
}) {
  const ctxLocale = useLocale();
  const locale = localeProp ?? ctxLocale;
  const entry = strings[k];
  const tpl = entry[locale] || entry.ko;
  return <>{tokenize(tpl, vars, boldClassName)}</>;
}

/** 문자열만 필요한 곳용: `{var}`만 치환, 볼드 토큰은 제거. */
export function tPlain(
  k: StringKey,
  vars?: Record<string, string | number>,
  locale: Locale = "ko",
): string {
  const entry = strings[k];
  const raw = entry[locale] || entry.ko;
  const swapped = vars
    ? raw.replace(/\{(\w+)\}/g, (m, name: string) =>
        name in vars ? String(vars[name]) : m,
      )
    : raw;
  return swapped.replace(/\*\*(.+?)\*\*/g, "$1");
}
