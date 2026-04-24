type AvgScores = {
  humor: number;
  loyalty: number;
  texting: number;
  vibes: number;
  secrets: number;
};

type CardData = {
  instaId: string;
  overall: number;
  avg: AvgScores;
  count: number;
};

function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const FONT = `"Apple SD Gothic Neo", system-ui, -apple-system, sans-serif`;

function scoreEmoji(v: number) {
  return v >= 4.5 ? "😍" : v >= 3.5 ? "🥰" : v >= 2.5 ? "🙂" : v >= 1.5 ? "😢" : "😭";
}

function barColor(v: number) {
  return v >= 4 ? "#8FDCB5" : v >= 3 ? "#FFD966" : "#FFB3C8";
}

export async function drawShareCard(data: CardData): Promise<Blob> {
  const W = 720;
  const H = 1280;
  const PX = 64;
  const CW = W - PX * 2; // 592

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ── Background gradient ──────────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, W * 0.55, H);
  grad.addColorStop(0, "#FFF6EC");
  grad.addColorStop(0.5, "#FFD6E8");
  grad.addColorStop(1, "#DDD0FF");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Decorative circles
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(W + 60, -60, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(-40, H + 40, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── Badge ────────────────────────────────────────────────────────
  const BADGE = "✦  FRIEND-RATING  ✦";
  ctx.font = `800 21px ${FONT}`;
  const badgeTW = ctx.measureText(BADGE).width;
  const badgeW = badgeTW + 80;
  const badgeH = 46;
  const badgeX = (W - badgeW) / 2;
  const badgeY = 72;

  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.fillStyle = "white";
  rr(ctx, badgeX, badgeY, badgeW, badgeH, badgeH / 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = "#4A2B4E";
  ctx.lineWidth = 3;
  rr(ctx, badgeX, badgeY, badgeW, badgeH, badgeH / 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#4A2B4E";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 21px ${FONT}`;
  ctx.fillText(BADGE, W / 2, badgeY + badgeH / 2);

  // ── @username + title ───────────────────────────────────────────
  const nameY = badgeY + badgeH + 44;

  ctx.font = `700 26px ${FONT}`;
  ctx.fillStyle = "rgba(74,43,78,0.55)";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(`@${data.instaId}`, W / 2, nameY);

  ctx.font = `900 40px ${FONT}`;
  ctx.fillStyle = "#4A2B4E";
  ctx.fillText("님의 찐친 통지표", W / 2, nameY + 40);

  // ── Overall card ─────────────────────────────────────────────────
  const cardY = nameY + 40 + 56;
  const cardH = 224;

  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.fillStyle = "white";
  rr(ctx, PX, cardY, CW, cardH, 48);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#4A2B4E";
  ctx.lineWidth = 3;
  rr(ctx, PX, cardY, CW, cardH, 48);
  ctx.stroke();
  ctx.restore();

  // Emoji — use serif for emoji rendering
  ctx.font = `60px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(scoreEmoji(data.overall), W / 2, cardY + 16);

  // Score number
  ctx.font = `900 104px ${FONT}`;
  ctx.fillStyle = "#FF8BA0";
  ctx.textBaseline = "top";
  ctx.fillText(data.overall.toFixed(1), W / 2, cardY + 84);

  // Sub label
  ctx.font = `700 23px ${FONT}`;
  ctx.fillStyle = "rgba(74,43,78,0.45)";
  ctx.textBaseline = "bottom";
  ctx.fillText(`/ 5.0 점  ·  ${data.count}명 평가`, W / 2, cardY + cardH - 16);

  // ── Score rows ──────────────────────────────────────────────────
  const scores: { label: string; value: number }[] = [
    { label: "유머감각", value: data.avg.humor },
    { label: "의리", value: data.avg.loyalty },
    { label: "연락", value: data.avg.texting },
    { label: "바이브", value: data.avg.vibes },
    { label: "비밀유지", value: data.avg.secrets },
  ];

  const ROW_H = 90;
  const ROW_GAP = 14;
  const rowsStartY = cardY + cardH + 24;

  scores.forEach((s, i) => {
    const ry = rowsStartY + i * (ROW_H + ROW_GAP);

    // Row bg
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "white";
    rr(ctx, PX, ry, CW, ROW_H, 28);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.strokeStyle = "#4A2B4E";
    ctx.lineWidth = 3;
    rr(ctx, PX, ry, CW, ROW_H, 28);
    ctx.stroke();
    ctx.restore();

    // Label
    ctx.font = `700 25px ${FONT}`;
    ctx.fillStyle = "rgba(74,43,78,0.7)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label, PX + 28, ry + ROW_H / 2);

    // Score value
    ctx.font = `900 30px ${FONT}`;
    ctx.fillStyle = "#4A2B4E";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(s.value.toFixed(1), PX + CW - 28, ry + ROW_H / 2);

    // Bar track
    const valW = ctx.measureText(s.value.toFixed(1)).width;
    const barW = 176;
    const barH = 14;
    const barX = PX + CW - 28 - valW - 16 - barW;
    const barY = ry + ROW_H / 2 - barH / 2;

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "rgb(74,43,78)";
    rr(ctx, barX, barY, barW, barH, barH / 2);
    ctx.fill();
    ctx.restore();

    // Bar fill
    const fillW = Math.max((s.value / 5) * barW, barH);
    ctx.fillStyle = barColor(s.value);
    rr(ctx, barX, barY, fillW, barH, barH / 2);
    ctx.fill();
  });

  // ── URL watermark ────────────────────────────────────────────────
  ctx.font = `700 22px ${FONT}`;
  ctx.fillStyle = "rgba(74,43,78,0.38)";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("friend-rating.vercel.app", W / 2, H - 44);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("toBlob failed"));
      },
      "image/png",
    );
  });
}
