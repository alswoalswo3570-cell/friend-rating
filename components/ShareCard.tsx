import React from "react";

type Props = {
  instaId: string;
  overall: number;
  avg: {
    looks: number;
    personality: number;
    love: number;
    manner: number;
    reunion: number;
  };
  count: number;
};

const scoreEmoji = (v: number) =>
  v >= 4.5 ? "😍" : v >= 3.5 ? "🥰" : v >= 2.5 ? "🙂" : v >= 1.5 ? "😢" : "😭";

const barColor = (v: number) =>
  v >= 4 ? "#8FDCB5" : v >= 3 ? "#FFD966" : "#FFB3C8";

export default function ShareCard({ instaId, overall, avg, count }: Props) {
  const scores = [
    { label: "외모", value: avg.looks },
    { label: "성격", value: avg.personality },
    { label: "연애스타일", value: avg.love },
    { label: "매너", value: avg.manner },
    { label: "재회의사", value: avg.reunion },
  ];

  return (
    <div
      data-share-card
      style={{
        width: "360px",
        height: "640px",
        background: "linear-gradient(150deg, #FFF6EC 0%, #FFD6E8 50%, #DDD0FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 28px 28px",
        boxSizing: "border-box",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 원 */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(255,255,255,0.18)",
      }} />
      <div style={{
        position: "absolute", bottom: -40, left: -40,
        width: 160, height: 160, borderRadius: "50%",
        background: "rgba(255,255,255,0.14)",
      }} />

      {/* 상단 배지 */}
      <div style={{
        background: "rgba(255,255,255,0.65)",
        borderRadius: 100, padding: "5px 16px",
        fontSize: 11, fontWeight: 800,
        letterSpacing: "0.12em", color: "#4A2B4E",
        border: "2px solid rgba(74,43,78,0.1)",
      }}>
        ✦ EX-RATING ✦
      </div>

      {/* 아이디 + 제목 */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(74,43,78,0.55)" }}>
          @{instaId}
        </div>
        <div style={{
          marginTop: 4, fontSize: 20, fontWeight: 900,
          color: "#4A2B4E", lineHeight: 1.25,
        }}>
          님의 솔직한 통지표
        </div>
      </div>

      {/* 종합 점수 카드 */}
      <div style={{
        marginTop: 20, width: "100%",
        background: "rgba(255,255,255,0.72)",
        borderRadius: 24, padding: "18px 0 14px",
        textAlign: "center",
        border: "2px solid rgba(74,43,78,0.08)",
        boxShadow: "4px 4px 0 rgba(74,43,78,0.07)",
      }}>
        <div style={{ fontSize: 40 }}>{scoreEmoji(overall)}</div>
        <div style={{
          marginTop: 2, fontSize: 52, fontWeight: 900,
          color: "#FF8BA0", lineHeight: 1,
        }}>
          {overall.toFixed(1)}
        </div>
        <div style={{
          fontSize: 12, fontWeight: 700,
          color: "rgba(74,43,78,0.45)", marginTop: 4,
        }}>
          / 5.0 점 &nbsp;·&nbsp; {count}명 평가
        </div>
      </div>

      {/* 항목별 점수 */}
      <div style={{ marginTop: 16, width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        {scores.map((s) => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.6)",
            borderRadius: 14, padding: "8px 14px",
            display: "flex", alignItems: "center",
            border: "2px solid rgba(74,43,78,0.07)",
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(74,43,78,0.7)", flex: 1 }}>
              {s.label}
            </span>
            {/* 바 */}
            <div style={{
              width: 90, height: 8, borderRadius: 100,
              background: "rgba(74,43,78,0.1)", marginRight: 10,
            }}>
              <div style={{
                width: `${(s.value / 5) * 100}%`, height: "100%",
                borderRadius: 100, background: barColor(s.value),
              }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#4A2B4E", minWidth: 28, textAlign: "right" }}>
              {s.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* 하단 URL */}
      <div style={{
        marginTop: "auto", paddingTop: 16,
        fontSize: 11, fontWeight: 700,
        color: "rgba(74,43,78,0.38)", letterSpacing: "0.04em",
      }}>
        ex-rating.vercel.app
      </div>
    </div>
  );
}
