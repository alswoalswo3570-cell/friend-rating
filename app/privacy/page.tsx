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
    title: "개인정보처리방침",
    updated: "최종 수정일: 2026년 4월 23일",
    back: "← 홈으로",
    sections: [
      {
        heading: "1. 수집하는 정보",
        body: (
          <>
            <p className="mb-2">EX-RATING(이하 &ldquo;서비스&rdquo;)은 다음 정보를 수집합니다.</p>
            <ul className="space-y-1.5">
              <Bullet>인스타그램 아이디 (평가 대상 식별용)</Bullet>
              <Bullet>생년월일 6자리 — <b>단방향 암호화(SHA-256 해시)하여 저장</b>, 원문은 보관하지 않음</Bullet>
              <Bullet>평가 점수 및 코멘트</Bullet>
              <Bullet>접속 IP 주소 (중복 평가 방지용, 로그에 한시 보관)</Bullet>
            </ul>
          </>
        ),
      },
      {
        heading: "2. 수집 목적",
        body: (
          <ul className="space-y-1.5">
            <Bullet>서비스 제공 및 평가 결과 표시</Bullet>
            <Bullet>단기간 내 중복 평가 방지</Bullet>
            <Bullet>어뷰징 및 부정 이용 차단</Bullet>
          </ul>
        ),
      },
      {
        heading: "3. 보유 및 이용 기간",
        body: <p>수집된 정보는 <b>서비스 운영 기간</b> 동안 보관되며, 정보주체의 삭제 요청 또는 서비스 종료 시 지체 없이 파기합니다. IP 주소는 중복 방지 목적 달성 즉시 식별 불가능한 형태로 처리됩니다.</p>,
      },
      {
        heading: "4. 제3자 제공",
        body: <p>수집된 정보는 <b>어떠한 제3자에게도 제공·판매·공유하지 않습니다.</b> 단, 법령에 의한 수사기관의 적법한 요청이 있는 경우는 예외로 합니다.</p>,
      },
      {
        heading: "5. 정보주체의 권리",
        body: (
          <>
            <p className="mb-2">이용자는 언제든지 다음을 요청할 수 있습니다.</p>
            <ul className="space-y-1.5">
              <Bullet>본인 관련 데이터 열람</Bullet>
              <Bullet>본인 관련 데이터 삭제</Bullet>
              <Bullet>처리 정지 요청</Bullet>
            </ul>
            <p className="mt-3">요청은 아래 이메일로 인스타그램 아이디를 명시하여 보내주세요. <b>영업일 기준 3일 이내</b> 처리합니다.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
      {
        heading: "6. 쿠키 및 광고",
        body: <p>서비스는 Google AdSense 및 Kakao AdFit을 통해 광고를 제공합니다. 각 광고 플랫폼은 쿠키를 사용하여 맞춤형 광고를 표시할 수 있으며, 이에 대한 개인정보 처리는 각 플랫폼의 정책을 따릅니다.</p>,
      },
      {
        heading: "7. 문의",
        body: (
          <>
            <p>개인정보 처리에 관한 문의는 아래 이메일로 연락 바랍니다.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: April 23, 2026",
    back: "← Home",
    sections: [
      {
        heading: "1. Information We Collect",
        body: (
          <>
            <p className="mb-2">EX-RATING (the &ldquo;Service&rdquo;) collects the following information.</p>
            <ul className="space-y-1.5">
              <Bullet>Instagram handle (to identify the subject of a review)</Bullet>
              <Bullet>6-digit birthday — <b>stored as a one-way SHA-256 hash only</b>; the original value is never retained</Bullet>
              <Bullet>Review scores and comments</Bullet>
              <Bullet>IP address (to prevent duplicate reviews; retained briefly in logs)</Bullet>
            </ul>
          </>
        ),
      },
      {
        heading: "2. Why We Collect It",
        body: (
          <ul className="space-y-1.5">
            <Bullet>To provide the Service and display review results</Bullet>
            <Bullet>To prevent multiple submissions in a short period</Bullet>
            <Bullet>To detect and block abuse</Bullet>
          </ul>
        ),
      },
      {
        heading: "3. Retention Period",
        body: <p>Data is retained for the <b>duration of the Service</b> and deleted promptly upon a removal request or when the Service shuts down. IP addresses are anonymized as soon as the duplicate-prevention purpose is fulfilled.</p>,
      },
      {
        heading: "4. Third-Party Sharing",
        body: <p>We <b>never sell, share, or provide your data to any third party.</b> The sole exception is a lawful request from law-enforcement authorities as required by applicable law.</p>,
      },
      {
        heading: "5. Your Rights",
        body: (
          <>
            <p className="mb-2">You may request any of the following at any time.</p>
            <ul className="space-y-1.5">
              <Bullet>Access to data related to you</Bullet>
              <Bullet>Deletion of data related to you</Bullet>
              <Bullet>Restriction of processing</Bullet>
            </ul>
            <p className="mt-3">Send your request to the email below and include your Instagram handle. We will respond <b>within 3 business days</b>.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
      {
        heading: "6. Cookies & Advertising",
        body: <p>The Service displays ads via Google AdSense and Kakao AdFit. These platforms may use cookies to show personalised ads. Their handling of your data is governed by their respective privacy policies.</p>,
      },
      {
        heading: "7. Contact",
        body: (
          <>
            <p>For any privacy-related enquiries, please reach out at the address below.</p>
            <a href="mailto:alswoalswo3570@gmail.com" className="mt-2 inline-block font-bold text-coral underline">alswoalswo3570@gmail.com</a>
          </>
        ),
      },
    ],
  },
};

export default function PrivacyPage() {
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
