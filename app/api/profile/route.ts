import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashBirth, normalizeInstaId } from "@/lib/hash";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const idRaw = req.nextUrl.searchParams.get("id") ?? "";
  const birthCode = req.nextUrl.searchParams.get("birth") ?? "";

  const instaId = normalizeInstaId(idRaw);
  if (instaId.length < 2 || instaId.length > 30 || !/^[a-z0-9._]+$/i.test(instaId)) {
    return NextResponse.json({ error: "invalid_insta_id" }, { status: 400 });
  }
  if (!/^\d{6}$/.test(birthCode)) {
    return NextResponse.json({ error: "invalid_birth_code" }, { status: 400 });
  }

  const birthCodeHash = hashBirth(birthCode);

  let reviews;
  try {
    reviews = await prisma.review.findMany({
      where: { instaId, birthCodeHash },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        scoreLooks: true,
        scorePersonality: true,
        scoreLove: true,
        scoreManner: true,
        scoreReunion: true,
        comment: true,
        createdAt: true,
      },
    });
  } catch (e) {
    console.error("DB_ERROR", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }

  if (reviews.length === 0) {
    return NextResponse.json({ exists: false, count: 0 }, { status: 404 });
  }

  const n = reviews.length;
  const sum = reviews.reduce(
    (acc, r) => {
      acc.looks += r.scoreLooks;
      acc.personality += r.scorePersonality;
      acc.love += r.scoreLove;
      acc.manner += r.scoreManner;
      acc.reunion += r.scoreReunion;
      return acc;
    },
    { looks: 0, personality: 0, love: 0, manner: 0, reunion: 0 },
  );
  const round = (v: number) => Math.round((v / n) * 10) / 10;
  const avg = {
    looks: round(sum.looks),
    personality: round(sum.personality),
    love: round(sum.love),
    manner: round(sum.manner),
    reunion: round(sum.reunion),
  };
  const overall = round(
    (sum.looks + sum.personality + sum.love + sum.manner + sum.reunion) / 5,
  );

  return NextResponse.json({
    exists: true,
    instaId,
    count: n,
    avg,
    overall,
    comments: reviews
      .filter((r) => r.comment.trim().length > 0)
      .map((r) => ({ id: r.id, comment: r.comment, createdAt: r.createdAt })),
  });
}
