import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, parseId, requireRecord, requireUser, respondError } from '@/lib/api';
import { reviewStatusSchema } from '@/utils/schemas';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const parsed = reviewStatusSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError('Invalid review status');
    const result = await pool.query(
      "UPDATE users SET status = $1 WHERE id = $2 AND role = 'housemaid' RETURNING id, name, email, role, status, description",
      [parsed.data.status, parseId(params.id)]
    );
    return NextResponse.json(requireRecord(result.rows[0], 'Housemaid'));
  } catch (error) { return respondError(error); }
}
