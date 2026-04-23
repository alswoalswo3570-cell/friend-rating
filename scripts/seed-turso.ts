import { createClient } from "@libsql/client";
import { createHash, randomUUID } from "node:crypto";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) throw new Error("TURSO_DATABASE_URL not set");

const db = createClient({ url, authToken });

const BIRTH_SALT = process.env.BIRTH_SALT ?? "dev-birth-salt";
const IP_SALT = process.env.IP_SALT ?? "dev-ip-salt";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const hashBirth = (b: string) => sha256(`${BIRTH_SALT}:${b}`);
const hashIp = (ip: string) => sha256(`${IP_SALT}:${ip}`);

const targetInstaId = "minjae_shin";
const targetBirthHash = hashBirth("940530");

const rows = [
  { scores: [4, 4, 3, 4, 2], comment: "웃음소리가 진짜 맑았어~ 근데 약속은 맨날 늦음 ㅋㅋ", ip: "seed-ip-001" },
  { scores: [5, 3, 2, 4, 1], comment: "사람은 착한데 연애할 땐 살짝 자기중심적이었어용,,,", ip: "seed-ip-002" },
  { scores: [4, 4, 3, 4, 2], comment: "다시 만나진 않겠지만 좋은 사람이었다고 말해주고 싶어!", ip: "seed-ip-003" },
  { scores: [3, 3, 3, 4, 2], comment: "첫 만남엔 설레었는데 중반부터 식어버린 느낌…", ip: "seed-ip-004" },
  { scores: [1, 1, 1, 1, 1], comment: "(장난 격리 프로필)", ip: "seed-ip-grief", birthOverride: hashBirth("000101") },
];

async function main() {
  console.log("🌱 Seeding Turso...");

  await db.execute('DELETE FROM "Review"');

  for (const r of rows) {
    await db.execute({
      sql: `INSERT INTO "Review" (id, instaId, birthCodeHash, scoreLooks, scorePersonality, scoreLove, scoreManner, scoreReunion, comment, ipHash, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      args: [
        randomUUID(),
        targetInstaId,
        r.birthOverride ?? targetBirthHash,
        r.scores[0], r.scores[1], r.scores[2], r.scores[3], r.scores[4],
        r.comment,
        hashIp(r.ip),
      ],
    });
  }

  const { rows: result } = await db.execute('SELECT COUNT(*) as cnt FROM "Review"');
  console.log(`✅ Seeded ${result[0].cnt} reviews`);
}

main().catch((e) => { console.error(e); process.exit(1); });
