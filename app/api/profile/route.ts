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
    reviews = await prisma.friendReview.findMany({
      where: { instaId, birthCodeHash },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        scoreHumor: true,
        scoreLoyalty: true,
        scoreTexting: true,
        scoreVibes: true,
        scoreSecrets: true,
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
      acc.humor += r.scoreHumor;
      acc.loyalty += r.scoreLoyalty;
      acc.texting += r.scoreTexting;
      acc.vibes += r.scoreVibes;
      acc.secrets += r.scoreSecrets;
      return acc;
    },
    { humor: 0, loyalty: 0, texting: 0, vibes: 0, secrets: 0 },
  );
  const round = (v: number) => Math.round((v / n) * 10) / 10;
  const avg = {
    humor: round(sum.humor),
    loyalty: round(sum.loyalty),
    texting: round(sum.texting),
    vibes: round(sum.vibes),
    secrets: round(sum.secrets),
  };
  const overall = round(
    (sum.humor + sum.loyalty + sum.texting + sum.vibes + sum.secrets) / 5,
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
