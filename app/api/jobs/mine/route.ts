import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireUser(['employer']);
    const result = await pool.query('SELECT id, employer_id, title, location, salary, description, status FROM jobs WHERE employer_id = $1 ORDER BY id DESC', [user.id]);
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
