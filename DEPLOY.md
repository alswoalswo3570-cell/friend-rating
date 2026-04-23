# 배포 가이드 (Ex-Rating)

Vercel + Turso 스택으로 배포합니다. 아래 순서대로 따라하면 10-15분.

---

## 1. Turso DB 만들기 (3분)

1. https://turso.tech 접속 → GitHub 계정으로 Sign up
2. Turso CLI 설치 (Windows PowerShell):
   ```powershell
   irm get.tur.so/install.ps1 | iex
   ```
   Mac/Linux: `curl -sSfL https://get.tur.so/install.sh | bash`

3. 터미널에서 로그인 & DB 생성:
   ```bash
   turso auth login
   turso db create ex-rating --from-file prisma/dev.db
   ```
   → 이미 마이그레이션 + 시드된 로컬 DB를 그대로 업로드해서 바로 사용 가능.

4. 연결 정보 조회:
   ```bash
   turso db show ex-rating --url           # libsql://... 출력
   turso db tokens create ex-rating        # JWT 토큰 출력
   ```
   이 두 값을 메모해두세요. Vercel 환경변수로 쓸 겁니다.

---

## 2. GitHub repo 만들기 (2분)

1. https://github.com/new → 새 repo 생성 (`ex-rating`, private OK)
2. 로컬에서 push:
   ```bash
   cd ex-rating
   git remote add origin https://github.com/<your-username>/ex-rating.git
   git push -u origin main
   ```

---

## 3. Vercel 배포 (5분)

1. https://vercel.com → GitHub 계정으로 로그인
2. **Add New → Project** → 방금 만든 `ex-rating` repo 선택 → **Import**
3. **Root Directory**: `./` 그대로
4. **Environment Variables** — 아래 4개 추가:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | `file:./dev.db` *(빌드 시 Prisma generate용 더미, 실제 런타임엔 안 쓰임)* |
   | `TURSO_DATABASE_URL` | `libsql://ex-rating-<yourname>.turso.io` *(turso db show 결과)* |
   | `TURSO_AUTH_TOKEN` | `eyJhbGc...` *(turso db tokens create 결과)* |
   | `BIRTH_SALT` | 랜덤 문자열 32자 이상 *(예: `openssl rand -hex 32`)* |
   | `IP_SALT` | 위와 다른 랜덤 문자열 |

   > ⚠️ `BIRTH_SALT`은 한번 정하면 바꾸면 안 돼요.
   > 바꾸면 기존 평가들 모두 조회 불가 (해시 불일치).

5. **Deploy** 클릭 → 2-3분 후 배포 완료

---

## 4. 배포 확인

- Vercel이 준 `https://ex-rating-xxx.vercel.app` 접속
- 랜딩 → "내 통지표 조회" → `@minjae_shin` + `940530` 입력
- 시드 데이터 4건이 뜨면 Turso 연결 성공 ✅

---

## 5. 이후 운영

- `main` 브랜치에 push하면 Vercel이 자동 재배포
- 로컬에서 `npm run dev`는 그대로 `prisma/dev.db` 사용 (TURSO 환경변수 없을 때)
- 프로덕션 DB 조회 필요 시: `turso db shell ex-rating`
- 스키마 변경 시:
  ```bash
  # 로컬에 마이그레이션 먼저 적용
  npx prisma migrate dev --name <migration-name>
  # Turso에도 적용
  turso db shell ex-rating < prisma/migrations/<latest>/migration.sql
  ```

---

## 6. 커스텀 도메인 (선택)

Vercel → Project Settings → Domains → Add → 원하는 도메인 입력
→ DNS 공급자에서 CNAME `cname.vercel-dns.com` 등록

---

## Troubleshooting

- **빌드 실패: "Cannot find module '@prisma/client'"**
  → package.json에 `postinstall: "prisma generate"` 있는지 확인.
- **런타임 500: "fetch failed"**
  → `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN` 오타 확인. Vercel Logs에서 에러 확인.
- **평가 제출은 되는데 조회 안 됨**
  → `BIRTH_SALT`이 로컬 `.env.local`과 Vercel에서 다르면 해시가 달라져 조회 0건.
- **"Module parse failed: README.md"**
  → `next.config.js`에 `serverComponentsExternalPackages`가 있는지 확인.
