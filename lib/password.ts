import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const PREFIX = 'scrypt';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${PREFIX}$${salt}$${hash}`;
}

/** Legacy plaintext passwords are accepted once, then upgraded at login. */
export function verifyPassword(password: string, stored: string): { valid: boolean; needsUpgrade: boolean } {
  if (!stored.startsWith(`${PREFIX}$`)) {
    const a = Buffer.from(password);
    const b = Buffer.from(stored);
    return { valid: a.length === b.length && timingSafeEqual(a, b), needsUpgrade: true };
  }

  const parts = stored.split('$');
  if (parts.length !== 3 || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{128}$/.test(parts[2])) {
    return { valid: false, needsUpgrade: false };
  }
  const calculated = scryptSync(password, parts[1], 64);
  const expected = Buffer.from(parts[2], 'hex');
  return { valid: timingSafeEqual(calculated, expected), needsUpgrade: false };
}
