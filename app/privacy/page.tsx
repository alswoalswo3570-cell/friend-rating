import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 — EX-RATING",
};

export default function PrivacyPage() {
  return (
    <main className="px-5 pt-6 pb-16">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 border-2 border-ink/10 shadow-pop"
        >
          ← 홈으로
        </Link>
      </div>

      <h1 className="text-[22px] font-extrabold text-ink mb-1">개인정보처리방침</h1>
      <p className="text-[12px] text-ink/40 mb-8">최종 수정일: 2026년 4월 23일</p>

      <div className="space-y-6 text-[13.5px] leading-relaxed text-ink/80">

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">1. 수집하는 정보</h2>
          <p className="mb-2">EX-RATING(이하 "서비스")은 다음 정보를 수집합니다.</p>
          <ul className="space-y-1.5 list-none">
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>인스타그램 아이디 (평가 대상 식별용)</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>생년월일 6자리 — <b>단방향 암호화(SHA-256 해시)하여 저장</b>, 원문은 보관하지 않음</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>평가 점수 및 코멘트</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>접속 IP 주소 (중복 평가 방지용, 로그에 한시 보관)</li>
          </ul>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">2. 수집 목적</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>서비스 제공 및 평가 결과 표시</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>단기간 내 중복 평가 방지</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>어뷰징 및 부정 이용 차단</li>
          </ul>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">3. 보유 및 이용 기간</h2>
          <p>수집된 정보는 <b>서비스 운영 기간</b> 동안 보관되며, 정보주체의 삭제 요청 또는 서비스 종료 시 지체 없이 파기합니다. IP 주소는 중복 방지 목적 달성 즉시 식별 불가능한 형태로 처리됩니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">4. 제3자 제공</h2>
          <p>수집된 정보는 <b>어떠한 제3자에게도 제공·판매·공유하지 않습니다.</b> 단, 법령에 의한 수사기관의 적법한 요청이 있는 경우는 예외로 합니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">5. 정보주체의 권리</h2>
          <p className="mb-2">이용자는 언제든지 다음을 요청할 수 있습니다.</p>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>본인 관련 데이터 열람</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>본인 관련 데이터 삭제</li>
            <li className="flex gap-2"><span className="text-coral font-bold shrink-0">·</span>처리 정지 요청</li>
          </ul>
          <p className="mt-3">요청은 아래 이메일로 인스타그램 아이디를 명시하여 보내주세요. <b>영업일 기준 3일 이내</b> 처리합니다.</p>
          <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">
            alswoalswo3570@gmail.com
          </a>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">6. 쿠키 및 광고</h2>
          <p>서비스는 Google AdSense 및 Kakao AdFit을 통해 광고를 제공합니다. 각 광고 플랫폼은 쿠키를 사용하여 맞춤형 광고를 표시할 수 있으며, 이에 대한 개인정보 처리는 각 플랫폼의 정책을 따릅니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">7. 문의</h2>
          <p>개인정보 처리에 관한 문의는 아래 이메일로 연락 바랍니다.</p>
          <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">
            alswoalswo3570@gmail.com
          </a>
        </section>

      </div>
    </main>
  );
}
