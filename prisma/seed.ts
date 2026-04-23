import { createHash } from "node:crypto";
import { prisma } from "../lib/db";

const BIRTH_SALT = process.env.BIRTH_SALT ?? "dev-birth-salt";
const IP_SALT = process.env.IP_SALT ?? "dev-ip-salt";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const hashBirth = (b: string) => sha256(`${BIRTH_SALT}:${b}`);
const hashIp = (ip: string) => sha256(`${IP_SALT}:${ip}`);

async function main() {
  console.log("🌱 Seeding...");

  await prisma.review.deleteMany({});

  const targetInstaId = "minjae_shin";
  const targetBirthHash = hashBirth("940530");

  const reviews = [
    {
      scores: [4, 4, 3, 4, 2],
      comment: "웃음소리가 진짜 맑았어~ 근데 약속은 맨날 늦음 ㅋㅋ",
      ip: "seed-ip-001",
    },
    {
      scores: [5, 3, 2, 4, 1],
      comment: "사람은 착한데 연애할 땐 살짝 자기중심적이었어용,,,",
      ip: "seed-ip-002",
    },
    {
      scores: [4, 4, 3, 4, 2],
      comment: "다시 만나진 않겠지만 좋은 사람이었다고 말해주고 싶어!",
      ip: "seed-ip-003",
    },
    {
      scores: [3, 3, 3, 4, 2],
      comment: "첫 만남엔 설레었는데 중반부터 식어버린 느낌…",
      ip: "seed-ip-004",
    },
  ];

  for (const r of reviews) {
    await prisma.review.create({
      data: {
        instaId: targetInstaId,
        birthCodeHash: targetBirthHash,
        scoreLooks: r.scores[0],
        scorePersonality: r.scores[1],
        scoreLove: r.scores[2],
        scoreManner: r.scores[3],
        scoreReunion: r.scores[4],
        comment: r.comment,
        ipHash: hashIp(r.ip),
      },
    });
  }

  // 장난 생일로 남긴 격리 프로필 (1건) — 동작 확인용
  await prisma.review.create({
    data: {
      instaId: targetInstaId,
      birthCodeHash: hashBirth("000101"),
      scoreLooks: 1,
      scorePersonality: 1,
      scoreLove: 1,
      scoreManner: 1,
      scoreReunion: 1,
      comment: "(장난 격리 프로필)",
      ipHash: hashIp("seed-ip-grief"),
    },
  });

  const total = await prisma.review.count();
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
