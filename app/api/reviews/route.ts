import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashIp, normalizeInstaId } from "@/lib/hash";

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
  const comment = typeof body.comment === "string" ? body.comment : "";

  const instaId = normalizeInstaId(instaIdRaw);
  if (instaId.length < 2 || instaId.length > 30 || !/^[a-z0-9._]+$/i.test(instaId)) {
    return NextResponse.json({ error: "invalid_insta_id" }, { status: 400 });
  }

  const scoreKeys = [
    "scoreHumor",
    "scoreLoyalty",
    "scoreTexting",
    "scoreVibes",
    "scoreSecrets",
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

  const ipHash = hashIp(getClientIp(req));

  const recent = await prisma.friendReview.findFirst({
    where: {
      instaId,
      ipHash,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
    },
    select: { id: true },
  });
  if (recent) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: RATE_LIMIT_WINDOW_MS },
      { status: 429 },
    );
  }

  const created = await prisma.friendReview.create({
    data: {
      instaId,
      birthCodeHash: "",
      scoreHumor: scores.scoreHumor!,
      scoreLoyalty: scores.scoreLoyalty!,
      scoreTexting: scores.scoreTexting!,
      scoreVibes: scores.scoreVibes!,
      scoreSecrets: scores.scoreSecrets!,
      comment,
      ipHash,
    },
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}
