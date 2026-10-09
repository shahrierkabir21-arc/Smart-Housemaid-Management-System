import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireUser(['admin']);
    const result = await pool.query('SELECT id, employer_id, title, location, salary, description, status FROM jobs ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
