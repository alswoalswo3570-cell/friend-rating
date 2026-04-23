// ⚠️  AUTO-GENERATED from strings.csv (npm run strings:import)
// 직접 수정하지 마세요. 카피는 Google Sheets에서 편집 후 재임포트.
//
// 수정 흐름:
//   1. Google Sheets에서 `ko` 또는 `en` 컬럼 편집
//   2. 파일 → 다운로드 → 쉼표로 구분된 값(.csv)
//   3. 프로젝트 루트 `strings.csv`로 저장 (덮어쓰기)
//   4. npm run strings:import

export type Locale = "ko" | "en";
export type StringEntry = {
  ko: string;
  en: string;
  notes?: string;
};

export const strings = {
  // ───── Meta / <head> ─────
  "meta.description": {
    ko: "익명으로 남기는 전 애인 평가 — 인스타 스토리로 공유하세요.",
    en: "Anonymous reviews of your exes — share to your Instagram story.",
  },
  "meta.lookup.title": {
    ko: "내 통지표 조회 · Ex-Rating",
    en: "Check My Report Card · Ex-Rating",
  },
  "meta.rateStart.title": {
    ko: "평가하러 왔어요 · Ex-Rating",
    en: "Here to Review · Ex-Rating",
  },
  "meta.title": { ko: "Ex-Rating · 전 애인 평가", en: "Ex-Rating · Rate Your Exes" },

  // ───── Common (공통) ─────
  "common.badge.exrating": { ko: "EX-RATING", en: "EX-RATING" },
  "common.empty.body": {
    ko: "@{id} + 이 생일 조합으로 들어온 평가가 없어요.\n처음이시면 평가 링크부터 전 애인한테 뿌려보세요!",
    en: "No reviews yet for @{id} + this birthday combo.\nFirst time? Share the review link with your exes first!",
    notes: "변수: id (인스타 아이디)",
  },
  "common.empty.cta.copyLink": {
    ko: "평가 링크 복사해서 뿌리기",
    en: "Copy & share the review link",
  },
  "common.empty.footer.onePublic": {
    ko: "1건만 쌓여도 바로 여기서 보여요",
    en: "Just 1 review and it shows up here",
  },
  "common.empty.title": {
    ko: "아직 아무도 안 남겼거나, 생일이 달라요",
    en: "Nobody's reviewed yet, or the birthday's off",
  },
  "common.error.network": { ko: "네트워크 오류", en: "Network error" },
  "common.error.unknown": { ko: "알 수 없는 오류", en: "Unknown error" },
  "common.nav.back": { ko: "← 이전", en: "← Back" },
  "common.nav.home": { ko: "← 홈", en: "← Home" },
  "common.preview.footer": {
    ko: "2026 · Ex-Rating 프리뷰",
    en: "2026 · Ex-Rating Preview",
  },
  "common.toast.link.copied": {
    ko: "평가 링크가 복사됐어요!",
    en: "Review link copied!",
  },
  "common.toast.link.copyFailed": {
    ko: "복사 실패 — 주소창에서 직접",
    en: "Copy failed — grab from URL bar",
  },
  "common.toast.link.copyFailedLong": {
    ko: "복사 실패 — 주소창에서 직접 복사해주세요",
    en: "Copy failed — please copy from the URL bar",
  },

  // ───── Landing (/) ─────
  "landing.cta.guest.label": { ko: "I'M A GUEST", en: "I'M A GUEST" },
  "landing.cta.guest.sticker": { ko: "GUEST", en: "GUEST" },
  "landing.cta.guest.sub": {
    ko: "상대 아이디 + 생일로 익명 평가 남기기",
    en: "Anon review via their handle + birthday",
  },
  "landing.cta.guest.title": {
    ko: "누구 평가하러 왔어요",
    en: "Here to review someone",
  },
  "landing.cta.host.label": { ko: "I'M THE HOST", en: "I'M THE HOST" },
  "landing.cta.host.sticker": { ko: "HOST", en: "HOST" },
  "landing.cta.host.sub": {
    ko: "내 아이디 + 생일로 받은 평가 보기",
    en: "See reviews for my handle + birthday",
  },
  "landing.cta.host.title": {
    ko: "내 통지표 조회하기",
    en: "Check my report card",
  },
  "landing.headline.full": {
    ko: "전 애인한테 {highlight}\n받아볼 시간",
    en: "Time to get {highlight}\nfrom your exes",
    notes: "{highlight}는 별도 강조 스팬으로 렌더. 뒤에 peeking-eye 이모지 붙음",
  },
  "landing.headline.highlight": { ko: "솔직한 평", en: "honest reviews" },
  "landing.hero.alt": {
    ko: "폰으로 Report Card를 보는 커플 일러스트",
    en: "Illustration of a couple looking at a Report Card on a phone",
  },
  "landing.info.anonymous": {
    ko: "**완전 익명**이니까 솔직하게 써도 돼요. 누가 썼는지 호스트도 영영 몰라요.",
    en: "**Fully anonymous** — go ahead and be honest. Even the host will never know who wrote what.",
  },
  "landing.info.noSignup": {
    ko: "**가입 없음**. 인스타 아이디 + 생년월일 조합이 곧 하나의 통지표예요. 이메일 · 비번 그런 거 하나도 없어요.",
    en: "**No signup**. An Instagram handle + birthday = one report card. No emails, no passwords, nothing.",
  },
  "landing.info.sharing": {
    ko: "평가 1건만 들어와도 **바로 공개**. 인스타 스토리용 카드 이미지로 내려받을 수 있어요.",
    en: "**Public from the first review**. Download as a card image for your Instagram story.",
  },
  "landing.sub": {
    ko: "익명 평가 · 가입 없음 — **1건만 쌓여도 바로 공개**.",
    en: "Anonymous · no signup — **public with just 1 review**.",
    notes: "**bold** 강조는 coral 색상",
  },

  // ───── Lookup (/lookup) ─────
  "lookup.error.queryFailed": {
    ko: "조회 실패: {msg}",
    en: "Lookup failed: {msg}",
    notes: "{msg}는 서버 에러 문구 or HTTP 코드",
  },
  "lookup.field.birth.footer": {
    ko: "아이디 + 생일 조합이 곧 통지표 하나예요. 서버엔 해시로만 저장돼요.",
    en: "Handle + birthday = one report card. Stored on the server as a hash only.",
  },
  "lookup.field.birth.hint": { ko: "(예: 940530)", en: "(e.g. 940530)" },
  "lookup.field.birth.label": { ko: "생년월일 6자리", en: "Birthday (6 digits)" },
  "lookup.field.birth.placeholder": { ko: "······", en: "······" },
  "lookup.field.instaId.label": {
    ko: "내 인스타 아이디",
    en: "Your Instagram handle",
  },
  "lookup.field.instaId.placeholder": { ko: "minjae_shin", en: "minjae_shin" },
  "lookup.headline": {
    ko: "내 통지표 {highlight}",
    en: "{highlight} my report card",
    notes: "{highlight} = lookup.headline.highlight",
  },
  "lookup.headline.highlight": { ko: "조회하기", en: "Check" },
  "lookup.nav.badge": { ko: "통지표 조회", en: "View report card" },
  "lookup.sub": {
    ko: "내 아이디 + 생일 조합으로\n받은 평가가 있으면 바로 보여드려요.",
    en: "Plug in your handle + birthday,\nwe'll surface any reviews you've got.",
  },
  "lookup.submit.idle": { ko: "내 통지표 열기", en: "Open my report card" },
  "lookup.submit.loading": { ko: "조회 중…", en: "Looking up…" },

  // ───── RateStart (/rate) ─────
  "rateStart.field.instaId.hint": {
    ko: "아이디는 영문, 숫자, `.`, `_`만 가능해요.",
    en: "Only letters, numbers, `.`, `_` allowed.",
  },
  "rateStart.field.instaId.label": {
    ko: "상대 인스타 아이디",
    en: "Their Instagram handle",
  },
  "rateStart.field.instaId.placeholder": {
    ko: "insta_handle",
    en: "insta_handle",
  },
  "rateStart.headline": {
    ko: "누구 {highlight} 왔어요?",
    en: "Who are you here to {highlight}?",
    notes: "{highlight} = rateStart.headline.highlight",
  },
  "rateStart.headline.highlight": { ko: "평가하러", en: "review" },
  "rateStart.nav.badge": { ko: "평가하러 왔어요", en: "Here to review" },
  "rateStart.sub": {
    ko: "상대 인스타 아이디만 있으면 OK.\n다음 단계에서 생일로 **전 애인 인증**해요.",
    en: "Just need their Instagram handle.\nNext step verifies you're a **real ex** via their birthday.",
  },
  "rateStart.submit": {
    ko: "다음 — 전 애인 인증하기",
    en: "Next — verify as ex",
  },

  // ───── Verify (/rate/[id]) ─────
  "verify.card.label": { ko: "RATE · THIS · EX", en: "RATE · THIS · EX" },
  "verify.card.question": { ko: "이 사람 맞나요?", en: "Is this the one?" },
  "verify.card.sticker": { ko: "EX", en: "EX" },
  "verify.field.birth.hint": {
    ko: "(당신이 아는 @{id}의 생일 6자리)",
    en: "(The @{id} birthday you remember — 6 digits)",
    notes: "변수: id (대상 인스타)",
  },
  "verify.field.birth.label": { ko: "전 애인 인증", en: "Ex verification" },
  "verify.footer": { ko: "2B 프리뷰 · 인증 화면", en: "2B preview · Verify screen" },
  "verify.hint.1": {
    ko: "**1.** 진짜 전 애인만 평가할 수 있게 하는 살짝 허들이에요.",
    en: "**1.** A tiny gate so only real exes can review.",
  },
  "verify.hint.2": {
    ko: "**2.** 같은 아이디여도 생일이 다르면 {separated}로 분리돼요. (동명이인 / 오입력 안전)",
    en: "**2.** Same handle with a different birthday creates a {separated}. (safe from duplicates / typos)",
    notes: "{separated} = verify.hint.2.separated (coral bold)",
  },
  "verify.hint.2.separated": {
    ko: "완전 별개 통지표",
    en: "totally separate report card",
  },
  "verify.hint.3": {
    ko: "**3.** 서버엔 해시로만 저장, 호스트도 누가 썼는지 영영 몰라요.",
    en: "**3.** Stored as a hash only — even the host never learns who wrote what.",
  },
  "verify.hint.toggle.closed": {
    ko: "생일 왜 필요해요? 🤔",
    en: "Why the birthday? 🤔",
  },
  "verify.hint.toggle.open": { ko: "알겠어요, 접을게요", en: "Got it, collapse" },
  "verify.nav.badge": { ko: "평가하러 왔어요", en: "Here to review" },
  "verify.submit": { ko: "평가 남기러 가기", en: "Go write a review" },

  // ───── RateForm (/rate/[id]/write + success) ─────
  "rateForm.avgPreview.label": { ko: "내가 준 평균", en: "My avg" },
  "rateForm.avgPreview.unit": { ko: "/ 5.0", en: "/ 5.0" },
  "rateForm.axis.looks.high": {
    ko: "또 보고 싶… 😳",
    en: "Wanna see 'em again… 😳",
  },
  "rateForm.axis.looks.label": { ko: "외모", en: "Looks" },
  "rateForm.axis.looks.low": { ko: "못 봐주겠…", en: "Can't even…" },
  "rateForm.axis.looks.sub": {
    ko: "스타일이든 분위기든",
    en: "Style, vibe, whatever",
  },
  "rateForm.axis.love.high": { ko: "용광로", en: "Furnace" },
  "rateForm.axis.love.label": { ko: "사랑", en: "Love" },
  "rateForm.axis.love.low": { ko: "냉장고", en: "Freezer" },
  "rateForm.axis.love.sub": { ko: "애정 표현의 온도", en: "Warmth of affection" },
  "rateForm.axis.manner.high": { ko: "모범생", en: "Textbook" },
  "rateForm.axis.manner.label": { ko: "매너", en: "Manners" },
  "rateForm.axis.manner.low": { ko: "가끔 별로", en: "Sometimes off" },
  "rateForm.axis.manner.sub": {
    ko: "데이트 매너, 기본기",
    en: "Date manners, basics",
  },
  "rateForm.axis.personality.high": { ko: "대박 좋음", en: "Really great" },
  "rateForm.axis.personality.label": { ko: "성격", en: "Personality" },
  "rateForm.axis.personality.low": { ko: "피곤", en: "Exhausting" },
  "rateForm.axis.personality.sub": {
    ko: "같이 있을 때 편했나요?",
    en: "Were you at ease together?",
  },
  "rateForm.axis.reunion.high": { ko: "… 생각은 남", en: "… still thinking" },
  "rateForm.axis.reunion.label": { ko: "재회각", en: "Reunion odds" },
  "rateForm.axis.reunion.low": { ko: "절대 노", en: "Hard no" },
  "rateForm.axis.reunion.sub": {
    ko: "다시 만난다면?",
    en: "If you got back together?",
  },
  "rateForm.comment.counter": {
    ko: "{len}/{max}",
    en: "{len}/{max}",
    notes: "변수: len, max (글자수)",
  },
  "rateForm.comment.placeholder": {
    ko: "예) 웃음소리 진짜 맑았어~ 근데 맨날 약속 늦음 ㅋㅋ",
    en: "e.g. Had the sweetest laugh, always late though lol",
  },
  "rateForm.comment.sub": {
    ko: "한 줄이어도 OK. 익명이니까 진심 툭~",
    en: "One line is fine. You're anon, just say it",
  },
  "rateForm.comment.title": {
    ko: "마지막으로 남기고 싶은 말",
    en: "One last thing to say",
  },
  "rateForm.error.rateLimit": {
    ko: "바로 전에 같은 네트워크에서 평가가 올라갔어요. 5분 뒤 다시 시도해주세요.",
    en: "Same network just submitted a review. Try again in 5 minutes.",
  },
  "rateForm.error.submitFailed": {
    ko: "제출 실패: {err}",
    en: "Submit failed: {err}",
    notes: "{err}는 서버 에러 코드",
  },
  "rateForm.nav.badge": { ko: "평가 작성", en: "Write review" },
  "rateForm.submit.idle": {
    ko: "익명으로 통지표 전송하기",
    en: "Send anonymously",
  },
  "rateForm.submit.loading": { ko: "전송 중…", en: "Sending…" },
  "rateForm.submit.warning": {
    ko: "제출하면 수정 · 삭제가 어려워요. 한 번만 꾸욱.",
    en: "No edits or deletes after submit. One firm tap.",
  },
  "rateForm.success.cta.home": { ko: "홈으로 돌아가기", en: "Back to home" },
  "rateForm.success.cta.view": {
    ko: "@{id} 통지표 구경하기",
    en: "Peek at @{id}'s report card",
    notes: "변수: id",
  },
  "rateForm.success.footer": {
    ko: "2C 프리뷰 · 완료 화면",
    en: "2C preview · Done screen",
  },
  "rateForm.success.msg": {
    ko: "**@{id}** 님의 통지표에 당신의 {avgBold} 평가가 쏙 들어갔어요.",
    en: "Your {avgBold} review slipped into **@{id}**'s report card.",
    notes: "변수: id (ink bold), avgBold (coral bold). `{avg}점` 형태로 slot 주입",
  },
  "rateForm.success.msg.avg": {
    ko: "{avg}점",
    en: "{avg}-star",
    notes: "rateForm.success.msg 안에 coral bold로 주입",
  },
  "rateForm.success.shushing": {
    ko: "누가 썼는지 아무도 몰라요",
    en: "No one knows who wrote it",
  },
  "rateForm.success.sticker": { ko: "SENT!", en: "SENT!" },
  "rateForm.success.title": {
    ko: "익명 평가 전송 완료!",
    en: "Anonymous review sent!",
  },
  "rateForm.target.label": { ko: "RATING", en: "RATING" },

  // ───── Dashboard (/dashboard) ─────
  "dashboard.axis.looks": { ko: "외모", en: "Looks" },
  "dashboard.axis.love": { ko: "사랑", en: "Love" },
  "dashboard.axis.manner": { ko: "매너", en: "Manners" },
  "dashboard.axis.personality": { ko: "성격", en: "Personality" },
  "dashboard.axis.reunion": { ko: "재회각", en: "Reunion" },
  "dashboard.card.label": { ko: "MY.REPORT.CARD", en: "MY.REPORT.CARD" },
  "dashboard.comments.empty.sub": {
    ko: "평가는 남겼는데 말은 없었던 전 애인이 있나봐요 🤐",
    en: "Some exes rated but stayed quiet 🤐",
  },
  "dashboard.comments.empty.title": {
    ko: "주관식 코멘트는 아직 없어요",
    en: "No written comments yet",
  },
  "dashboard.comments.title": {
    ko: "마지막 한마디 모음집",
    en: "Last words collection",
  },
  "dashboard.cta.copy": { ko: "평가 링크 복사하기", en: "Copy review link" },
  "dashboard.cta.share.label": {
    ko: "내 통지표 인스타에 뿌리러 가기",
    en: "Flex this report card on Instagram",
  },
  "dashboard.cta.share.sticker": { ko: "SOON", en: "SOON" },
  "dashboard.cta.share.toast": {
    ko: "인스타 공유 이미지는 준비 중이에요!",
    en: "Instagram share image is cooking!",
  },
  "dashboard.state.error.title": {
    ko: "불러오는 중 문제가 생겼어요",
    en: "Something went wrong while loading",
  },
  "dashboard.state.loading": {
    ko: "통지표 가져오는 중…",
    en: "Fetching report card…",
  },
  "dashboard.state.missing.cta": { ko: "홈으로 가기", en: "Go home" },
  "dashboard.state.missing.sub": {
    ko: "홈에서 아이디 + 생일로 들어와주세요.",
    en: "Head home and enter your handle + birthday.",
  },
  "dashboard.state.missing.title": {
    ko: "로그인 정보가 없어요",
    en: "Missing login info",
  },
  "dashboard.state.notfound.body": {
    ko: "**@{id}** + 이 생일 조합으로 들어온 평가가 없어요.\n생일 다시 확인하거나, 링크를 전 애인한테 뿌려보세요!",
    en: "No reviews for **@{id}** + this birthday.\nDouble-check the birthday, or share the link with your exes!",
    notes: "변수: id",
  },
  "dashboard.state.notfound.bodyNoId": {
    ko: "아이디/생일을 다시 확인해주세요.",
    en: "Please double-check your handle/birthday.",
  },
  "dashboard.state.notfound.cta.home": {
    ko: "홈으로 돌아가기",
    en: "Back to home",
  },
  "dashboard.state.notfound.title": {
    ko: "아직 평가가 없어요",
    en: "No reviews yet",
  },
  "dashboard.stats": {
    ko: "총 {countBold}이 평가했어요 · 평균 {avgBold} / 5.0",
    en: "{countBold} have reviewed · avg {avgBold} / 5.0",
    notes: "{countBold} = coral bold '{count}명', {avgBold} = ink bold '{avg}'",
  },
  "dashboard.stats.count": { ko: "{count}명", en: "{count} people" },
  "dashboard.title": {
    ko: "{idChip} 님의\n{highlight} 통지표!",
    en: "{idChip}'s\n{highlight} report card!",
    notes:
      "{idChip} = @아이디 (흰 배경 pill로 렌더). {highlight} = 귀염뽀짝 (coral 형광펜)",
  },
  "dashboard.title.highlight": { ko: "귀염뽀짝", en: "cutesy-ass" },
} as const satisfies Record<string, StringEntry>;

export type StringKey = keyof typeof strings;

/** `{var}` 치환. locale 생략 시 `ko`. */
export function t(
  key: StringKey,
  vars?: Record<string, string | number>,
  locale: Locale = "ko",
): string {
  const entry = strings[key];
  const raw = entry[locale] || entry.ko;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) =>
    name in vars ? String(vars[name]) : m,
  );
}
