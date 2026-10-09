import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, parseId, requireRecord, requireUser, respondError } from '@/lib/api';
import { reviewStatusSchema } from '@/utils/schemas';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const parsed = reviewStatusSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError('Invalid review status');
    const result = await pool.query('UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *', [parsed.data.status, parseId(params.id)]);
    return NextResponse.json(requireRecord(result.rows[0], 'Job'));
  } catch (error) { return respondError(error); }
}
