import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, respondError } from '@/lib/api';
import { verifyPassword, hashPassword } from '@/lib/password';
import { setSessionCookie } from '@/lib/session';
import { loginSchema } from '@/utils/schemas';
import type { User } from '@/types';

export async function POST(request: Request) {
  try {
    const result = loginSchema.safeParse(await request.json());
    if (!result.success) throw new ApiError('Enter a valid email and password');
    const { email, password } = result.data;
    const found = await pool.query<User & { password: string }>(
      'SELECT id, name, email, password, role, status, description, phone FROM users WHERE LOWER(email) = $1', [email]
    );
    const record = found.rows[0];
    if (!record) throw new ApiError('Invalid email or password', 401);
    const verified = verifyPassword(password, record.password);
    if (!verified.valid) throw new ApiError('Invalid email or password', 401);
    if (verified.needsUpgrade) {
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashPassword(password), record.id]);
    }
    const { password: _password, ...user } = record;
    const response = NextResponse.json({ user });
    setSessionCookie(response, user.id);
    return response;
  } catch (error) { return respondError(error); }
}
