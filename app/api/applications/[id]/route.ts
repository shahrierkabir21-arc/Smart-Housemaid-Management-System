import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { parseId, requireRecord, requireUser, respondError } from '@/lib/api';

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [parseId(params.id)]);
    requireRecord(result.rows[0], 'Application');
    return NextResponse.json({ message: 'Application deleted' });
  } catch (error) { return respondError(error); }
}
