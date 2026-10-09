import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireUser(['admin']);
    const result = await pool.query(`
      SELECT a.id, a.status, j.title AS "jobTitle", u.name AS "maidName"
      FROM applications a JOIN jobs j ON a.job_id = j.id JOIN users u ON a.maid_id = u.id
      ORDER BY a.id DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
