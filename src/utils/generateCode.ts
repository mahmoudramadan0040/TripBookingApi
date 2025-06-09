import crypto from "crypto";

export const generateUniqueCode = (email: string): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString();
  const base = email + timestamp + random;

  const hash = crypto.createHash("sha256").update(base).digest("hex");
  const numericHash = parseInt(hash.slice(0, 10), 16);
  const code = numericHash % 1000000;

  return code.toString().padStart(6, "0");
};