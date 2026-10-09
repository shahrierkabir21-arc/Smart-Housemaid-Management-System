import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, respondError } from '@/lib/api';
import { hashPassword } from '@/lib/password';
import { registerSchema } from '@/utils/schemas';

export async function POST(request: Request) {
  try {
    const parsed = registerSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError(parsed.error.issues[0].message);
    const { name, email, password, role } = parsed.data;
    const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1 LIMIT 1', [email]);
    if (existing.rowCount) throw new ApiError('This email is already registered', 409);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, hashPassword(password), role, 'Pending']
    );
    return NextResponse.json({ user: result.rows[0], message: 'Account created. You can sign in now.' }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === '23505') {
      return NextResponse.json({ message: 'This email is already registered' }, { status: 409 });
    }
    return respondError(error);
  }
}
