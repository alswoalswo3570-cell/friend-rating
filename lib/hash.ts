import { createHash } from "node:crypto";

const BIRTH_SALT = process.env.BIRTH_SALT ?? "dev-birth-salt";
const IP_SALT = process.env.IP_SALT ?? "dev-ip-salt";

const sha256 = (input: string): string =>
  createHash("sha256").update(input).digest("hex");

export const hashBirth = (birth: string): string =>
  sha256(`${BIRTH_SALT}:${birth.trim()}`);

export const hashIp = (ip: string): string =>
  sha256(`${IP_SALT}:${ip.trim()}`);

export const normalizeInstaId = (raw: string): string =>
  raw.trim().replace(/^@/, "").toLowerCase();
