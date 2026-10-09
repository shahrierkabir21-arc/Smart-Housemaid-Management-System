import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { parseId, requireRecord, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.query(
      "SELECT id, name, description FROM users WHERE id = $1 AND role = 'housemaid' AND status = 'Approved'", [parseId(params.id)]
    );
    return NextResponse.json(requireRecord(result.rows[0], 'Housemaid'));
  } catch (error) { return respondError(error); }
}
