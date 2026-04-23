// UX writing 카탈로그 → CSV 내보내기
// 사용: npm run strings:export
//
// 생성된 strings.csv를 Google Sheets에 열거나 Import 하세요.
// UTF-8 BOM이 포함되어 엑셀에서도 한글이 정상 표시됩니다.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { strings } from "../lib/strings";

// 키 접두사 → 사용 위치 매핑
const whereByPrefix: Record<string, string> = {
  meta: "app/layout.tsx, app/*/page.tsx",
  common: "여러 컴포넌트 공용",
  landing: "app/page.tsx",
  lookup: "components/HostLookupForm.tsx",
  rateStart: "components/GuestStartForm.tsx",
  verify: "components/GuestVerify.tsx",
  rateForm: "components/RateForm.tsx",
  dashboard: "components/Dashboard.tsx",
};

function extractVars(value: string): string {
  const found = new Set<string>();
  const re = /\{(\w+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) found.add(m[1]!);
  return [...found].join(", ");
}

function csvEscape(s: string): string {
  const needsQuote = /[",\n\r]/.test(s);
  const body = s.replace(/"/g, '""');
  return needsQuote ? `"${body}"` : body;
}

function main() {
  const header = ["key", "ko", "en", "vars", "notes", "where_used"];
  const rows = [header.map(csvEscape).join(",")];

  const entries = Object.entries(strings) as [
    string,
    { ko: string; en: string; notes?: string },
  ][];

  entries.sort(([a], [b]) => a.localeCompare(b));

  for (const [key, entry] of entries) {
    const prefix = key.split(".")[0]!;
    const where = whereByPrefix[prefix] ?? "";
    // vars는 ko 템플릿 기준으로 뽑음 (en과 동일해야 정상)
    const vars = extractVars(entry.ko);
    rows.push(
      [key, entry.ko, entry.en, vars, entry.notes ?? "", where]
        .map(csvEscape)
        .join(","),
    );
  }

  const BOM = "\uFEFF";
  const outPath = resolve(process.cwd(), "strings.csv");
  writeFileSync(outPath, BOM + rows.join("\n"), "utf8");

  console.log(`✅ ${entries.length}개 스트링 → ${outPath}`);
  console.log("   Google Sheets → 파일 → 가져오기 → strings.csv 선택");
}

main();
