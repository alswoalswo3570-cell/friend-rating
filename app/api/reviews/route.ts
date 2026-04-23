import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashBirth, hashIp, normalizeInstaId } from "@/lib/hash";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

const isIntInRange = (v: unknown, lo: number, hi: number): v is number =>
  typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi;

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const instaIdRaw = typeof body.instaId === "string" ? body.instaId : "";
  const birthCode = typeof body.birthCode === "string" ? body.birthCode : "";
  const comment = typeof body.comment === "string" ? body.comment : "";

  const instaId = normalizeInstaId(instaIdRaw);
  if (instaId.length < 2 || instaId.length > 30 || !/^[a-z0-9._]+$/i.test(instaId)) {
    return NextResponse.json({ error: "invalid_insta_id" }, { status: 400 });
  }
  if (!/^\d{6}$/.test(birthCode)) {
    return NextResponse.json({ error: "invalid_birth_code" }, { status: 400 });
  }

  const scoreKeys = [
    "scoreLooks",
    "scorePersonality",
    "scoreLove",
    "scoreManner",
    "scoreReunion",
  ] as const;
  const scores: Partial<Record<(typeof scoreKeys)[number], number>> = {};
  for (const k of scoreKeys) {
    const v = body[k];
    if (!isIntInRange(v, 1, 5)) {
      return NextResponse.json({ error: `invalid_${k}` }, { status: 400 });
    }
    scores[k] = v;
  }

  if (comment.length > 120) {
    return NextResponse.json({ error: "comment_too_long" }, { status: 400 });
  }

  const birthCodeHash = hashBirth(birthCode);
  const ipHash = hashIp(getClientIp(req));

  // Rate limit: 같은 IP + 같은 (인스타ID, 생일해시) 5분 내 중복 차단
  const recent = await prisma.review.findFirst({
    where: {
      instaId,
      birthCodeHash,
      ipHash,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
    },
    select: { id: true, createdAt: true },
  });
  if (recent) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: RATE_LIMIT_WINDOW_MS },
      { status: 429 },
    );
  }

  const created = await prisma.review.create({
    data: {
      instaId,
      birthCodeHash,
      scoreLooks: scores.scoreLooks!,
      scorePersonality: scores.scorePersonality!,
      scoreLove: scores.scoreLove!,
      scoreManner: scores.scoreManner!,
      scoreReunion: scores.scoreReunion!,
      comment,
      ipHash,
    },
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}
