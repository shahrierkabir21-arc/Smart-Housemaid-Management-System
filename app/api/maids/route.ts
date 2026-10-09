import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await pool.query("SELECT id, name, description FROM users WHERE role = 'housemaid' AND status = 'Approved' ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}
