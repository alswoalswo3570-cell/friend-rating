import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makePrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  const logLevels =
    process.env.NODE_ENV === "development"
      ? (["warn", "error"] as const)
      : (["error"] as const);

  if (tursoUrl) {
    // 프로덕션 / Turso 연결 (Vercel serverless)
    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: tursoToken,
    });
    return new PrismaClient({
      adapter,
      log: [...logLevels],
    });
  }

  // 로컬 개발 fallback (prisma/dev.db)
  return new PrismaClient({ log: [...logLevels] });
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
