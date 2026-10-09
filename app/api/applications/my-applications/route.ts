import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const maid = await requireUser(['housemaid']);
    const result = await pool.query(`
      SELECT a.id, a.status, j.title AS "jobTitle"
      FROM applications a JOIN jobs j ON a.job_id = j.id
      WHERE a.maid_id = $1 ORDER BY a.id DESC
    `, [maid.id]);
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
