// strings.csv → lib/strings.ts 역방향 sync
// 사용: npm run strings:import

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const CSV_PATH = resolve(process.cwd(), "strings.csv");
const TS_PATH = resolve(process.cwd(), "lib/strings.ts");

function parseCSV(text: string): string[][] {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\r") {
        // ignore
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((f) => f.length > 0));
}

function jsString(s: string): string {
  return (
    '"' +
    s
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t") +
    '"'
  );
}

const groupLabel: Record<string, string> = {
  meta: "Meta / <head>",
  common: "Common (공통)",
  landing: "Landing (/)",
  lookup: "Lookup (/lookup)",
  rateStart: "RateStart (/rate)",
  verify: "Verify (/rate/[id])",
  rateForm: "RateForm (/rate/[id]/write + success)",
  dashboard: "Dashboard (/dashboard)",
};

function main() {
  if (!existsSync(CSV_PATH)) {
    console.error(`❌ ${CSV_PATH} 파일이 없어요.`);
    console.error(
      "   먼저 Google Sheets에서 CSV로 다운로드 후 프로젝트 루트에 저장해주세요.",
    );
    process.exit(1);
  }

  const csvText = readFileSync(CSV_PATH, "utf8");
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    console.error("❌ CSV가 비었거나 헤더만 있어요.");
    process.exit(1);
  }

  const header = rows[0]!.map((h) => h.trim());
  const idxKey = header.indexOf("key");
  const idxKo = header.indexOf("ko");
  const idxEn = header.indexOf("en");
  const idxNotes = header.indexOf("notes");
  if (idxKey < 0 || idxKo < 0) {
    console.error(
      `❌ CSV 헤더에 최소 \`key\`, \`ko\` 컬럼이 필요해요. 현재: ${header.join(",")}`,
    );
    process.exit(1);
  }
  if (idxEn < 0) {
    console.warn(
      "⚠️  `en` 컬럼이 없어서 한글로 en 값을 채웁니다. (시트에 en 컬럼을 추가하는 걸 권장)",
    );
  }

  type Entry = { key: string; ko: string; en: string; notes: string };
  const entries: Entry[] = [];
  const seen = new Set<string>();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]!;
    const key = (r[idxKey] ?? "").trim();
    if (!key) continue;
    if (seen.has(key)) {
      console.error(`❌ 중복 키: ${key} (line ${i + 1})`);
      process.exit(1);
    }
    seen.add(key);
    const ko = r[idxKo] ?? "";
    const en = idxEn >= 0 ? (r[idxEn] ?? "") : "";
    const notes = idxNotes >= 0 ? (r[idxNotes] ?? "").trim() : "";
    entries.push({ key, ko, en: en || ko, notes });
  }

  entries.sort((a, b) => a.key.localeCompare(b.key));

  const groups = new Map<string, Entry[]>();
  for (const e of entries) {
    const pfx = e.key.split(".")[0]!;
    if (!groups.has(pfx)) groups.set(pfx, []);
    groups.get(pfx)!.push(e);
  }

  const orderedPrefixes = [
    "meta",
    "common",
    "landing",
    "lookup",
    "rateStart",
    "verify",
    "rateForm",
    "dashboard",
  ];
  for (const pfx of groups.keys()) {
    if (!orderedPrefixes.includes(pfx)) orderedPrefixes.push(pfx);
  }

  const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, " UTC");
  const lines: string[] = [];
  lines.push(
    "// ⚠️  AUTO-GENERATED from strings.csv (npm run strings:import)",
    "// 직접 수정하지 마세요. 카피는 Google Sheets에서 편집 후 재임포트.",
    "//",
    "// 수정 흐름:",
    "//   1. Google Sheets에서 `ko` 또는 `en` 컬럼 편집",
    "//   2. 파일 → 다운로드 → 쉼표로 구분된 값(.csv)",
    "//   3. 프로젝트 루트 `strings.csv`로 저장 (덮어쓰기)",
    "//   4. npm run strings:import",
    "//",
    `// Last import: ${now}`,
    "",
    'export type Locale = "ko" | "en";',
    "export type StringEntry = {",
    "  ko: string;",
    "  en: string;",
    "  notes?: string;",
    "};",
    "",
    "export const strings = {",
  );

  for (const pfx of orderedPrefixes) {
    const g = groups.get(pfx);
    if (!g || g.length === 0) continue;
    const label = groupLabel[pfx] ?? pfx;
    lines.push(`  // ───── ${label} ─────`);
    for (const e of g) {
      const parts: string[] = [
        `ko: ${jsString(e.ko)}`,
        `en: ${jsString(e.en)}`,
      ];
      if (e.notes) parts.push(`notes: ${jsString(e.notes)}`);
      lines.push(`  ${jsString(e.key)}: { ${parts.join(", ")} },`);
    }
    lines.push("");
  }

  lines.push(
    "} as const satisfies Record<string, StringEntry>;",
    "",
    "export type StringKey = keyof typeof strings;",
    "",
    "/** `{var}` 치환. locale 생략 시 `ko`. */",
    "export function t(",
    "  key: StringKey,",
    "  vars?: Record<string, string | number>,",
    '  locale: Locale = "ko",',
    "): string {",
    "  const entry = strings[key];",
    "  const raw = entry[locale] || entry.ko;",
    "  if (!vars) return raw;",
    "  return raw.replace(/\\{(\\w+)\\}/g, (m, name: string) =>",
    "    name in vars ? String(vars[name]) : m,",
    "  );",
    "}",
    "",
  );

  writeFileSync(TS_PATH, lines.join("\n"), "utf8");

  console.log(`✅ ${entries.length}개 스트링 → lib/strings.ts (ko + en)`);
  console.log(
    `   그룹: ${orderedPrefixes.filter((p) => groups.has(p)).join(", ")}`,
  );
  console.log("   dev 서버가 실행 중이면 HMR로 즉시 반영됩니다.");
}

main();
