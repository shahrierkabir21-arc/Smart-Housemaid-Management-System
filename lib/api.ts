import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { getSessionId } from '@/lib/session';
import type { Role, User } from '@/types';

export class ApiError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function parseId(value: string) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) throw new ApiError('Invalid resource ID', 400);
  return id;
}

export async function currentUser(): Promise<User | null> {
  const id = getSessionId();
  if (!id) return null;
  const result = await pool.query<User>(
    'SELECT id, name, email, role, status, description, phone FROM users WHERE id = $1', [id]
  );
  return result.rows[0] ?? null;
}

export async function requireUser(roles?: Role[]): Promise<User> {
  const user = await currentUser();
  if (!user) throw new ApiError('Please sign in to continue', 401);
  if (roles && !roles.includes(user.role)) throw new ApiError('You do not have permission to perform this action', 403);
  return user;
}

export function respondError(error: unknown) {
  if (error instanceof ApiError) return NextResponse.json({ message: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  console.error('API error:', error);
  return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
}

export function requireRecord<T>(record: T | undefined | null, label = 'Resource'): T {
  if (!record) throw new ApiError(`${label} not found`, 404);
  return record;
}
