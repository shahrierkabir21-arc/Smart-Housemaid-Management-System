// Run with Node.js 22+: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from '../lib/password.ts';
import { formatTaka, getInitials } from '../lib/format.ts';

test('hashes passwords with a random salt', () => {
  const first = hashPassword('my-strong-password');
  const second = hashPassword('my-strong-password');
  assert.match(first, /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);
  assert.notEqual(first, second);
});

test('accepts valid passwords and rejects incorrect ones', () => {
  const hash = hashPassword('my-strong-password');
  assert.deepEqual(verifyPassword('my-strong-password', hash), { valid: true, needsUpgrade: false });
  assert.deepEqual(verifyPassword('wrong-password', hash), { valid: false, needsUpgrade: false });
});

test('handles malformed hashes without authenticating', () => {
  assert.equal(verifyPassword('test', 'scrypt$broken$bad').valid, false);
});

test('legacy passwords are marked for upgrade after a successful login', () => {
  assert.deepEqual(verifyPassword('old-password', 'old-password'), { valid: true, needsUpgrade: true });
  assert.deepEqual(verifyPassword('not-the-password', 'old-password'), { valid: false, needsUpgrade: true });
});

test('formats amounts and initials for cards', () => {
  assert.equal(formatTaka(12000), '৳12,000');
  assert.equal(getInitials('  Nusrat Jahan  '), 'NJ');
});
