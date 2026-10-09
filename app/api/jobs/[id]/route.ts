import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { parseId, requireRecord, requireUser, respondError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.query(
      "SELECT id, employer_id, title, location, salary, description, status FROM jobs WHERE id = $1 AND status = 'Approved'", [parseId(params.id)]
    );
    return NextResponse.json(requireRecord(result.rows[0], 'Job'));
  } catch (error) { return respondError(error); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [parseId(params.id)]);
    requireRecord(result.rows[0], 'Job');
    return NextResponse.json({ message: 'Job deleted' });
  } catch (error) { return respondError(error); }
}
