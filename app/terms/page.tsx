"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <span className="text-coral font-bold shrink-0 mt-0.5">·</span>
      <span>{children}</span>
    </li>
  );
}

const content = {
  ko: {
    title: "이용약관",
    updated: "최종 수정일: 2026년 4월 23일",
    back: "← 홈으로",
    sections: [
      {
        heading: "1. 서비스 소개",
        body: <p>EX-RATING은 전 연인에 대한 익명 평가를 주고받을 수 있는 서비스입니다. 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.</p>,
      },
      {
        heading: "2. 이용 연령",
        body: <p>본 서비스는 <b>만 14세 이상</b>만 이용할 수 있습니다.</p>,
      },
      {
        heading: "3. 금지 행위",
        body: (
          <>
            <p className="mb-2">다음 행위는 엄격히 금지됩니다.</p>
            <ul className="space-y-2">
              <Bullet>허위 사실을 기반으로 한 평가 작성</Bullet>
              <Bullet>모욕적·혐오적·성적 표현이 포함된 코멘트</Bullet>
              <Bullet>특정인을 지속적으로 괴롭히기 위한 반복 이용</Bullet>
              <Bullet>타인의 동의 없이 제3자 정보를 입력하는 행위</Bullet>
              <Bullet>자동화 도구·봇을 이용한 어뷰징</Bullet>
            </ul>
            <p className="mt-3 text-[12px] text-ink/50">금지 행위로 발생한 법적 책임은 전적으로 작성자 본인에게 있습니다.</p>
          </>
        ),
      },
      {
        heading: "4. 면책 조항",
        body: (
          <ul className="space-y-2">
            <Bullet>서비스는 이용자가 작성한 코멘트의 내용에 대해 책임을 지지 않습니다.</Bullet>
            <Bullet>서비스는 평가 점수의 정확성·신뢰성을 보증하지 않습니다.</Bullet>
            <Bullet>서비스 중단·장애로 인한 손해에 대해 책임을 지지 않습니다.</Bullet>
          </ul>
        ),
      },
      {
        heading: "5. 콘텐츠 삭제 요청",
        body: (
          <>
            <p>본인에 관한 데이터 삭제를 원하시면 인스타그램 아이디를 명시하여 이메일로 요청해 주세요. <b>영업일 기준 3일 이내</b> 처리합니다.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
      {
        heading: "6. 약관 변경",
        body: <p>약관은 서비스 내 공지를 통해 변경될 수 있으며, 변경 후 계속 이용 시 변경된 약관에 동의한 것으로 간주됩니다.</p>,
      },
      {
        heading: "7. 준거법",
        body: <p>본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 서울중앙지방법원을 전속 관할 법원으로 합니다.</p>,
      },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: April 23, 2026",
    back: "← Home",
    sections: [
      {
        heading: "1. About the Service",
        body: <p>EX-RATING is a service that lets people anonymously rate and receive ratings about their exes. By using the Service you agree to these Terms.</p>,
      },
      {
        heading: "2. Age Requirement",
        body: <p>You must be <b>14 years of age or older</b> to use this Service.</p>,
      },
      {
        heading: "3. Prohibited Conduct",
        body: (
          <>
            <p className="mb-2">The following actions are strictly prohibited.</p>
            <ul className="space-y-2">
              <Bullet>Submitting reviews based on false or fabricated information</Bullet>
              <Bullet>Writing comments that are insulting, hateful, or sexual in nature</Bullet>
              <Bullet>Repeatedly using the Service to harass a specific individual</Bullet>
              <Bullet>Entering another person&apos;s information without their knowledge</Bullet>
              <Bullet>Using automated tools or bots to abuse the Service</Bullet>
            </ul>
            <p className="mt-3 text-[12px] text-ink/50">Any legal liability arising from prohibited conduct rests solely with the user who committed it.</p>
          </>
        ),
      },
      {
        heading: "4. Disclaimer",
        body: (
          <ul className="space-y-2">
            <Bullet>We are not responsible for the content of reviews submitted by users.</Bullet>
            <Bullet>We do not guarantee the accuracy or reliability of any review scores.</Bullet>
            <Bullet>We are not liable for any damages caused by service interruptions or outages.</Bullet>
          </ul>
        ),
      },
      {
        heading: "5. Content Removal Requests",
        body: (
          <>
            <p>To request deletion of data related to you, email us with your Instagram handle. We will process the request <b>within 3 business days</b>.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
      {
        heading: "6. Changes to These Terms",
        body: <p>We may update these Terms at any time via an in-service notice. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>,
      },
      {
        heading: "7. Governing Law",
        body: <p>These Terms are governed by the laws of the Republic of Korea. Any disputes shall be subject to the exclusive jurisdiction of the Seoul Central District Court.</p>,
      },
    ],
  },
};

export default function TermsPage() {
  const locale = useLocale();
  const c = content[locale];

  return (
    <main className="px-5 pt-6 pb-16">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 border-2 border-ink/10 shadow-pop"
        >
          {c.back}
        </Link>
      </div>

      <h1 className="text-[22px] font-extrabold text-ink mb-1">{c.title}</h1>
      <p className="text-[12px] text-ink/40 mb-8">{c.updated}</p>

      <div className="space-y-6 text-[13.5px] leading-relaxed text-ink/80">
        {c.sections.map((s) => (
          <section key={s.heading} className="rounded-[20px] bg-white/70 border-2 border-ink/10 p-5">
            <h2 className="font-extrabold text-[15px] text-ink mb-3">{s.heading}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </main>
  );
}
