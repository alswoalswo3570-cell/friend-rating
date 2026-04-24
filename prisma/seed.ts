import { createHash } from "node:crypto";
import { prisma } from "../lib/db";

const BIRTH_SALT = process.env.BIRTH_SALT ?? "dev-birth-salt";
const IP_SALT = process.env.IP_SALT ?? "dev-ip-salt";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const hashBirth = (b: string) => sha256(`${BIRTH_SALT}:${b}`);
const hashIp = (ip: string) => sha256(`${IP_SALT}:${ip}`);

async function main() {
  console.log("🌱 Seeding...");

  await prisma.friendReview.deleteMany({});

  const targetInstaId = "minjae_shin";
  const targetBirthHash = hashBirth("940530");

  const reviews = [
    {
      scores: [4, 4, 3, 4, 2],
      comment: "유머감각 최고~ 근데 연락은 맨날 늦음 ㅋㅋ",
      ip: "seed-ip-001",
    },
    {
      scores: [5, 3, 2, 4, 1],
      comment: "웃기긴 한데 비밀 지키는 건 좀 별로였어",
      ip: "seed-ip-002",
    },
    {
      scores: [4, 5, 3, 4, 3],
      comment: "진짜 의리 있는 친구! 힘들 때 제일 먼저 와줬어",
      ip: "seed-ip-003",
    },
    {
      scores: [3, 3, 4, 4, 3],
      comment: "바이브 좋고 연락 잘 되는 편~ 오래 사귄 친구",
      ip: "seed-ip-004",
    },
  ];

  for (const r of reviews) {
    await prisma.friendReview.create({
      data: {
        instaId: targetInstaId,
        birthCodeHash: targetBirthHash,
        scoreHumor: r.scores[0],
        scoreLoyalty: r.scores[1],
        scoreTexting: r.scores[2],
        scoreVibes: r.scores[3],
        scoreSecrets: r.scores[4],
        comment: r.comment,
        ipHash: hashIp(r.ip),
      },
    });
  }

  const total = await prisma.friendReview.count();
  console.log(`✅ Seeded ${total} reviews`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
