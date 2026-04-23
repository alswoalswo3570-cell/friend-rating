import Link from "next/link";

export const metadata = {
  title: "이용약관 — EX-RATING",
};

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <span className="text-coral font-bold shrink-0 mt-0.5">·</span>
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
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

      <h1 className="text-[22px] font-extrabold text-ink mb-1">이용약관</h1>
      <p className="text-[12px] text-ink/40 mb-8">최종 수정일: 2026년 4월 23일</p>

      <div className="space-y-6 text-[13.5px] leading-relaxed text-ink/80">

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">1. 서비스 소개</h2>
          <p>EX-RATING은 전 연인에 대한 익명 평가를 주고받을 수 있는 서비스입니다. 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">2. 이용 연령</h2>
          <p>본 서비스는 <b>만 14세 이상</b>만 이용할 수 있습니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">3. 금지 행위</h2>
          <p className="mb-2">다음 행위는 엄격히 금지됩니다.</p>
          <ul className="space-y-2">
            <Bullet>허위 사실을 기반으로 한 평가 작성</Bullet>
            <Bullet>모욕적·혐오적·성적 표현이 포함된 코멘트</Bullet>
            <Bullet>특정인을 지속적으로 괴롭히기 위한 반복 이용</Bullet>
            <Bullet>타인의 동의 없이 제3자 정보를 입력하는 행위</Bullet>
            <Bullet>자동화 도구·봇을 이용한 어뷰징</Bullet>
          </ul>
          <p className="mt-3 text-[12px] text-ink/50">금지 행위로 발생한 법적 책임은 전적으로 작성자 본인에게 있습니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">4. 면책 조항</h2>
          <ul className="space-y-2">
            <Bullet>서비스는 이용자가 작성한 코멘트의 내용에 대해 책임을 지지 않습니다.</Bullet>
            <Bullet>서비스는 평가 점수의 정확성·신뢰성을 보증하지 않습니다.</Bullet>
            <Bullet>서비스 중단·장애로 인한 손해에 대해 책임을 지지 않습니다.</Bullet>
          </ul>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">5. 콘텐츠 삭제 요청</h2>
          <p>본인에 관한 데이터 삭제를 원하시면 인스타그램 아이디를 명시하여 이메일로 요청해 주세요. <b>영업일 기준 3일 이내</b> 처리합니다.</p>
          <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">
            alswoalswo3570@gmail.com
          </a>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">6. 약관 변경</h2>
          <p>약관은 서비스 내 공지를 통해 변경될 수 있으며, 변경 후 계속 이용 시 변경된 약관에 동의한 것으로 간주됩니다.</p>
        </section>

        <section className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
          <h2 className="font-extrabold text-[15px] text-ink mb-3">7. 준거법</h2>
          <p>본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 서울중앙지방법원을 전속 관할 법원으로 합니다.</p>
        </section>

      </div>
    </main>
  );
}
