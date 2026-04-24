import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) throw new Error("TURSO_DATABASE_URL not set");

const db = createClient({ url, authToken });

async function main() {
  console.log("🔧 Running FriendReview migration on Turso...");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "FriendReview" (
      id            TEXT    NOT NULL PRIMARY KEY,
      instaId       TEXT    NOT NULL,
      birthCodeHash TEXT    NOT NULL,
      scoreHumor    INTEGER NOT NULL,
      scoreLoyalty  INTEGER NOT NULL,
      scoreTexting  INTEGER NOT NULL,
      scoreVibes    INTEGER NOT NULL,
      scoreSecrets  INTEGER NOT NULL,
      comment       TEXT    NOT NULL DEFAULT '',
      ipHash        TEXT    NOT NULL,
      createdAt     DATETIME NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS "FriendReview_instaId_birthCodeHash_idx"
    ON "FriendReview"(instaId, birthCodeHash)
  `);

  const { rows } = await db.execute('SELECT COUNT(*) as cnt FROM "FriendReview"');
  console.log(`✅ FriendReview table ready. Current row count: ${rows[0].cnt}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
