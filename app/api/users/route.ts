import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireUser(['admin']);
    const result = await pool.query("SELECT id, name, email, role, status, description FROM users WHERE role != 'admin' ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
