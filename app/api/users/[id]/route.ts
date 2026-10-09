import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, parseId, requireRecord, requireUser, respondError } from '@/lib/api';
import { descriptionSchema } from '@/utils/schemas';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireUser();
    const id = parseId(params.id);
    if (user.id !== id && user.role !== 'admin') throw new ApiError('Not allowed', 403);
    const result = await pool.query('SELECT id, name, email, role, status, description, phone FROM users WHERE id = $1', [id]);
    return NextResponse.json(requireRecord(result.rows[0], 'User'));
  } catch (error) { return respondError(error); }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireUser(['housemaid']);
    if (user.id !== parseId(params.id)) throw new ApiError('Not allowed', 403);
    const parsed = descriptionSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError(parsed.error.issues[0].message);
    const result = await pool.query(
      "UPDATE users SET description = $1, status = 'Pending' WHERE id = $2 RETURNING id, name, email, role, status, description, phone",
      [parsed.data.description, user.id]
    );
    return NextResponse.json(requireRecord(result.rows[0], 'User'));
  } catch (error) { return respondError(error); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const result = await pool.query("DELETE FROM users WHERE id = $1 AND role != 'admin' RETURNING id", [parseId(params.id)]);
    requireRecord(result.rows[0], 'User');
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) { return respondError(error); }
}
